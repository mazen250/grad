import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../style/userCompetition.css";
import Navbar from "../../components/Navbar";
import profile from "../../images/profile.png";
function UserCompetition() {
  const [user, setUser] = useState({});
  const [competition, setCompetition] = useState([]);
  const [attended, setAttended] = useState(true);
  const [loading, setLoading] = useState(true);
  const [questionOneAnswer, setQuestionOneAnswer] = useState("");
  const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");
  const [questionThreeAnswer, setQuestionThreeAnswer] = useState("");
  const [questionFourAnswer, setQuestionFourAnswer] = useState("");
  const [showCompet, setShowCompet] = useState(false);
  const getCompetition = async () => {
    axios.get("http://localhost:5000/getCompetition").then((res) => {
      setCompetition(res.data[0]);
    });
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      window.location.href = "/login";
    }
  }, []);
  const showComp = () => {
    getCompetition();
    setLoading(!loading);
    if (competition.attendants) {
      console.log("attendance of comp : ", competition.attendants);
      console.log("user id : ", user._id);
      if (competition) {
        if (competition.attendants.includes(user.account_id)) {
          setAttended(true);
          alert("You have already attended this competition");
        } else {
          setAttended(false);
        }
      }
    }
  };
  const submit = () => {
    let grade = 0;
    if (questionOneAnswer === competition.answerOne) {
      grade += 1;
    }
    if (questionTwoAnswer === competition.answerTwo) {
      grade += 1;
    }
    if (questionThreeAnswer === competition.answerThree) {
      grade += 1;
    }
    if (questionFourAnswer === competition.answerFour) {
      grade += 1;
    }
    if (grade === 4) {
      grade = 20;
    } else if (grade === 3) {
      grade = 15;
    } else if (grade === 2) {
      grade = 10;
    } else {
      grade = 0;
    }
    alert("your grade is : " + grade);
    axios
      .post(`http://localhost:5000/user/grade`, {
        grade: grade,
        id: user.account_id,
        competitionId: competition._id,
        attendants: competition.attendants,
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        competition.attendants.push(user._id);
      })
      .then(() => {
        //remove user from local storage and put in the same user with new grade
        axios.get(`http://localhost:5000/user/${user._id}`).then((res) => {
          let user = res.data;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(user));
          alert("you have successfully attended the competition");
          window.location.href = "/feed";
        });
      });
  };
  return (
    <div className="compContainer">
      <Navbar />
      <div className="userrr">
        <h3>welcome back {user.display_name}</h3>
        <h3>account id : {user.account_id}</h3>
        {user.profile_image ? (
          <img src={user.profile_image} alt="user profile " width={"50px"} />
        ) : (
          <img src={profile} alt="profile" />
        )}
      </div>
      <button
        onClick={() => {
          showComp();
          setShowCompet(!showCompet);
        }}
      >
        {showCompet ? "hide competition" : "show competition"}
      </button>
      {/* {loading ? <div></div> : <div>{competition.title}</div>} */}
      {!attended && showCompet ? (
        <div>
          {competition.status === "available" ? (
            <div className="comp">
              <div className="compTitle">
                <h3>title : {competition.title}</h3>
                <p>description : {competition.description}</p>
              </div>

              <div className="singleQ">
                <h3>question one : {competition.questionOne}</h3>
                {competition.questionOneOptions.map((option, index) => {
                  return (
                    <h4 key={index}>
                      option {index + 1}: {option}
                    </h4>
                  );
                })}
                <input
                  type="text"
                  placeholder="please enter your answer for question one in small letters"
                  onChange={(e) => {
                    setQuestionOneAnswer(e.target.value);
                  }}
                />
              </div>

              <div className="singleQ">
                <h3>question two : {competition.questionTwo}</h3>
                {competition.questionTwoOptions.map((option, index) => {
                  return (
                    <h4 key={index}>
                      option {index + 1}: {option}
                    </h4>
                  );
                })}
                <input
                  type="text"
                  placeholder="please enter your answer for question two in small letters"
                  onChange={(e) => {
                    setQuestionTwoAnswer(e.target.value);
                  }}
                />
              </div>

              <div className="singleQ">
                <h3>question three : {competition.questionThree}</h3>
                {competition.questionThreeOptions.map((option, index) => {
                  return (
                    <h4 key={index}>
                      option {index + 1}: {option}
                    </h4>
                  );
                })}
                <input
                  type="text"
                  placeholder="please enter your answer for question three in small letters"
                  onChange={(e) => {
                    setQuestionThreeAnswer(e.target.value);
                  }}
                />
              </div>
              <div className="singleQ">
                <h3>question four : {competition.questionFour}</h3>
                {competition.questionFourOptions.map((option, index) => {
                  return (
                    <h4 key={index}>
                      option {index + 1}: {option}
                    </h4>
                  );
                })}
                <input
                  type="text"
                  placeholder="please enter your answer for question four in small letters"
                  onChange={(e) => {
                    setQuestionFourAnswer(e.target.value);
                  }}
                />
              </div>

              <button
                onClick={() => {
                  submit();
                }}
                className="submit"
              >
                submit
              </button>
              <hr />
            </div>
          ) : (
            <h3>competition is not available</h3>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserCompetition;
