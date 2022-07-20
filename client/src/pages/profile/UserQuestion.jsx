import React, { useEffect, useState } from "react";
import axios from "axios";

function UserQuestion({ id }) {
  const [question, setQuestion] = useState([]);
  const getQuestion = async () => {
    axios
      .get(`http://localhost:5000/question/userQuestions/${id}`)
      .then((res) => {
        setQuestion(res.data);
      });
  };
  useEffect(() => {
    getQuestion();
    console.log(question);
  }, []);

  return (
    <div>
      <h1>question section</h1>
      <h1>user id {id}</h1>
      <h1>user questions</h1>
      {question ? (
        question.map((question) => {
          return <div key={question.question}>{question.question}</div>;
        })
      ) : (
        <h1>no user question</h1>
      )}
    </div>
  );
}

export default UserQuestion;
