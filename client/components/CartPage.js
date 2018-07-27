import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCartItems, removeItemFromCart } from '../store/cart';
import { getLoggedInUser } from '../store/user';
import store from '../store';

class CartPage extends Component {
	constructor() {
		super();
		this.state = {
			subtotal: 0,
			tax: 0,
			shipping: 3,
			total: 0,
			cartItems: []
		};
		this.getItem = this.getItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.calculatePrices = this.calculatePrices.bind(this);
	}

	//Function
	async getItem(productId) {
		const { data } = await axios.get(`/api/products/${productId}`);
		const product = data;
		return product;
	}

	async componentDidMount() {
		store.dispatch(getLoggedInUser());
		if (this.props.user.id) {
			const cartItems = [];
			for (let i = 0; i < this.props.cartKeys.length; i++) {
				const product = await this.getItem(this.props.cartKeys[i]);
				cartItems.push({ product: product, quantity: this.props.cart[this.props.cartKeys[i]] });
			}
			this.setState({ cartItems: cartItems })
		}
		this.calculatePrices(this.state.cartItems);
	}

	removeItem(id) {
		store.dispatch(removeItemFromCart(id));
		let newCart = this.state.cartItems;
		newCart.map(item => {
			if (item.product.id === id) {
				item.quantity--;
			}
		});
		this.setState({ cartItems: newCart });
		this.calculatePrices(this.state.cartItems);
	}

	calculatePrices(cartItems) {
		const newSubtotal = cartItems.reduce((acc, item) => { return acc + item.product.price * item.quantity; }, 0);
		const newTax = cartItems.reduce((acc, item) => { return acc + item.product.price * item.quantity; }, 0) * .15;
		this.setState({
			subtotal: newSubtotal,
			tax: newTax,
			total: newSubtotal + newTax,
		});
	}

	render() {
		return (
			<div className="right-panel">
				<div className="title">
					<h1>Your Shopping Cart</h1>
				</div>
				<div>
					{this.state.cartItems.length ?
						this.state.cartItems.map(item =>
							(<div key={item.product.id}>
								<Link to={`/products/${item.product.id}`}>
									<div>
										<img src={item.product.image} />
										<h4>{item.product.name}</h4>
										<p>{item.product.price} USD</p>
										<p>Q: {item.quantity}</p>
									</div>
								</Link>
								<button className="btn-main" type="button" onClick={() => this.removeItem(item.product.id)}>Remove</button>
							</div>
							))
						:
						<h1>No Items Currently In Your Cart</h1>
					}
				</div>
				<div className="cartInfo">
					<h3>Subtotal: &#36;{this.state.subtotal}</h3>
					<h3>Tax: &#36;{this.state.tax}</h3>
					<h3>Shipping: &#36;{this.state.shipping} </h3>
					<h2>Total: &#36;{this.state.total ? this.state.total + this.state.shipping : 0}</h2>
				</div>
				<Link to="/cart/checkout" >checkout</Link>
			</div>
		);
	}
}

const mapToState = (state) => ({
	user: state.user,
	cart: state.cart,
	cartKeys: Object.keys(state.cart),
	product: state.products.currentProduct,
});

const mapToDispatch = dispatch => ({
	getCartItems: () => dispatch(getCartItems())
});

export default connect(mapToState, mapToDispatch)(CartPage);


