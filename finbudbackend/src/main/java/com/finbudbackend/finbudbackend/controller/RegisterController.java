package com.finbudbackend.finbudbackend.controller;

import com.finbudbackend.finbudbackend.entity.User;
import com.finbudbackend.finbudbackend.model.*;
import com.finbudbackend.finbudbackend.repository.UserRepository;
import com.finbudbackend.finbudbackend.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@RestController
@Slf4j
public class RegisterController {
    @Autowired
    UserRepository userRepository;

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        try {
            AuthenticationResponse response = service.register(request);
            response.setHttpStatus(HttpStatus.OK);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            AuthenticationResponse response = new AuthenticationResponse();
            response.setHttpStatus(HttpStatus.BAD_GATEWAY);
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        try {
            AuthenticationResponse response = service.authenticate(request);
            response.setHttpStatus(HttpStatus.OK);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            AuthenticationResponse response = new AuthenticationResponse();
            response.setHttpStatus(HttpStatus.BAD_GATEWAY);
            return ResponseEntity.ok(response);
        }
    }

    @RequestMapping("/user")
    public ResponseEntity<UserInfo> getUserDetailsAfterLogin(Authentication authentication) {
        Optional<User> user = userRepository.findByEmail(authentication.getName());
        if(!user.isPresent()){
            UserInfo response = new UserInfo();
            response.setHttpStatus(HttpStatus.BAD_GATEWAY);
            return ResponseEntity.ok(response);
        }
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.get().getId());
        userInfo.setName(user.get().getFirstName());
        userInfo.setHttpStatus(HttpStatus.OK);
        return ResponseEntity.ok(userInfo);
    }

}
