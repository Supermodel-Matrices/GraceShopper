import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart';

export class AllProducts extends Component {
  constructor () {
    super();
    this.state = {
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount () {
    this.props.fetchProducts();
  }

  handleChange (evt) {
    this.setState({searchTerm: evt.target.value});
  }

  render () {
    let products
    this.props.match.params.cat
    ?
    products = this.props.allProducts.filter(product => product.category === this.props.match.params.cat)
    :
    (this.state.searchTerm ?
    products = this.props.allProducts.filter(product =>
    product.name.match((new RegExp(this.state.searchTerm, "gi"))) || product.name.match((new RegExp(this.state.searchTerm, "gi")))) :
    products = this.props.allProducts);

    return (
      <React.Fragment>
        {!this.props.match.params.cat ?
        <div id="searchbar">
          <input id="search" type="text" onChange={this.handleChange} value={this.state.searchTerm} />
          <button className="search-btn" type="button" >
            <img src="https://cdn4.iconfinder.com/data/icons/webshop/32/search-01-512.png" className="cart-icon" />
          </button>
        </div> :
        null}
        {products.length
        ?
        <ul className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-preview">
              <Link to={`/products/${product.id}`} className="undecorated-link unpadded-link">
                <img src={product.image} />
              </Link>
              <div className="product-preview-details">
                <button type="button" className="btn-main" onClick={() => this.props.addToCart(product.id)}>+ Add</button>
                <Link to={`/products/${product.id}`} className="undecorated-link unpadded-link">
                  <p>{product.name}</p>
                  <p>{product.price} USD</p>
                </Link>
              </div>
            </div>
          ))}
        </ul>
        :
        <ul className="product-list">
          <h1>No products available.</h1>
        </ul>
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
