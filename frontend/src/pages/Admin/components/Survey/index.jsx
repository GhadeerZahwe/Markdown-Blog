import axios from "axios";
import React, { useState } from "react";
import AddQuestion from "../AddQuestion";
import Question from "../../../../components/Question";
import "./index.css";

function Survey({ survey: { _id, title } }) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);

  const [survey, setSurvey] = useState({});

  const getSurvey = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "survey/" + _id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setSurvey(res.data);
      })
      .then(() => {
        setShowSurvey(!showSurvey);
      });
  };

  const handleDelete = () => {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "survey/" + _id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleView = () => {
    getSurvey();
    setShowAddQuestion(false);
  };

  const handleAddQuestionButton = () => {
    setEditQuestion(null);
    setShowAddQuestion(!showAddQuestion);
  };

  const onDeleteQuestion = (question) => {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "question/" + question._id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        getSurvey();
      });
  };

  const onEditQuestion = (question) => {
    setEditQuestion(question);
    setShowAddQuestion(true);
  };

  return (
    <div className={`survey ${showSurvey ? "expanded" : ""}`}>
      <div className="survey-header">
        <p className="survey-title">{title}</p>
        <div className="survey-buttons">
          <button className="btn" onClick={handleView}>
            {showSurvey ? "Hide" : "View"}
          </button>
          <button className="btn danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {showSurvey && (
        <div>
          <h3>Questions</h3>
          <div className="question-list">
            {survey.questions?.map((question, index) => (
              <Question
                key={index}
                question={question}
                index={index}
                onDelete={onDeleteQuestion}
                onEdit={onEditQuestion}
              />
            ))}
          </div>
        </div>
      )}

      {showSurvey && (
        <div className="survey-footer">
          <button className="btn" onClick={handleAddQuestionButton}>
            {showAddQuestion ? "Hide" : "Add Question"}
          </button>
        </div>
      )}

      {showAddQuestion && (
        <AddQuestion
          surveyId={_id}
          getSurvey={getSurvey}
          EditSurvey={handleAddQuestionButton}
          editQuestion={editQuestion}
        />
      )}
    </div>
  );
}

export default Survey;
