package com.document.management.dto;


import lombok.Data;

@Data
public class LoginRequest {
    public String email;
    public String password;
    private String firstName;
    private String middleName;
    private String lastName;


}
