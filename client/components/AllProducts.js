import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
// import { Link } from 'react-router-dom'

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
          <li key={product.id}>{product.name}</li>
				)}
				</ul>
			</div> :
			<div><h1>No products now!</h1></div>
    )
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.products
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)