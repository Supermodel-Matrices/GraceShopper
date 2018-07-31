import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../store/user';
import axios from 'axios';

export class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: {}
    }
  }

  async componentDidMount() {
    await this.props.loadInitialData();
    const product = await axios.get(`/api/products/${this.props.match.params.id}`);
    this.setState({ product: product.data });
  }

  handleChange() {

  }

  handleSubmit() {

  }

  render() {
    const product = this.state.product
    return (
      this.props.user.admin ?
        <div className="right-panel">
          <div className="sigin-login">
            <form className="form-main" onSubmit={this.handleSubmit}>
              <div className="form-main-field">
                <label htmlFor="image">Product Image URL</label>
                <input type="image" name="image" value={product.image} onChange={this.handleChange} />
              </div>
              <p className="bold">{product.name}</p>
              <p>{product.price} USD</p>
              <p>{product.description}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
