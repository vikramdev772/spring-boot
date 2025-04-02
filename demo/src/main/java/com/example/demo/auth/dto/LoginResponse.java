package com.example.demo.auth.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String status;
    private String message;
    private String employeeId;
    private String role;
    private String token; // For future JWT implementation
}