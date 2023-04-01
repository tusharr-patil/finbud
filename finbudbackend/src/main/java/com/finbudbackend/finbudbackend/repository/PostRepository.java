package com.finbudbackend.finbudbackend.repository;

import com.finbudbackend.finbudbackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByOrderByTimeSincePostAddedDesc();

    List<Post> findAllByUserId(Long userId);
}
