package com.document.management.repository;

import com.document.management.model.Status;
import com.document.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByApprovedFalse();
  
    @Query("""
       SELECT u 
       FROM User u 
       WHERE u.approved = false 
       ORDER BY u.createdAt DESC
       """)
    List<User> findPendingUsersByStatusOrderByCreatedAtDesc();


    @Query("""
   SELECT u
   FROM User u
   ORDER BY u.createdAt DESC
   """)
    List<User> findAllUsersOrderByCreatedAtDesc();

    @Query("""
   SELECT u
   FROM User u
   ORDER BY u.createdAt DESC
   """)
    List<User> findAllUsersForAdminOrderByCreatedAtDesc();


    boolean existsByEmail(String email);

    boolean existsByEmailAndCompanyId(String email, Long companyId);

    Optional<User> findByEmailAndCompanyName(String email, String companyName);

    Optional<User> findByEmailAndCompanyId(String email, Long companyId);

    boolean existsByCompanyIdAndStatus(Long companyId, Status status);



}
