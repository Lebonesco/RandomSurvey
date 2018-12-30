'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mongoose = require("mongoose");

// store questions
var questionSchema = mongoose.Schema({
	type: { // true/false, radio, multiple choice, fill in
		type: String,
		required: true
	},
	question: {
		type: String,
		require: true
	},
	answers: {
		type: [String],
		require: true
	},
	answer: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		required: true
	}
});

var Question = mongoose.model('question', questionSchema);

// store results
var surveySchema = mongoose.Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		require: true
	},
	email: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now
	},
	score: {
		type: Number,
		require: true
	}
});

var Survey = mongoose.model('survey', surveySchema);

exports.Question = Question;
exports.Survey = Survey;