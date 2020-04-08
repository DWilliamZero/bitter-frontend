import React from 'react';

function NewPostButton(props) {
  return (
    <div className='new-post-btn'>
      <button onClick={props.handleNewPost}>+ New Post</button>
    </div>
  )
}
export default NewPostButton;