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
            cart: {},
            cartItems: []
        };
    }

    componentDidMount() {
        this.setState({
            subtotal: this.props.location.state.subtotal,
            tax: this.props.location.state.tax,
            shipping: this.props.location.state.shipping,
            total: this.props.location.state.total,
            cart: this.props.location.state.cart,
            cartItems: this.props.location.state.cartItems
        });

        //Runs Script For Stripe Checkout And Appends To Page. Can't Run Script In JSX
        const script = document.createElement('script');
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.className = 'stripe-button';
        script.dataset.key = 'pk_test_Eiah13e1Nj0s73VpTZ4T36u8';
        script.dataset.amount = this.props.location.state.total;
        script.dataset.name = 'Supermodel Matrixes';
        script.dataset.description = 'PAY ME!!!';
        script.dataset.image = '/cart.png';
        script.dataset.locale = 'auto';
        script.dataset.zipCode = 'true'; // Note camelCase!
        let form = document.getElementById('stripe');
        form.appendChild(script);
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
                <div>
                    <form action="/charge" method="POST" id="stripe" />
                </div>
            </div>
        );
    }
}

export default Checkout;


