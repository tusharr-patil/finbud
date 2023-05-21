import React, { useState } from 'react';
import RegisterApi from '../apis/RegisterApi';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    RegisterApi(name, email, password)
  };

  function goToSignIn() {
    navigate("/")
  }

  return (
    <div>
      <h1>Register</h1>
      <form>
      <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handlerNameChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />

        <button type="button" onClick={handleSignIn}>Sign Up</button>
        <br />
        <button type="button" onClick={goToSignIn}>Sign In</button>
      </form>
    </div>
  );
};

export default Register;