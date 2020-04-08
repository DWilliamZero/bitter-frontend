import React from 'react';

function Login(props) {
  return (
    <div className='login'>
      <form onSubmit={props.handleLogin}>
        <input type='text'
          name='username'
          placeholder='Username'
          onChange={props.handleChange}
          value={props.username} />
        <input type='text'
          name='password'
          placeholder='Password'
          onChange={props.handleChange}
          value={props.password} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login;