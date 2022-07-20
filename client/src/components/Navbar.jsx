import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css";
import Notification from "../images/notification.png";
import Help from "../images/help.png";
import CareerTips from "../images/career.png";
import Logo from "../images/logo.png";
function Navbar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className="navbarContainer">
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
          <div className="link">
            <Link to={"/userNotification"}>
              <img src={Notification} alt="notification" width={"24px"} />
            </Link>
            <p>Notification</p>
          </div>
          <div className="link">
            <Link to={"/help"}>
              <img src={Help} alt="help" width={"22px"} />
            </Link>
            <p>Help</p>
          </div>
          <div className="link">
            <Link to={"/careerTips"}>
              <img src={CareerTips} alt="careerTips" width={"15px"} />
            </Link>
            <p>Career Tips</p>
          </div>
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
