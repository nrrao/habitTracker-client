import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import HabitsContext from '../HabitsContext';
import './Login.css'


export default class LoginForm extends Component {

  static contextType = HabitsContext;

static defaultProps = {
  onLoginSuccess: () => {}
}
handleSubmitJwtAuth = (ev) =>{
    ev.preventDefault()
    const { user_name, password } = ev.target


    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.context.refreshLoginState();
        this.props.onLoginSuccess()
        
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    return (
      
        
      <form onSubmit={this.handleSubmitJwtAuth}>
        
        <ul className="wrapper">
        <h2>Enter Username and Password to Login</h2>
        <li className="form-row">
        <label htmlFor='LoginForm__user_name'>
            Username
          </label>
          <input
            required
            name='user_name'
            id='LoginForm__user_name' className="input">
          </input>
          </li>
          <li className="form-row">
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input
            required
            name='password'
            type='password'
            id='LoginForm__password' className="input">
          </input>
        </li>
        <li className="form-row">
        <button className="button" type='submit'>
          Login
        </button>
        </li>
        </ul>
        </form>
        
       
    )
  }
}