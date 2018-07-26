import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartItems, removeItemFromCart } from '../store/cart';

class CartPage extends Component {
    constructor() {
        super()
        this.state = {
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
        }
    }

    componentDidMount() {
        this.props.getCartItems();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Your Shopping Cart</h1>
                <div>
                        {this.props.cart.length ?
                            this.props.cart.map(product =>
                                (<div key={product.id}>
                                    <Link to={`/products/${product.id}`}>
                                        <div>
                                            <img src={product.image} />
                                            <h4>{product.name}</h4>
                                            <p>{product.price}</p>
                                        </div>
                                        {/*Quantity Adjustment Menu*/}
                                    </Link>
                                    <button type="button" onClick={() => this.props.removeItemFromCart(product.id)}>Remove</button>
                                 </div>)) :
                            <h1>No Items Currently In Your Cart</h1>}
                </div>
                <h3>Subtotal: {this.state.subtotal} </h3>
                <h3>Tax: {this.state.tax}</h3>
                <h3>Shipping: {this.state.shipping} </h3>
                <h1>Total: {this.state.total}</h1>
                <Link to="/" /> {/*Link To Confirmation Page*/}
            </React.Fragment>
        )
    }
}

const mapToState = (state) => ({
    cart: state.cart.cart,
});

const mapToDispatch = dispatch => ({
    getCartItems: () => dispatch(getCartItems()),
    removeItemFromCart: (productId) => dispatch(removeItemFromCart(product))
});

export default connect(mapToState, mapToDispatch)(CartPage);

