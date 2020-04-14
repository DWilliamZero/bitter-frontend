import React from 'react';

function FollowersCard(props) {
  const { followers, followees, handleFollow, handleUnfollow } = props
  return (
    followers.map((follower, key) => (
      <div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <div className='feed-card-title-left'>
            <img className='feed-card-avatar' src={follower.image_url} alt={`${follower.username}'s Avatar`} />
            <h3 className='feed-card-username'>@{follower.username}</h3>
            <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{follower.follower_count}</span> Following: <span className='feed-card-follow-count'>{follower.followee_count}</span></h4>
          </div>
          <div className='feed-card-title-right'>
            {followees.filter(x => x.id === follower.id).length === 0 ? <button id='follow-btn' name={follower.id} onClick={handleFollow}>Follow</button> : <button id='unfollow-btn' name={follower.id} onClick={handleUnfollow}>Unfollow</button>}
          </div>
        </div>
        <div className='feed-card-title-blurb'>{follower.blurb}</div>
      </div>
    ))
  )
}

export default FollowersCard;