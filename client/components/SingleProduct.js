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
      <div className="singlePanel">
        <div className="single-product">
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price} USD</p>
          <img className="single-product-image" src={product.image} />
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
