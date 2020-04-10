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
      post_modal: false,
      signup_modal: false,
      edit_modal: false
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
    //console.log(e.target.id)
    const modal_name = e.target.id
    const newState = !this.state[modal_name]
    this.setState({
      [modal_name]: newState
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
    let randPrefix = Math.random().toString(36).substring(2);

    const imageURL = `https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/${randPrefix}_${image.name}?alt=media`

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
      post_modal: false,
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
            handleModal={this.handleModal}
            signup_modal={this.state.signup_modal}
            newUsername={this.newUsername}
            newEmail={this.newEmail}
            newPassword={this.newPassword}
            handleSignup={this.handleSignup}
          />
          :
          <Feed
            user={this.state.user}
            edit_modal={this.state.edit_modal}
            post_modal={this.state.post_modal}
            content={this.state.content}
            image_name={this.state.image_name}
            handleModal={this.handleModal}
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
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