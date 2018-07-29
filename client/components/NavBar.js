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
				<p className="nav-link"><Link to="/products">All</Link></p>
				<p className="nav-link"><Link to="/products/category/lighting">Lighting</Link></p>
				<p className="nav-link"><Link to="/products/category/greenery">Greenery</Link></p>
				<p className="nav-link"><Link to="/products/category/textiles">Textiles</Link></p>
				<p className="nav-link"><Link to="/products/category/walldecor">Wall Decor</Link></p>
				<p className="nav-link"><Link to="/cart"><img src="./cart.png" className="cart-icon" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="cart-count">{cartCount}</span></Link></p>
			</nav>
			</div>
			<div className="nav-bottom">
				{props.user.id ?
				<div>
					<p className="nav-link"><Link to={`/user/${props.user.id}`}>Hi {props.user.name}!</Link></p>
					<button type="button" onClick={props.logout} className="btn-main">Logout</button>
				</div> :
				<p className="nav-link"><span><Link to="/login">Login</Link>&nbsp;&nbsp;/&nbsp;&nbsp;<Link to="/signup">Signup</Link></span></p>}
				<p className="nav-link"><Link to="/contact">Contact</Link></p>
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
