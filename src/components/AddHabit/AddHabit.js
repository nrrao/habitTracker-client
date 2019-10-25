import React, { Component } from "react";
import HabitsContext from "../HabitsContext";
import HabitsApiService from "../../services/habits-api-service";
import '../Login/Login.css'

export default class AddHabit extends Component {
  
  static contextType = HabitsContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

 
  
  handleSubmit = e => {
    e.preventDefault();
    const { habit_name } = e.target;
    HabitsApiService.postHabit(habit_name.value)
    .then(res=>{
      habit_name.value = ''
      this.context.setHabitList(res)})
    .then(this.context.togglePopup())
      .catch(this.context.setError);
  };

  render() {
    console.log("inside addhabit component");
    console.log(this.props)
    return (
      <div>
      <form className="addHabitDiv" onSubmit={this.handleSubmit}>
        
        
          <label className='addHabitLable' htmlFor="addHabit_name">New Habit Title</label>
          <input aria-label='add__newHabit_name' className="addHabitInput" required name="habit_name"></input>
          
         
          <button className="addButtonForm" type="submit">Add</button>
          <button className="addButtonForm" onClick={()=>this.context.togglePopup()}>Cancel</button>
         
          
        
      </form>
      
      </div>
    );
  }
}
