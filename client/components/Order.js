import React from 'react';

const Order = (props) => (
  <div className="order-container">
    <div className="order-left">
      <span>Order # {props.order.id}</span>
      <span>Total: ${props.order.total}</span>
    </div>
    <div className="order-right">
      <span>
        {props.order.orderProducts.map(product => (
          <div key={product.id}>
            <img src={product.image} className="order-product-image" />
            <span>{product.name}</span>
          </div>
        ))}
      </span>
    </div>
  </div>
)

export default Order;
