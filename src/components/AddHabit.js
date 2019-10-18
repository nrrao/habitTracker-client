import React, { Component } from "react";
import HabitsContext from "./HabitsContext";
import HabitsApiService from "../services/habits-api-service";

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
    .then(this.context.addHabit(habit_name.value))
    .then(this.props.history.push('/habits'))
      .catch(this.context.setError);
  };
  render() {
    console.log("inside addhabit component");
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="addHabit_name">Habit Title</label>
          <input required name="habit_name"></input>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  }
}
