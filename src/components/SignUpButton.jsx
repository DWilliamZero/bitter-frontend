import React from 'react';
import SignUp from './SignUp';

function SignUpButton(props) {
  return (
    <div className='sign-up'>
      <img id='small-logo-1' src='https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/bitter-logo.png?alt=media' alt='The Bitter Logo' />
      <h1>Share Your Dumb Opinions With the World!</h1>
      <div className='join-today'>
        <h4>Join Bitter Today!</h4>
        <button id='join-btn' onClick={props.handleNewSignUp}>Sign up</button>
      </div>
      <SignUp
        newUsername={props.newUsername}
        newEmail={props.newEmail}
        newPassword={props.newPassword}
        handleChange={props.handleChange}
        handleSignup={props.handleSignup}
        signup_modal={props.signup_modal}
        closeSignupModal={props.closeSignupModal}
      />
    </div >
  )
}

export default SignUpButton;