import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../store/user';

class Signup extends Component {
	constructor (props) {
		super(props);
		this.state = {
      name: '',
			email: '',
			password: '',
			cart: props.cart
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
			<div className="right-panel">
				<form className="form-main" onSubmit={this.handleSubmit}>
					<div className="form-main-field">
						<label htmlFor="name">name</label>
						<input type="name" name="name" onChange={this.handleChange} value={this.state.name} />
					</div>
					<div className="form-main-field">
						<label htmlFor="email">email</label>
						<input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
					</div>
					<div className="form-main-field">
						<label htmlFor="password">password </label>
						<input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
					</div>
					<div>
						<button type="submit" className="btn-main">submit</button>
					</div>
				</form>
				<form className="form-main" method="get" action="/auth/google">
					<button type="submit" className="btn-main">signup with google</button>
				</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
