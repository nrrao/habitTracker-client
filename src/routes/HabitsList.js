import React, { Component } from "react";
import HabitsContext from "../components/HabitsContext";
import HabitsApiService from "../services/habits-api-service";
import Habits from "../components/Habits";

export default class HabitsList extends Component {
  static contextType = HabitsContext;

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  addHabit = () => {
    
    const { history } = this.props;
    history.push("/addhabit");
  };

  componentDidMount() {
    this.context.clearError();
    HabitsApiService.getHabitsList()

      .then(res => {
        console.log(res);
        console.log(this.context);
        this.context.setHabitList(res);
      })
      .catch(this.context.setError);
  }

  renderHabits() {
    const { habitList = [] } = this.context;
    console.log(habitList);
    return habitList.map((habit, idx) =>
      <Habits
        key={idx}
        habitId={habit.habit_id}
        title={habit.habit_title}
        date={habit.dates.map(date=>date.date_added)}
        dateId={habit.dates.map(dateId=>dateId.date_id)}
        percentage={habit.dates.map(percentage=>percentage.percentage)}
      />
    );
  }

  render() {
    //const { error } = this.context
    return (
      <section className="HabitListPage">
        <h1>HabitList</h1>
        <button type="button" onClick={e => this.addHabit()}>
          +
        </button>
        {this.renderHabits()}
      </section>
    );
  }
}
