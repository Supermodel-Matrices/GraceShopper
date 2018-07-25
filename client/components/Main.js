import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';
<<<<<<< HEAD
import User from './User';
=======
import SingleProduct from './SingleProduct';
>>>>>>> 5952ee671fe9b2818e2193ddfb1467340e4fe204

const Main = () => {
  return (
    <Router>
			<div id="main">
				<Switch>
					<Route exact path="/" component={AllProducts} />
<<<<<<< HEAD
					<Route exact path="/user" component={User} />
=======
					<Route exact path="/products" component={AllProducts} />
					<Route exact path="/products/:id" component={SingleProduct} />
>>>>>>> 5952ee671fe9b2818e2193ddfb1467340e4fe204
				</Switch>
			</div>
    </Router>
  )
}

export default Main;
