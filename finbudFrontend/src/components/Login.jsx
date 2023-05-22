import React, { useState, useContext} from 'react';
import LoginApi from '../apis/LoginApi';
import '../styles/styles.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ToastContext from "../contexts/ToastContext";

function Login() {
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

  async function Login(email, password) {
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
  }

  return (
    <div className="Login">
      <>
        <form className="form">
          <h2>Welcome</h2>
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
            {/* <a href="/forgetpassword" className="link forgotten-password">
              Forgot Password?
            </a> */}
          </div>
          <button
            type="submit"
            id="login-btn"
            onClick={(event) => {
              event.preventDefault();
              Login(email, password);
              setIsLoading(true);
            }}
          >
            Login
          </button>
          <span className="divider">
            <hr className="hr-line" />
            &nbsp; or &nbsp;
            <hr className="hr-line" />
          </span>
          <span>
            Don't have an account? <a href="/register">Sign Up</a>
          </span>
        </form>
      </>
    </div>
  );
}
export default Login;
