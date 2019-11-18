import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import HabitsContext from "../HabitsContext";
import "./Header.css";

export default class Header extends Component {
  static contextType = HabitsContext;


  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.refreshLoginState();
  };

  renderLogoutLink() {
    return (
      <div className="Header">
      <h1>
      <Link to="/">Habit Tracker</Link>
      </h1>
      <div className="Header__logged-in">
      <Link to="/habits"> Habits</Link>
        <span className="hyph"></span>
        <span className="hyph"></span>
        <Link onClick={this.handleLogoutClick} to="/">
          Log Out
        </Link>
      </div>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className="Header">
      <h1>
        <Link to="/">Habit Tracker</Link>
      </h1>
      <div className="Header__not-logged-in">
        <Link to="/signup">Sign Up</Link>
        <span className="hyph"></span>
        <span className="hyph"></span>
        <Link to="/login">Log In</Link>
      </div>
      </nav>
    );
  }
  render() {
    return (
      <div>


        {this.context.isLoggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </div>
    );
  }
}
