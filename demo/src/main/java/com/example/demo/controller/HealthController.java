package com.example.demo.controller;

import java.time.Instant;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/api/health")
    public Map<String, String> healthCheck() {
        return Map.of(
            "status", "OK",
            "timestamp", Instant.now().toString()
        );
    }
    
    @GetMapping("/api/db")
    public Map<String, String> dbHealthCheck() {
        try {
            // Execute a simple query to test the connection
            String result = jdbcTemplate.queryForObject("SELECT 'Connected successfully' AS status", String.class);
            return Map.of(
                "database","NeonDB",
                "status", "OK",
                "message", result,
                "timestamp", Instant.now().toString()
            );
        } catch (Exception e) {
            return Map.of(
                "status", "ERROR",
                "message", "Database connection failed: " + e.getMessage(),
                "timestamp", Instant.now().toString()
            );
        }
    }
    
}