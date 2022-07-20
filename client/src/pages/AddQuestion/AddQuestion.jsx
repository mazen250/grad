import React, { useState, useEffect } from "react";
import "../../style/addQuestion.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
function AddQuestion() {
  const [user, setUser] = useState({});
  const [question, setQuestion] = useState("");
  const [msg, setMsg] = useState("");
  const [tags, setTags] = useState("");
  const [tagQuestion, setTagQuestion] = useState(false);
  useEffect(() => {
    const getUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        window.location.href = "/login";
      }
    };
    getUser();
  }, []);
  const getTags = () => {
    axios
      .get(`http://127.0.0.1:5000/TextClassification/${question}`)
      .then((res) => {
        setTags(res.data);
      });
  };
  const addQ = () => {
    if (question === "") {
      alert("question cannot be empty");
    } else {
      if (user) {
        if (tagQuestion) {
          axios
            .post(`http://localhost:5000/question/addQuestion`, {
              question: question,
              account_id: user.account_id,
              tags: tags,
            })
            .then((res) => {
              console.log(res.data);
              setMsg(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          axios
            .post(`http://localhost:5000/question/addQuestion`, {
              question: question,
              account_id: user.account_id,
            })
            .then((res) => {
              console.log(res.data);
              setMsg(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        alert("please login to add question");
        window.location.href = "/login";
      }
    }
  };
  return (
    <div className="addQuestion">
      <Navbar />
      {/* <h1>welcome back {user.display_name}</h1> */}
      <div className="addQuestionContainer">
        <input
          type="text"
          placeholder="enter your question"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <p>
          Note: if you want your question to be tagged with crossponding topics,
          try our tags by pressing the button below
        </p>
        <button
          onClick={() => {
            getTags();
          }}
        >
          get Tags
        </button>
        <h1 className="tagss">{tags.length > 0 ? `Tag is: ${tags}` : null}</h1>
        <p>
          {tags.length > 0
            ? `Accept the tag? press the button below else press add question button`
            : null}
        </p>
        <button
          onClick={() => {
            setTagQuestion(true);
          }}
        >
          accept tag
        </button>

        <button
          onClick={() => {
            addQ();
          }}
        >
          add question
        </button>

        {msg ? (
          <div className="msg">
            <h3>{msg}</h3>
            <Link to={"/profile"}>Go to Profile</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AddQuestion;
