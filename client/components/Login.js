import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../store/user';

class Login extends Component {
	constructor () {
		super();
		this.state = {
			email: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value});
	}
	async handleSubmit (evt) {
		evt.preventDefault();
		let status;
		if (Object.keys(this.props.cart).length) {
			status = await this.props.login({...this.state, cart: this.props.cart});
		} else {
			status = await this.props.login(this.state);
		}
		if (status === 401) {
			console.log('this is 401 block');
			document.getElementById('error').innerHTML = 'login failed - try again';
		}
		else {
			console.log('this is else block');
			this.props.history.push('/products');
		}
	}

	render () {
		return (
			<div className="right-panel">
				<div className="signin-login">
					<p>Log In</p>
					<br />
					<br />
					<form className="form-main" onSubmit={this.handleSubmit}>
						<div className="form-main-field">
							<label htmlFor="email">email </label>
							<input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
						</div>
						<span>&nbsp;</span>
						<div className="form-main-field">
							<label htmlFor="password">password </label>
							<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
						</div>
						<span id="error">&nbsp;</span>
						<div>
							<button type="submit" className="btn-main btn-right">submit</button>
						</div>
					</form>
					<br />
					<p>or</p>
					<br />
					<form className="form-main" method="get" action="/auth/google">
						<button type="submit" className="btn-main">login with google</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	login: (formData) => dispatch(login(formData))
});

const mapStateToProps = (state) => ({
  cart: state.cart
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
