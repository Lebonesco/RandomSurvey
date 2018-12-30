const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

app.get('/', (req, res) => res.send('Hello World with Expresss')); // will deliver survey

// import routes
const apiRoutes = require('./api-routes');

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Running RandomSurvey on port ${port}`);
});