import React from "react";
import ReactDOM from "react-dom";
import AddHabit from './AddHabit'
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';


describe('<AddHabit />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <AddHabit />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});