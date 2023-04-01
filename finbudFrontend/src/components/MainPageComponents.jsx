import React from "react";
import AllPost from "./AllPost";
import CreatePost from "./CreatePost";
import Navbar from "./Navbar";

export default function MainPageComponents() {
    return (
        <div>
            <Navbar />
            <CreatePost />
            <br />
            <br />
            <br />
            <AllPost />
        </div>
    )
}