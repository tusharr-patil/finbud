package com.finbudbackend.finbudbackend.service;

import com.finbudbackend.finbudbackend.config.CustomAuthenticationProvider;
import com.finbudbackend.finbudbackend.entity.User;
import com.finbudbackend.finbudbackend.model.AuthenticationRequest;
import com.finbudbackend.finbudbackend.model.AuthenticationResponse;
import com.finbudbackend.finbudbackend.model.RegisterRequest;
import com.finbudbackend.finbudbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final CustomAuthenticationProvider authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        try {
            String jwtToken = createToken(request);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (IllegalStateException e){
            throw new IllegalStateException("email already taken");
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e){
            throw new BadCredentialsException("invalid credentials");
        }

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private String createToken(RegisterRequest request) {
        boolean userExists = repository.findByEmail(request.getEmail()).isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .avatar("https://avatars.dicebear.com/api/bottts/:" + request.getEmail() + ".svg")
                .role("USER")
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return jwtToken;
    }

}
