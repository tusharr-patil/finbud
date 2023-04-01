import React, { useState } from 'react';
import RegisterApi from '../apis/RegisterApi';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    RegisterApi(firstName, email, password)
  };

  function goToSignIn() {
    navigate("/")
  }

  return (
    <div>
      <h1>Register</h1>
      <form>
      <label htmlFor="firstName">FirstName:</label>
        <input type="text" id="firstName" value={firstName} onChange={handlerFirstNameChange} />

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