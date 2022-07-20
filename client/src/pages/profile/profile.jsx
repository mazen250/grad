import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import UserQuestion from "./UserQuestion";
import "../../style/profile.css";
import profile from "../../images/profile.png";
function Profile() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userQuestions, setUserQuestions] = useState([]);
  const [badges, setBadges] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // account_idCheck();
    const getUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUser(user);
        // let userbadges = user.badge_counts;
        // console.log(getType(userbadges));
        // console.log(user);
        setLoading(false);
      } else {
        window.location.href = "/login";
      }

      if (user.account_id === "") {
        setUserId(user._id);
      } else {
        setUserId(user.account_id);
      }
    };
    getUser();
    console.log(user);

    const getUserQuestions = () => {
      let account_id = localStorage.getItem("user");
      account_id = JSON.parse(account_id).account_id;

      // console.log("account id  is ", account_id);
      if (account_id) {
        axios
          .get(`http://localhost:5000/question/userQuestions/${account_id}`)
          .then((res) => {
            setUserQuestions(res.data);
            // console.log(res.data);
          })
          .then(() => {
            setLoading(false);
          });
      }
    };
    getUserQuestions();

    //getUserQuestionsByUserId();
  }, []);

  //get type of variable in js
  const getType = (variable) => {
    return Object.prototype.toString.call(variable);
  };

  return (
    <div className="profileContainer">
      <Navbar />

      {loading ? (
        <h2>loading..</h2>
      ) : (
        <div className="profileUser">
          <div className="profile">
            {user.profile_image ? (
              <img
                src={user.profile_image}
                alt="user profile "
                width={"50px"}
              />
            ) : (
              <img src={profile} alt="profile" />
            )}
            <h1>Welcome Back {user.display_name}</h1>
          </div>
          {/* {user.account_id !== "" ? (
            <h2>account id : {user.account_id}</h2>
          ) : (
            <h2>user id : {user._id}</h2>
          )} */}
          <div className="userInfo">
            <h2 className="userSkills">user skills</h2>
            <div className="skills">
              {user.skills ? (
                user.skills.map((skill) => {
                  return <h4 key={skill}>{skill} </h4>;
                })
              ) : (
                <h4>no user skills yet</h4>
              )}
            </div>
          </div>
          <div className="userInfo">
            <h3 className="userPoint">current user points :{user.points}</h3>
          </div>
          <div className="userInfo">
            <h2 style={{ fontSize: "1.3rem" }}>badges</h2>
            <div className="list">
              {user.Gold >= 0 ? (
                <div className="badges">
                  <div className="singleBadge">
                    <h3>Gold : {user.Gold}</h3>
                  </div>
                  <div className="singleBadge">
                    <h3>Silver : {user.Silver} </h3>
                  </div>
                  <div className="singleBadge">
                    <h3>Bronze : {user.Bronze} </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>our badges</h3>
                  <h3>gold : {user.badge_counts.Gold} </h3>
                  <h3>silver : {user.badge_counts.Silver} </h3>
                  <h3>bronze : {user.badge_counts.Bronze}</h3>
                </div>
              )}
              {/* {typeof user.badge_counts === "object" ? (
                <div className="badges">
                  <h4>stackoverflow badges</h4>
                  <h4>gold : {user.badge_counts.gold}</h4>
                  <h4>silver : {user.badge_counts.silver}</h4>
                  <h4>bronze : {user.badge_counts.bronze}</h4>
                </div>
              ) : null} */}
              {/* {Array.isArray(user.badge_counts) ? (
                <div>
                  <h4>stackoverflow badges</h4>
                  <h4>gold : {user.badge_counts[0]}</h4>
                  <h4>silver : {user.badge_counts[1]}</h4>
                  <h4>bronze : {user.badge_counts[2]}</h4>
                </div>
              ) : null} */}

              {/* {typeof user.badge_counts === "string" ? (
                <div>
                  <h4>stackoverflow badges</h4>
                  <h4>user badges : {user.badge_counts}</h4>
                </div>
              ) : null} */}
            </div>
          </div>
          {/* <h3>age : {user.age}</h3>
          <h3>answer count = {user.answer_count}</h3> */}
          {userQuestions.length > 0 ? (
            userQuestions.map((question) => {
              return (
                <div key={question._id} className="questionContainer">
                  <h1>Title : {question.title}</h1>
                  <Link to={`/question/${question._id}`}>question details</Link>
                </div>
              );
            })
          ) : (
            <div className="askQuestion">
              <h2>no user questions</h2>
              <Link to={"/addQuestion"}>Ask now!</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
