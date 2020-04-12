import React from 'react';

function FeedCard(props) {
  const { posts, handleFollow, handleUnfollow } = props
  return (
    posts.map((post, key) => (
      <div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <div className='feed-card-title-left'>
            <img className='feed-card-avatar' src={post.user.image_url} alt={`${post.user.username}'s Avatar`} />
            <h3 className='feed-card-username'>@{post.user.username}</h3>
            <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{post.user.follower_count}</span> Following: <span className='feed-card-follow-count'>{post.user.followee_count}</span></h4>
          </div>
          <div className='feed-card-title-right'>
            {true ? <button id='follow-btn' name={post.user.id} onClick={handleFollow}>Follow</button> : <button id='unfollow-btn' name={post.user.id} onClick={handleUnfollow}>Unfollow</button>}
          </div>
        </div>
        <div className='feed-card-post'>
          <div className='feed-card-content'>{post.content}</div>
          {post.image_url !== '' ?
            <img className='feed-card-image' src={post.image_url} alt={`${post.user.username}'s Post`} />
            : ''}
        </div>
      </div >
    ))
  )
}

export default FeedCard;