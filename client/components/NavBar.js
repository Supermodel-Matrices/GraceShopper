import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
	return (
		<div className="nav-container">
			<div className="nav-top">
			<nav>
			  <Link className="home-link undecorated-link" to="/">CORMORANT</Link>
				<Link to="/products">All</Link>
				<Link to="/products/category/ighting">Lighting</Link>
				<Link to="/products/category/greenery">Greenery</Link>
				<Link to="/products/category/textiles">Textiles</Link>
				<Link to="/products/category/walldecor">Wall Decor</Link>
				<Link to="/cart"><img src="./cart.png" className="cart-icon" /></Link>
			</nav>
			</div>
			<div className="nav-bottom">
				{props.user.id ?
				<Link to={`/user/${props.user.id}`}>Hi {props.user.name}!</Link> :
				<span><Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></span>}
				<Link to="/contact">Contact</Link>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart.cart
});

export default connect(mapStateToProps)(NavBar);
