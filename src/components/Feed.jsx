import React from 'react';
import Logout from './Logout';
import NewPostButton from './NewPostButton'
import NewPost from './NewPost'
import EditUser from './EditUser';

function Feed(props) {
  const { username, follower_count, followee_count, blurb, image_url } = props.user
  return (
    <div className='container'>
      <div className={props.post_modal || props.edit_modal ? 'overlay-on' : 'overlay-off'}></div>
      <NewPost
        content={props.content}
        image_name={props.image_name}
        post_modal={props.post_modal}
        char_count={props.char_count}
        handleModal={props.handleModal}
        handleChange={props.handleChange}
        handleUpload={props.handleUpload}
        handlePostSubmit={props.handlePostSubmit}
      />
      <EditUser
        user={props.user}
        blurb={props.blurb}
        email={props.email}
        image_url={props.image_url}
        edit_modal={props.edit_modal}
        handleModal={props.handleModal}
        handleChange={props.handleChange}
        handleUpload={props.handleUpload}
        handleEditUser={props.handleEditUser}
      />
      <div className='feed-page'>
        <div className='feed-left'>
          <img id='avatar' src={image_url} srcc='https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/bitter-logo.png?alt=media' alt='Avatar of User' />
          <h1><span className='edit-user' id='edit_modal' onClick={props.handleModal}>@{username}</span></h1>
          <h4 className='blurb'>{blurb}</h4>
          <h4 className='follows'>Followers: <span className='follow-count'>{follower_count}</span> Following: <span className='follow-count'>{followee_count}</span></h4>
          {/* <h5><span className='my-account' id='edit_modal' onClick={props.handleModal}>My Account</span></h5> */}
          <NewPostButton handleModal={props.handleModal} />
        </div>
        <div className='feed-card'>
          <div className='feed-card-title'>
            <h1>My Feed</h1>
          </div>
        </div>
        <div className='feed-card-right'>
          <Logout handleLogout={props.handleLogout} />
        </div>
      </div>
    </div >
  )
}

export default Feed;