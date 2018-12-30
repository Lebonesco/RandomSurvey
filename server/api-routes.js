const router = require('express').Router();
const { Survey, Question } = require('./surveyModel'); // db connection
const ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RandSurvey crafted with love!',
  });
});

// Survey Endpoints

// generate and return random survey
router.get('/create_survey', (req, res) => {
  const Length = 5;
  Question.aggregate([{ $sample: { size: Length } }], (err, questions) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send(questions);
    }
  });
});

// create survey result
router.post('/survey', (req, res) => {
  const survey = {
    fname: req.body.fname, lname: req.body.lname, email: req.body.email, score: req.body.score,
  };
  Survey.create(survey, (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      console.log(result);
      res.send({ message: 'success' });
    }
  });
});
// get all surveys
router.get('/survey', (req, res) => {
  Survey.find({}, (err, surveys) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send(surveys);
    }
  });
});

// Question Endpoints
// create question
router.post('/question', (req, res) => {
  const question = {
    question: req.body.question, score: req.body.score, answers: req.body.answers, answer: req.body.answer,
  };
  console.log('create question: ', { question });
  Question.create(question, (err, result) => {
    if (err) {
      console.log(err)
      res.send({ error: err });
    } else {
      res.send({ message: 'success' });
    }
  });
});
// get all questions
router.get('/question', (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.send({ error: err });
    }
    res.send(questions);
  });
});
// delete question
router.delete('/question', (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  Question.remove({ _id: ObjectId(id) }, (err) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      res.send({ message: 'success' });
    }
  });
});

module.exports = router;
