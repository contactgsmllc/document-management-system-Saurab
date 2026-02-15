package com.document.management.service;

import com.document.management.config.JwtUtil;
import com.document.management.dto.LoginRequest;
import com.document.management.dto.LoginResponse;
import com.document.management.dto.RegisterRequest;
import com.document.management.dto.UserResponse;
import com.document.management.exception.ForbiddenException;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static com.document.management.model.Status.INACTIVE;

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
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse register(RegisterRequest req) {

        if (userRepo.existsByEmailAndCompanyId(req.getEmail(), req.getCompanyId())) {
            throw new RuntimeException("Email already exist for this company");
        }

        User user = new User();

        user.setEmail(req.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));

        // ✅ NEW: name mapping (THIS WAS MISSING)
        user.setFirstName(req.getFirstName());
        user.setMiddleName(req.getMiddleName());
        user.setLastName(req.getLastName());

        if (req.getCompanyId() != null) {
            user.setCompany(
                    companyRepo.findById(req.getCompanyId())
                            .orElseThrow(() -> new RuntimeException("Company not found"))
            );
        }

        Role userRole = roleRepo.findByName(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("USER role not found in database"));

        user.setRole(userRole);
        user.setApproved(false);
        user.setStatus(Status.ACTIVE);

        userRepo.save(user);

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getCompany(),
                user.isApproved(),
                user.getStatus(),
                user.getFirstName(),
                user.getMiddleName(),
                user.getLastName()
        );
    }



    public LoginResponse login(LoginRequest req) {

            User user = userRepo.findByEmailAndCompanyName(req.getEmail(), req.getCompanyName())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            validateUser(user, req.getPassword());

            return buildLoginResponse(user);
    }

        /* ---------------- PRIVATE HELPERS ---------------- */

        private void validateUser(User user, String rawPassword) {

            if (!user.isApproved()) {
                throw new ForbiddenException("User is not approved by admin yet");
            }

            if (INACTIVE.equals(user.getStatus())) {
                throw new RuntimeException("User is not active");
            }

            if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            if (user.getRole().getName() == RoleType.USER && user.getCompany() == null) {
                throw new IllegalStateException("USER must be associated with a company");
            }
        }

        private LoginResponse buildLoginResponse(User user) {

            return new LoginResponse(
                    jwtUtil.generateToken(user),
                    user.getRole().getName().name(),
                    user.getId(),
                    user.getCompany() != null ? user.getCompany().getId() : null
            );
        }

    public List<UserResponse> listAllUsers() {
        return userRepo.findAllUsersOrderByCreatedAtDesc().stream()
                .map(u -> new UserResponse(u.getId(), u.getEmail(), u.getRole(), u.getCompany(), u.isApproved(), u.getStatus(), u.getFirstName(), u.getMiddleName(),u.getLastName()))
                .collect(Collectors.toList());
    }

    public List<UserResponse> listPendingUsers() {
        return userRepo.findPendingUsersByStatusOrderByCreatedAtDesc().stream()
                .map(u -> new UserResponse(u.getId(), u.getEmail(), u.getRole(), u.getCompany(), u.isApproved(), u.getStatus(),u.getFirstName(),u.getMiddleName(),u.getLastName()))
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
                user.getStatus(),
                user.getFirstName(),
                user.getMiddleName(),
                user.getLastName()
        );
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));



            // Map entity -> DTO (do NOT expose password or sensitive fields)
            return new UserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCompany(),
                    user.isApproved(),
                    user.getStatus(),
                    user.getFirstName(),
                    user.getMiddleName(),
                    user.getLastName()
            );


        }

        @Transactional
        public void softDeleteUser (Long id){
            User user = userRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setStatus(INACTIVE);
            userRepo.save(user);
        }
        @Transactional
        public void hardDeleteUser (Long id){
            if (!userRepo.existsById(id)) {
                throw new RuntimeException("User not found");
            }
            userRepo.deleteById(id);
        }

    @Transactional
    public User reactivateUser(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getStatus() == Status.ACTIVE) {
            throw new RuntimeException("User is already active");
        }

        user.setStatus(Status.ACTIVE);
        return userRepo.save(user);
    }



}


