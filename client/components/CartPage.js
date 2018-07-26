import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCartItems, removeItemFromCart } from '../store/cart';

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
    }

    async componentDidMount() {
        const cartItems = [];
        for (let i = 0; i < this.props.cartKeys.length; i++) {
            const product = await this.getItem(this.props.cartKeys[i]);
            cartItems.push(product);
        }
        this.setState({ cartItems: cartItems })
    }

    componentDidUpdate() {

    }

    //Function
    async getItem(productId) {
        const { data } = await axios.get(`/api/product/${productId}`);
        const product = data;
        return product;
    }

    render() {
        return (
            <React.Fragment>
                <h1>Your Shopping Cart</h1>
                <div>
                    {this.state.cartItems.length ?
                        this.state.cartItems.map(item =>
                            <div key={item.id}>
                                <Link to={`/products/${cart[cartKeys[i]].id}`}>
                                    <div>
                                        <img src={this.props.product.image} />
                                        <h4>{this.props.product.name}</h4>
                                        <p>{this.props.product.price}</p>
                                    </div>
                                </Link>
                                <button type="button" onClick={() => this.props.removeItemFromCart(cart[cartKeys[i]].id)}>Remove</button>
                            </div>
                        )
                        :
                        <h1>No Items Currently In Your Cart</h1>}
                </div>
                <h3>Subtotal: {this.state.subtotal} </h3>
                <h3>Tax: {this.state.tax}</h3>
                <h3>Shipping: {this.state.shipping} </h3>
                <h1>Total: {this.state.total}</h1>
                <Link to="/" /> {/*Link To Confirmation Page*/}
            </React.Fragment>
        );
    }
}

const mapToState = (state) => ({
    cart: state.cart,
    cartKeys: Object.keys(state.cart),
    product: state.products.currentProduct,
});

const mapToDispatch = dispatch => ({
    getCartItems: () => dispatch(getCartItems()),
    removeItemFromCart: (productId) => dispatch(removeItemFromCart(productId)),
    getItem: (id) => dispatch(getItem(id))
});

export default connect(mapToState, mapToDispatch)(CartPage);

