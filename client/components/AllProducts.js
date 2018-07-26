import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom'

class AllProducts extends Component {

  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    return (
      <div className='product-container'>
      {this.props.allProducts.length ?
				<ul className='product-list'>
        {this.props.allProducts.map(product =>
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className='product-preview'>
              <img src={product.image} />
              <p>{product.name}</p>
              <p>{product.price} USD</p>
            </div>
          </Link>
				)}
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
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
