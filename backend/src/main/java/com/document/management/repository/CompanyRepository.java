package com.document.management.repository;

import com.document.management.model.Company;
import com.document.management.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    @Query("SELECT c FROM Company c WHERE c.status = :status ORDER BY c.createdAt DESC")
    List<Company> findByStatusOrderByCreatedAtDesc(Status status);
    boolean existsByNameAndStatus(String name, Status status);

}
