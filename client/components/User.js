import React from 'react';
import {connect} from 'react-redux'
import Order from './Order';

const User = (props) => (
  <div>
  <h1>{props.user.name}</h1>
  <p>Email: {props.user.email}</p>
  <div>
    {props.user.orders.length ?
      props.user.orders.map(order => (
      <Order key={order.id} order={order} />
      ))
    :
    'No order history.'
    }
  </div>
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(User);
