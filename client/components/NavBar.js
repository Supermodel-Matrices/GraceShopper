import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
	return (
		<div>
			<Link to="/">CORMORANT</Link>
			<nav>
				<Link to="/products">All</Link>
				<Link to="/products/lighting">Lighting</Link>
				<Link to="/products/greenery">Greenery</Link>
				<Link to="/products/textiles">Textiles</Link>
				<Link to="/products/walldecor">Wall Decor</Link>
				<Link to="/cart"><img src="carticonhere" /></Link>
			</nav>

			{props.user.id ?
			<Link to={`/user/${props.user.id}`}>Hi {props.user.name}!</Link> :
			<span><Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></span>}
			<Link to="/contact">Contact</Link>

		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(NavBar);