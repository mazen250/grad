import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "../../style/search.css";
function RecruiterSkills() {
  const [companies, setCompanies] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [SingleCompany, setSingleCompany] = useState([]);
  const search = () => {
    axios
      .get("http://localhost:8080/RecruiterSkillsSearchEngine/" + text)
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
      })
      .then(() => {
        setLoading(false);
        setShow(true);
      });
  };
  const getCom = () => {
    axios
      .post("http://localhost:5000/recruiter/getrecruiterbyid", {
        recruiterId: questionId,
      })
      .then((res) => {
        setSingleCompany(res.data);
        console.log(res.data);
      });
  };
  return (
    <div className="searchContainer">
      <Navbar />
      <div className="search">
        <input
          type="text"
          placeholder="search by skills (separated by space)"
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
            getCom();
          }}
        >
          search for the Job by id
        </button>
        {show ? (
          <div>
            {loading ? (
              <h3>loading..</h3>
            ) : (
              <div className="coo">{companies}</div>
            )}
          </div>
        ) : null}
        {SingleCompany ? (
          <div className="inf">
            <h1>{SingleCompany.recruiterName}</h1>
            <h2>{SingleCompany.CompanyName}</h2>
            <p>Required Skills :{SingleCompany.skills}</p>
            <button>
              Contact {SingleCompany.recruiterName} from{" "}
              {SingleCompany.CompanyName}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RecruiterSkills;
