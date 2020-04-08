import React from 'react';
import Login from './Login';

function LandingPage(props) {
  return (
    <div className='container'>
      <div className='left-bottom'></div>
      <div className='right-top'>
        <Login
          username={props.username}
          password={props.password}
          handleChange={props.handleChange}
          handleLogin={props.handleLogin} />
      </div>
    </div>
  )
}

export default LandingPage;