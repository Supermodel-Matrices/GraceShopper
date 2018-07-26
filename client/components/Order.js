import React from 'react';

const Order = (props) => (
  <div>
    <p>Order # {props.order.id}</p>
    <p>Total: ${props.order.total}</p>
    <p>
      {props.order.orderProducts.map(product => (
        <div key={product.id}>
          <img src={product.image} />
          <p>{product.name}</p>
        </div>
      ))}
    </p>
  </div>
)

export default Order;
