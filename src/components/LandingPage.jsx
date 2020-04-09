import React from 'react';
import Login from './Login';
import SignUpButton from './SignUpButton';

function LandingPage(props) {
  return (
    <div className='container'>
      <div className={props.signup_modal ? 'overlay-on' : 'overlay-off'}></div>
      <div className='left'></div>
      <div className='right'>
        <Login
          username={props.username}
          password={props.password}
          handleChange={props.handleChange}
          handleLogin={props.handleLogin} />
        <SignUpButton
          signup_modal={props.signup_modal}
          newUsername={props.newUsername}
          newEmail={props.newEmail}
          newPassword={props.newPassword}
          handleChange={props.handleChange}
          handleSignup={props.handleSignup}
          handleNewSignUp={props.handleNewSignUp}
          closeSignupModal={props.closeSignupModal}
        />
      </div>
    </div>
  )
}

export default LandingPage;