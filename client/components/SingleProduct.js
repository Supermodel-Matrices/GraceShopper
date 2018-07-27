import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/products';

export class SingleProduct extends Component {
  componentDidMount () {
		this.props.fetchProduct(this.props.match.params.id);
  }

  render () {
		const product = this.props.product
    return (
      product ?
      <div className="right-panel">
        <div className="single-product">
          <div className="single-product-details">
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

const mapStateToProps = (state) => ({
  product: state.products.currentProduct
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
