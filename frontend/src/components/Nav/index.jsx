// Nav.jsx
import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Nav({ setShowSurvey, setShowProfile }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleShowSurvey = () => {
    setShowSurvey(true);
    setShowProfile(false);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowSurvey(false);
  };

  return (
    <div className="nav full-width">
      <div className="logo" onClick={handleShowSurvey}>
        Survey App
      </div>
      <div className="nav-buttons">
        <button className="btn" onClick={handleShowSurvey}>
          Surveys
        </button>
        <button className="btn" onClick={handleShowProfile}>
          Profile
        </button>
      </div>
      <div>
        <button className="btn logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
