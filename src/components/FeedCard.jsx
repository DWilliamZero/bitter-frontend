import React from 'react';

function FeedCard(props) {
  const { posts } = props
  return (
    posts.map((post, key) => (
      <div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <img className='feed-card-avatar' src={post.user.image_url} alt={`${post.user.username}'s Avatar`} />
          <h3 className='feed-card-username'>@{post.user.username}</h3>
          <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{post.user.follower_count}</span> Following: <span className='feed-card-follow-count'>{post.user.followee_count}</span></h4>
          {true ? <button id='follow-btn'>Follow</button> : <button id='unfollow-btn'>Unfollow</button>}
        </div>
        <div className='feed-card-post'>
          <div className='feed-card-content'>{post.content}</div>
          <img className='feed-card-image' src={post.image_url} alt={`${post.user.username}'s Post`} />
        </div>
      </div >
    ))
  )
}

export default FeedCard;