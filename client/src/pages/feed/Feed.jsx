import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../style/feed.css";
import Navbar from "../../components/Navbar";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import profile from "../../images/profile.png";
function Feed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const questionPerPage = 10;
  const pagesVisited = pageNumber * questionPerPage;
  const [user, setUser] = useState({});

  const getPosts = async () => {
    try {
      axios
        .get("http://localhost:5000/question/questions")
        .then((res) => {
          setPosts(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      getPosts();
      console.log(user);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const pageCount = Math.ceil(posts.length / questionPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="feedContainer">
      <Navbar />
      <div className="pageSlpit">
        {!loading ? (
          <div className="userInfoLeft">
            <h2>welocme back {user.display_name}</h2>
            {user.profile_image ? (
              <img src={user.profile_image} alt="test" width={"60px"} />
            ) : (
              <img src={profile} alt="profile" width={"80px"} />
            )}

            <h3>Your badges</h3>
            <h4>Gold: {user.Gold}</h4>
            <h4>Silver: {user.Silver}</h4>
            <h4>Bronze: {user.Bronze}</h4>
            <h3>Points: {user.points}</h3>
            <Link to={"/addQuestion"}>add question</Link>
            <Link to={"/competition"}>weekly competition</Link>
            <Link to={"/profile"}>go to my profile</Link>
            <Link to={"/questionSearch"}>Search for question</Link>
            <Link to={"/searchCompany"}>search with Company Name</Link>
            <Link to={"/jobTtitle"}>search with Job Title</Link>
            <Link to={"/recruiterSkills"}>search with Skill</Link>
            <button
              onClick={() => {
                logout();
              }}
              className="logout"
            >
              Logout
            </button>
          </div>
        ) : null}

        <div className="questionFeed">
          {!loading ? (
            posts
              .slice(pagesVisited, pagesVisited + questionPerPage)
              .map((post) => (
                <div key={post._id} className="questionContainer">
                  {/* <h1>{post.account_id}</h1> */}
                  <h3>{post.title}</h3>
                  {/* <h4>Id : {post._id}</h4> */}

                  <h5>tags : {post.tags[0]}</h5>
                  <Link to={`/user/${post.account_id}`}>user details</Link>
                  <Link to={`/question/${post._id}`}>question details</Link>
                </div>
              ))
          ) : (
            // <ClipLoader
            //   color={"white"}
            //   loading={loading}
            //   cssOverride={override}
            //   size={80}
            // />
            <div className="sweet-loading">
              <ClimbingBoxLoader size={40} color={"white"} />
            </div>
          )}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default Feed;
