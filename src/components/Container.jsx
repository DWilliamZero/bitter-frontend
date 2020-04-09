import React from 'react';
import axios from 'axios';
import LandingPage from './LandingPage';
import Feed from './Feed';
import Footer from './Footer';
import { login, verifyUser, logOut, createNewUserPost, createNewUser } from '../services/api-helper';


class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      username: '',
      password: '',
      content: '',
      image_name: '',
      image_url: '',
      newUsername: '',
      newEmail: '',
      newPassword: '',
      modal: false,
      signup_modal: false
    }
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ user: currentUser })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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

  handleNewSignUp = () => {
    this.setState({
      signup_modal: true
    })
  }

  closeSignupModal = () => {
    this.setState({
      signup_modal: false
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

  handleNewPost = () => {
    this.setState({
      modal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      modal: false
    })
  }

  handleUpload = (e) => {
    console.log(e.target.files[0])
    this.setState({
      [e.target.name]: e.target.value
    })

    const image = e.target.files[0]
    const data = new FormData()
    data.append('file', image, image.name)

    const imageURL = `https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/${image.name}?alt=media`

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
    const data = { content: this.state.content, image_url: this.state.image_url }
    const newPost = createNewUserPost(this.state.user.id, data)
    console.log(newPost)
    this.setState({
      modal: false,
      content: ''
    })
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
            signup_modal={this.state.signup_modal}
            newUsername={this.newUsername}
            newEmail={this.newEmail}
            newPassword={this.newPassword}
            handleSignup={this.handleSignup}
            handleNewSignUp={this.handleNewSignUp}
            closeSignupModal={this.closeSignupModal}
          />
          :
          <Feed
            user={this.state.user}
            modal={this.state.modal}
            content={this.state.content}
            image_name={this.state.image_name}
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
            handlePostSubmit={this.handlePostSubmit}
            handleLogout={this.handleLogout}
            handleNewPost={this.handleNewPost}
            handleCloseModal={this.handleCloseModal}
          />
        }
        <Footer />
      </>
    )
  }
}

export default Container;