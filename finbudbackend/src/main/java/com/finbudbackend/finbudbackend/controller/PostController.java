package com.finbudbackend.finbudbackend.controller;

import com.finbudbackend.finbudbackend.entity.Post;
import com.finbudbackend.finbudbackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    PostService postService;

    // core api
    @PostMapping(value = "createPost")
    public void addPost(@RequestBody Post post){
        log.info("in addPost controller");
        postService.addPost(post);
    }

    // core api
    @GetMapping(value = "getAllPost")
    @ResponseBody
    public List<Post> getAllPost(){
        return postService.getAllPost();
    }

    // for personal use
    @GetMapping(value = "deleteAllPosts")
    public void deleteAllPosts(){
        postService.deleteAllPosts();
    }

    // for personal use
    @GetMapping(value = "getPostById")
    public Post getPostById(Long postId){
        return postService.getPostById(postId);
    }

    // core api
    @GetMapping(value = "getUserPost/{userId}")
    @ResponseBody
    public List<Post> getUserPost(@PathVariable Long userId){
        return postService.getUserPost(userId);
    }

    // core api
    @GetMapping(value = "getSavedPost/{userId}")
    @ResponseBody
    public List<Post> getSavedPost(@PathVariable Long userId){
        return postService.getSavedPost(userId);
    }

    // core api
    @DeleteMapping(value = "deletePost/{postId}")
    public void deletePost(@PathVariable Long postId, Authentication authentication){
        postService.deletePost(postId, authentication);
    }
}
