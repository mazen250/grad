import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../style/userNotification.css";
import Navbar from "../../components/Navbar";
function UserNotification() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [question_id, setQuestion_id] = useState("");
  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  };
  const getNotfication = async () => {
    setLoading(true);
    if (user._id) {
      axios
        .get(`http://localhost:5000/user/getNotification/${user._id}`)
        .then((res) => {
          if (
            res.data !== "error" &&
            res.data !== "no notification for this user"
          ) {
            setNotification(res.data);
            console.log(res.data);
            setLoading(false);
          }
        });
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="notfyContainer">
      <Navbar />
      {/* <h2>Welcome back: {user.display_name}</h2> */}
      <div className="btnn">
        <input
          type="text"
          placeholder="Search user by their Id"
          onChange={(e) => {
            setQuestion_id(e.target.value);
          }}
        />
        {question_id === "" ? null : (
          <Link to={`/question/${question_id}`}>Go to question</Link>
        )}

        <button
          onClick={() => {
            getNotfication();
            setShow(true);
          }}
        >
          get Notification
        </button>
      </div>
      {show ? (
        <div className="notifications">
          <h1>Notification</h1>
          {!loading && notification.length > 0 ? (
            notification.map((notification) => {
              return (
                <div key={notification._id} className="body">
                  <p>{notification.body}</p>
                </div>
              );
            })
          ) : (
            <h1>no notification for this user</h1>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserNotification;
