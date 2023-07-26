import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store/store";
// import { PersistGate } from "redux-persist/integration/react";

import './styles.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
