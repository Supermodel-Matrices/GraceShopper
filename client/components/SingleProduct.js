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
			<div>
				<h1>{product.name}</h1>
				<img src={product.image} />
				<p>{product.description}</p>
				<p>{product.price}</p>
			</div> :
			null
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.products.currentProduct
})

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)