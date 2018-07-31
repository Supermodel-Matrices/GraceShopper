import React from 'react';
import {Link} from 'react-router-dom';

const Success = (props) => {
  console.log(props);

  return (
  <div className="right-panel">
    <div className="signin-login">
      <h1>Successfully Purchased!</h1>
      <Link to="/" className="link-bordered unpadded-link">Return To Home</Link>
    </div>
  </div>
  );
}

export default Success;