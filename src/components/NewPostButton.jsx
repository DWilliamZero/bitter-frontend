import React from 'react';

function NewPostButton(props) {
  return (
    <div className='new-post-btn'>
      <button id='post_modal' onClick={props.handleModal}>+ New Post</button>
    </div>
  )
}
export default NewPostButton;