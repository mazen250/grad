import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../style/profile.css";
import profile from "../../images/profile.png";
import axios from "axios";
function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [question, setQuestion] = useState([]);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    console.log("account id", id);
    if (id) {
      console.log("goowa el function b id ", id);
      axios.get(`http://localhost:5000/user/singleUser/${id}`).then((res) => {
        console.log("first attemp account id ");
        //console.log(res.data);
        if (res.data === "error") {
          // console.log("database account id");
          // console.log(res.data);
          // setUser(res.data[0]);
          console.log("errororroroo");
        } else if (res.data !== "error") {
          if (res.data.length > 0) {
            console.log("database account id");
            console.log(res.data[0]);
            setUser(res.data[0]);
          } else {
            axios
              .get(
                `https://api.stackexchange.com/2.3/users/${id}?order=desc&sort=reputation&site=stackoverflow`
              )
              .then((res) => {
                if (res.data.items.length > 0) {
                  console.log("online");
                  console.log(res.data);
                  setUser(res.data.items[0]);
                  console.log("gbtha onlline");
                  console.log(user);
                  setOnline(true);
                  // if (user.badge_counts) {
                  //   console.log(user.badge_counts);
                  //   console.log(user.badge_counts.gold);
                  // }
                } else {
                  console.log("no user");
                }
              });
          }
        } else {
          console.log("no user");
        }
      });
    }
  }, []);
  const getQuestion = async () => {
    if (user.account_id) {
      try {
        axios
          .get(
            `http://localhost:5000/question/userQuestions/${user.account_id}`
          )
          .then((res) => {
            if (res.data.length > 0) {
              setQuestion(res.data);
              console.log(res.data);
            } else {
              console.log(res.data);
            }
          });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="profileContainer">
      <Navbar />
      {user ? (
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
            <h1> {user.display_name}</h1>
          </div>
          {user.skills ? (
            <div>
              {user.skills.map((skill) => {
                return <h4 key={skill}>{skill}</h4>;
              })}
            </div>
          ) : (
            <h3>no user skills available</h3>
          )}

          <h2>badges</h2>
          <div className="list">
            {user.Gold ? (
              <div className="badges">
                <div className="singleBadge">
                  <h3>our badges</h3>
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
                <h3>no available user data in out database</h3>

                {user.link ? (
                  <a href={user.link} target="blank" style={{ color: "white" }}>
                    Show User Profile on stackoverflow
                  </a>
                ) : null}
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
          {/* {user.Gold ? (
            <div>
              <h3>gold : {user.Gold}</h3>
              <h3>silver : {user.Silver}</h3>
              <h3>bronze : {user.Bronze}</h3>
            </div>
          ) : (
            <div></div>
          )}
          {online ? (
            <div>
              <h3>gold : {user.badge_counts.gold}</h3>
              <h3>silver : {user.badge_counts.silver}</h3>
              <h3>bronze : {user.badge_counts.bronze}</h3>
            </div>
          ) : null} */}
        </div>
      ) : (
        <h1>no user</h1>
      )}
      <div className="btns">
        <button
          onClick={() => {
            window.location.href = `/feed`;
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            getQuestion();
          }}
        >
          show questions
        </button>
      </div>
      {question ? (
        <div>
          {question.map((question) => {
            return (
              <div key={question.question_id}>
                <h3>{question.title}</h3>
                <Link to={`/question/${question._id}`}>question details</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>no questions</h3>
      )}
    </div>
  );
}

export default UserProfile;
