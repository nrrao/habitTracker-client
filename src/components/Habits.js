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

  updateValue = (habitId,dateArr) => {
    
    const habitTitle = this.refs.habitTitle.value;
    const percentArr = [this.refs.percentage0.value,
                        this.refs.percentage1.value,
                        this.refs.percentage2.value,
                        this.refs.percentage3.value,
                        this.refs.percentage4.value];
                    
    HabitsApiService.updateHabit(habitTitle,habitId,percentArr,dateArr)
      .then(res=>this.context.setHabitList(res))
      .then(this.props.history.push("/habits"))
      .catch(this.context.setError);
      this.setState({isInEditMode:false})
  };

  deleteHabitRequest=(e)=>{
    console.log(e.target.id);
    HabitsApiService.deleteHabit(e.target.id)
    .then(res=>this.context.setHabitList(res))
  }

  renderEditView=()=>{
    const { habitId,title,percentage,dateId} = this.props;
    console.log(this.props)
    return(
      <div>
      <div>
        <input  ref='habitTitle' type="text" defaultValue={title}/>
        <button onClick={this.changeEditMode}>x</button>
        <button onClick={()=>this.updateValue(habitId,dateId)}>ok</button>
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
    const { title,percentage,habitId} = this.props;
    console.log(habitId)
    return <div>
      <ul>
        <li onClick={this.changeEditMode}>{title}</li>
        <li >{percentage[0]}</li>
        <li >{percentage[1]}</li>
        <li >{percentage[2]}</li>
        <li>{percentage[3]}</li>
        <li>{percentage[4]}</li>
      <button id={habitId} onClick={(e)=>this.deleteHabitRequest(e)}>Delete</button>
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
