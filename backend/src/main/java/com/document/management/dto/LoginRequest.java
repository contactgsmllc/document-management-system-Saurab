package com.document.management.dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
    private String CompanyName;
}
