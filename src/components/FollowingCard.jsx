import React from 'react';

function FollowingCard(props) {
  const { followees, handleUnfollow } = props
  return (
    followees.map((followee, key) => (
      < div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <div className='feed-card-title-left'>
            <img className='feed-card-avatar' src={followee.image_url} alt={`${followee.username}'s Avatar`} />
            <h3 className='feed-card-username'>@{followee.username}</h3>
            <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{followee.follower_count}</span> Following: <span className='feed-card-follow-count'>{followee.followee_count}</span></h4>
          </div>
          <div className='feed-card-title-right'>
            <button id='unfollow-btn' name={followee.id} onClick={handleUnfollow}>Unfollow</button>
          </div>
        </div>
        <div className='feed-card-title-blurb'>{followee.blurb}</div>
      </div >
    ))
  )
}

export default FollowingCard;