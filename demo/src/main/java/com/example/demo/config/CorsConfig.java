package com.example.demo.config;  // Update with your package structure
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Allow all paths
                        .allowedOrigins("*") // Allow all origins
                        .allowedMethods("*") // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                        .allowedHeaders("*") // Allow all headers
                        .exposedHeaders("*") // Expose all headers
                        .allowCredentials(false) // Disable credentials for full access
                        .maxAge(3600); // Cache preflight requests for 1 hour
            }
        };
    }
}
