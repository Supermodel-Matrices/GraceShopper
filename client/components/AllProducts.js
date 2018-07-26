import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom'
import { addItemToCart } from '../store/cart';

export class AllProducts extends Component {

  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    return (
      <div className='product-container'>
      {this.props.allProducts.length ?
				<ul className='product-list'>
        {this.props.allProducts.map(product =>
        (<div key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className='product-preview'>
              <img src={product.image} />
              <p>{product.name}</p>
              <p>{product.price} USD</p>
            </div>
          </Link>
          <button type="button" onClick={() => this.props.addItemToCart(product)}>Add To Cart</button>
         </div>))}
				</ul>
			:
			<h1>No products now!</h1>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.products.allProducts
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addItemToCart: (product) => dispatch(addItemToCart(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
