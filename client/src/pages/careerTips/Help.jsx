import React from "react";
import Navbar from "../../components/Navbar";
import "../../style/help.css";
function Help() {
  return (
    <div className="helpContainer">
      <Navbar />
      <div className="helpTitle">
        <h1>Hi, we're here to help.</h1>
      </div>
      <div className="helpContent">
        <div className="emails">
          <input type="text" placeholder="Enter your name" />
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="subject">
          <input type="text" placeholder="Enter your subject" />
        </div>
        <div className="message">
          <textarea placeholder="Enter your message" rows={16} cols={50} />
        </div>
        <button>submit</button>
      </div>
    </div>
  );
}

export default Help;
