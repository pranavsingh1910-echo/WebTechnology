package com.bookstore.controller;

import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered"));
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setId(null);
        repository.save(user);

        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        return repository.findByEmail(loginUser.getEmail())
                .filter(user -> encoder.matches(loginUser.getPassword(), user.getPassword()))
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "name", user.getName(),
                        "email", user.getEmail()
                )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid email or password")));
    }
}