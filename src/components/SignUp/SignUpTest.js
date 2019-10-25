import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from './SignUpForm'
import { BrowserRouter } from 'react-router-dom'
import {HabitsContextProvider } from '../HabitsContext';


describe('<SignUp/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HabitsContextProvider>
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    </HabitsContextProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});