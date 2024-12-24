import React from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/main"); // Redirect to the Main page
  };

  return (
    <>
      <div id="welcomePage" className="page">
        <div className="welcome-content">
          <h1>
            Welcome to <span className="highlight">Virtual Math Teacher</span>
          </h1>
          <p>Get ready to explore math in a whole new way. Upload a problem, and let me help you find the answer!</p>
          <button className="start-button" onClick={handleStartClick}>
            Let's Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default Landing;
