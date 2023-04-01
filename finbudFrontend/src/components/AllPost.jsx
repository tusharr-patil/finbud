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
        setPosts(fetchedPosts);
        console.log("post length " + posts.length);
        
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