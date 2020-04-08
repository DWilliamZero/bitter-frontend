import React from 'react';
import Logout from './Logout';
import NewPostButton from './NewPostButton'
import NewPost from './NewPost'

function Feed(props) {
  const { username, follower_count, followee_count } = props.user
  return (
    <div className='container'>
      <div className={props.modal ? 'overlay-on' : 'overlay-off'}></div>
      <NewPost
        content={props.content}
        modal={props.modal}
        handlePostSubmit={props.handlePostSubmit}
      />
      <div className='feed-page'>
        <div className='feed-left'>
          <NewPostButton handleNewPost={props.handleNewPost} />
        </div>
        <div className='feed-card'>
          <div className='feed-card-title'>
            <h1>My Feed</h1>
          </div>
          <p>{username}, {followee_count}, {follower_count}</p>
        </div>
        <div className='feed-card-right'>
          <Logout handleLogout={props.handleLogout} />
        </div>
      </div>
    </div>
  )
}

export default Feed;