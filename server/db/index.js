const db = require('./db');
const Product = require('./Product');
const Order = require('./Order');
const User = require('./User');

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
    db,
    User,
    Product,
    Order,
};
