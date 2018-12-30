'use strict';

var router = require('express').Router();

var _require = require('./surveyModel'),
    Survey = _require.Survey,
    Question = _require.Question; // db connection


var ObjectId = require('mongodb').ObjectID;

router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RandSurvey crafted with love!'
  });
});

// Survey Endpoints

// generate and return random survey
router.get('/create_survey', function (req, res) {
  var Length = 5;
  Question.aggregate([{ $sample: { size: Length } }], function (err, questions) {
    if (err) {
      res.send({ 'message': err });
    } else {
      res.send(questions);
    }
  });
});

// create survey result
router.post('/survey', function (req, res) {
  var survey = {
    fname: req.body.fname, lname: req.body.lname, email: req.body.email, score: req.body.score
  };
  Survey.create(survey, function (err, result) {
    if (err) {
      res.send({ error: err });
    } else {
      console.log(result);
      res.send({ message: 'success' });
    }
  });
});
// get all surveys
router.get('/survey', function (req, res) {
  Survey.find({}, function (err, surveys) {
    if (err) {
      res.send({ 'error': err });
    } else {
      res.send(surveys);
    }
  });
});

// Question Endpoints
// create question
router.post('/question', function (req, res) {
  var question = {
    type: req.body.type, score: req.body.score, answers: req.body.answers, answer: req.body.answer
  };
  Question.create(question, function (err, result) {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({ message: 'success' });
    }
  });
});
// get all questions
router.get('/question', function (req, res) {
  Question.find({}, function (err, questions) {
    if (err) {
      res.send({ 'error': err });
    }
    res.send(questions);
  });
});
// delete question
router.delete('/question', function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  Question.remove({ _id: ObjectId(id) }, function (err) {
    if (err) {
      console.log(err);
      res.send({ 'error': err });
    } else {
      res.send({ 'message': "success" });
    }
  });
});

module.exports = router;