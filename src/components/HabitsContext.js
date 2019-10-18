import React, { Component } from 'react'
import TokenService from "../services/token-service";


const HabitsContext = React.createContext({
  habitList:[],
  error: null,
  isLoggedIn: false,
  setError: () => {},
  clearError: () => {},
  setHabitList:()=>{},
  addHabit:()=>{},
  editHabit:()=>{}

})

export default HabitsContext


export  class HabitsContextProvider extends Component {
  state ={
    habitList:[],
    error:null,
    isLoggedIn: false
  };

  
  refreshLoginState = () => {
    this.setState({ isLoggedIn:TokenService.hasAuthToken() });
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  
  setHabitList = habitList => {
    console.log(habitList)
    this.setState({ habitList })
  }

  addHabit = habit => {
    this.setHabitList([
      ...this.state.habitList,
      habit
    ])
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
      setError: this.setError,
      clearError: this.clearError,
      setHabitList:this.setHabitList,
      addHabit:this.addHabit
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
