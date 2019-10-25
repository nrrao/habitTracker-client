import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';

describe('<HomePage/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});