import React from 'react';

function Login(props) {
  return (
    <div className='login-form'>
      <form onSubmit={props.handleLogin}>
        <div className='login-form'>
          <input className='username'
            type='text'
            name='username'
            placeholder='Username'
            onChange={props.handleChange}
            value={props.username} />
          <input className='password'
            type='password'
            name='password'
            placeholder='Password'
            onChange={props.handleChange}
            value={props.password} />
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;