import React from 'react';
import Login from './Login';
import SignUpButton from './SignUpButton';

function LandingPage(props) {
  return (
    <div className='container'>
      <div className={props.signup_modal ? 'overlay-on' : 'overlay-off'}></div>
      <div className='left'>
        <div className='spy'>
          <img id='spy' src='https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/search.svg?alt=media' alt='Spy On Your Enemies' />
          <h2>Spy on Your Enemies</h2>
        </div>
        <div className='make-fun'>
          <img id='make-fun' src='https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/group.svg?alt=media' alt='Make Fun of Other People' />
          <h2>Make Fun of Other People</h2>
        </div>
        <div className='share'>
          <img id='share' src='https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/share.svg?alt=media' alt='Share Dumb Opinions' />
          <h2>Share Your Dumb Opinions</h2>
        </div>
      </div>
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
          handleModal={props.handleModal}
          handleChange={props.handleChange}
          handleSignup={props.handleSignup}
        />
      </div>
    </div>
  )
}

export default LandingPage;