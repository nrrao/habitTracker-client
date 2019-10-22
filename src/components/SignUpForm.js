import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service'


export default class RegistrationForm extends Component {
  static defaultProps = {
    onSignUpSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

          this.setState({ error: null })
          AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            
          })
    .then(user =>{
      user_name.value = ''
      password.value = ''
      this.props.onSignUpSuccess()
    })
    .catch(res=>{
      this.setState({error:res.error})
    })

  }

  render() {
    const { error } = this.state
    return (
      <form  onSubmit={this.handleSubmit}>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        
        <ul class="wrapper">
        <h2>SignUp To Trck Your Habits</h2>
        <li class="form-row">
          <label htmlFor='SignUp__user_name'>
            User name 
          </label>
          <input
            name='user_name'
            type='text'
            required
            id='SignUpForm__user_name'>
          </input>
        </li>
        <li class="form-row">
          <label htmlFor='SignUp__password'>
            Password 
          </label>
          <input
            name='password'
            type='password'
            required
            id='SignUpForm__password'>
          </input>
        </li>
        <li  class="form-row">
        <button type='submit'>
          SignUp
        </button>
        </li>
        </ul>
      </form>
    )
  }
}
