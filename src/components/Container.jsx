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
  updateUserById,
  getAllPosts,
  getFollowers,
  getFollowees,
  newFollow,
  unFollow
} from '../services/api-helper';

const default_image = 'https://firebasestorage.googleapis.com/v0/b/bitter-d2094.appspot.com/o/bitter-logo.png?alt=media'

class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      posts: null,
      followers: null,
      followees: null,
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
      feed_active: true,
      followers_active: false,
      following_active: false,
      post_modal: false,
      signup_modal: false,
      edit_modal: false
    }
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      const allPosts = await getAllPosts()
      const followers = await getFollowers(currentUser.id)
      const followees = await getFollowees(currentUser.id)
      this.setState({
        user: currentUser,
        posts: allPosts,
        followers: followers,
        followees: followees,
        blurb: currentUser.blurb,
        email: currentUser.email,
        avatar: currentUser.image_url
      })
    }
  }

  handleChange = (e) => {
    //console.log(e.target.value)
    const newCount = 140 - e.target.value.length
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

  handleFollow = async (e) => {
    e.preventDefault();
    console.log('Follow:', e.target.name)
    const data = { followee_id: e.target.name }
    await newFollow(data)
    this.componentDidMount()
  }

  handleUnfollow = async (e) => {
    e.preventDefault();
    console.log('unFollow:', e.target.name)
    const data = { follow: { followee_id: e.target.name } }
    await unFollow(data)
    this.componentDidMount()
  }


  handleSignup = async (e) => {
    e.preventDefault();
    const { newUsername, newEmail, newPassword } = this.state
    const lowercaseUsername = newUsername.toLowerCase()
    const lowercaseEmail = newEmail.toLowerCase()
    console.log(lowercaseUsername)
    const data = {
      username: lowercaseUsername,
      email: lowercaseEmail,
      password: newPassword,
      image_url: default_image
    }
    await createNewUser(data)
      .then(async () => {
        const body = { username: lowercaseUsername, password: newPassword }
        const currentUser = await login(body);
        this.setState({
          user: currentUser,
          newUsername: '',
          newEmail: '',
          newPassword: '',
          signup_modal: false
        })
      })
    //window.location.reload();
    this.componentDidMount();
  }

  handleModal = (e) => {
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
  }

  handleUpload = (e) => {
    console.log(e.target.files[0])
    this.setState({
      [e.target.name]: e.target.value
    })
    const image = e.target.files[0]
    let randPrefix = Math.random().toString(36).substring(2);
    const imgName = randPrefix + '_' + image.name  //add prefix of random hash to image name
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
  }

  handlePostSubmit = async (e) => {
    e.preventDefault()
    const data = {
      content: this.state.content,
      image_url: this.state.image_url
    }
    await createNewUserPost(this.state.user.id, data)
    this.setState({
      post_modal: false,
      content: ''
    })
    this.componentDidMount()
  }

  handleEditUser = async (e) => {
    e.preventDefault()
    let image = ''
    if (this.state.avatar === '') {
      image = default_image
    } else { image = this.state.avatar }
    const data = {
      email: this.state.email,
      password: 'someDummyPassword',  //required to pass strong params, value not important.
      blurb: this.state.blurb,
      image_url: image
    }
    await updateUserById(this.state.user.id, data)
    this.setState({
      edit_modal: false
    })
    this.componentDidMount()
  }

  changeFeedContent = (e) => {
    this.setState({
      feed_active: false,
      followers_active: false,
      following_active: false
    })
    this.setState({
      [e.target.name]: true
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
            posts={this.state.posts}
            followers={this.state.followers}
            followees={this.state.followees}
            char_count={this.state.char_count}
            edit_modal={this.state.edit_modal}
            post_modal={this.state.post_modal}
            image_name={this.state.image_name}
            feed_active={this.state.feed_active}
            followers_active={this.state.followers_active}
            following_active={this.state.following_active}
            handleModal={this.handleModal}
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
            handleFollow={this.handleFollow}
            handleUnfollow={this.handleUnfollow}
            handleEditUser={this.handleEditUser}
            handlePostSubmit={this.handlePostSubmit}
            handleLogout={this.handleLogout}
            changeFeedContent={this.changeFeedContent}
          />
        }
        <Footer />
      </>
    )
  }
}

export default Container;