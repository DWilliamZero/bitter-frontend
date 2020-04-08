import React from 'react';
import Footer from './Footer';
import Login from './Login';
import Logout from './Logout';
import { login, verifyUser, logOut } from '../services/api-helper';


class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      username: '',
      password: ''
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
    console.log(currentUser)
  }

  handleLogout = () => {
    console.log('logout clicked')
    logOut();
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <>
        <div className='container'>
          <div className='left-bottom'> left light blue</div>
          <div className='right-top'>
            right dark blue
            {this.state.user == null ?
              <Login handleChange={this.handleChange} handleLogin={this.handleLogin} />
              :
              <Logout handleLogout={this.handleLogout} />
            }
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Container;