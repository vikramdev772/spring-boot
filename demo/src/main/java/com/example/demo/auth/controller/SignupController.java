package com.example.demo.auth.controller;

import com.example.demo.auth.dto.SignupRequest;
import com.example.demo.auth.model.Employee;
import com.example.demo.auth.service.EmployeeService;
import jakarta.validation.Valid; // Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map; // Also needed for Map.of()

@RestController
@RequestMapping("/api")
public class SignupController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            Employee employee = employeeService.createEmployee(signupRequest);
            return ResponseEntity.ok().body(Map.of(
                "status", "success",
                "message", "Employee created successfully",
                "employeeId", employee.getEmployeeId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }
}