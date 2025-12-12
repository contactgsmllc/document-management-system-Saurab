package com.document.management.repository;

import com.document.management.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByCompanyId(Long companyId);
    @Query("SELECT d FROM Document d WHERE d.companyId = :companyId ORDER BY d.uploadedAt DESC")
    List<Document> findByCompanyIdOrderByUploadedAtDesc(Long companyId);


}

