import React, { Component } from "react";
import HabitsContext from "./HabitsContext";
import HabitsApiService from "../services/habits-api-service";
import '../components/Login/Login.css'

export default class AddHabit extends Component {
  
  static contextType = HabitsContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  cancelAdd=()=>{
    this.props.history.push("/habits")
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { habit_name } = e.target;

    HabitsApiService.postHabit(habit_name.value)
    .then(res=>this.context.setHabitList(res))
    .then(this.props.history.push('/habits'))
      .catch(this.context.setError);
  };
  render() {
    console.log("inside addhabit component");
    console.log(this.props)
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        
        <div className="addHabit">
          <label htmlFor="addHabit_name">Habit Title</label>
          <input aria-label='add__newHabit_name' className="addHabitInput" required name="habit_name"></input>
          
         
          <button className="addButtonForm" type="submit">Add</button>
          <button className="addButtonForm" onClick={()=>this.props.closePopUp()}>Cancel</button>
         
          </div> 
        
      </form>
      
      </div>
    );
  }
}
