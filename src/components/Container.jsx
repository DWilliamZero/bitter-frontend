import React from 'react';
import LandingPage from './LandingPage';
import Feed from './Feed';
import Footer from './Footer';
import { login, verifyUser, logOut } from '../services/api-helper';


class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      username: '',
      password: '',
      content: '',
      modal: false
    }
  }

  async componentDidMount() {
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
    console.log(this.state.user)
  }

  handleLogout = () => {
    console.log('logout clicked')
    logOut();
    this.setState({
      user: null
    })
  }

  handleNewPost = () => {
    console.log('new post button was clicked!')
    this.setState({
      modal: true
    })
  }

  handlePostSubmit = (e) => {
    e.preventDefault()
    console.log('Post Submit button was clicked!')
    this.setState({
      modal: false
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
          />
          :
          <Feed
            user={this.state.user}
            content={this.state.content}
            modal={this.state.modal}
            handlePostSubmit={this.handlePostSubmit}
            handleLogout={this.handleLogout}
            handleNewPost={this.handleNewPost}
          />
        }
        <Footer />
      </>
    )
  }
}

export default Container;