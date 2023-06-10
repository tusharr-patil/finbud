package com.finbudbackend.finbudbackend.service;

import com.finbudbackend.finbudbackend.entity.Post;
import com.finbudbackend.finbudbackend.entity.User;
import com.finbudbackend.finbudbackend.repository.PostRepository;
import com.finbudbackend.finbudbackend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public User getUser(Long id){
        return userRepository.findById(id).get();
    }

    public void addUser(User user){
        userRepository.save(user);
        log.info("user added successfully");
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public void updateUser(User user, Authentication authentication) {
        Optional<User> userOptional = userRepository.findByEmail(authentication.getName());
        if(!userOptional.isPresent()){
          log.info("user not found!");
          return;
        }
        User currUser = userOptional.get();
        currUser.setName(user.getName());
        currUser.setLinkedIn(user.getLinkedIn());
        currUser.setAbout(user.getAbout());
        currUser.setGithub(user.getGithub());
        currUser.setCollege(user.getCollege());
        currUser.setSkills(user.getSkills());
        currUser.setTwitter(user.getTwitter());
        currUser.setWebsite(user.getWebsite());
        userRepository.save(currUser);
        log.info("user details updated successfully");
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    public Set<Long> getSavedPosts(Long userId) {
        User user = getUser(userId);
        if(user != null) return user.getSavedPost();
        return null;
    }

    public String addSavedPostId(Authentication authentication, Long postId) {
        Optional<User> userOptional = userRepository.findByEmail(authentication.getName());
        if(!userOptional.isPresent()){
            return "user not found";
        }
        User user = userOptional.get();
        Long uid = user.getId();
        Set<Long> postIds = user.getSavedPost();
        if(postIds == null) {
            postIds = new LinkedHashSet<>();
        }
        Post post = postRepository.findById(postId).get();
        Set<Long> postSavedByUsers = post.getPostSavedByUsers();
        boolean save = false;
        if(postIds.contains(postId)){
            postIds.remove(postId);
            postSavedByUsers.remove(uid);
        }
        else {
            save = true;
            postIds.add(postId);
            postSavedByUsers.add(uid);
        }

        
        user.setSavedPost(postIds);
        userRepository.save(user);

        post.setPostSavedByUsers(postSavedByUsers);
        postRepository.save(post);
        return "successfully " + (save ? "saved" : "unsaved") + " post";
    }

    public void removeDeletedPostId(Long postId, Long userId) {
        User user = getUser(userId);
        Set<Long> savedPostIds = user.getSavedPost();
        savedPostIds.remove(postId);
        userRepository.save(user);
    }

//    public void addUserPostId(Long userId, Long postId) {
//        User user = getUser(userId);
//        Set<Long> userPost = user.getMyPost();
//        if(userPost.contains(postId)){
//            userPost.remove(postId);
//        }
//        else {
//            userPost.add(postId);
//        }
//        user.setMyPost(userPost);
//        userRepository.save(user);
//    }

    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

}
