import React, { Component } from 'react'
import SignUpForm from '../components/SignUp/SignUpForm';

export default class SignUpPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleSignUpSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }
  render() {
    return (
      <section className='RegistrationPage'>
      
      <SignUpForm
        onSignUpSuccess={this.handleSignUpSuccess}
      />
    </section>
    )
  }
}
