const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const {User, Product, Order} = require('./db');

if (process.env.NODE_ENV !== 'production') {
  require('../secrets');
}
const stripe = require('stripe')(process.env.STRIPE_SECRET);

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

app.post('/charge', async function (req, res, next) {
  try {
    //Calculate Price And Create Order For Database
    const user = await User.findOne({ where: { email: req.body.stripeEmail } });
    let cartKeys;
    user ? cartKeys = Object.keys(user.cart) : cartKeys = Object.keys(req.session.cart);
    let subtotal = 0;
    for (let i = 0; i < cartKeys.length; i++) {
      const product = await Product.findOne({ where: { id: cartKeys[i] } });
      subtotal += (product.price * (user ? user.cart[cartKeys[i]] : req.session.cart[cartKeys[i]]));
    }
    const tax = subtotal * .10;
    const shipping = 100;
    const total = subtotal + tax + shipping;
    await Order.create({ items: user ? user.cart : req.session.cart, total: total, userId: user ? user.id : null});

    //Creating Purchase On Stripe.
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    });
    const trans = await stripe.charges.create({
      amount: total,
      description: 'Home Decor Purchase',
      currency: 'usd',
      customer: customer.id
    });
    user ? await user.update({cart: {}}) : req.session.cart = {};
    res.redirect('/success');
  } catch (err) {
    next(err);
  }
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
