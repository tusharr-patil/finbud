import React, { useState } from 'react';
import LoginApi from '../apis/LoginApi';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      const data = await LoginApi(email, password);
      if (data.httpStatus === "BAD_GATEWAY") {
        console.log("problem while logging in");
      } else {
        console.log("login successful");
        Cookies.set('jwtToken', data.token, { path: '/', sameSite: 'strict'});
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function goToRegister() {
    navigate("/register")
  }
  

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />

        <button type="button" onClick={handleSignIn}>Sign In</button>
        <br />
        <button type="button" onClick={goToRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
