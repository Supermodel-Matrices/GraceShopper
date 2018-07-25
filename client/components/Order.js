import React from 'react';

const Order = (props) => (
  <div>
    <p>{props.total}</p>
    <p>
      {props.orders.products.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <img src={product.image} />
        </div>
      ))}
    </p>
  </div>
)

export default Order;
