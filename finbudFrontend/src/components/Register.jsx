import React, { useState, useContext} from 'react';
import RegisterApi from '../apis/RegisterApi';
import {useNavigate } from "react-router-dom";
import "../styles/styles.css";
import ToastContext from "../contexts/ToastContext";
import Cookies from 'js-cookie';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    showPassword: false
  });
  const snackBar = useContext(ToastContext);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function Register(name, email, password) {
    try {
      const data = await RegisterApi(name, email, password);
      console.log("data " , data);
      if (data === undefined) {
        console.log("problem while registering");
      } else {
        console.log("login successful");
        Cookies.set('jwtToken', data.token, { path: '/', sameSite: 'strict'});
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Login">
      <>
        <form className="form">
          <h2>Register</h2>
          <div className="input-container">
            <label className="label">Name </label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="input-container">
            <label className="label">Email </label>
            <input
              type="text"
              name="email"
              className="input"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div className="input-container">
            <label className="label">Password </label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            id="login-btn"
            onClick={(event) => {
              event.preventDefault();
              Register(name, email, password);
              setIsLoading(true);
            }}
          >
            Sign Up
          </button>
        </form>
      </>
    </div>
  );
}

export default Register;