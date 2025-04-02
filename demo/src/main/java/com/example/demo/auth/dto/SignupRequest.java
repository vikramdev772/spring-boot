package com.example.demo.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignupRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Date of birth is required")
    private Integer dobDay;
    @NotNull(message = "Date of birth is required")
    private Integer dobMonth;
    @NotNull(message = "Date of birth is required")
    private Integer dobYear;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Date of joining is required")
    private Integer dojDay;
    @NotNull(message = "Date of joining is required")
    private Integer dojMonth;
    @NotNull(message = "Date of joining is required")
    private Integer dojYear;

    @NotBlank(message = "Branch is required")
    private String branch;
    @NotBlank(message = "Password is required")
    private String password;
}
