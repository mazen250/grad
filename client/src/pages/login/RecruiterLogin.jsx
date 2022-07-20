import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../style/recruiterLogin.css";
import "../../style/login.css";
import { Link } from "react-router-dom";
function RecruiterLogin() {
  const [recruiterName, setRecruiterName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:5000/recruiter/login", {
        recruiterName: recruiterName,
        password: password,
      })
      .then((res) => {
        if (res.data.length > 0) {
          alert("Login Successful");
          console.log(res.data);
          localStorage.setItem("recruiter", JSON.stringify(res.data));
          window.location.href = "/recruiterHome";
        } else {
          alert("Login Failed");
        }
      });
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>Recruiter Login page</h1>
        <input
          type="text"
          placeholder="enter your name"
          onChange={(e) => {
            setRecruiterName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            login();
          }}
        >
          login
        </button>
        <h4>create account now and find the best candidate!</h4>
        <Link to={"/recruiterRegister"}>create account</Link>
      </div>
    </div>
  );
}

export default RecruiterLogin;
