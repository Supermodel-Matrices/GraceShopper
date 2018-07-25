const router = require('express').Router();
const { Product } = require('../db');

router.get('/api/products', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
