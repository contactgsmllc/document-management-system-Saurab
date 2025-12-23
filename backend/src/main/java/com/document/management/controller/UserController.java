package com.document.management.controller;

import com.document.management.config.JwtUtil;
import com.document.management.dto.LoginRequest;
import com.document.management.dto.LoginResponse;
import com.document.management.dto.RegisterRequest;
import com.document.management.dto.UserResponse;
import com.document.management.model.Company;
import com.document.management.model.Status;
import com.document.management.repository.CompanyRepository;
import com.document.management.repository.UserRepository;
import com.document.management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
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
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(service.login(req));
    }

    @GetMapping("/companies/list")
    public List<Company> listCompanies() {
        return companyRepo.findByStatusOrderByCreatedAtDesc(Status.ACTIVE);
    }

    @GetMapping("/list")
    public List<UserResponse> listAll() {
        return service.listAllUsers();
    }
}
