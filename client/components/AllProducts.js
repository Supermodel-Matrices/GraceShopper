import React, {Component} from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom'
=======
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
// import { Link } from 'react-router-dom'
>>>>>>> 25801d2f3d0f7c99b537c55e84e50011fcd2c07a

class AllProducts extends Component {
  
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    return (
      this.props.allProducts.length ?
      <div>
				<ul>
        {this.props.allProducts.map(product => 
          <Link to={`/products/${product.id}`} key={product.id}>
            <div>
              <img src={product.image} />
              <h4>{product.name}</h4>
              <p>{product.price}</p>
            </div>
          </Link>
				)}
				</ul>
			</div> :
			<div><h1>No products now!</h1></div>
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
