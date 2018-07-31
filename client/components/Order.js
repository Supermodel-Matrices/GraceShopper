import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Order extends Component {
	constructor() {
		super();
		this.state = {
			orderItems: []
		};
		this.getItem = this.getItem.bind(this);
	}

	//Function
	async getItem(productId) {
		const {data} = await axios.get(`/api/products/${productId}`);
		const product = data;
		return product;
	}

	async componentDidMount() {
		const orderItems = [];
		const order = this.props.order.items;
		const orderKeys = Object.keys(order);
		for (let i = 0; i < orderKeys.length; i++) {
			const product = await this.getItem(orderKeys[i]);
			orderItems.push({product: product, quantity: order[orderKeys[i]]});
		}
		this.setState({orderItems: orderItems})
	}

  render () {
    return (
		<div className="order-container">
		<div className="cart-items">
			<div className="cart-heading">
				<p className="bold">Order #{this.props.order.id}</p>
				<p className="bold">Total ${this.props.order.total}</p>
			</div>
			<div>
				{this.state.orderItems.map(item => (
					<div key={item.product.id}>
						<div className="cart-row">
							<Link to={`/products/${item.product.id}`} className="undecorated-link unpadded-link cart-image">
								<img src={item.product.image} />
							</Link>
							<p>{item.product.name}</p>
							<p>{item.product.price} USD</p>
							<div className="cart-quantity">
								<p>x {item.quantity}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
		</div>
		)
  }
}

export default Order;
