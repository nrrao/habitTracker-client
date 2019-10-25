import React from "react";
import ReactDOM from "react-dom";
import Habits from './Habits'
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';


describe('<Habits />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <Habits />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});