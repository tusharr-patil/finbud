package com.finbudbackend.finbudbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class UserInfo {
    private Long id;
    private String name;
    private HttpStatus httpStatus;
}
