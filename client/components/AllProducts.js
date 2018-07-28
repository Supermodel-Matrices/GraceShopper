import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart';

export class AllProducts extends Component {

  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    return (
      <React.Fragment>
        {this.props.allProducts.length
        ?
        <ul className="product-list">
          {this.props.allProducts.map(product => (
            <div key={product.id}>
              <div className="product-preview">
                <Link to={`/products/${product.id}`} className="undecorated-link">
                  <img src={product.image} />
                </Link>
                <div className="product-preview-details">
                  <button type="button" className="btn-main" onClick={() => this.props.addToCart(product.id)}>+ Add</button>
                  <Link to={`/products/${product.id}`} className="undecorated-link">
                    <p>{product.name}</p>
                    <p>{product.price} USD</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </ul>
        :
        <h1>No products now!</h1>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.products.allProducts
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addToCart: (productId) => dispatch(addToCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
