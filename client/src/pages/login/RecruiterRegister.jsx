import axios from "axios";
import React, { useState } from "react";
import "../../style/recruiterLogin.css";
import { Link } from "react-router-dom";
function RecruiterRegister() {
  const [recruiterName, setRecruiterName] = useState("");
  const [password, setPassword] = useState("");
  const [CompanyName, setCompanyName] = useState("");

  const register = () => {
    alert(
      "name : " +
        recruiterName +
        " password : " +
        password +
        " companyName : " +
        CompanyName
    );
    axios
      .post("http://localhost:5000/recruiter/register", {
        recruiterName: recruiterName,
        password: password,
        CompanyName: CompanyName,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>Recruiter Register page</h1>
        <input
          type="text"
          placeholder="enter your company name"
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter yor name "
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
            register();
          }}
        >
          register
        </button>
        <h4>aleardy have an account?</h4>
        <Link to={"/recruiterLogin"}>Login</Link>
      </div>
    </div>
  );
}

export default RecruiterRegister;
