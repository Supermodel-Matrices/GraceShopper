import React, {Component} from 'react';
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
		const { data } = await axios.get(`/api/products/${productId}`);
		const product = data;
		return product;
	}

	async componentDidMount() {
		const orderItems = [];
		const order = this.props.order.items;
		const orderKeys = Object.keys(order);
		console.log(orderKeys);
		for (let i = 0; i < orderKeys.length; i++) {
			const product = await this.getItem(orderKeys[i]);
			orderItems.push({product: product, quantity: order[orderKeys[i]]});
		}
		this.setState({ orderItems: orderItems })
	}

  render () {
    return (<div className="order-container">
              <div className="order-left">
                <span>Order # {this.props.order.id}</span>
                <span>Total: ${this.props.order.total}</span>
              </div>
              <div className="order-right">
                <span>
                  {this.state.orderItems.map(item => (
                    <div key={item.product.id}>
                      <img src={item.product.image} className="order-product-image" />
                      <span>{item.product.name}</span>
                      <span> x {item.quantity}</span>
                    </div>
                  ))}
                </span>
              </div>
            </div>)
  }
}

export default Order;
