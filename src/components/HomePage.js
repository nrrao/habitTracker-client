import React, { Component } from 'react'
import './Login/Login.css'
import HabitsContext from './HabitsContext';

export default class HomePage extends Component {
  static contextType = HabitsContext;

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  showSignUp=()=>{
    this.props.history.push("/login")
  }
  showLogin=()=>{
    this.props.history.push("/signup")
  }
  render() {
    return (
      <div>
        
        <header className="App-header">
          <h1 align="center">Ready To Track Your Habits</h1>
          <h2>Build positive habits or easily break bad habits</h2>
        </header>
        <div className="buttonContainer">
          <button className="homepagebutton" onClick={this.showSignUp}>SignUp</button>
          
          <button className="homepagebutton" onClick={this.showLogin}>Login</button>
        </div>
       
        <div className="danger colorList">
  <p><strong>Exercise,Journal</strong>....100%</p>
</div>

<div className="success colorList">
  <p><strong>Success!</strong> ...</p>
</div>

<div className="info colorList">
  <p><strong>Keep Track</strong> ...</p>
</div>

<div className="warning colorList">
  <p><strong>Achieve Goals</strong> ...</p>
</div>

      </div>
    )
  }
}
