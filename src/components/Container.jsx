import React from 'react';
import Footer from './Footer';
import Login from './Login';
import { login, verifyUser } from '../services/api-helper';


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

  render() {
    return (
      <>
        <div className='container'>
          <div className='left-bottom'> left light blue</div>
          <div className='right-top'>
            right dark blue
            <Login handleChange={this.handleChange} handleLogin={this.handleLogin} />
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Container;