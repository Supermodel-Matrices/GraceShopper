const router = require('express').Router();
const {User, Order} = require('../db/index');

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id) {
      const user = await User.findOne({
        include: [{
            model: Order
          }],
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(user);
    } else {
      res.status(403).end();
    }
  }
  catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(updatedUser);
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
      const newUser = await User.create(req.body);
      console.log(user);
      res.status(201).send(newUser);
    }
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
