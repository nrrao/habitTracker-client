import React, { Component } from "react";
import HabitsContext from "../components/HabitsContext";
import HabitsApiService from "../services/habits-api-service";
import Habits from "../components/Habits/Habits";
import '../components/Habits/Habit.css'
import AddHabit from "../components/AddHabit/AddHabit";

export default class HabitsList extends Component {
  static contextType = HabitsContext;

  constructor(props){  
    super(props);  
    this.state = { showPopup: false };  
    }  

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  addHabit = (e) => {
    e.preventDefault();
     const { history } = this.props;
    history.push("/addhabit");
  };

  componentDidMount() {
    this.context.clearError();
    HabitsApiService.getHabitsList()
      .then(res => {
        this.context.setHabitList(res);
      })
      .catch(this.context.setError);
  }

  renderHabits() {
    const { habitList = [] } = this.context;
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
    // const { error } = this.context
    
    
    return (
      <section className="HabitListPage">
        {/* <h1>HabitList</h1>  */}
        <div className="addNewHabitButtonDiv">
        <button className="addButton" onClick={()=>this.context.togglePopup()}> Add New Habit</button>  
        {this.context.showPopup ? <AddHabit/>:null}
        </div>
        {this.renderHabits()}
      </section>
    );
  }
}
