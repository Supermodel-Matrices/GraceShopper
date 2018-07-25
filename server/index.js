const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/auth', require('./auth'))

<<<<<<< HEAD
app.use('/api', require('./api'));
=======
app.use('/api', require('./api/'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
>>>>>>> 5952ee671fe9b2818e2193ddfb1467340e4fe204

app.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
