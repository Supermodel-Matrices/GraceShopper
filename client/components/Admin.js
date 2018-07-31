import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Order from './Order';
import store from '../store';
import {getLoggedInUser} from '../store/user';
import {fetchProducts} from '../store/products';
import {withRouter, Link} from 'react-router-dom';

export class Admin extends Component {
  constructor () {
    super();
    this.state = {
      managingProducts: false,
      managingUsers: false,
      allUsers: []
    }
    this.manageProducts = this.manageProducts.bind(this);
    this.manageUsers = this.manageUsers.bind(this);
  }

  manageProducts () {
    this.setState({managingProducts: !this.state.managingProducts});
  }

  manageUsers () {
    this.setState({managingUsers: !this.state.managingUsers});
  }

  async componentDidMount () {
    await this.props.loadInitialData();
    await this.props.fetchProducts();
    const users = await axios.get('/api/users');
    this.setState({allUsers: users.data});
  }

  render () {
    return (
      <div className="user-container">
      {this.props.user.admin ?
        (
        <div className="flex-col">
          <div className="product-list">
            <h1>Welcome back! {this.props.user.name}</h1>
          </div>
          <button type="button" className="btn-main" onClick={this.manageProducts}>+ Manage Products</button>
          {this.state.managingProducts ?
          <div className="product-list">
            {this.props.products.map(product =>
              (
              <div key={product.id} className="product-preview-small">
                <img src={product.image} />
                <p>{product.name}</p>
                <Link to={`/products/${product.id}/edit`}><button type="button" className="btn-main">- Edit</button></Link>
              </div>
              ))}
          </div> :
          null
          }
          <button type="button" className="btn-main" onClick={this.manageUsers}>+ Manage Users</button>
          {this.state.managingUsers ?
          <div className="user-list">
            {this.state.allUsers.map(user =>
              (
              <div key={user.id}>
                <p>{user.name}</p>
                <button type="button" className="btn-main">- Remove</button>
              </div>
              ))}
          </div> :
          null
          }
        </div>
        ) :
        <p>Sorry, you have no authorization to access this page.</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.allProducts,
  user: state.user
});

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(getLoggedInUser()),
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Admin));
