import React, { useState, useEffect } from 'react';
import SignOutApi from '../apis/SignOutApi';
import { useNavigate } from "react-router-dom";
import { UserDetailsApi } from '../apis/UserDetailsApi';
import "../styles/styles.css";

function HelloWorld() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      UserDetailsApi()
        .then(data => setData(data.id));
    }, []);

    function handleSignOut() {
        SignOutApi()
            .then(navigate("/"))
    }

    return (
        <div>
            <p>yoooooooooooooo got it</p>
            <button onClick={handleSignOut}>Sign Out</button>

        </div>
    )
}

export default HelloWorld;