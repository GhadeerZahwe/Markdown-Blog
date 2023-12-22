import React, { useEffect, useState } from "react";
import Survey from "../components/Survey";
import Nav from "../../../components/Nav";
import Profile from "../../../components/Profile";
import axios from "axios";
import "./index.css";

function Landing() {
  const [Surveys, setSurveys] = useState([]);
  const [ShowSurvey, setShowSurvey] = useState(true);
  const [ShowProfile, setShowProfile] = useState(false);
  const [ShowAddSurvey, setShowAddSurvey] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState("");

  const AddSurvey = () => {
    axios
      .post(
        "http://localhost:3000/survey",
        {
          title: surveyTitle,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        setShowAddSurvey(false);
        fetchSurveys();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddSurvey = () => {
    setShowAddSurvey(true);
  };

  const fetchSurveys = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "survey", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setSurveys(res.data.surveys);
      });
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className="container">
      <Nav setShowProfile={setShowProfile} setShowSurvey={setShowSurvey} />
      <div className="form-container">
        {ShowProfile && <Profile />}

        {ShowSurvey && (
          <div className="flex gap column">
            <div className="flex gap column">
              {Surveys.map((survey, index) => (
                <div key={index} className="card">
                  <Survey key={index} survey={survey} />
                </div>
              ))}
            </div>
            <div>
              <button onClick={handleAddSurvey} className="btn btn-primary">
                Create Survey
              </button>
            </div>
            {ShowAddSurvey && (
              <div className="flex column gap center">
                <div>
                  <input
                    type="text"
                    className="input"
                    id="title"
                    placeholder="Survey Title"
                    onChange={(e) => setSurveyTitle(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" onClick={AddSurvey}>
                  Add Survey
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
