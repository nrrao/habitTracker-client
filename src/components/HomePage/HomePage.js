import React, { Component } from 'react'
import './Homepage.css'
import HabitsContext from '../HabitsContext';


export default class HomePage1 extends Component {
  static contextType = HabitsContext;

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  showSignUp=()=>{
    this.props.history.push("/signup")
  }
  showLogin=()=>{
    this.props.history.push("/login")
  }


  renderLogoutLink() {
    return (
      <div>
        
        <header className="App-header">
          <h1 align="center">Ready To Track Your Habits</h1>
          <h2 >Build positive habits or easily break bad habits</h2>
        </header>

       
        <div className="danger colorList">
  <p><strong>HabitTracker helps you to track habits everyday</strong></p>
</div>

<div className="success colorList">
  <p><strong>Add new habit</strong></p>
</div>

<div className="info colorList">
  <p><strong>Update habits and percentage of completion upto 5 days</strong></p>
</div>

<div className="warning colorList">
  <p><strong> Have a visual reference and get motivated to be consistent.</strong></p>
</div>

      </div>
    );
  }

  renderLoginLink() {
    return (
      <div>
        
        <header className="App-header">
          <h1 align="center">Ready To Track Your Habits</h1>
          <h2 >Build positive habits or easily break bad habits</h2>
        </header>
        <div className="buttonContainer">
          <button className="homepagebutton" onClick={this.showSignUp}>SignUp</button>
          
          <button className="homepagebutton" onClick={this.showLogin}>Login</button>
        </div>
       
        <div className="danger colorList">
  <p><strong>HabitTracker helps you to track habits everyday</strong></p>
</div>

<div className="success colorList">
  <p><strong>Add new habit</strong></p>
</div>

<div className="info colorList">
  <p><strong>Update habits and percentage of completion upto 5 days</strong></p>
</div>

<div className="warning colorList">
  <p><strong> Have a visual reference and get motivated to be consistent.</strong></p>
</div>

      </div>
    );
  }
  render() {
    return (
      <div>


        {this.context.isLoggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </div>
    )
  }
}
