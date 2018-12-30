let mongoose = require('mongoose');

// store questions
let questionSchema = mongoose.Schema({
  type: { // true/false, radio, multiple choice, fill in
    type: String,
  },
  question: {
    type: String,
    require: true,
  },
  answers: {
    type: [String],
    require: true,
  },
  answer: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

let Question = mongoose.model('question', questionSchema);

// store results
let surveySchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    require: true,
  },
});

let Survey = mongoose.model('survey', surveySchema);

export {
  Question,
  Survey,
};
