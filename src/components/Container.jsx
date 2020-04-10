import React from 'react';
import axios from 'axios';
import LandingPage from './LandingPage';
import Feed from './Feed';
import Footer from './Footer';

import {
  login,
  verifyUser,
  logOut,
  createNewUserPost,
  createNewUser,
  updateUserById
} from '../services/api-helper';


class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      username: '',
      password: '',
      blurb: '',
      email: '',
      content: '',
      image_name: '',
      image_url: '',
      newUsername: '',
      newEmail: '',
      newPassword: '',
      char_count: 140,
      post_modal: false,
      signup_modal: false,
      edit_modal: false
    }
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({
        user: currentUser,
        blurb: currentUser.blurb,
        email: currentUser.email,
        image_url: currentUser.image_url
      })
    }
  }

  handleChange = (e) => {
    //console.log(e.target.value)
    const newCount = this.state.char_count - 1
    this.setState({
      [e.target.name]: e.target.value,
      char_count: newCount
    })
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const body = { username: this.state.username, password: this.state.password }
    const currentUser = await login(body);
    this.setState({
      user: currentUser,
      username: '',
      password: ''
    });
  }

  handleLogout = () => {
    logOut();
    this.setState({
      user: null
    })
  }

  handleSignup = async (e) => {
    e.preventDefault();
    const { newUsername, newEmail, newPassword } = this.state
    const data = { username: newUsername, email: newEmail, password: newPassword }
    await createNewUser(data)
      .then(async () => {
        const body = { username: newUsername, password: newPassword }
        const currentUser = await login(body);
        this.setState({ user: currentUser })
      })

    this.setState({
      newUsername: '',
      newEmail: '',
      newPassword: '',
      signup_modal: false
    })
  }

  handleModal = (e) => {
    //console.log(this.state.avatar)
    const modal_name = e.target.id
    const newState = !this.state[modal_name]
    this.setState({
      [modal_name]: newState,
      char_count: 140,
      content: '',
      newUsername: '',
      newEmail: '',
      newPassword: ''
    })
    console.log(this.state.newEmail)
  }

  handleUpload = (e) => {
    console.log(e.target.files[0])
    this.setState({
      [e.target.name]: e.target.value
    })

    const image = e.target.files[0]
    let randPrefix = Math.random().toString(36).substring(2);
    const imgName = randPrefix + '_' + image.name
    const data = new FormData()
    data.append('file', image, imgName)


    const imageURL = `https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/${imgName}?alt=media`

    axios.post(`https://us-central1-bitter-d2094.cloudfunctions.net/uploadFile`, data)
      .then(res => {
        console.log('axios res:', res)
      })

    this.setState({
      image_url: imageURL
    })
    console.log(imageURL)

  }

  handlePostSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: this.state.username,
      image_url: this.state.image_url
    }
    const newPost = createNewUserPost(this.state.user.id, data)
    console.log(newPost)
    this.setState({
      post_modal: false,
      content: ''
    })
  }

  handleEditUser = async (e) => {
    e.preventDefault()
    const data = {
      email: this.state.email,
      password: 'someDummyPassword',  //required to pass strong params, value not important.
      blurb: this.state.blurb,
      image_url: this.state.image_url,
    }
    console.log(data)
    console.log(this.state.user.id)

    const editUser = updateUserById(this.state.user.id, data)

    console.log(editUser)

    this.setState({
      edit_modal: false
    })
    window.location.reload();
  }

  render() {
    return (
      <>
        {this.state.user === null ?
          <LandingPage
            user={this.state.user}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
            handleModal={this.handleModal}
            signup_modal={this.state.signup_modal}
            newUsername={this.state.newUsername}
            newEmail={this.state.newEmail}
            newPassword={this.state.newPassword}
            handleSignup={this.handleSignup}
          />
          :
          <Feed
            user={this.state.user}
            blurb={this.state.blurb}
            email={this.state.email}
            image_url={this.state.image_url}
            content={this.state.content}
            char_count={this.state.char_count}
            edit_modal={this.state.edit_modal}
            post_modal={this.state.post_modal}
            image_name={this.state.image_name}
            handleModal={this.handleModal}
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
            handleEditUser={this.handleEditUser}
            handlePostSubmit={this.handlePostSubmit}
            handleLogout={this.handleLogout}
          />
        }
        <Footer />
      </>
    )
  }
}

export default Container;