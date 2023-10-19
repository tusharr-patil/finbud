package com.finbudbackend.finbudbackend.service;

import com.finbudbackend.finbudbackend.entity.Post;
import com.finbudbackend.finbudbackend.entity.User;
import com.finbudbackend.finbudbackend.repository.PostRepository;
import com.finbudbackend.finbudbackend.repository.UserRepository;
import com.finbudbackend.finbudbackend.util.TimeSince;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.Collections;

@Slf4j
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private TimeSince timeSince = new TimeSince();

    public void addPost(Post post){
        postRepository.save(post);
        log.info("post saved successfully!!");
    }

    public List<Post> getAllPost() {
        List<Post> postList = postRepository.findAllByOrderByTimeSincePostAddedDesc();
        if(postList == null) return new ArrayList<>();
        for(Post post : postList){
            post.setTimeSince(timeSince.timeSince(post.getTimeSincePostAdded()));
        }
        return postList;
    }

    public void deletePost(Long postId, Authentication authentication){
        Optional<User> userOptional = userRepository.findByEmail(authentication.getName());
        if(!userOptional.isPresent()){
            return;
        }
        Post post = getPostById(postId);
        if(post == null || post.getUserId() != userOptional.get().getId()){
            System.out.println(post.getUserId());
            System.out.println(userOptional.get().getId());
            return;
        }
        Set<Long> usersWhoSavedPost = post.getPostSavedByUsers();
        for(Long userId : usersWhoSavedPost){
            userService.removeDeletedPostId(postId, userId);
        }
        postRepository.deleteById(postId);
    }

    public Post getPostById(Long postId) {
        Post post = postRepository.findById(postId).get();
        post.setTimeSince(timeSince.timeSince(post.getTimeSincePostAdded()));
        return post;
    }

    public List<Post> getUserPost(Long userId) {
        List<Post> postList = postRepository.findAllByUserId(userId);
        if(postList == null) return new ArrayList<>();
        for(Post post : postList){
            post.setTimeSince(timeSince.timeSince(post.getTimeSincePostAdded()));
        }
        Collections.reverse(postList);
        return postList;
    }

    public List<Post> getSavedPost(Long userId) {
        Set<Long> postIds = userService.getSavedPosts(userId);
        if(postIds == null) return new ArrayList<>();
        List<Long> postIdsList = new ArrayList<>(postIds);
        int n = postIds.size();
        List<Post> postList = new ArrayList<>();
        for(int i = n-1; i >= 0; i--){
            Post currPost = postRepository.findById(postIdsList.get(i)).get();
            currPost.setTimeSince(timeSince.timeSince(currPost.getTimeSincePostAdded()));
            postList.add(currPost);
        }
        return postList;
    }

}
