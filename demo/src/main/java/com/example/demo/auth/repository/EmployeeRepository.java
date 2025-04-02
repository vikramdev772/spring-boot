package com.example.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.auth.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Existing methods for signup validation
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmployeeId(String employeeId);
    
    // New method for login functionality
    Optional<Employee> findByEmployeeId(String employeeId);
}