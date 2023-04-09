package com.finbudbackend.finbudbackend.controller;

import com.finbudbackend.finbudbackend.entity.User;
import com.finbudbackend.finbudbackend.service.AuthenticationService;
import com.finbudbackend.finbudbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // core but not very useful
    @GetMapping(path = "userDetails/{id}")
    @ResponseBody
    public User getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    // for personal use
    @GetMapping(value = "getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping(value = "deleteUser/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    // core api
    @GetMapping(value = "getUserByName/{email}")
    public User getUserByEmail(@PathVariable String email){
        log.info("in controller in getUserByEmail");
        return userService.getUserByEmail(email);
    }

    // core api
    @PutMapping(value = "updateUser")
    public void updateUser(@RequestBody User user, Authentication authentication){
        userService.updateUser(user, authentication);
    }

    // for personal use
    // @DeleteMapping(value = "deleteUsers")
    // public void deleteAllUsers(){
    //     userService.deleteAllUsers();
    // }

    // core api
    @PutMapping(value = "saveUnSavePostId/{postId}")
    public void saveUnSavePostId(@PathVariable Long postId, Authentication authentication){
        userService.addSavedPostId(authentication, postId);
    }
}
