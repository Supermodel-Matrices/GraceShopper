import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';
import User from './User';
import SingleProduct from './SingleProduct';
import CartPage from './CartPage';
import NavBar from './NavBar';
import Login from './Login';

const Main = () => {
  return (
    <Router>
			<div id="main">
			<NavBar />
				<Switch>
					<Route exact path="/" component={AllProducts} />
					<Route exact path="/user" component={User} />
					<Route exact path="/products" component={AllProducts} />
					<Route exact path="/products/:id" component={SingleProduct} />
					<Route exact path="/cart" component={CartPage} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</div>
    </Router>
  )
}

export default Main;
