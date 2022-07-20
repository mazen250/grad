import React, { useState } from "react";
import axios from "axios";
import "../../style/login.css";
function AdminLigin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    if (name === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      axios
        .post("http://localhost:5000/admin/adminLogin", {
          name: name,
          password: password,
        })
        .then((res) => {
          if (res.data.name) {
            alert("Login Successful");
            console.log(res.data);
            localStorage.setItem("admin", JSON.stringify(res.data));
            window.location.href = "/AdminHome";
          } else {
            alert("Login Failed");
          }
        })
        .catch((err) => {
          alert("Login Failed");
        });
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>Admin</h1>
        <input
          type="text"
          placeholder="enter your name "
          onChange={(e) => {
            setName(e.target.value);
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
      </div>
    </div>
  );
}

export default AdminLigin;
