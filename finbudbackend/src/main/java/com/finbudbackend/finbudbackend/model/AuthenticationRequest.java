package com.finbudbackend.finbudbackend.model;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String email;
    private String password;
}

