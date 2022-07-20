import React from "react";
import "../../style/careerTips.css";
import Navbar from "../../components/Navbar";

function CareerTips() {
  return (
    <div className="careerContainer">
      <Navbar />
      <div className="careerTitle">
        <h1>Career Tips</h1>
      </div>
      <div className="tips">
        <h2>Career development</h2>
        <br />
        <p>
          <b>1. Figure out what you stink at</b>
        </p>
        <p>
          While this isn't groundbreaking career advice, it is important. If you
          have a professional weak point, fix it. Take it upon yourself to
          identify your skill gaps and work to fill them day in and day out.
          Once you correct one issue, move on to the next. As a creative
          professional, if you're not willing to constantly improve your skill
          set, you're in the wrong field. It takes passion to succeed in this
          industry and when you don't have it, your weaknesses become more
          apparent as the days wear on.
        </p>
        <p>
          <br />
          <br />
          <b>2. Learn something new every day</b>
        </p>
        <p>
          In addition to getting better at what you know, it's important to
          understand the things you don't. For instance, if you are a web
          content writer and aren't grasping why account services keeps pushing
          for more social content, ask them. Get the inside scoop on what the
          client is looking for. Not only will it help you deliver more targeted
          work in the next round, but it also can help you better understand the
          needs of future clients.
        </p>
        <p>
          <br />
          <br />

          <b>3. Be yourself, always</b>
        </p>
        <p id="interviewtips">
          No matter what field you work in or what job title you have, you
          should always be yourself. The minute you start pretending to be
          something you're not is when your career development begins to
          descend. In most cases, a company hires you because they like your
          work and enjoy your personality. So don't feel pressure to be someone
          you're not. A strong work ethic and a good personality and eagerness
          to learn will often transcend any shortcomings you may have.
        </p>
      </div>
      <br />
      <br />
      <br />
      <div className="tips">
        <h2>
          <b>Interview Tips</b>
        </h2>
        <p>
          The impression you make on the interviewer often can outweigh your
          actual credentials. Your poise, attitude, basic social skills, and
          ability to communicate are evaluated along with your experience and
          education.
        </p>
        -Be on time.<br></br>
        -Have some questions of your own prepared in advance.<br></br>
        -Bring several copies of your resume.<br></br>
        -Have a reliable pen and a small note pad with you.<br></br>
        -Greet the interviewer with a handshake and a smile.<br></br>
        -Don’t be embarrassed if you are nervous.<br></br>
        -Focus.<br></br>
        -Listen carefully to the interviewer.<br></br>
        -Watch your grammar.<br></br>
        -Be prepared for personal questions.<br></br>
        -Wait for the interviewer to mention salary and benefits.<br></br>
        -Don’t expect a job offer at the first interview.<br></br>
        -Close on a positive, enthusiastic note.<br></br>
        -No interview is complete until you follow up with a thank-you note.
        <br></br>
      </div>
    </div>
  );
}

export default CareerTips;
