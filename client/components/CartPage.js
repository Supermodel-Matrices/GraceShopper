import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getCart, addToCart, removeFromCart} from '../store/cart';

class CartPage extends Component {
	constructor() {
		super();
		this.state = {
			subtotal: 0,
			tax: 0,
			shipping: 100,
			total: 0,
			cartItems: []
		};
		this.getItem = this.getItem.bind(this);
		this.addItem = this.addItem.bind(this);
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
		const cartItems = [];
		const cart = await this.props.getCart();
		const cartKeys = Object.keys(cart);
		for (let i = 0; i < cartKeys.length; i++) {
			const product = await this.getItem(this.props.cartKeys[i]);
			cartItems.push({product: product, quantity: cart[cartKeys[i]]});
		}
		this.setState({cartItems: cartItems})
		this.calculatePrices(this.state.cartItems);
	}

	addItem(id) {
		let newCart = this.state.cartItems;
		newCart.map(item => {
			if (item.product.id === id) {
					item.quantity++;
			}
		});
		this.setState({cartItems: newCart});
		this.props.addToCart(id);
		this.calculatePrices(newCart);
	}

	removeItem(id) {
		let newCart = this.state.cartItems;
		newCart.map(item => {
			if (item.product.id === id) {
				if (item.quantity === 1) {
					newCart = newCart.filter(item => item.product.id !== id)
				} else {
					item.quantity--;
				}
			}
		});
		this.setState({ cartItems: newCart });
		this.props.removeFromCart(id);
		this.calculatePrices(newCart);
	}

	calculatePrices(cartItems) {
		const newSubtotal = cartItems.length ? cartItems.reduce((acc, item) => { return acc + item.product.price * item.quantity; }, 0) : 0;
		const newTax = cartItems.length ? cartItems.reduce((acc, item) => { return acc + item.product.price * item.quantity; }, 0) * .15 : 0;
		this.setState({
			subtotal: newSubtotal,
			tax: newTax,
			total: newSubtotal + newTax,
		});
	}

	render() {
		return (
			<div className="right-panel">
				<div className="cart">
					<div className="cart-heading">
						<p className="bold">Product</p>
						<p className="bold">Quantity</p>
					</div>
					<div className="cart-items">
						{this.state.cartItems.length ?
							this.state.cartItems.map(item =>
								(<div key={item.product.id}>
										<div className="cart-row">
											<Link to={`/products/${item.product.id}`} className="undecorated-link unpadded-link cart-image">
												<img src={item.product.image} />
											</Link>
											<p>{item.product.name}</p>
											<p>{item.product.price} USD</p>
											<div className="cart-quantity">
												<button className="btn-main" type="button" onClick={() => this.removeItem(item.product.id)}>—</button>
												<p>{item.quantity}</p>
												<button className="btn-main" type="button" onClick={() => this.addItem(item.product.id)}>+</button>
											</div>
										</div>
								 </div>
								))
							:
							<h1>No Items Currently In Your Cart</h1>
						}
					</div>
					<div className="cart-cost">
						<p><span className="bold">Subtotal</span><span> {this.state.subtotal}</span></p>
						<p><span className="bold">Tax</span><span> {this.state.tax}</span></p>
						<p><span className="bold">Shipping</span><span> {this.state.shipping}</span></p>
						<p><span className="bold">TOTAL</span><span> {this.state.total ? this.state.total + this.state.shipping : 0} USD</span></p>
						<Link to="/cart/checkout" className="link-bordered unpadded-link">Checkout</Link>
					</div>
				</div>
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
		getCart: () => dispatch(getCart()),
		addToCart: (id) => dispatch(addToCart(id)),
		removeFromCart: (id) => dispatch(removeFromCart(id))
});

export default connect(mapToState, mapToDispatch)(CartPage);
