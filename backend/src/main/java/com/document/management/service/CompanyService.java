package com.document.management.service;

import com.document.management.dto.CompanyResponse;
import com.document.management.dto.CompanyUpdateRequest;
import com.document.management.exception.ForbiddenException;
import com.document.management.model.Company;
import com.document.management.model.Status;
import com.document.management.repository.CompanyRepository;
import com.document.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepo;

    @Autowired
    private UserRepository userRepo;

    public boolean hasActiveUsers(Long companyId) {
        return userRepo.existsByCompanyIdAndStatus(companyId, Status.ACTIVE);
    }

    public boolean existsInactiveCompanyWithName(String name) {
        return companyRepo.existsByNameAndStatus(name, Status.INACTIVE);
    }

    public boolean existsActiveCompanyWithName(String name) {
        return companyRepo.existsByNameAndStatus(name, Status.ACTIVE);
    }

    @Transactional
    public void softDeleteCompany(Long id) {

        Company company = companyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        // ✅ Soft delete
        company.setStatus(Status.INACTIVE);
        companyRepo.save(company);
    }


    @Transactional
    public void hardDeleteCompany(Long id) {
        if (!companyRepo.existsById(id)) {
            throw new RuntimeException("Company not found");
        }
        companyRepo.deleteById(id);
    }

    @Transactional
    public Company reactivateCompany(Long companyId) {

        Company company = companyRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if (company.getStatus() == Status.ACTIVE) {
            throw new RuntimeException("Company is already active");
        }

        company.setStatus(Status.ACTIVE);
        return companyRepo.save(company);
    }

    @Transactional
    public Company updateCompany(Long id, CompanyUpdateRequest req) {

        Company company = companyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        updateCompanyFields(company, req);

        return company;
    }


    @Transactional(readOnly = true)
    public CompanyResponse getCompany(Long id) {
        Company company = companyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));


        CompanyResponse res = new CompanyResponse();
        res.setId(company.getId());
        res.setName(company.getName());
        res.setAddress(company.getAddress());
        res.setCity(company.getCity());
        res.setState(company.getState());
        res.setZipCode(company.getZipCode());
        res.setContactPerson(company.getContactPerson());
        res.setEmail(company.getEmail());
        res.setPhone(company.getPhone());
        res.setCreatedAt(company.getCreatedAt());
        res.setStatus(company.getStatus());

        return res;
    }

    private void updateCompanyFields(Company company, CompanyUpdateRequest req) {

        if (req.name() != null) company.setName(req.name());
        if (req.address() != null) company.setAddress(req.address());
        if (req.city() != null) company.setCity(req.city());
        if (req.state() != null) company.setState(req.state());
        if (req.contactPerson() != null) company.setContactPerson(req.contactPerson());
        if (req.zipCode() != null) company.setZipCode(req.zipCode());
        if (req.email() != null) company.setEmail(req.email());
        if (req.phone() != null) company.setPhone(req.phone());
        if (req.status() != null) company.setStatus(req.status());
    }
}

