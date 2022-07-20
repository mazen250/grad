import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "../../style/search.css";
function SearchTitle() {
  const [jobs, setJobs] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [recruiter, setRecruiter] = useState([]);
  const search = () => {
    axios
      .get("http://localhost:8080/JobCompanySearchEngine/" + text)
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
      })
      .then(() => {
        setLoading(false);
        setShow(true);
      });
  };
  const getRec = () => {
    axios
      .post("http://localhost:5000/recruiter/getrecruiterbyid", {
        recruiterId: questionId,
      })
      .then((res) => {
        setRecruiter(res.data);
        console.log(res.data);
      });
  };
  return (
    <div className="searchContainer">
      <Navbar />
      <div className="search">
        <input
          type="text"
          placeholder="enter by company Name"
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
          placeholder="search by recruiter id below"
          onChange={(e) => {
            setQuestionId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getRec();
          }}
        >
          search for the Job by id
        </button>
        {show ? (
          <div>
            {loading ? (
              <h3>loading..</h3>
            ) : (
              <div className="question">{jobs}</div>
            )}
          </div>
        ) : null}
        {recruiter ? (
          <div>
            <h1>{recruiter.recruiterName}</h1>
            <h2>{recruiter.CompanyName}</h2>
            <button>
              Contact {recruiter.recruiterName} from {recruiter.CompanyName}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchTitle;
