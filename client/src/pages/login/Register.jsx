import React from "react";
import { useState } from "react";
import axios from "axios";
import "../../style/login.css";
import { Link } from "react-router-dom";
function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [user, setUser] = useState({});

  const register = () => {
    if (username === "" || password === "" || email === "") {
      alert("Please fill all the fields");
    } else {
      axios
        .post("http://localhost:5000/user/register", {
          username: username,
          password: password,
          email: email,
          nationality: nationality,
          skills: skills,
        })
        .then((res) => {
          alert("user added");
          console.log(res.data);
          setUser(res.data);
        })
        .then(() => {
          window.location.href = "/login";
        });
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>register</h1>

        <input
          type="text"
          placeholder="enter your name "
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter email "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter nationality"
          onChange={(e) => {
            setNationality(e.target.value);
          }}
        />
        <h3>want to add skills?</h3>
        <input
          type="text"
          placeholder="enter skills"
          onChange={(e) => {
            setSkill(e.target.value);
          }}
        />
        <button
          onClick={() => {
            skills.push(skill);
            console.log(skills);
            setSkills(skills);
          }}
        >
          add skill
        </button>
        <h3>current skills is : </h3>
        {skills.map((skil) => {
          return (
            <div key={skil}>
              <h4>{skil}</h4>
            </div>
          );
        })}
        <button onClick={register}>register</button>
        <h4>Already have account?</h4>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Register;
