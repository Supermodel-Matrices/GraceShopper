const {db} = require('../server/db/index');
const User = require('../server/db/User');
const Product = require('../server/db/Product');
const Order = require('../server/db/Order');

const { ordered_products: OrderedProducts } = db.models;

const users = [
  { name: 'Alex Roger', email: 'atown@email.com', password: '123S' },
  { name: 'Magic Fodder', email: 'btown@email.com', password: '123S' },
  { name: 'Seeing Power', email: 'ctown@email.com', password: '123S' },
  { name: 'Dan Town', email: 'dtown@email.com', password: '123S' },
  { name: 'Ellen Degeneres', email: 'etown@email.com', password: '123S' },
  { name: 'Cheryl Ng', email: 'cherylngql@gmail.com', password: 'iamanadmin', admin: true},
  { name: 'Asher Lau', email: 'asherasher@gmail.com', password: 'iamanadmin', admin: true},
  { name: 'Jessica Hsu', email: 'jessicahsu@gmail.com', password: 'iamanadmin', admin: true}
];

const products = [
  { name: 'Hexagon Geometric Chandelier', image: 'https://a.1stdibscdn.com/archivesE/upload/f_26973/1499886229133/SE_1stdibs_ORBISVX58_1_l.jpg', description: 'Omnidirectional light with dimmable LED illumination (Triac or forward-phase). Dimensions: L 20"" x W 20"" x H 58""', category: 'lighting', price: 300 },
  { name: 'Brass Wall Light', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_106131711525165299351/10613171_master.jpg', description: 'A wall light consisting of mounting, arm and ring with Led. The ring of light creates a subtle void of light or black hole in the center.', category: 'lighting', price: 700 },
  { name: 'Mirror Sculpture', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_114341331532005269207/11434133_master.jpg', description: 'Free-form Light steel mirror with “crinkled” edges. H 3 ft. 3 in. x W 20 in. x D 2.5 in.', category: 'wall-decor', price: 600 },
  { name: 'Moon Floor Lamp', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_103153131523245176731/10315313_master.jpg', description: 'Copper & Iron H 93.71 in. x W 94.49 in. x D 29.53 in.', category: 'lighting', price: 900 },
  { name: 'Jenkins Watercolor', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_112996531531745170176/11299653_master.jpg', description: 'The artwork measures 43 x 31"" and is archivally mounted in a 49 x 37"" frame.', category: 'wall-decor', price: 530 },
  { name: 'Wall Sculpture', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_80304631500359952172/8030463_master.jpg', description: 'Ceramic H 17.5 in. x W 21 in. x D 8 in.', category: 'wall-decor', price: 800 },
  { name: 'Macrame Plant Hanger', image: 'http://cdn.shopify.com/s/files/1/1791/5927/products/macrame-wall-hanger-001_b8030188-403e-49cf-a7d6-c425e092e6fe_grande.jpg', description: 'Macrame H 14 in.', category: 'greenery', price: 35 },
  { name: 'Pasquier Screen Print', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_112205111530330628933/11220511_master.jpg', description: 'H 27.56 in. x W 19.69 in. x D 0.04 in.', category: 'wall-decor', price: 720 },
  { name: 'Brass Wall Lights', image: 'https://a.1stdibscdn.com/rare-pair-of-1950s-paavo-tynell-perforated-brass-wall-lights-for-sale/archivesE/upload/366869/f_103576111523997705426/Two_Enlighten_March_22nd_2018_Main_15_2_org_master.jpg', description: 'H 14.5 in. x W 4.5 in. x D 10.5 in.', category: 'lighting', price: 180 },
  { name: 'Candlestick Chandelier', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_115222911532695875397/11522291_master.jpg', description: 'PK-101 candlestick of chromium-plated steel. 32 arms for candles in a spiral shape. Designed in 1956. Maker E. Kold Christensen.', category: 'lighting', price: 490 },
  { name: 'Black Pendant Lamp', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_115197711532674386003/11519771_master.jpg', description: 'H 9.06 in. x Dm 19.69 in.', category: 'lighting', price: 510 },
  { name: 'Helix Floor Lamp', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_77321331499770606434/7732133_l.jpg', description: 'Brass, Granite, Marble H 62 in. x W 16 in. x D 22 in.', category: 'lighting', price: 530 },
  { name: 'Matière Composition', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_75309531495541121622/7530953_l.jpg', description: 'H 39.38 in. x W 39.38 in. x D 0.2 in.', category: 'wall-decor', price: 820 },
  { name: 'Moroccan Textile', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_48665731465904201336/4866573_l.jpg', description: 'Tabrdouhte cape. Weft wrapping technique using wool with white linen', category: 'textiles', price: 380 },
  { name: 'Tulu Bedding Rug ', image: 'https://a.1stdibscdn.com/archivesE/upload/1121223/f_3622002/3622002_l.jpg', description: 'Turkish Wool W 2 ft. 1 in. x L 3 ft. 1 in. ', category: 'textiles', price: 400 },
  { name: 'Turkish Pillowcases', image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/f_81615031503560169661/8161503_master.jpg', description: 'Two pillows made out of a fragment nord-east Turkey nomads Kilim.', category: 'textiles', price: 80 },
  { name: 'Sculpture Plant Stand', image: 'https://a.1stdibscdn.com/archivesE/upload/8128/1383/XXX_8128_1327366712_1.jpg', description: 'Unusual and possibly one of a kind wrought metal plant holder, having a sculptural naturalistic form.', category: 'greenery', price: 300 },
  { name: 'Wolston Plant Chair', image: 'https://a.1stdibscdn.com/archivesE/upload/366869/f_93467911517415539542/9346791_master.jpg', description: 'Large painted terracotta indoor/outdoor planter chair, handmade by New York and Medellín-based artist Chris Wolston.', category: 'greenery', price: 800 }
];

const orders = [
  { items: {1: 1, 4: 1, 15: 1}, total: 910, userId: 1 },
  { items: {3: 1, 5: 1, 14: 1}, total: 2100, userId: 2 },
  { items: {10: 1, 12: 1}, total: 1330, userId: 4 },
  { items: {6: 1, 8: 1}, total: 215 },
  { items: {2: 1, 7: 1}, total: 1330, userId: 5 },
  { items: {19: 80}, total: 70500, userId: 6 },
  { items: {19: 80}, total: 70500, userId: 6 },
  { items: {19: 80}, total: 70500, userId: 6 },
  { items: {19: 80}, total: 70500, userId: 6 }
];

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
