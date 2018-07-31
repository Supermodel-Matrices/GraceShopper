import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import Home from './home';
import AllProducts from './AllProducts';
import User from './User';
import SingleProduct from './SingleProduct';
import CartPage from './CartPage';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import Checkout from './Checkout';
import Admin from './Admin';
import Success from './Success';
import EditProduct from './EditProduct';
import {getLoggedInUser} from '../store/user';

class Main extends Component {
	componentDidMount() {
    this.props.loadInitialData()
	}

  render() {
		return (
			<div id="main">
				<div id="navbar">
					<NavBar />
				</div>
				<div className="container">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/products" component={AllProducts} />
						<Route exact path="/products/category/:cat" component={AllProducts} />
						<Route exact path="/products/:id" component={SingleProduct} />
						<Route exact path="/products/:id/edit" component={EditProduct} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/user/:id" component={User} />
						<Route exact path="/cart" component={CartPage} />
						<Route exact path="/cart/checkout" component={Checkout} />
						<Route exact path="/success" component={Success} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</div>
			</div>
		)
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getLoggedInUser())
    }
  }
}


export default withRouter(connect(mapState, mapDispatch)(Main));
