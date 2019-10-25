import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});