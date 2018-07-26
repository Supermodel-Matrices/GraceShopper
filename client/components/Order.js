import React from 'react';

const Order = (props) => (
  <div>
    <span>Order # {props.order.id}</span>
    <span>Total: ${props.order.total}</span>
    <span>
      {props.order.orderProducts.map(product => (
        <div key={product.id}>
          <img src={product.image} />
          <span>{product.name}</span>
        </div>
      ))}
    </span>
  </div>
)

export default Order;
