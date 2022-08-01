import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/RecruiterNav";
import "../../style/addJob.css";
function AddJob() {
  const [recruiter, setRecruiter] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [skills, setSkills] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const getRecruiter = () => {
    axios
      .post(`http://localhost:5000/recruiter/getrecruiterbyid`, {
        recruiterId: id,
      })
      .then((res) => {
        setRecruiter(res.data);
        setShow(true);
        //   console.log(res.data);
      });
  };

  useEffect(() => {
    if (id) {
      getRecruiter();
    }
  }, []);

  const addJob = () => {
    if (jobTitle === "" || skills === "") {
      alert("Please fill all the fields");
    } else {
      //remove last character from skills

      // setSkills(skills.slice(0, -1));
      //check if last character is ,
      if (skills.charAt(skills.length - 1) === ",") {
        setSkills(skills.slice(0, -1));
      } else {
        axios
          .post(`http://localhost:5000/recruiter/addjob`, {
            JobTitel: jobTitle,
            skills: skills,
            CompanyName: recruiter.CompanyName,
            recruiterId: id,
            recruiterName: recruiter.recruiterName,
            password: recruiter.password,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
    }
  };
  return (
    <div className="recruiterHome">
      <Navbar />
      {show ? (
        <div className="recInfo">
          <div className="userInfo">
            {/* <h3>recruiter id : {id}</h3> */}
            <h4>Company Name : {recruiter.CompanyName}</h4>
            <h4>recruiter name : {recruiter.recruiterName}</h4>
          </div>
          <button
            onClick={() => {
              setShowJob(!showJob);
            }}
          >
            {showJob ? "Hide" : "enter new job specs"}
          </button>
        </div>
      ) : (
        <h3>no data found</h3>
      )}
      {showJob ? (
        <div className="jobContainerr">
          <p>Add Job for Company name : {recruiter.CompanyName}</p>

          <input
            type="text"
            placeholder="enter job title"
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="add job skills needed"
            onChange={(e) => {
              setNewSkill(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setSkills(newSkill + "," + skills);
              setNewSkill("");
            }}
          >
            add skill
          </button>
          <h3>{skills.length > 0 ? skills : "no skills yet"}</h3>
          <br />

          <button
            onClick={() => {
              addJob();
            }}
          >
            submit
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AddJob;
