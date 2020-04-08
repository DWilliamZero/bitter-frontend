import React from 'react';

function Logout(props) {
  return (
    <div className='logout'>
      <div>
        <button onClick={props.handleLogout}>Logout</button>
      </div>

    </div>
  )
}
export default Logout;