import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../style/jobDetails.css";
import Navbar from "../../components/RecruiterNav";
function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);
  const [userBroker, setUserBroker] = useState([]);
  useEffect(() => {
    if (id) {
      axios
        .post(`http://localhost:5000/recruiter/getjobbyid`, {
          jobId: id,
        })
        .then((res) => {
          // console.log(res.data);
          setJob(res.data);
        });
    }
  }, []);
  const broker = () => {
    // alert(job.skills);
    setLoading(true);
    axios
      .get(`http://127.0.0.1:7000/BrokerEngine/${job.skills}`)
      .then((res) => {
        let test = res.data;

        test = test
          .replace("'", "")
          .replace("[", "")
          .replace("]", "")
          .replace("[", " ")
          .split(" ");
        for (let i = 1; i < test.length; i++) {
          if (i % 2 === 0) {
            test[i] = test[i].replace("'", "");
            test[i] = test[i].replace("[", "");
            test[i] = test[i].replace("]", "");

            test[i] = test[i].slice(0, -2);
            users.push(test[i]);
            console.log(test[i]);
          } else {
            test[i] = test[i].replace("'", "");
            test[i] = test[i].replace("[", "");
            test[i] = test[i].replace("]", "");

            test[i] = test[i].slice(0, -2);
            grades.push(test[i]);
            console.log(test[i]);
          }
        }
        getUser();
      });
  };
  const getUser = () => {
    if (users.length > 0) {
      // console.log(users[2]);
      for (let i = 0; i < users.length; i++) {
        //remove last charachter from string

        // console.log(users[i]);
        if (users[i] !== "") {
          axios.get(`http://localhost:5000/user/${users[i]}`).then((res) => {
            if (res.data !== "error" && res.data !== "user not found") {
              console.log(res.data);
              // userBroker.push(res.data);
              setLoading(false);
              setUserBroker((prev) => [...prev, res.data]);
              console.log("====================================");
              console.log(userBroker);
              console.log("====================================");
            }
          });
        }
      }
    }
    if (userBroker.length > 0) {
      setShow(true);
    }
  };
  return (
    <div className="detailsContainer">
      <Navbar />
      <div className="details">
        <h1>Job Title : {job.JobTitel}</h1>
        <p>required skills : {job.skills}</p>
        <h4>company Name :{job.CompanyName}</h4>
        <button
          onClick={() => {
            broker();
          }}
        >
          broker
        </button>
      </div>
      {/* <button
        onClick={() => {
          getUser();
        }}
      >
        get users info
      </button> */}

      {!loading ? (
        userBroker.map((user, index) => {
          return (
            <div key={user._id} className="brokerClass">
              <img src={user.profile_image} alt="" width={"60px"} />
              <h3>Name: {user.display_name}</h3>
              <h2>matched with accuracy : {grades[index]}%</h2>
              <div className="skil">
                <p>Skills: {user.skills}</p>
              </div>
              <h5>age : {user.age}</h5>
              <h5>Gold points:{user.Gold}</h5>
              <h5>Silver points:{user.Silver}</h5>
              <h5>Bronze points:{user.Bronze}</h5>
              <button className="call">call</button>
              <hr />
            </div>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default JobDetails;
