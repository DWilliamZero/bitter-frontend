import React from 'react';

function FollowingCard(props) {
  const { followees } = props
  return (
    followees.map((followee, key) => (
      <div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <img className='feed-card-avatar' src={followee.image_url} alt={`${followee.username}'s Avatar`} />
          <h3 className='feed-card-username'>@{followee.username}</h3>
          <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{followee.follower_count}</span> Following: <span className='feed-card-follow-count'>{followee.followee_count}</span></h4>
          {false ? <button id='follow-btn'>Follow</button> : <button id='unfollow-btn'>Unfollow</button>}
        </div>
      </div >
    ))
  )
}

export default FollowingCard;