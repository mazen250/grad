import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../style/competition.css";
function Competition() {
  const [admin, setAdmin] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [questionThree, setQuestionThree] = useState("");
  const [questionFour, setQuestionFour] = useState("");
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");
  const [tempQuestionOneOptions, setTempQuestionOneOptions] = useState("");
  const [tempQuestionTwoOptions, setTempQuestionTwoOptions] = useState("");
  const [tempQuestionThreeOptions, setTempQuestionThreeOptions] = useState("");
  const [tempQuestionFourOptions, setTempQuestionFourOptions] = useState("");
  const [questionOneOptions, setQuestionOneOptions] = useState([]);
  const [questionTwoOptions, setQuestionTwoOptions] = useState([]);
  const [questionThreeOptions, setQuestionThreeOptions] = useState([]);
  const [questionFourOptions, setQuestionFourOptions] = useState([]);

  const getAdmin = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      console.log(admin);
      setAdmin(admin);
      if (admin.role !== "admin") {
        window.location.href = "/AdminLogin";
      }
    } else {
      window.location.href = "/AdminLogin";
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const addCompetition = () => {
    //check if all fields are filled
    if (
      title === "" ||
      description === "" ||
      questionOne === "" ||
      questionTwo === "" ||
      questionThree === "" ||
      questionFour === "" ||
      answerOne === "" ||
      answerTwo === "" ||
      answerThree === "" ||
      answerFour === "" ||
      questionOneOptions.length === 0 ||
      questionTwoOptions.length === 0 ||
      questionThreeOptions.length === 0 ||
      questionFourOptions.length === 0
    ) {
      alert("Please fill all fields");
    } else {
      axios
        .post("http://localhost:5000/admin/addCompetition", {
          title: title,
          description: description,
          questionOne: questionOne,
          questionTwo: questionTwo,
          questionThree: questionThree,
          questionFour: questionFour,
          answerOne: answerOne,
          answerTwo: answerTwo,
          answerThree: answerThree,
          answerFour: answerFour,
          questionOneOptions: questionOneOptions,
          questionTwoOptions: questionTwoOptions,
          questionThreeOptions: questionThreeOptions,
          questionFourOptions: questionFourOptions,
        })
        .then((res) => {
          alert(res.data);
        });
    }
  };
  return (
    <div className="compContainer">
      <h1 className="compTitle">add new Competition</h1>
      <input
        type="text"
        placeholder="enter competiton title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter competiton description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter question one"
        onChange={(e) => {
          setQuestionOne(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter question two"
        onChange={(e) => {
          setQuestionTwo(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter question three"
        onChange={(e) => {
          setQuestionThree(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter question four"
        onChange={(e) => {
          setQuestionFour(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter answer one"
        onChange={(e) => {
          setAnswerOne(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter answer two"
        onChange={(e) => {
          setAnswerTwo(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter answer three"
        onChange={(e) => {
          setAnswerThree(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter answer four"
        onChange={(e) => {
          setAnswerFour(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter question one options"
        onChange={(e) => {
          setTempQuestionOneOptions(e.target.value);
        }}
      />
      <div className="input"></div>
      <button
        onClick={() => {
          questionOneOptions.push(tempQuestionOneOptions);
          setTempQuestionOneOptions("");
        }}
      >
        add option for question 1
      </button>
      <input
        type="text"
        placeholder="enter question two options"
        onChange={(e) => {
          setTempQuestionTwoOptions(e.target.value);
        }}
      />
      <button
        onClick={() => {
          questionTwoOptions.push(tempQuestionTwoOptions);
          setTempQuestionTwoOptions("");
        }}
      >
        add option for question 2
      </button>
      <input
        type="text"
        placeholder="enter question three options"
        onChange={(e) => {
          setTempQuestionThreeOptions(e.target.value);
        }}
      />
      <button
        onClick={() => {
          questionThreeOptions.push(tempQuestionThreeOptions);
          setTempQuestionThreeOptions("");
        }}
      >
        add option for question 3
      </button>

      <input
        type="text"
        placeholder="enter question four options"
        onChange={(e) => {
          setTempQuestionFourOptions(e.target.value);
        }}
      />
      <button
        onClick={() => {
          questionFourOptions.push(tempQuestionFourOptions);
          setTempQuestionFourOptions("");
        }}
      >
        add option for question 4
      </button>
      <button
        onClick={() => {
          addCompetition();
        }}
      >
        add competition
      </button>
      <div className="ques">
        <h3>options for question 1</h3>
        <h3>question title : {questionOne}</h3>
        <h2>question answer: {answerOne}</h2>
        {questionOneOptions.map((option, index) => {
          return (
            <div key={option}>
              <h3>
                {option} option :[ {index + 1}]
              </h3>
            </div>
          );
        })}
      </div>

      <div className="ques">
        <h3>options for question 2</h3>
        <h3>question title : {questionTwo}</h3>
        <h2>question answer: {answerTwo}</h2>
        {questionTwoOptions.map((option, index) => {
          return (
            <div key={option}>
              <h3>
                {option} option :[ {index + 1}]
              </h3>
            </div>
          );
        })}
      </div>

      <div className="ques">
        <h3>options for question 3</h3>
        <h3>question title : {questionThree}</h3>
        <h2>question answer: {answerThree}</h2>
        {questionThreeOptions.map((option, index) => {
          return (
            <div key={option}>
              <h3>
                {option} option :[ {index + 1}]
              </h3>
            </div>
          );
        })}
      </div>

      <div className="ques">
        <h3>options for question 4</h3>
        <h3>question title : {questionFour}</h3>
        <h2>question answer: {answerFour}</h2>
        {questionFourOptions.map((option, index) => {
          return (
            <div key={option}>
              <h3>
                {option} option :[ {index + 1}]
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Competition;
