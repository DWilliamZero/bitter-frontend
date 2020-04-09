import React from 'react';

function NewPost(props) {
  return (
    <div className={props.modal ? 'new-post-modal-on' : 'new-post-modal-off'}>
      <form className='modal-form' onSubmit={props.handlePostSubmit}>
        <span className='close' onClick={props.handleCloseModal}>X</span>
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
          value={props.image_name}
          onChange={props.handleUpload} />
      </form>
    </div >
  )
}

export default NewPost;