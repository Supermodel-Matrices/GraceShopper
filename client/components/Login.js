import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../store/user';
import {Link} from 'react-router-dom';

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
	handleSubmit (evt) {
		evt.preventDefault();
		this.props.login(this.state);
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
						<div className="form-main-field">
							<label htmlFor="password">password </label>
							<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
						</div>
						<div>
							<button type="submit" className="btn-main btn-right">submit</button>
						</div>
					</form>
					<form className="form-main" method="get" action="/auth/google">
						<button type="submit" className="btn-main">login with google</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	  login: (formData) => dispatch(login(formData))
	}
}

export default connect(null, mapDispatchToProps)(Login);
