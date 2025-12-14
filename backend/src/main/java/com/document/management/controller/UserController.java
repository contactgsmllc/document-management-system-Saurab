package com.document.management.controller;

import com.document.management.config.JwtUtil;
import com.document.management.dto.LoginRequest;
import com.document.management.dto.LoginResponse;
import com.document.management.dto.RegisterRequest;
import com.document.management.dto.UserResponse;
import com.document.management.model.Company;
import com.document.management.model.User;
import com.document.management.repository.CompanyRepository;
import com.document.management.repository.UserRepository;
import com.document.management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final CompanyRepository companyRepo;
    private final UserRepository repo;
    private final UserService service;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserController(UserRepository repo,CompanyRepository companyRepo, UserService service, JwtUtil jwtUtil) {
        this.companyRepo = companyRepo;
        this.repo = repo;
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest req) {
        return service.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        User user = repo.findByEmail(req.getEmail()).orElseThrow();

        if (!user.isApproved()) {
            throw new RuntimeException("User is not approved by admin yet");
        }
        if (encoder.matches(req.getPassword(), user.getPassword())) {
            String roleName = user.getRole().getName().name();
            return new LoginResponse(jwtUtil.generateToken(user), roleName);
        }
        throw new RuntimeException("Invalid credentials");
    }

    @GetMapping("/companies")
    public List<Company> listCompanies() {
        return companyRepo.findAllCompaniesOrderByCreatedAtDesc();
    }

    @GetMapping
    public List<UserResponse> listAll() {
        return service.listUsers();
    }
}
