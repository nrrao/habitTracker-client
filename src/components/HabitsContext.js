import React, { Component } from 'react';
import TokenService from "../services/token-service";
import moment from 'moment-timezone';

const HabitsContext = React.createContext({
  habitList:[],
  error: null,
  isLoggedIn: false,   
  showPopup: false,
  setError: () => {},
  clearError: () => {},
  setHabitList:()=>{},
  editHabit:()=>{},
  getDatesArray:()=>{},
  handleMissingValues:()=>{},
  togglePopup:()=>{}
})

export default HabitsContext


export  class HabitsContextProvider extends Component {
  state ={
    habitList:[],
    error:null,
    isLoggedIn: false,
    showPopup:false
  };

  
  refreshLoginState = () => {
    this.setState({ isLoggedIn:TokenService.hasAuthToken() });
  };

  togglePopup=() =>{
      
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  getDatesArray = () => {
    const dates = [
      moment.tz('America/New_York'),
      moment.tz('America/New_York').subtract(1,'days'),
      moment.tz('America/New_York').subtract(2,'days'),
      moment.tz('America/New_York').subtract(3,'days'),
      moment.tz('America/New_York').subtract(4,'days'),
    ]
    return dates;
  }

  compareHabitDates = (hd1, hd2) => {
    return hd1.date_added < hd2.date_added ? 1 : -1;
  }
  
  handleMissingValues = habitsListFromDb => {
    const dates = this.getDatesArray()
    const newHabitList = habitsListFromDb.map((habit) => {
      // find if there is an habit percentage for date, if not set this to zero
      dates.forEach((date) => {
        let dateFound = false;
        let dateToBeAdded = null;
  
        habit.dates.forEach((hd) => {
          if (date.format('YYYY-MM-DD') === moment(hd.date_added).tz('America/New_York').format('YYYY-MM-DD')) {
            dateFound = true;
          }
        })
      
        if (!dateFound) { // create a new habit date with zero percentage and date_id of -1
          dateToBeAdded = date.format('YYYY-MM-DD');
          habit.dates.push(
            {
              'date_id': -1,
              'percentage': 0,
              'date_added': dateToBeAdded,
              'habit_id': habit.habit_id
            }
          )
        }
      })
      habit.dates = habit.dates.sort(this.compareHabitDates)
      return habit;
    })
  
    return newHabitList;
  }
  
  setHabitList = habitList => {
    
    habitList = this.handleMissingValues(habitList)
    this.setState({ habitList })
  }

  editHabit = habitList =>{
    this.setState({ habitList })
  }

  render() {
    const value ={
      habitList:this.state.habitList,
      error: this.state.error,
      isLoggedIn: this.state.isLoggedIn,
      refreshLoginState: this.refreshLoginState,
      showPopup:this.state.showPopup,
      togglePopup:this.togglePopup,
      setError: this.setError,
      clearError: this.clearError,
      setHabitList:this.setHabitList,
      getDatesArray:this.getDatesArray,
      handleMissingValues:this.handleMissingValues
    }
    return (
      <div>
        <HabitsContext.Provider value={value}>
          {this.props.children}
        </HabitsContext.Provider>
      </div>
    )
  }
}
