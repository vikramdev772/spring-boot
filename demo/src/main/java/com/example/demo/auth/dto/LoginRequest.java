package com.example.demo.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Employee ID cannot be blank")
    private String employeeId;
    
    @NotBlank(message = "Password cannot be blank")
    private String password;
}