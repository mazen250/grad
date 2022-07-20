import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../../style/login.css";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const Loginuser = () => {
    axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // alert(res.data);
        if (res.data === "user not found") {
          alert("user not found");
        } else if (res.data === "error") {
          alert("error");
        } else {
          // put user in local storage
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
          // redirect to feed
          window.location.href = "/feed";
        }
      });
  };
  useEffect(() => {
    const getUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        window.location.href = "/feed";
      }
    };
    getUser();
  }, []);
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="enter your email or display name"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="enter your password or account id"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            Loginuser();
          }}
        >
          Login
        </button>
        <h4>Don't have account yet?</h4>
        <Link to={"/register"}>Create account!</Link>
      </div>
    </div>
  );
}

export default Login;
