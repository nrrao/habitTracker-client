import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import Header from '../Header/Header';
import PrivateRoute from '../Utilis/PrivateRoute';
import PublicRoute from '../Utilis/PublicRoute';
import HomePage from'../HomePage/HomePage';
import LoginPage from '../../routes/LoginPage';
import SignUpPage from '../../routes/SignUpPage';
import HabitsList from '../../routes/HabitsList';
import AddHabit from '../AddHabit/AddHabit'
import HabitsContext from '../HabitsContext';
import NotFoundPage from '../../routes/NotFoundPage';


export default class App extends Component {
  static contextType = HabitsContext;

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }


  componentDidMount = () => {
    this.context.refreshLoginState();
  }

  
  render() {
    
    return (
      
      <div>
          <header className='App__header'>
          <Header />
          </header>
          <main>
          
         <Switch>
          <Route exact path={'/'} component={HomePage} />
            
              <PublicRoute
              path={'/login'}
              component={LoginPage}
              />
              <PublicRoute
              path={'/signup'}
              component={SignUpPage}
              />
              <PrivateRoute
              path={'/habits'}
              component={HabitsList}
              />
              <Route
              path={'/addhabit'}
              component={AddHabit}
              />
               <Route
              component={NotFoundPage}
            />
        </Switch> 
        </main>
      </div>
     
    )
  }
}



