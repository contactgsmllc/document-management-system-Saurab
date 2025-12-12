package com.document.management.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String email;
    private String password;
    private Long companyId;


}
