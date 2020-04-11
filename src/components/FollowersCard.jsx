import React from 'react';

function FollowersCard(props) {
  const { followers } = props
  return (
    followers.map((follower, key) => (
      <div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <img className='feed-card-avatar' src={follower.image_url} alt={`${follower.username}'s Avatar`} />
          <h3 className='feed-card-username'>@{follower.username}</h3>
          <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{follower.follower_count}</span> Following: <span className='feed-card-follow-count'>{follower.followee_count}</span></h4>
          {true ? <button id='follow-btn'>Follow</button> : <button id='unfollow-btn'>Unfollow</button>}
        </div>
      </div >
    ))
  )
}

export default FollowersCard;