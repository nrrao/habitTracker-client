import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import "../Login/Login.css";

export default class SignUpForm extends Component {
  static defaultProps = {
    onSignUpSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value
    })
      .then(user => {
        user_name.value = "";
        password.value = "";
        this.props.onSignUpSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <h2>SignUp To Track Your Habits</h2>
        <ul className="wrapper">
          <li className="form-row">
            <label htmlFor="SignUp__user_name">Username</label>
            <input
              aria-label="SignUp__user_name"
              type="text"
              name="user_name"
              required
              id="SignUpForm__user_name"
            ></input>
          </li>
          <li className="form-row">
            <label htmlFor="SignUp__password">Password</label>
            <input
              aria-label="SignUp__password"
              name="password"
              type="password"
              required
              id="SignUpForm__password"
            ></input>
          </li>
          <li className="form-row">
            <button type="submit">SignUp</button>
          </li>
        </ul>
      </form>
    );
  }
}
