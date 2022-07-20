import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "../../style/search.css";
function JobTitle() {
  const [jobs, setJobs] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [SingleJob, setSingleJob] = useState([]);
  const search = () => {
    axios
      .get("http://localhost:8080/JobTitlesSearchEngine/" + text)
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
      })
      .then(() => {
        setLoading(false);
        setShow(true);
      });
  };
  const getJob = () => {
    axios
      .post("http://localhost:5000/recruiter/getrecruiterbyid", {
        recruiterId: questionId,
      })
      .then((res) => {
        setSingleJob(res.data);
        console.log(res.data);
      });
  };
  return (
    <div className="searchContainer">
      <Navbar />
      <div className="search">
        <input
          type="text"
          placeholder="Enter Job Title"
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
          placeholder="search by company ids below"
          onChange={(e) => {
            setQuestionId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getJob();
          }}
        >
          search for the Company by id
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
        {SingleJob ? (
          <div className="inf">
            <h1>{SingleJob.recruiterName}</h1>
            <h2>{SingleJob.CompanyName}</h2>
            <p>{SingleJob.skills}</p>
            <button>
              Contact {SingleJob.recruiterName} from {SingleJob.CompanyName}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default JobTitle;
