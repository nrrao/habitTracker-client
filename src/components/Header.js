import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import HabitsContext from './HabitsContext';

export default class Header extends Component {

  static contextType = HabitsContext;
  // toggleStatus=()=>{
  //   this.setState({
  //     status:!this.state.status
  //   })
  // }

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.refreshLoginState();
  };

  renderLogoutLink() {
    console.log("inside logout header");
    return (
      <div className="Header__logged-in">
        <Link to="/habits">Habits</Link>
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/signup">SignUp</Link>
        <span>{"-"}</span>
        <Link to="/login">Log in</Link>
        {/* <Link
          to='/addhabit'>
          Add Habit
        </Link> */}
      </div>
    );
  }
  render() {
    console.log("***************** render");
    return (
      <nav className="Header">
        <h1>
          <Link to="/">Habit Tracker</Link>
        </h1>
        {this.context.isLoggedIn ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    );
  }
}
