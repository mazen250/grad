import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "../../style/search.css";
function QuestionSearch() {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const search = () => {
    axios
      .get("http://localhost:8080/StudentSearchEngine/" + text)
      .then((res) => {
        setQuestions(res.data);
        console.log(res.data);
      })
      .then(() => {
        setLoading(false);
        setShow(true);
      });
  };
  return (
    <div className="searchContainer">
      <Navbar />
      <div className="search">
        <input
          type="text"
          placeholder="enter question"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <button
          onClick={() => {
            search();
          }}
        >
          search
        </button>
        <input
          type="text"
          placeholder="search by question id"
          onChange={(e) => {
            setQuestionId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (questionId !== "") {
              window.location.href = `/question/${questionId}`;
            } else {
              alert("select a question Id");
            }
          }}
        >
          search for the question by id
        </button>
        {show ? (
          <div>
            {loading ? (
              <h3>loading..</h3>
            ) : (
              <div className="question">{questions}</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default QuestionSearch;
