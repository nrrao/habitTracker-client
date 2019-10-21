import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import Header from './Header';
import PrivateRoute from '../components/Utilis/PrivateRoute';
import PublicRoute from '../components/Utilis/PublicRoute';
import HomePage from'./HomePage';
import LoginPage from '../routes/LoginPage';
import SignUpPage from '../routes/SignUpPage';
import HabitsList from '../routes/HabitsList';
import AddHabit from '../components/AddHabit'
import HabitsContext from './HabitsContext';


export default class App extends Component {
  static contextType = HabitsContext;

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
        </Switch> 
        </main>
      </div>
     
    )
  }
}



