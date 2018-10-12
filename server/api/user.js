const router = require('express').Router();
const {User, Order} = require('../db/index');

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id || req.user.admin) {
      const user = await User.findOne({
        include: [{
            model: Order
          }],
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(user);
    }
    else {
      res.status(403).end();
    }
  }
  catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id) {
      const updatedUser = await User.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      const user = await User.findOne({
        include: [{
            model: Order
          }],
        where: {
          id: req.params.id
        }
      });
      res.status(200).send(user);
    }
    else {
      res.status(403).end();
    }
  }
  catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      res.status(409).send('email already registered');
    }
    else {
      console.log(req.session.cart);
      const newUser = await User.create(req.body);
      req.session.cart = {};
      console.log(user);
      res.status(201).send(newUser);
    }
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
