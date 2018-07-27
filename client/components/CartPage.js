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
			shipping: 0,
			total: 0,
			cartItems: []
		};
		this.getItem = this.getItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
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
				cartItems.push(product);
			}
			this.setState({ cartItems: cartItems })
		}
	}

	removeItem(id) {
		store.dispatch(removeItemFromCart(id));
		this.setState({cartItems: this.state.cartItems.filter(item => item.id !== id)});
	}

	render() {
		return (
			<div className="singlePanel">
			  <div className="title">
					<h1>Your Shopping Cart</h1>
			  </div>
				<div>
					{this.state.cartItems.length ?
					this.state.cartItems.map(item =>
						(<div key={item.id}>
							<Link to={`/products/${item.id}`}>
								<div>
									<img src={item.image} />
									<h4>{item.name}</h4>
									<p>{item.price} USD</p>
								</div>
							</Link>
							<button type="button" onClick={() => this.removeItem(item.id)}>Remove</button>
					  </div>
						))
					:
					<h1>No Items Currently In Your Cart</h1>
					}
				</div>
				<div className="cartInfo">
					<h3>Subtotal: {this.state.subtotal} </h3>
					<h3>Tax: {this.state.tax}</h3>
					<h3>Shipping: {this.state.shipping} </h3>
					<h2>Total: {this.state.total}</h2>
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

