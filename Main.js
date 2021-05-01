'use strict';
import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { configureAppStore } from './src/store/configureStore'
import App from './App'
const store = configureAppStore()
class Main extends Component {
 
  render() {
    return (
      <Provider store={store}>
        <App />   
              </Provider>
    );
  }
}

export default Main;