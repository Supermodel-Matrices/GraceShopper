const { db } = require('../server/db/index');
const User = require('../server/db/User');
const Product = require('../server/db/Product');
const Order = require('../server/db/Order');

console.log(db.models)

const { ordered_products: OrderedProducts } = db.models

const users = [
  { name: 'Alex Roger', email: 'atown@email.com', password: '123S' },
  { name: 'Magic Fodder', email: 'btown@email.com', password: '123S' },
  { name: 'Seeing Power', email: 'ctown@email.com', password: '123S' },
  { name: 'Hahah Woza', email: 'dtown@email.com', password: '123S' },
  { name: 'Normal Name', email: 'etown@email.com', password: '123S' },
];

const products = [
  { name: 'Candles', image: 'https://www.ikea.com/us/en/images/products/fenomen-unscented-block-candle-beige__0432192_PE586207_S4.JPG', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 30 },
  { name: 'Big Candles', image: 'https://www.cheatsheet.com/wp-content/uploads/2017/09/melted-candle.jpg', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 60 },
  { name: 'Small Candles', image: 'http://cdn.shopify.com/s/files/1/1559/3917/products/shutterstock_candle_med_grande.jpg?v=1477794398', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 10 },
  { name: 'Red Candles', image: 'http://candles.org/wp-content/uploads/2016/06/red-candle.jpg', description: 'ITS A CANDLE! MARVEL AT ITS RED LIGHT!', category: 'lighting', price: 530 },
  { name: 'White Candles', image: 'https://images.pexels.com/photos/783200/pexels-photo-783200.jpeg?auto=compress&cs=tinysrgb&h=350', description: 'ITS A CANDLE! MARVEL AT ITS WHITE LIGHT!', category: 'lighting', price: 5 },
];

const orders = [
  { total: 635, userId: 1 },
  { total: 635, userId: 1 },
  { total: 635, userId: 2 },
  { total: 635, userId: 4 },
  { total: 635, userId: 1 },
];

const orderedproducts = [
  {
    orderId: 1,
    productId: 1
  },
  {
    orderId: 1,
    productId: 1
  },
  {
    orderId: 1,
    productId: 2
  },
  {
    orderId: 2,
    productId: 3
  },
  {
    orderId: 2,
    productId: 5
  },
]

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user)))
    .then(() =>
      Promise.all(products.map(product =>
        Product.create(product))))
    .then(() =>
      Promise.all(orders.map(order =>
        Order.create(order))));

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
