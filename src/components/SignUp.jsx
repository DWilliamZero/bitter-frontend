import React from 'react';

function SignUp(props) {
  return (
    <div className={props.signup_modal ? 'signup-modal-on' : 'signup-modal-off'}>
      <form className='signup-form' onSubmit={props.handleSignup}>
        <span className='close' onClick={props.closeSignupModal}>X</span>
        <img id='small-logo-2' src='https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/bitter-logo.png?alt=media' alt='The Bitter Logo' />
        <div className='signup-form-text'><h1>Create Your Account:</h1></div>
        <input
          required
          className='input-text'
          type='text'
          name='newUsername'
          value={props.newUsername}
          onChange={props.handleChange}
          placeholder='Username'
          maxLength='40' />
        <input
          required
          className='input-text'
          type='email'
          name='newEmail'
          value={props.newEmail}
          onChange={props.handleChange}
          placeholder='Email'
          maxLength='60' />
        <input
          required
          className='input-text'
          type='password'
          name='newPassword'
          value={props.newPassword}
          onChange={props.handleChange}
          placeholder='Password' />
        <button id='new-account-btn' type='submit'>Create Account</button>
      </form>
    </div >
  )
}
export default SignUp