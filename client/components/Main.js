import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';

const Main = () => {
  return (
    <Router>
			<div id="main">
				<Switch>
					<Route exact path="/" component={AllProducts} />
				</Switch>
			</div>
    </Router>
  )
}

export default Main