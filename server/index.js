const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const stripe = require('stripe')('sk_test_6mBhvrT2NOUUe0Cv77gkoRkF'); //Have To Hide This Later...
const {User} = require('./db');

if (process.env.NODE_ENV !== 'production') {
  require('../secrets');
}

// require('main');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "wildly insecure secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/auth', require('./auth'));

app.use('/api', require('./api/'));

app.use('/google', require('./oauth'));

app.post('/charge', function(req,res) {
  const { cart } = User.findOne({where: {email: req.body.stripeEmail}})
  console.log(cart);
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Home Decor Purchase',
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => res.redirect('/successpage'))
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

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
