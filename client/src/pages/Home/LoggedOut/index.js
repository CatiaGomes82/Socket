import React, { useContext } from 'react';
import Login from './Login';
import Register from './Register';

const LoggedOut = (props) => {

  return (
    <div>
      <h3 className="welcome__sub-title">Login</h3>

      <Login/>

      <p className="welcome__sep"><span className="welcome__sep-text">or</span></p>

      <h3 className="welcome__sub-title">Sign up</h3>


      <Register />

    </div>
  );
}

export default LoggedOut;