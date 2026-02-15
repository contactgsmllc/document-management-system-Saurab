package com.document.management.dto;

import com.document.management.model.Status;

public record CompanyUpdateRequest(
        String name,
        String address,
        String city,
        String state,
        String contactPerson,
        String zipCode,
        String email,
        String phone,
        Status status
) {}
