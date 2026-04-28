package com.example.project.service;

import com.example.project.model.User;
import com.example.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {

        // ✅ validation (important to avoid null issues)
        if (user.getEmail() == null || user.getPassword() == null) {
            return "Invalid data";
        }

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "User already exists";
        }

        userRepository.save(user);
        return "User registered successfully";
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User not found";
        }

        if (!user.getPassword().equals(password)) {
            return "Invalid password";
        }

        return "Login successful";
    }
}