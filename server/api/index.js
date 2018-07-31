const router = require('express').Router();
const {User} = require('../db');

router.use('/products', require('./products'));
router.use('/user', require('./user'));
router.use('/cart', require('./cart'));

router.get('/users', async (req, res, next) => {
  if (!req.user) {
    res.status(403).end();
  } else if (!req.user.admin) {
    res.status(403).end();
  } else {
    const users = await User.findAll();
    res.send(users);
  }
});

router.use((req, res, next) => {
  const err = new Error('API route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
