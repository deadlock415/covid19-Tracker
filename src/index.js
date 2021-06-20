import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//help to render code on server side as faster as possible
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
