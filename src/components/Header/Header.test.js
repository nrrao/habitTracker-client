import React from "react";
import ReactDOM from "react-dom";
import Header from './Header'
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';


describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});