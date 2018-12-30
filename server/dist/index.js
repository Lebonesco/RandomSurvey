'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/survey');

var db = mongoose.connection;

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  return res.send('Hello World with Expresss');
}); // will deliver survey

// import routes
var apiRoutes = require('./api-routes');

app.use('/api', apiRoutes);

app.listen(port, function () {
  console.log('Running RandomSurvey on port ' + port);
});