import React, { Component } from 'react';
import LoginForm from '../components/Login/LoginForm'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/habits'
    history.push(destination)
  }

  render() {
    return (
        <section className='LoginPage' >
       
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
        
     
    )
  }
}
