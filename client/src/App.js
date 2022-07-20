import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/profile";
import UserProfile from "./pages/profile/UserProfile";
import Question from "./pages/Question";
import AddQuestion from "./pages/AddQuestion/AddQuestion";
import AdminLigin from "./pages/login/AdminLigin";
import AdminHome from "./pages/adminPages/AdminHome";
import RecruiterLogin from "./pages/login/RecruiterLogin";
import RecruiterRegister from "./pages/login/RecruiterRegister";
import Home from "./pages/recruiter/Home";
import AddJob from "./pages/recruiter/AddJob";
import Competition from "./pages/adminPages/Competition";
import UserCompetition from "./pages/feed/UserCompetition";
import JobDetails from "./pages/recruiter/JobDetails";
import UserNotification from "./pages/notification/UserNotification";
import CareerTips from "./pages/careerTips/CareerTips";
import Help from "./pages/careerTips/Help";
import QuestionSearch from "./pages/searches/QuestionSearch";
import SearchCompany from "./pages/searches/SearchCompany";
import JobTitle from "./pages/searches/JobTitle";
import RecruiterSkills from "./pages/searches/RecruiterSkills";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/" element={<Login />} />
          <Route path="/addQuestion" element={<AddQuestion />} />
          <Route path="/AdminLogin" element={<AdminLigin />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/recruiterLogin" element={<RecruiterLogin   />} />
          <Route path="/recruiterRegister" element={<RecruiterRegister />} />
          <Route path="/recruiterHome" element={<Home />} />
          <Route path="/addJob/:id" element={<AddJob />} />
          <Route path="/addCompetition" element={<Competition/>} />
          <Route path="/competition" element={<UserCompetition/>} />
          <Route path='/jobDetails/:id' element={<JobDetails/>} />
          <Route path='/userNotification' element={<UserNotification/>} />
          <Route path='/careerTips' element={<CareerTips/>} />
          <Route path='/help' element={<Help/>} />
          <Route path='/questionSearch' element={<QuestionSearch/>} />
          <Route path='/searchCompany' element={<SearchCompany/>} />
          <Route path='/jobTtitle' element={<JobTitle/>} />
          <Route path='/recruiterSkills' element={<RecruiterSkills/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
