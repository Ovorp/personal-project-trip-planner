import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/custom.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './duck/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
