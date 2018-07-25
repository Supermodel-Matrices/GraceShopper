const db = require('./db');
const Product = require('./Product');
const Order = require('./Order');
const User = require('./User');

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: 'ordered_products'});
Product.belongsToMany(Order, {through: 'ordered_products'});

module.exports = {
    db,
    User,
    Product,
    Order,
};
