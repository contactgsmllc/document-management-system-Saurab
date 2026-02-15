package com.document.management.controller;

import com.document.management.dto.RegisterRequest;
import com.document.management.dto.UserResponse;
import com.document.management.model.Role;
import com.document.management.model.RoleType;
import com.document.management.model.User;
import com.document.management.repository.CompanyRepository;
import com.document.management.repository.RoleRepository;
import com.document.management.repository.UserRepository;
import com.document.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class UserAdminController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private CompanyRepository companyRepo;

    @Autowired
    private UserService userService;


    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/list")
    public List<UserResponse> listUsers() {
        return userService.listAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody RegisterRequest req) {

        if (userRepo.existsByEmailAndCompanyId(req.getEmail(), req.getCompanyId())) {
            throw new RuntimeException("Email already exist for this company");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setCompany(companyRepo.findById(req.getCompanyId()).orElseThrow());
        user.setFirstName(req.getFirstName());
        user.setMiddleName(req.getMiddleName());
        user.setLastName(req.getLastName());

        Role role = roleRepo.findById(req.getRoleId())
               .orElseThrow(() -> new IllegalStateException("No roles configured in the system"));

        user.setRole(role);
        user.setApproved(true);
        return userRepo.save(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody RegisterRequest req) {
        User user = userRepo.findById(id).orElseThrow();
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setCompany(companyRepo.findById(req.getCompanyId()).orElseThrow());

        Role role = roleRepo.findById(req.getRoleId())
                .orElseThrow(() -> new IllegalStateException("No roles configured in the system"));

        user.setRole(role);
        return userRepo.save(user);
    }

    @GetMapping("/pending")
    public List<UserResponse> listPendingUsers() {

        return userService.listPendingUsers();
    }

    @PutMapping("/{id}/approve")
    public User approveUser(
            @PathVariable Long id,
            @RequestParam(defaultValue = "false") boolean approve) {
        User user = userRepo.findById(id).orElseThrow();
        user.setApproved(approve);
        return userRepo.save(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.softDeleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentDeleteUser(@PathVariable Long id) {
        userService.hardDeleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}/reactivate")
    public ResponseEntity<User> reactivateUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.reactivateUser(id));
    }


}
