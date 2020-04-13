import React from 'react';

function FeedCard(props) {
  const { user, posts, hates, followees, handleFollow, handleUnfollow, handleHate, handleUnhate } = props
  return (
    posts.map((post, key) => (

      < div key={key} className='feed-card' >
        <div className='feed-card-title'>
          <div className='feed-card-title-left'>
            <img className='feed-card-avatar' src={post.user.image_url} alt={`${post.user.username}'s Avatar`} />
            <h3 className='feed-card-username'>@{post.user.username}</h3>
            <h4 className='feed-card-follows'>Followers: <span className='feed-card-follow-count'>{post.user.follower_count}</span> Following: <span className='feed-card-follow-count'>{post.user.followee_count}</span></h4>
          </div>
          {
            post.user.id === user.id ?
              '' :
              <div className='feed-card-title-right'>
                {followees.filter(x => x.id === post.user.id).length === 0 ? <button id='follow-btn' name={post.user.id} onClick={handleFollow}>Follow</button> : <button id='unfollow-btn' name={post.user.id} onClick={handleUnfollow}>Unfollow</button>}
              </div>
          }
        </div>
        <div className='feed-card-post'>
          <div className='feed-card-content'>{post.content}</div>
          {post.image_url !== '' ?
            <img className='feed-card-image' src={post.image_url} alt={`${post.user.username}'s Post`} />
            : ''}
          <div className='feed-card-hate'>
            <div className='feed-card-hate-count'>
              <h3>Hate Count: {post.hate === undefined ? 0 : post.hate.length}</h3>
            </div>
            <div className='feed-card-hate-btns'>
              {hates.filter(x => x.user_id === user.id && x.post_id === post.id).length === 0 ?
                <button id='hate-btn' name={post.id} onClick={handleHate}>Hate This Post</button> :
                <button id='unhate-btn' name={post.id} onClick={handleUnhate}>UnHate This Post</button>}
            </div>
          </div>
        </div>
      </div >
    ))
  )
}

export default FeedCard;