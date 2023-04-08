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
        console.log("agaya fetch all post me")
        const fetchedPosts = await GetAllPostApi();
        console.log("post length " + posts.length);
        const userId = await GetUserIdApi();
        setCurrUserId(userId);
        const userDetails = await UserDetailsApi(userId);
        console.log(userDetails.savedPost);
        const savedPostArray = userDetails.savedPost;
        
        console.log("user Details Api all post me" + savedPostArray);
        console.log("fetch Post Ids Api all post me" + fetchedPosts);
        fetchedPosts.map(post => {
          console.log(post.postId);
          if(savedPostArray.includes(post.postId)) {
            post.isSaved = true;
          } else {
            post.isSaved = false;
          }
        });
        setPosts(fetchedPosts);
    }

    async function fetchMyPost() {
      console.log("in fetch my post");
      const fetchMyPost = await GetMyPost(currUserId);
      console.log(fetchMyPost);
      setPosts(fetchMyPost);
    }

    async function fetchSavedPost() {
      const fetchSavedPost = await GetSavedPost(currUserId);
      setPosts(fetchSavedPost);
    }

    function handleSignOut() {
        SignOutApi()
            .then(navigate("/"))
    }

    useEffect(() => {
        fetchAllPost();
    }, [])

    return (
        <div style = {{marginTop: "10px"}}>
            <button onClick={handleSignOut}>Sign Out</button>
            <br />
            total posts: {posts.length}

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
                console.log(post);
                return <PostBlock key={post?.postId} post={post}/>;
            })}
            <br />
            
        </div>
    )
}
