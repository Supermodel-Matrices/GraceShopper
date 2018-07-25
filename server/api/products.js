const router = require('express').Router();
const { Product } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD
router.get('/api/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
=======
module.exports = router;
>>>>>>> 25801d2f3d0f7c99b537c55e84e50011fcd2c07a
