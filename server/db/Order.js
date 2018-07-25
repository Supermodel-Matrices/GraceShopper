const Sequelize = require('sequelize');
const db = require('./db');

const Order = db.define('order', {
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Order;
