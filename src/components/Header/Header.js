import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import HabitsContext from "../HabitsContext";
import "./Header.css";

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
    return (
 
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
        <span className="hyph">{"-"}</span>
        <Link to="/habits">Habits</Link>
      </div>
      
    );
  }

  renderLoginLink() {
    return (
      
  
    
      <div className="Header__not-logged-in">

        <Link to="/signup">SignUp</Link>
        <span className="hyph">{"-"}</span>
        <Link to="/login">Log in</Link>
      
      </div>
     
    );
  }
  render() {
    return (
      
            <nav className="Header">
      <h1>
      <Link to="/">Habit Tracker</Link>
    </h1>

        {this.context.isLoggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      
      </nav>
    );
  }
}
