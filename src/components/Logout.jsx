import React from 'react';

function Logout(props) {
  return (
    <div className='logout'>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  )
}
export default Logout;