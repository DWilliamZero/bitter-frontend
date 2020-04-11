import React from 'react';
import Logout from './Logout';
import NewPostButton from './NewPostButton'
import NewPost from './NewPost'
import EditUser from './EditUser';
import FeedCard from './FeedCard';
import FollowersCard from './FollowersCard';
import FollowingCard from './FollowingCard';

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
          <NewPostButton handleModal={props.handleModal} />
        </div>
        <div className='feed-center'>
          <div className='feed-center-title'>
            <div className='feed-buttons'>
              <button onClick={props.changeFeedContent} name='feed_active' className={props.feed_active ? 'my-feed-btn-active' : 'my-feed-btn'}>Feed</button>
              <button onClick={props.changeFeedContent} name='followers_active' className={props.followers_active ? 'followers-btn-active' : 'followers-btn'}>Followers</button>
              <button onClick={props.changeFeedContent} name='following_active' className={props.following_active ? 'following-btn-active' : 'following-btn'}>Following</button></div>
          </div>
          {props.feed_active ?
            <FeedCard
              posts={props.posts}
            />
            : ''}
          {props.followers_active ?
            <FollowersCard
              followers={props.followers}
            />
            : ''}
          {props.following_active ?
            <FollowingCard
              followees={props.followees}
            />
            : ''}
        </div>
        <div className='feed-card-right'>
          <Logout handleLogout={props.handleLogout} />
        </div>
      </div>
    </div >
  )
}

export default Feed;