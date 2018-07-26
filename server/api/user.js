const router = require('express').Router();
const {User, Order} = require('../db/index');

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      include: [{
          model: Order,
          include: [{
              association: 'orderProducts'
            }]
        }],
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(user);
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

router.post('/:id', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  }
  catch (err) {
    next(err);
  }
})

module.exports = router;
