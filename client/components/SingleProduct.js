import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../store/cart';
import axios from 'axios';

export class SingleProduct extends Component {
  constructor () {
    super();
    this.state = {
      product: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount () {
    const product = await axios.get(`/api/products/${this.props.match.params.id}`);
    this.setState({product: product.data});
  }

  render () {
		const product = this.state.product
    return (
      product ?
      <div className="right-panel">
        <div className="single-product">
          <div className="single-product-details">
            <button type="button" className="btn-main" onClick={() => this.props.addToCart(product.id)}>+ Add</button>
            <br />
            <br />
            <p className="bold">{product.name}</p>
            <p>{product.price} USD</p>
            <p>{product.description}</p>
          </div>
          <img className="single-product-image" src={product.image} />
          <div className="red-bg"></div>
        </div>
      </div> :
			null
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product))
});

export default connect(null, mapDispatchToProps)(SingleProduct);
