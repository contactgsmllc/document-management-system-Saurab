package com.document.management.service;

import com.document.management.model.Role;
import com.document.management.model.RoleType;
import com.document.management.model.Status;
import com.document.management.model.User;
import com.document.management.repository.RoleRepository;
import com.document.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Value("${app.superadmin.email}")
    private String adminEmail;

    @Value("${app.superadmin.password}")
    private String adminPassword;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initRoles();
        initSuperAdmin();
    }

    private void initRoles() {
        for (RoleType roleType : List.of(RoleType.SUPER_ADMIN, RoleType.USER)) {
            if (!roleRepository.existsByName(roleType)) {
                Role role = new Role();
                role.setName(roleType);
                roleRepository.save(role);
            }
        }
    }


    private void initSuperAdmin() {
        // Create user only if not exists
        if (!userRepository.existsByEmail(adminEmail)) {

            Role superAdminRole = roleRepository.findByName(RoleType.SUPER_ADMIN)
                    .orElseThrow(() -> new RuntimeException("SUPER_ADMIN role not found"));

            User user = new User();
            user.setEmail(adminEmail);
            user.setPassword(passwordEncoder.encode(adminPassword));
            user.setRole(superAdminRole);
            user.setApproved(true);
            user.setStatus(Status.ACTIVE);
            userRepository.save(user);
        }
    }
}
