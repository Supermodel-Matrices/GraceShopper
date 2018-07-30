import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {logoutUser} from '../store/user';
import {getCart} from '../store/cart';

export class NavBar extends Component {
	componentDidMount () {
		this.props.getCart();
	}

	render () {
		let cartQuantities = (Object.values(this.props.cart));
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
						<Link to="/products/category/walldecor">Wall Decor</Link>
						<Link to="/cart"><img src="./cart.png" className="cart-icon" /><span className="cart-count">{cartCount}</span>
						</Link>
					</nav>
					</div>
					<div className="nav-bottom">
						{this.props.user.id ?
						<div>
							<Link to={`/user/${this.props.user.id}`}>Hi {this.props.user.name}!</Link>
							<button type="button" onClick={this.props.logout} className="btn-main">Logout</button>
						</div> :
						<span><Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></span>}
						<Link to="/contact">Contact</Link>
					</div>
				</div>
			)
		}
}

const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
		dispatch(logoutUser());
		ownProps.history.push('/');
	},
	getCart: () => dispatch(getCart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
