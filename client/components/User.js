import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Order from './Order';
import store from '../store';
import {getLoggedInUser} from '../store/user';

export class User extends Component {
  constructor () {
    super();
    this.state = {
      user: {}
    }
  }

  async componentDidMount () {
    const user = await axios.get(`/api/user/${this.props.user.id}`);
    console.log(user);
    this.setState({
      user: user.data
    });
  }

  render () {
    return (
      <div className="user-container">
      <h1>{this.state.user.name}</h1>
      <p>Email: {this.state.user.email}</p>
      <div>
        {this.state.user.orders ?
          this.state.user.orders.map(order => (
          <Order key={order.id} order={order} />
          ))
        :
        'No order history.'
        }
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(User);
