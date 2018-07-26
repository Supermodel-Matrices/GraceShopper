import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../store/user';

class Signup extends Component {
	constructor () {
		super();
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
	handleSubmit (evt) {
		evt.preventDefault();
		this.props.signup(this.state);
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="name">Username</label>
						<input type="name" name="name" onChange={this.handleChange} value={this.state.name} />
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
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
	  signup: (formData) => dispatch(signup(formData))
	}
}

export default connect(null, mapDispatchToProps)(Signup);
