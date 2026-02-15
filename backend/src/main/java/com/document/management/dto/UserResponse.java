package com.document.management.dto;

import com.document.management.model.Company;
import com.document.management.model.Role;
import com.document.management.model.Status;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private Role role;
    private Company company;
    private boolean approved;
    private Status status;
    private String firstName;
    private String middleName;
    private String lastName;

    public UserResponse(Long id, String email, Role role, Company company,boolean approved,Status status,String firstName,String middleName,String lastName) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.company = company;
        this.approved = approved;
        this.status = status;
        this.firstName= firstName;
        this.middleName= middleName;
        this.lastName= lastName;
    }

}
