import React, { Component } from "react";
import HabitsContext from "../HabitsContext";
import HabitsApiService from "../../services/habits-api-service";
import './Habit.css'


export default class Habits extends Component {
  static contextType = HabitsContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  state={
    isInEditMode:false,
    showValueErr:false
  }

  changeEditMode=(e)=>{
    e.preventDefault();
    this.setState({
      isInEditMode:!this.state.isInEditMode
    })
  }

  updateValue = (habitId,dateArr,dates) => {
    
    const habitTitle = this.refs.habitTitle.value;
    const percentArr = [this.refs.percentage0.value,
                        this.refs.percentage1.value,
                        this.refs.percentage2.value,
                        this.refs.percentage3.value,
                        this.refs.percentage4.value];
    for(let i=0;i<percentArr.length;i++) {
      if (percentArr[i] < 0.0 || percentArr[i] > 100.0) {
        this.setState({showValueErr:true});
      }
    }
    HabitsApiService.updateHabit(habitTitle,habitId,percentArr,dateArr,dates)
      .then(res=>this.context.setHabitList(res))
      .catch(this.context.setError);
      this.setState({isInEditMode:false})

    this.setState({showValueErr:false});
  };

  deleteHabitRequest=(e)=>{
    
    HabitsApiService.deleteHabit(e.target.id)
    .then(res=>this.context.setHabitList(res))
  }

  renderEditView=()=>{
    const { habitId,title,percentage,dateId,date} = this.props;
    const dates =this.context.getDatesArray();
    return(
         <div className="ulHabitlist">
         <input className="  text inputTitle" aria-label='update_habit_title'  ref='habitTitle' type="text" defaultValue={title}/>
         <li className="date ">{dates[0].format('ddd D')}</li>
        <li className="date ">{dates[1].format('ddd D')}</li>
        <li className="date ">{dates[2].format('ddd D')}</li>
        <li className="date ">{dates[3].format('ddd D')}</li>
        <li className="date ">{dates[4].format('ddd D')}</li>
        <li className="pLable">Enter Percentage of Completion</li>
        
        <input className="percentage" aria-label='update_percentage-1' ref='percentage0' type="number" min="0" max="100" defaultValue={percentage[0]} />
        <input className="percentage" aria-label='update_percentage-2'  ref='percentage1' type="number" min="0" max="100" defaultValue={percentage[1]}/>
        <input className="percentage" aria-label='update_percentage-3'  ref='percentage2' type="number" min="0" max="100" defaultValue={percentage[2]}/>
        <input className="percentage" aria-label='update_percentage-4'  ref='percentage3' type="number" min="0" max="100" defaultValue={percentage[3]}/>
        <input className="percentage" aria-label='update_percentage-5' ref='percentage4' type="number" min="0" max="100" defaultValue={percentage[4]}/>
        <li className="liButton">
        <button className="editbutton" onClick={(e)=>this.updateValue(habitId,dateId,date)}>Save</button>
        <button className="deleteButton" onClick={(e)=>this.changeEditMode(e)}>Cancel</button>
        </li>
      </div>
     
    )
 
  }

  renderDefaultView=()=>{
    const { title,percentage,habitId} = this.props;
    
    const dates =this.context.getDatesArray();
   
    return <div>
      
      <ul className="ulHabitlist ">
        
        <li className="liTitle text">{title}</li>
        <li className="date ">{dates[0].format('ddd D')}</li>
        <li className="date ">{dates[1].format('ddd D')}</li>
        <li className="date ">{dates[2].format('ddd D')}</li>
        <li className="date ">{dates[3].format('ddd D')}</li>
        <li className="date ">{dates[4].format('ddd D')}</li>
        
        {/* <li><span className="dateSpan">Days</span>% Complete</li> */}
       
        <li className="liPercentage">{typeof(percentage) === 'undefined' ?0:percentage[0]}%</li>
        <li className="liPercentage">{typeof(percentage) === 'undefined' ?0:percentage[1]}%</li>
        <li className="liPercentage">{typeof(percentage) === 'undefined' ?0:percentage[2]}%</li>
        <li className="liPercentage">{typeof(percentage) === 'undefined' ?0:percentage[3]}%</li>
        <li className="liPercentage">{typeof(percentage) === 'undefined' ?0:percentage[4]}%</li>
        
        <li className="liButton">
        <button className="editbutton" onClick={(e)=>this.changeEditMode(e)}>Edit</button>
      <button className="deleteButton"  id={habitId} onClick={(e)=>this.deleteHabitRequest(e)}>Delete</button>
      </li>
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
