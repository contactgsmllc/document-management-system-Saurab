package com.document.management.dto;

public class LoginResponse {

        private String token;
        private String role;
        private Long userId;
        private Long companyId;


        public LoginResponse(String token, String role ,Long userId, Long companyId) {
            this.token = token;
            this.role = role;
            this.userId = userId;
            this.companyId = companyId;


        }

        public String getToken() {
            return token;
        }

        public String getRole() {
            return role;
        }

        public Long getUserId() {
        return userId;
        }

        public Long getCompanyId() {
        return companyId;
        }
    }

