import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            subtotal: 0,
			tax: 0,
			shipping: 0,
			total: 0,
			cartItems: []
        };
    }

    componentDidMount() {
        this.setState({
            subtotal: this.props.location.state.subtotal,
			tax:  this.props.location.state.tax,
			shipping: this.props.location.state.shipping,
			total: this.props.location.state.total,
            cartItems: this.props.location.state.cartItems
        });
    }

    render() {
        return (
            <div className="right-panel">
                <div className="title">
                    <h1>CHECKOUT</h1>
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
                             </div>
                            ))
                        :
                        <h1>No Items To Checkout</h1>
                    }
                </div>
                <div className="cartInfo">
					<h3>Subtotal: &#36;{this.state.subtotal}</h3>
					<h3>Tax: &#36;{this.state.tax}</h3>
					<h3>Shipping: &#36;{this.state.shipping} </h3>
					<h2>Total: &#36;{this.state.total ? this.state.total + this.state.shipping : 0}</h2>
				</div>
            </div>
        );
    }
}

export default Checkout;


