import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/recruiterHome.css";
import Navbar from "../../components//RecruiterNav";
function Home() {
  const [recruiter, setRecruiter] = useState({});
  const [recriterJob, setRecriterJob] = useState([]);
  const [showJobs, setShowJobs] = useState(false);
  useEffect(() => {
    const recruiter = JSON.parse(localStorage.getItem("recruiter"));
    if (recruiter) {
      setRecruiter(recruiter[0]);
    } else {
      window.location.href = "/recruiterLogin";
    }
  }, []);

  const getRecruiterJobs = () => {
    if (recruiter._id) {
      // alert(recruiter._id);
      axios
        .post(`http://localhost:5000/recruiter/getalljobsbyrecruiterid`, {
          recruiterId: recruiter._id,
        })
        .then((res) => {
          console.log(res.data);
          setRecriterJob(res.data);
        });
    }
  };
  const deleteJob = (id) => {
    axios
      .post(`http://localhost:5000/recruiter/deletejobbyid`, {
        jobId: id,
      })
      .then((res) => {
        getRecruiterJobs();
      });
  };

  return (
    <div className="recruiterHome">
      <Navbar />
      <div className="recInfo">
        {/* <h2>Recruiter Home</h2> */}
        <div className="userInfo">
          <h3>Welcome {recruiter.recruiterName}</h3>
          {/* <h3>recruiter id : {recruiter._id}</h3> */}
          {/* <h3>recruiter id {recruiter._id}</h3> */}
          <h4>Company Name : {recruiter.CompanyName}</h4>
        </div>
        <Link to={`/addJob/${recruiter._id}`}>add job</Link>
        {/* <button
          onClick={() => {
            localStorage.removeItem("recruiter");
            window.location.href = "/recruiterLogin";
          }}
        >
          logout
        </button> */}
        <button
          onClick={() => {
            getRecruiterJobs();
          }}
        >
          My Jobs
        </button>
      </div>

      {recriterJob.length > 0 ? (
        <div>
          {recriterJob.map((job, index) => {
            return (
              <div key={job._id} className="jobsContainer">
                <h3>job count : {index + 1}</h3>
                <h3>{job.JobTitel}</h3>
                <h4>{job.skills}</h4>
                <Link to={`/jobDetails/${job._id}`}>Job Details</Link>
                <button
                  onClick={() => {
                    deleteJob(job._id);
                  }}
                >
                  delete job
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        showJobs && <h3>No Jobs</h3>
      )}
    </div>
  );
}

export default Home;
