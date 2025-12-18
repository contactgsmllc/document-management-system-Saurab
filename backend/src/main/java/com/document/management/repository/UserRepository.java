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
         AND u.status = :status
       ORDER BY u.createdAt DESC
       """)
    List<User> findPendingUsersByStatusOrderByCreatedAtDesc(Status status);


    @Query("""
       SELECT u 
       FROM User u 
       WHERE u.status = :status
       ORDER BY u.createdAt DESC
       """)
    List<User> findAllUsersByStatusOrderByCreatedAtDesc(Status status);

    @Query("SELECT u FROM User u WHERE u.approved = false ORDER BY u.createdAt DESC")
    List<User> findPendingUsersOrderByCreatedAtDesc();
    @Query("SELECT u FROM User u ORDER BY u.createdAt DESC")
    List<User> findAllUsersOrderByCreatedAtDesc();
    boolean existsByEmail(String email);
}
