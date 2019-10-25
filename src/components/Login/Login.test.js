import React from "react";
import ReactDOM from "react-dom";
import LoginForm from './LoginForm'
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';


describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});