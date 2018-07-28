import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {logoutUser} from '../store/user';

const NavBar = (props) => {
	let cartQuantities = (Object.values(props.cart));
	let cartCount = cartQuantities.length ? cartQuantities.reduce((acc, i) => acc + i, 0) : 0;
	return (
		<div className="nav-container">
			<div className="nav-top">
			<nav>
			  <Link className="home-link undecorated-link" to="/">CORMORANT</Link>
				<Link to="/products">All</Link>
				<Link to="/products/category/lighting">Lighting</Link>
				<Link to="/products/category/greenery">Greenery</Link>
				<Link to="/products/category/textiles">Textiles</Link>
<<<<<<< HEAD
				<Link to="/products/category/wall-decor">Wall Decor</Link>
				<Link to="/cart"><img src="./cart.png" className="cart-icon" /></Link>
=======
				<Link to="/products/category/walldecor">Wall Decor</Link>
				<Link to="/cart"><img src="./cart.png" className="cart-icon" /><span className="cart-count">{cartCount}</span>
				</Link>
>>>>>>> 9d4533199b0f349396e5a4b8f89dfd8156b648da
			</nav>
			</div>
			<div className="nav-bottom">
				{props.user.id ?
				<div>
					<Link to={`/user/${props.user.id}`}>Hi {props.user.name}!</Link>
					<button type="button" onClick={props.logout} className="btn-main">Logout</button>
				</div> :
				<span><Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></span>}
				<Link to="/contact">Contact</Link>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
		dispatch(logoutUser());
		ownProps.history.push('/');
	}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
