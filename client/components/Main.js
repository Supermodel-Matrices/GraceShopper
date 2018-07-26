import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';
import User from './User';
import SingleProduct from './SingleProduct';
import CartPage from './CartPage';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';

const Main = () => {
  return (
    <Router>
			<div id="main">
			  <div id="navbar">
					<NavBar />
				</div>
				<div id="component">
					<Switch>
						<Route exact path="/" component={AllProducts} />
						<Route exact path="/products" component={AllProducts} />
						<Route exact path="/products/:id" component={SingleProduct} />
						<Route exact path="/user" component={User} />
						<Route exact path="/cart" component={CartPage} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</div>
			</div>
    </Router>
  )
}

export default Main;
