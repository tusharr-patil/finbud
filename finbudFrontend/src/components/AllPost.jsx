import React, { useDebugValue } from "react";
import { useEffect, useState} from "react";
import GetAllPostApi from "../apis/GetAllPostApi";
import SignOutApi from '../apis/SignOutApi';
import { useNavigate } from "react-router-dom";
import PostBlock from "./PostBlock";
import { GetUserIdApi } from "../apis/GetUserIdApi";
import UserDetailsApi from "../apis/UserDetailsApi";
import GetMyPost from "../apis/GetMyPost.js";
import GetSavedPost from "../apis/GetSavedPost.js";
import { Tabs, Tab, Box } from "@mui/material";

export default function AllPost() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [currUserId, setCurrUserId] = useState(-1);
    const [value, setValue] = useState("one");
    
    const handleChange = (event, newValue) => {
     setValue(newValue);
    };

    async function fetchAllPost() {
        const fetchedPosts = await GetAllPostApi();
        const userId = await GetUserIdApi();
        setCurrUserId(userId);
        const userDetails = await UserDetailsApi(userId);
        const savedPostArray = userDetails.savedPost == null ? [] : userDetails.savedPost;
        
        fetchedPosts.map(post => {
          if(savedPostArray.includes(post.postId)) {
            post.isSaved = true;
          } else {
            post.isSaved = false;
          }
        });
        setPosts(fetchedPosts);
    }

    async function fetchMyPost() {
      const fetchMyPost = await GetMyPost(currUserId);
      const userDetails = await UserDetailsApi(currUserId);
      const savedPostArray = userDetails.savedPost == null ? [] : userDetails.savedPost;
      fetchMyPost.map(post => {
        if(savedPostArray.includes(post.postId)) {
          post.isSaved = true;
        } else {
          post.isSaved = false;
        }
      })
      setPosts(fetchMyPost);
    }

    async function fetchSavedPost() {
      const fetchSavedPost = await GetSavedPost(currUserId);
      fetchSavedPost.map(post => {
        post.isSaved = true;
      })
      setPosts(fetchSavedPost);
    }

    useEffect(() => {
        console.log('getting all post');
        fetchAllPost();
    }, [])

    return (
        <div style = {{marginTop: "2%"}}>
            <Box style={{ width: "100%" }}>
              <Tabs value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered>
                <Tab 
                  value="one"
                  label="Feeds"
                  style={{ color: "#000000" }}
                  onClick={fetchAllPost}
                />
                <Tab 
                  value="two"
                  label="My Posts"
                  style={{ color: "#000000" }}
                  onClick={fetchMyPost}
                />
                <Tab 
                  value="three"
                  label="Saved Posts"
                  style={{ color: "#000000" }}
                  onClick={fetchSavedPost}
                />
              </Tabs>

            </Box>

            {posts?.map((post) => {
                return <PostBlock key={post?.postId} post={post}/>;
            })}
            <br />
            
        </div>
    )
}
