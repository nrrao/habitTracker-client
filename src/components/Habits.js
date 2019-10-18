import React, { Component } from "react";
import HabitsContext from "./HabitsContext";
import HabitsApiService from "../services/habits-api-service";

export default class Habits extends Component {
  static contextType = HabitsContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { habitTitle, percentage } = e.target;

    HabitsApiService.updateHabit(habitTitle.value, percentage.value)
      .then(this.context.editHabit)
      .then(this.props.history.push("/habits"))
      .catch(this.context.setError);
  };

  render() {
    const { title,percentage} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="habitTitle" value={title} onChange />
        <input type="text" name="habitTitle" value={percentage} onChange />
        
        <button type="submit">Edit</button>
      </form>
    );
  }
}
