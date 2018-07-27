const router = require('express').Router();
const {User} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user.cart);
    } else {
      res.send(req.session.cart);
    }
  }
  catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.body.action === 'add') {
        const user = await User.findOne({where: {id: req.user.id}});
        const newCart = await user.addToCart(req.body.id);
        res.send(newCart);
      } else {
        const user = await User.findOne({where: {id: req.user.id}});
        const newCart = await user.removeFromCart(req.body.id);
        res.send(newCart);
      }
    } else {
      if (!req.session.cart) {
        req.session.cart = {};
      }
      if (req.body.action === 'add') {
        if (req.session.cart[req.body.id]) {
          req.session.cart[req.body.id]++;
        } else {
          req.session.cart[req.body.id] = 1;
        }
        res.send(req.session.cart);
      } else {
        const {[req.body.id]: ignore, ...newCart}  = req.session.cart;
        req.session.cart = newCart;
        res.send(req.session.cart);
      }
    }
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
