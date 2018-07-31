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
							<p className="nav-link"><Link to="/products">All</Link></p>
							<p className="nav-link"><Link to="/products/category/lighting">Lighting</Link></p>
							<p className="nav-link"><Link to="/products/category/greenery">Greenery</Link></p>
							<p className="nav-link"><Link to="/products/category/textiles">Textiles</Link></p>
							<p className="nav-link"><Link to="/products/category/wall-decor">Wall Decor</Link></p>
							<p className="nav-link"><Link to="/cart"><img src="https://cdn1.iconfinder.com/data/icons/social-productivity-line-art-4/128/shopping-cart2-512.png" className="cart-icon" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="cart-count">{cartCount}</span></Link></p>
					</nav>
					</div>
					<div className="nav-bottom">
					{this.props.user.id ?
				<div>
					<p className="nav-link"><Link to={this.props.user.admin ? '/admin' : `/user/${this.props.user.id}`}>Hi {this.props.user.name}!</Link></p>
					<button type="button" onClick={this.props.logout} className="btn-main">Logout</button>
				</div> :
				<p className="nav-link"><span><Link to="/login">Login</Link>&nbsp;&nbsp;/&nbsp;&nbsp;<Link to="/signup">Signup</Link></span></p>}
				<p className="nav-link"><Link to="/contact">Contact</Link></p>
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
