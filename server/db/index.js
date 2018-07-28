const db = require('./db');
const Product = require('./Product');
const Order = require('./Order');
const User = require('./User');

Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(Product);
// Product.belongsToMany(Order, {through: 'ordered_products', as: 'orderProducts'});

module.exports = {
    db,
    User,
    Product,
    Order,
};
