import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Order from './Order';
import store from '../store';
import {getLoggedInUser} from '../store/user';
import {withRouter} from 'react-router-dom';

export class User extends Component {
  constructor () {
    super();
    this.state = {
      user: {}
    }
  }

  async componentDidMount () {
    await this.props.loadInitialData();
    if (+this.props.match.params.id === this.props.user.id) {
      const user = await axios.get(`/api/user/${this.props.match.params.id}`);
      this.setState({
        user: user.data
      });
    }
  }

  render () {
    return (
      <div className="user-container">
      {this.state.user.id ?
        (
        <div>
          <h1>{this.state.user.name}</h1>
          <p>Email: {this.state.user.email}</p>
          <div>
            {this.state.user.orders.length ?
              this.state.user.orders.map(order => (
              <Order key={order.id} order={order} />
              ))
            :
            'No order history.'
            }
          </div>
        </div>
        ) :
        <p>Sorry, you have no authorization to access this page.</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      return dispatch(getLoggedInUser())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(User));
