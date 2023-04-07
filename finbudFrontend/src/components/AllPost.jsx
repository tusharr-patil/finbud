import React, { useDebugValue } from "react";
import { useEffect, useState} from "react";
import GetAllPostApi from "../apis/GetAllPostApi";
import SignOutApi from '../apis/SignOutApi';
import { useNavigate } from "react-router-dom";
import PostBlock from "./PostBlock";
import { GetUserIdApi } from "../apis/GetUserIdApi";
import UserDetailsApi from "../apis/UserDetailsApi";

export default function AllPost() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    async function fetchAllPost() {
        console.log("agaya fetch all post me")
        const fetchedPosts = await GetAllPostApi();
        console.log("post length " + posts.length);
        const userId = await GetUserIdApi(); 
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

    function handleSignOut() {
        SignOutApi()
            .then(navigate("/"))
    }

    useEffect(() => {
        fetchAllPost();
    }, [])

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
            {/* <button onClick={SetUserDetails}>Get User Details</button> */}
            <br />
            total posts: {posts.length}
            {posts?.map((post) => {
                console.log(post);
                return <PostBlock key={post?.postId} post={post}/>;
            })}
            <br />
            
        </div>
    )
}
