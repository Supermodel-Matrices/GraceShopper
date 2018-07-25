const db = require('./index');
const Sequelize = require('sequelize');

const Product = db.define({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['lighting', 'greenery', 'textiles', 'wall-decor']]
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Product;
