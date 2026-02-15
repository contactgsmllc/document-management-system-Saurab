package com.document.management.controller;

import com.document.management.dto.CompanyResponse;
import com.document.management.dto.CompanyUpdateRequest;
import com.document.management.model.Company;
import com.document.management.model.Status;
import com.document.management.repository.CompanyRepository;
import com.document.management.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin/companies")
public class CompanyAdminController {

    @Autowired
    private CompanyRepository companyRepo;
    @Autowired
    CompanyService companyService;

    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        if (companyService.existsInactiveCompanyWithName(company.getName())) {
            throw new RuntimeException("Company is in Inactive status. Try reactivating it.");
        }
        if (companyService.existsActiveCompanyWithName(company.getName())) {
            throw new RuntimeException("Company with the same name already exists.");
        }
        Company saved = companyRepo.save(company);
        return saved;
    }

    @PutMapping("/{id}")
    public Company updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyUpdateRequest req) {

        return companyService.updateCompany(id, req);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getCompany(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompany(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        if (companyService.hasActiveUsers(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete company with active users.");
        }
        companyService.softDeleteCompany(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}/reactivate")
    public ResponseEntity<Company> reactivateCompany(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.reactivateCompany(id));
    }


    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentDeleteCompany(@PathVariable Long id) {
        companyService.hardDeleteCompany(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/list")
    public List<Company> listCompanies() {
        return companyRepo.findAll();
    }
}
