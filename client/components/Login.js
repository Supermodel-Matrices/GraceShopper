import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../store/auth';

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
		login(this.state);
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" onChange={this.handleChange} />
					</div>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
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