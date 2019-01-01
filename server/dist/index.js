'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
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

// import routes
var apiRoutes = require('./api-routes');

// set api routes
app.use('/api', apiRoutes);

// set client routes
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

app.listen(port, function () {
  console.log('Running RandomSurvey on port ' + port);
});