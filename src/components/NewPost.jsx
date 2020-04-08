import React from 'react';

function NewPost(props) {
  return (
    <div className={props.modal ? 'new-post-modal-on' : 'new-post-modal-off'}>
      <form className='modal-form' onSubmit={props.handlePostSubmit}>
        <textarea rows='10' cols='100' type='text' name='content' value={props.content} placeholder='Share A Dumb Opinion Here' maxLength='140' />
        <button className='modal-btn'>Post Bit</button>
      </form>
    </div>
  )
}

export default NewPost;