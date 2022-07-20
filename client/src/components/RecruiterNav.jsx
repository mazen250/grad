import React from "react";
import { Link } from "react-router-dom";
import "../style/recruiterNav.css";
import Logo from "../images/logo.png";
function Navbar() {
  const logout = () => {
    localStorage.removeItem("recruiter");
    window.location.href = "/recruiterLogin";
  };
  return (
    <div className="navbarContainer">
      {" "}
      <div className="feedHeader">
        <div className="left">
          <Link to={"/feed"}>
            <img src={Logo} alt="logo" width={"120px"} />
          </Link>
        </div>
        {/* <Link to={"/addQuestion"}>add question</Link>
        <Link to={"/competition"}>weekly competition</Link>
        <Link to={"/profile"}>go to my profile</Link> */}
        <div className="right">
          <button
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
