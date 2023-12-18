const mongoose = require("mongoose");

const questionAnswerSchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
});

const QuestionAnswer = mongoose.model("QuestionAnswer", questionAnswerSchema);

module.exports = QuestionAnswer;
