import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from '../src/components/App/App';
import {HabitsContextProvider } from './components/HabitsContext';
import ErrorHandler from '../src/components/ErrorHandler'


ReactDOM.render(
  <ErrorHandler>
<HabitsContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</HabitsContextProvider>
</ErrorHandler>, document.getElementById('root'));


