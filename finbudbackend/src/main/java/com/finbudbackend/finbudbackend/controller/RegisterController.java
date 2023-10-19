package com.finbudbackend.finbudbackend.controller;

import com.finbudbackend.finbudbackend.entity.User;
import com.finbudbackend.finbudbackend.model.AuthenticationRequest;
import com.finbudbackend.finbudbackend.model.AuthenticationResponse;
import com.finbudbackend.finbudbackend.model.RegisterRequest;
import com.finbudbackend.finbudbackend.model.UserInfo;
import com.finbudbackend.finbudbackend.repository.UserRepository;
import com.finbudbackend.finbudbackend.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@AllArgsConstructor
@RestController
@Slf4j
public class RegisterController {
    @Autowired
    UserRepository userRepository;

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity register(
            @RequestBody RegisterRequest request
    ) {
        try {
            if(request.getEmail() == null || request.getName() == null || request.getPassword() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            service.register(request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            AuthenticationResponse response = new AuthenticationResponse();
            response.setHttpStatus(HttpStatus.BAD_GATEWAY);
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/confirm")
    public String confirmToken(@RequestParam("token") String token) {
        return service.confirmToken(token);
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
    public ResponseEntity<UserInfo> getUserDetails(Authentication authentication) {
        Optional<User> user = userRepository.findByEmail(authentication.getName());
        if(!user.isPresent()){
            UserInfo response = new UserInfo();
            response.setHttpStatus(HttpStatus.BAD_GATEWAY);
            return ResponseEntity.ok(response);
        }
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.get().getId());
        userInfo.setName(user.get().getName());
        userInfo.setHttpStatus(HttpStatus.OK);
        return ResponseEntity.ok(userInfo);
    }

}
