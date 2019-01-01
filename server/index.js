const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/survey');

const db = mongoose.connection;

const port = process.env.PORT || 8080;

// import routes
const apiRoutes = require('./api-routes');

// set api routes
app.use('/api', apiRoutes);

// set client routes
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

app.listen(port, () => {
  console.log(`Running RandomSurvey on port ${port}`);
});