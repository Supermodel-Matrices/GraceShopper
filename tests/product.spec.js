import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AllProducts} from '../client/components/AllProducts';
import {SingleProduct} from '../client/components/SingleProduct';
import store from '../client/store';
import {fetchProducts, fetchProduct, productReducer, getProducts} from '../client/store/products';
import {Product} from '../server/db';
import app from '../server';
const agent = require('supertest')(app);
const adapter = new Adapter()
enzyme.configure({adapter})

// Front-end
describe('Front-End', () => {

  const products = [
		{ name: 'Candles', image: 'https://www.ikea.com/us/en/images/products/fenomen-unscented-block-candle-beige__0432192_PE586207_S4.JPG', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 30 },
		{ name: 'Big Candles', image: 'https://www.cheatsheet.com/wp-content/uploads/2017/09/melted-candle.jpg', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 60 },
		{ name: 'Small Candles', image: 'http://cdn.shopify.com/s/files/1/1559/3917/products/shutterstock_candle_med_grande.jpg?v=1477794398', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 10 },
		{ name: 'Red Candles', image: 'http://candles.org/wp-content/uploads/2016/06/red-candle.jpg', description: 'ITS A CANDLE! MARVEL AT ITS RED LIGHT!', category: 'lighting', price: 530 },
		{ name: 'White Candles', image: 'https://images.pexels.com/photos/783200/pexels-photo-783200.jpeg?auto=compress&cs=tinysrgb&h=350', description: 'ITS A CANDLE! MARVEL AT ITS WHITE LIGHT!', category: 'lighting', price: 5 },
	];

	xdescribe('<AllProducts /> component', () => {
		it('renders an unordered list', async () => {
			const allProducts = shallow(<AllProducts store={store} allProducts={products} fetchProducts={fetchProducts} />);
			expect(allProducts.find('ul')).to.have.length(1);
		})

		it('renders items as an anchor div', async () => {
			const allProducts = shallow(<AllProducts store={store} allProducts={products} fetchProducts={fetchProducts} />);
			expect(allProducts.find('Link')).to.have.length(5);
		});
	});

	xdescribe('<SingleProduct /> component', () => {
		const product = { name: 'Candles', image: 'https://www.ikea.com/us/en/images/products/fenomen-unscented-block-candle-beige__0432192_PE586207_S4.JPG', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 30 };

		it('renders an image in a div', async () => {
			const singleProduct = shallow(<SingleProduct store={store} product={product} fetchProduct={fetchProduct} />);
			expect(singleProduct.find('div img')).to.have.length(1);
		})
	});
  // Redux

	describe('`getProducts` action creator', () => {
		const getProductsAction = getProducts(products);

		it('returns a Plain Old JavaScript Object', () => {
			expect(typeof getProductsAction).to.equal('object');
			expect(Object.getPrototypeOf(getProductsAction)).to.equal(Object.prototype);
		});

		it('creates an object with `type` and `products`', () => {
			expect(getProductsAction.type).to.equal('FETCH_PRODUCTS');
			expect(Array.isArray(getProductsAction.products)).to.be.true; // eslint-disable-line no-unused-expressions
			expect(getProductsAction.products[2].name).to.equal('Small Candles');
		});

	});

	describe('productReducer', () => {
		const initialState = {
			allProducts: [],
			currentProduct: {}
		};

		const newState = productReducer(
			initialState,
			{
				type: 'FETCH_PRODUCTS',
				products
			}
		)

		it('returns a new state with the updated allProducts', () => {
			expect(newState.allProducts).to.deep.equal(products);
		});

		it('does not modify the previous state', () => {
			expect(initialState).to.deep.equal({
				allProducts: [],
			  currentProduct: {}
			});
		});

	});
});

// Modesl

describe('Product model', () => {
	it('requires name', async () => {
		const product = Product.build();

		try {
			await product.validate()
			throw Error('validation was successful but should have failed without `name`');
		}
		catch (err) {
			expect(err.message).to.contain('name cannot be null');
		}
	});

	it('requires name to not be an empty string', async () => {
		const product = Product.build({
			name: ''
		});

		try {
			await product.validate()
			throw Error('validation was successful but should have failed if name is an empty string');
		} catch (err) {
			expect(err.message).to.contain('Validation error');
		}
	});
	it('requires image', async () => {
		const product = Product.build({
			name: 'Candle'
		});

		try {
			await product.validate()
			throw Error('validation was successful but should have failed without `image`');
		}
		catch (err) {
			expect(err.message).to.contain('image cannot be null');
		}
	});

	it('requires image to not be an empty string', async () => {
		const product = Product.build({
			name: 'Candle',
			image: ''
		});

		try {
			await product.validate()
			throw Error('validation was successful but should have failed if image is an empty string');
		} catch (err) {
			expect(err.message).to.contain('Validation error');
		}
	});
});

// Routes

xdescribe('Products routes', () => {
	let storedProducts;

	const productData = [
		{ name: 'Candles', image: 'https://www.ikea.com/us/en/images/products/fenomen-unscented-block-candle-beige__0432192_PE586207_S4.JPG', category: 'lighting', price: 30 },
		{ name: 'Big Candles', image: 'https://www.cheatsheet.com/wp-content/uploads/2017/09/melted-candle.jpg', category: 'lighting', price: 60 }
	];

	beforeEach(async () => {
		const createdProducts = await Product.bulkCreate(productData)
		storedProducts = createdProducts.map(product => product.dataValues);
	});

	// Route for fetching all products
	describe('GET /api/products', () => {
		it('serves up all products', async () => {
			const response = await agent
				.get('/api/products')
				.expect(200);
			expect(response.body).to.have.length(2);
			expect(response.body[0].name).to.equal(storedProducts[0].name);
		});
	});

	// Route for fetching a single product
	describe('GET /api/products/:id', () => {
		it('serves up a single Product by its id', async () => {
			const response = await agent
				.get('/api/products/1')
				.expect(200);
			expect(response.body.name).to.equal('Candles');
		});
	});
});
