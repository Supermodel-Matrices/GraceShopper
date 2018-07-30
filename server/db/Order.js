const Sequelize = require('sequelize');
const db = require('./db');

const Order = db.define('order', {
    items: {
        type: Sequelize.JSON,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Order;
