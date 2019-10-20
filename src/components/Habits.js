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

  state={
    isInEditMode:false
  }

  changeEditMode=()=>{
    this.setState({
      isInEditMode:!this.state.isInEditMode
    })
  }

  updateValue = (habitId) => {
    
    const habitTitle = this.refs.habitTitle.value;
    // const percentage0 =this.refs.percentage0.value;
    // const percentage1 =this.refs.percentage1.value;
    // const percentage2 =this.refs.percentage2.value;
    // const percentage3 =this.refs.percentage3.value;
    // const percentage4 =this.refs.percentage4.value;
    HabitsApiService.updateHabit(habitTitle,habitId)
      .then(res=>this.context.setHabitList(res))
      .then(this.props.history.push("/habits"))
      .catch(this.context.setError);
      this.setState({isInEditMode:false})
  };

  renderEditView=()=>{
    const { habitId,title,percentage,date} = this.props;
    return(
      <div>
      <div>
        <input  ref='habitTitle' type="text" defaultValue={title}/>
        <button onClick={this.changeEditMode}>x</button>
        <button onClick={()=>this.updateValue(habitId,date)}>ok</button>
        </div>
        <div>
        <input  ref='percentage0' type="text" defaultValue={percentage[0]}/>
        <input  ref='percentage1' type="text" defaultValue={percentage[1]}/>
        <input  ref='percentage2' type="text" defaultValue={percentage[2]}/>
        <input  ref='percentage3' type="text" defaultValue={percentage[3]}/>
        <input  ref='percentage4' type="text" defaultValue={percentage[4]}/>
      </div>
      </div>
     
    )
 
  }

  renderDefaultView=()=>{
    const { title,percentage} = this.props;
    return <div>
      <ul>
        <li onClick={this.changeEditMode}>{title}</li>
        <li >{percentage[0]}</li>
        <li >{percentage[1]}</li>
        <li >{percentage[2]}</li>
        <li>{percentage[3]}</li>
        <li>{percentage[4]}</li>
    
      </ul>
    </div>
  }

  render() {
    
    return (
      this.state.isInEditMode?
      this.renderEditView():
      this.renderDefaultView()
    );
  }
}
