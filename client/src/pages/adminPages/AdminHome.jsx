import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/adminHome.css";
function AdminHome() {
  const [admin, setAdmin] = useState([]);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [showNewAdmin, setShowNewAdmin] = useState(false);
  useEffect(() => {
    let admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      setAdmin(admin);
      console.log(admin);
    }
    if (!admin) {
      window.location.href = "/AdminLogin";
    }
    if (admin.role !== "admin") {
      window.location.href = "/AdminLogin";
    }
  }, []);

  const addAdmin = () => {
    alert(newAdminName);

    if (admin.role !== "admin") {
      window.location.href = "/AdminLogin";
    } else {
      axios
        .post("http://localhost:5000/admin/addAdmin", {
          name: newAdminName,
          password: newAdminPassword,
          role: "admin",
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
          } else {
          }
        });
    }
  };
  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/AdminLogin";
  };

  return (
    <div className="feedContainertest">
      <h1>Admin Home Page</h1>
      <div className="test">
        <button
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
        <h2>welcome {admin.name}</h2>
        <button
          onClick={() => {
            setShowNewAdmin(!showNewAdmin);
          }}
        >
          {showNewAdmin ? "hide" : "add admin"}
        </button>
        {showNewAdmin ? (
          <div className="addAdmin">
            <input
              type="text"
              placeholder="enter new admin username"
              onChange={(e) => {
                setNewAdminName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="enter new admin password"
              onChange={(e) => {
                setNewAdminPassword(e.target.value);
              }}
            />
            <button
              onClick={() => {
                addAdmin();
              }}
            >
              submit
            </button>
          </div>
        ) : null}
        <br />
        <Link to={"/addCompetition"}>add Competition</Link>
      </div>
    </div>
  );
}

export default AdminHome;
