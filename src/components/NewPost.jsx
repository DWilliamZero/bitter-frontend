import React from 'react';

function NewPost(props) {
  return (
    <div className={props.post_modal ? 'new-post-modal-on' : 'new-post-modal-off'}>
      <form className='modal-form' onSubmit={props.handlePostSubmit}>
        <span className='close' id='post_modal' onClick={props.handleModal}>X</span>
        <textarea required
          rows='6'
          cols='45'
          type='text'
          name='content'
          value={props.content}
          onChange={props.handleChange}
          placeholder='Share A Dumb Opinion Here' maxLength='140' />
        <button className='modal-btn' type='submit'>Post Bit</button>
        <input
          id='file'
          className='img-uploader'
          type='file'
          name='image_name'
          value={props.post_image_name}
          onChange={props.handleUpload} />
        <div className='char-count'>chars left: {props.char_count}</div>
      </form>
    </div >
  )
}

export default NewPost;