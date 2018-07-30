import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../store/user';
import {withRouter} from 'react-router-dom';

class Signup extends Component {
	constructor (props) {
		super(props);
		this.state = {
      name: '',
			email: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
  handleChange (evt) {
    this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	async handleSubmit (evt) {
		evt.preventDefault();
		const status = await this.props.signup(this.state);
		if (status === 409) {
			document.getElementById('error').innerHTML = 'email is already registered';
		}
		else {
			this.props.history.push('/products');
		}
	}

	render () {
		return (
			<div className="right-panel">
				<div className="signin-login">
					<p>Create an Account</p>
					<br />
					<br />
					<form className="form-main" onSubmit={this.handleSubmit}>
						<div className="form-main-field">
							<label htmlFor="name">name</label>
							<input type="name" name="name" onChange={this.handleChange} value={this.state.name} />
						</div>
						<span>&nbsp;</span>
						<div className="form-main-field">
							<label htmlFor="email">email</label>
							<input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
						</div>
						<span id="error">&nbsp;</span>
						<div className="form-main-field">
							<label htmlFor="password">password </label>
							<input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
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
						<button type="submit" className="btn-main">signup with google</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
		cart: state.cart
});

const mapDispatchToProps = (dispatch) => ({
	  signup: (formData) => dispatch(signup(formData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
