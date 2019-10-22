import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import HabitsContext from '../HabitsContext';
import './Header.css';

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
      <div className="container">
        
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      
      <nav className="main-nav">
        <ul className="main-nav-list">
       <li> <Link to="/signup">SignUp</Link></li>
        <span>{"-"}</span>
        <li> <Link to="/login">Log in</Link></li>
        </ul>
       </nav>
       
    );
  }
  render() {
    return (
      <header className="main-header">
      <div className="container">
      
       <h1><Link  to="/">Habit Tracker</Link></h1>
          
        
        {this.context.isLoggedIn ? this.renderLogoutLink() : this.renderLoginLink()}
      
      </div>
      </header>
    );
  }
}
