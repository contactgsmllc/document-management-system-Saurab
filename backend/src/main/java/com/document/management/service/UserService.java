package com.document.management.service;

import com.document.management.config.JwtUtil;
import com.document.management.dto.LoginRequest;
import com.document.management.dto.LoginResponse;
import com.document.management.dto.RegisterRequest;
import com.document.management.dto.UserResponse;
import com.document.management.model.Role;
import com.document.management.model.RoleType;
import com.document.management.model.Status;
import com.document.management.model.User;
import com.document.management.repository.CompanyRepository;
import com.document.management.repository.RoleRepository;
import com.document.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private CompanyRepository companyRepo;
    @Autowired
    private JwtUtil jwtUtil;

    public UserResponse register(RegisterRequest req) {

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));
        user.setCompany(
                companyRepo.findById(req.getCompanyId())
                        .orElseThrow(() -> new RuntimeException("Company not found"))
        );
        Role userRole = roleRepo.findByName(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("USER role not found in database"));

        user.setRole(userRole);
        user.setApproved(false);
        userRepo.save(user);
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getCompany(),
                user.isApproved(),
                user.getStatus()

        );
    }


    public LoginResponse login(LoginRequest req) {
        User user = userRepo.findByEmail(req.email).orElseThrow();

        // MUST check approval
        if (!user.isApproved()) {
            throw new RuntimeException("User is not approved by admin yet");
        }

        if (!new BCryptPasswordEncoder().matches(req.password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String roleName = user.getRole().getName().name();
        return new LoginResponse(jwtUtil.generateToken(user), roleName);
    }

    public List<UserResponse> listUsers() {
        return userRepo.findAllUsersByStatusOrderByCreatedAtDesc(Status.ACTIVE).stream()
                .map(u -> new UserResponse(u.getId(), u.getEmail(), u.getRole(), u.getCompany(), u.isApproved(), u.getStatus()))
                .collect(Collectors.toList());
    }

    public List<UserResponse> listPendingUsers() {
        return userRepo.findPendingUsersByStatusOrderByCreatedAtDesc(Status.ACTIVE).stream()
                .map(u -> new UserResponse(u.getId(), u.getEmail(), u.getRole(), u.getCompany(), u.isApproved(), u.getStatus()))
                .collect(Collectors.toList());
    }


    public UserResponse approveUser(Long id, boolean approve) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setApproved(approve);
        userRepo.save(user);

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getCompany(),
                user.isApproved(),
                user.getStatus()
        );
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.getStatus() != Status.ACTIVE) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found");
        }



            // Map entity -> DTO (do NOT expose password or sensitive fields)
            return new UserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCompany(),
                    user.isApproved(),
                    user.getStatus()
            );


        }

        @Transactional
        public void softDeleteUser (Long id){
            User user = userRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setStatus(Status.INACTIVE);
            userRepo.save(user);
        }
        @Transactional
        public void hardDeleteUser (Long id){
            if (!userRepo.existsById(id)) {
                throw new RuntimeException("User not found");
            }
            userRepo.deleteById(id);
        }


    }


