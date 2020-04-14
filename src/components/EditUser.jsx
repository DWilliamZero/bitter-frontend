import React from 'react';

function EditUser(props) {
  return (
    <div className={props.edit_modal ? 'edit-modal-on' : 'edit-modal-off'}>
      <form className='edit-form' onSubmit={props.handleEditUser}>
        <span className='edit-close' id='edit_modal' onClick={props.handleModal}>X</span>
        <div className='edit-title'><h1>Edit Account:</h1></div>
        <h3>Update Blurb:</h3>
        <textarea required
          id='edit-blurb'
          rows='3'
          cols='45'
          type='text'
          name='blurb'
          value={props.blurb}
          onChange={props.handleChange}
          placeholder='Add A Blurb Here' maxLength='75' />
        <h3>Update Email:</h3>
        <input required
          id='edit-email'
          type="email"
          name="email"
          value={props.email}
          onChange={props.handleChange}
          placeholder='Email'
        />
        <h3>Update Image:</h3>
        <input
          id='edit-avatar'
          className='img-uploader'
          type='file'
          name='avatar'
          value={props.someBullShitNameThatDoesntExist}
          onChange={props.handleUpload} />
        <button className='edit-modal-btn' type='submit'>Update</button>
      </form>
    </div >
  )
}

export default EditUser;