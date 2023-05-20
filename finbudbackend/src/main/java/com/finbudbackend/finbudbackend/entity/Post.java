package com.finbudbackend.finbudbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue
    private Long postId;

    // foreign key - check if the user is valid or not..
    private Long userId;

    private String projectName;

    private String workingOn;

    private String requirements;

    private String expertise;

    private String benefits;

    private Long timeSincePostAdded = System.currentTimeMillis();

    private String timeSince = "";

    private Set<Long> postSavedByUsers = new HashSet<>();

    private Boolean isSaved = false;

//    Project Name
//    Working on
//    Requirements
//    Experience
//    Benefits
}
