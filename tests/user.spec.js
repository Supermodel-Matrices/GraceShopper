import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserComponent} from '../client/components/User';
import {Order} from '../client/components/Order';
import store from '../client/store';
import {User} from '../server/db';
import app from '../server';
const agent = require('supertest')(app);
const adapter = new Adapter()
enzyme.configure({adapter})

// Front-end
describe('Front-End', () => {
	let user;

	beforeEach( async () => {
		const userToDisplay = { name: 'Alex Roger', email: 'atown@email.com', password: '123S' };
		user = shallow(<UserComponent user={userToDisplay} />);
	});

	describe('<User /> component', () => {

		// it('has a `user` on its state', () => {
		// 	user.setState({user: userToDisplay});
		// 	expect(user.state().user).to.exist;
		// });

		it('renders a user profile', async () => {
			expect(user.find('.user-container')).to.have.length(1);
		});

		it('renders the user email in a p tag', () => {
      expect(user.find('p').text().trim()).to.be.equal('atown@email.com');

    });

		// it('renders user\'s past orders', async () => {
		// 	const allProducts = shallow(<AllProducts store={store} allProducts={products} fetchProducts={fetchProducts} />);
		// 	expect(allProducts.find('Link')).to.have.length(5);
		// });
	});
});

// Model
describe('User model', () => {

	it('requires name of user', async () => {
		const user = User.build();

		try {
			await user.validate()
			throw Error('validation was successful but should have failed without `name`');
		}
		catch (err) {
			expect(err.message).to.contain('name cannot be null');
		}
	});

	it('requires name to not be an empty string', async () => {
		const user = User.build({
			name: '',
			email: 'atown@email.com',
			password: 'abc',
		});

		try {
			await user.validate();
			throw Error('validation was successful but should have failed if name is an empty string');
		} catch (err) {
			expect(err.message).to.contain('Validation error');
		}
	});

});

// Routes
describe('User route', () => {

	beforeEach(async () => {
		const userToCreate = { name: 'Alex Roger', email: 'atown@email.com', password: '123S' };
		const user = await User.create(userToCreate);
	});

	// Route to fetch a single user
	describe('GET /api/user/:id', () => {

		it('serves up a single user by id', async () => {
			const response = await agent
				.get('/api/user/1')
				.expect(200);
			expect(response.body.name).to.equal('Alex Roger');
		});

	});

});
