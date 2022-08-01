import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/question.css";
import Navbar from "../components/Navbar";
function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [answerAccount_id, setAnswerAccountId] = useState("");
  const [user_id, setUserId] = useState("");
  const [question_id, setQuestionId] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [answerUser, setAnswerUser] = useState([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const getQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/question/singlequestion/${id}`
      );
      setQuestion(res.data);
      //   console.log(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
    // alert(question.account_id);
  };
  const getUser = () => {
    console.log(question.account_id);
    if (question.account_id) {
      axios
        .get(`http://localhost:5000/user/singleUser/${question.account_id}`)
        .then((res) => {
          console.log(res.data);
          console.log("database");
          if (res.data.length > 0) {
            console.log("awel mohawla");
            setUser(res.data[0]);
            setOwnerId(res.data[0]._id);
            console.log(user);
            setShow(true);
          } else {
            axios
              .get(
                `https://api.stackexchange.com/2.3/users/${question.user_id}?order=desc&sort=reputation&site=stackoverflow`
              )
              .then((res) => {
                console.log("online");
                console.log(res.data);
                setUser(res.data.items[0]);
                console.log("gbtha onlline");
                console.log(user);
                if (user.badge_counts) {
                  setShow(true);
                  console.log(user.badge_counts);
                  console.log(user.badge_counts.gold);
                }
              });
          }
        });
    }
  };
  useEffect(() => {
    const us = JSON.parse(localStorage.getItem("user"));
    if (us) {
      setUserId(us.user_id);
      setAnswerAccountId(us.account_id);
      setQuestionId(id);
      console.log(typeof question_id);
    }

    getQuestion();
    // getAnswers();
  }, []);
  const like = () => {
    axios.post(`http://localhost:5000/question/addScore/${id}`).then((res) => {
      console.log(res.data);
      // getQuestion();
      let user = res.data;
      axios.get(`http://localhost:5000/user/${user._id}`).then((res) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
        alert("like is added");
        window.location.href = "/feed";
      });
      getQuestion();
    });
  };

  const addAnswer = () => {
    console.log("question id is ", question_id);
    console.log("answer is ", title);
    console.log("account id is ", answerAccount_id);
    console.log("user id is ", user_id);
    axios.get();
    if (title !== "") {
      if (ownerId) {
        axios
          .get(`http://localhost:5000/user/singleUser/${question.account_id}`)
          .then((res) => {
            setOwnerId(res.data[0]._id);
          })
          .then(() => {
            axios
              .post("http://localhost:5000/addanswer", {
                question_id: question_id,
                title: title,
                account_id: answerAccount_id,
                user_id: user_id,
                questionOwner: ownerId,
              })
              .then((res) => {
                console.log(res.data);
                getAnswers();
              });
          });
      } else {
        if (ownerId) {
          axios
            .get(`http://localhost:5000/user/singleUser/${question.account_id}`)
            .then((res) => {
              setOwnerId(res.data[0]._id);
            })
            .then(() => {
              axios
                .post("http://localhost:5000/addanswer", {
                  question_id: question_id,
                  title: title,
                  account_id: answerAccount_id,
                  user_id: user_id,
                  questionOwner: ownerId,
                })
                .then((res) => {
                  console.log(res.data);
                  getAnswers();
                });
            });
        } else {
          alert("kindly press on get user info button first");
        }
      }
    } else {
      alert("please write an answer");
    }
  };
  const getAnswers = async () => {
    axios.get(`http://localhost:5000/getanswers/${question_id}`).then((res) => {
      console.log(res.data[0]);
      if (res.data[0]) {
        setAllAnswers(res.data);
      } else {
        setAllAnswers([]);
      }
    });
  };

  const getAnswerUser = async (id) => {
    if (id !== "") {
      axios
        .get(`http://localhost:5000/user/singleUser/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setAnswerUser(res.data[0]);
          } else {
            axios
              .get(
                `https://api.stackexchange.com/2.3/users/${id}?order=desc&sort=reputation&site=stackoverflow`
              )
              .then((res) => {
                console.log("online");
                console.log(res.data);
                setAnswerUser(res.data.items[0]);
                console.log("gbtha onlline");
                console.log(user);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const likeAns = (id, ownerId) => {
    axios
      .post(`http://localhost:5000/addScore/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        axios
          .post(`http://localhost:5000/user/addpoint/${ownerId}`, {
            question_id: question_id,
          })
          .then((res) => {
            console.log(res.data);
            getAnswers();
          });
      });
  };

  const dislikeAns = (id) => {
    axios.post(`http://localhost:5000/answer/dislike/${id}`).then((res) => {
      console.log(res.data);
      getAnswers();
    });
  };

  const editAnswer = (id, ownerid) => {
    if (editedTitle !== "") {
      if (answerAccount_id === ownerid) {
        axios
          .post(`http://localhost:5000/answer/edit/${id}`, {
            title: editedTitle,
          })
          .then((res) => {
            console.log(res.data);
            getAnswers();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("you are not the owner of this answer");
      }
    }
  };

  const deleteAnswer = (ansid, ownerid) => {
    // axios.post(`http://localhost:5000/answer/delete/${id}`).then((res) => {
    //   console.log(res.data);
    //   getAnswers();
    // });
    console.log(answerAccount_id);
    if (answerAccount_id === ownerid) {
      axios.post(`http://localhost:5000/answer/delete/${ansid}`).then((res) => {
        console.log(res.data);
        getAnswers();
      });
    } else {
      alert("you can't delete this answer");
    }
  };

  return (
    <div className="QestionContainer">
      <Navbar />
      {/* <h1 className="titleheader">question page</h1> */}
      {/* <h1>question id : {question_id}</h1> */}
      <div className="questionContainer2">
        <h1>{question.title}</h1>
        {/* <h1>account id {question.account_id}</h1> */}
        {/* {question.tags.length > 0 ? <h3>tags : {question.tags}</h3> : null} */}
        <h3>tags : {question.tags}</h3>
        <h3>score : {question.score}</h3>
        <button
          onClick={() => {
            like();
          }}
        >
          like
        </button>
      </div>
      <input
        type="text"
        placeholder="add new answer"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="answerInput"
      />
      <div className="btns">
        <button
          onClick={() => {
            addAnswer();
          }}
        >
          add answer
        </button>
        <button
          onClick={() => {
            getUser();
          }}
        >
          get user info
        </button>
        <button
          onClick={() => {
            getAnswers();
          }}
        >
          get answers
        </button>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          back
        </button>
      </div>
      {show ? (
        user.display_name !== "" ? (
          <div className="ownersection">
            <h2>Question owner</h2>
            <h3>user name : {user.display_name}</h3>
            <img src={user.profile_image} alt="" width={"50px"} />

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
          </div>
        ) : (
          <h1>no user info</h1>
        )
      ) : null}
      {user.points ? <h1>user points : {user.points}</h1> : null}
      <div className="allAnswers">
        {allAnswers.length > 0
          ? allAnswers.map((ans) => {
              return (
                <div key={ans._id} className="answerContainer">
                  <h1>answer : {ans.title}</h1>
                  {/* <h3>answer owner account id : {ans.account_id}</h3> */}
                  <h3>score : {ans.score}</h3>
                  {/* <h4>answer id : {ans._id}</h4> */}
                  <div className="btns2">
                    <button
                      onClick={() => {
                        likeAns(ans._id, ans.account_id);
                      }}
                    >
                      like answer
                    </button>
                    <button
                      onClick={() => {
                        dislikeAns(ans._id);
                      }}
                    >
                      dislike
                    </button>
                    <button
                      onClick={() => {
                        setShowEdit(!showEdit);
                      }}
                    >
                      edit answer
                    </button>
                    <button
                      onClick={() => {
                        deleteAnswer(ans._id, ans.account_id);
                      }}
                    >
                      delete answer
                    </button>
                  </div>
                  {showEdit ? (
                    <div className="edit">
                      <input
                        type="text"
                        placeholder="enter new answer"
                        onChange={(e) => {
                          setEditedTitle(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          editAnswer(ans._id, ans.account_id);
                        }}
                      >
                        save
                      </button>
                    </div>
                  ) : null}
                  <button
                    onClick={() => {
                      getAnswerUser(ans.account_id);
                    }}
                    className="getUser"
                  >
                    get answers's user info
                  </button>
                </div>
              );
            })
          : null}
      </div>
      {/* {answerUser ? <h1>ely gaweb : {answerUser.display_name}</h1> : null} */}
      <hr />

      {/* <h3>user points : {user.points}</h3> */}
    </div>
  );
}

export default Question;
