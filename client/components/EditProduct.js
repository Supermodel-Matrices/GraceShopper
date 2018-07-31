import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../store/user';
import axios from 'axios';

export class EditProduct extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      description: '',
      category: '',
      price: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.loadInitialData();
    const product = await axios.get(`/api/products/${this.props.match.params.id}`);
    this.setState({
      image: product.data.image,
      name: product.data.name,
      description: product.data.description,
      category: product.data.category,
      price: product.data.price,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await axios.put(`/api/products/${this.props.match.params.id}`, this.state);
    this.props.history.push('/admin');
  }

  render() {
    return (
      this.props.user.admin ?
        <div className="right-panel">
          <div className="signin-login">
            <form className="form-main" onSubmit={this.handleSubmit}>
              <div className="form-main-field">
                <label htmlFor="image">Product Image URL</label>
                <input type="text" name="image" value={this.state.image} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="name">Product Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="description">Product Description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="category">Product Category</label>
                <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="price">Product Price</label>
                <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
              </div>
              <div>
                <button type="submit" className="btn-main btn-right">submit</button>
              </div>
            </form>
          </div>
        </div> :
        <p>Sorry, you have no authorization to access this page.</p>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(getLoggedInUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
