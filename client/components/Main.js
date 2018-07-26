import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import CartPage from './CartPage';

const Main = () => {
  return (
    <Router>
			<div id="main">
				<Switch>
					<Route exact path="/" component={AllProducts} />
					<Route exact path="/products" component={AllProducts} />
					<Route exact path="/products/:id" component={SingleProduct} />
					<Route exact path="/cart" component={CartPage} />
				</Switch>
			</div>
    </Router>
  )
}

export default Main;
