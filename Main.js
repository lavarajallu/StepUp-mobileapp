'use strict';
import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { Provider,  } from 'react-redux';
import { configureAppStore } from './src/store/configureStore'
import App from './App'
import { StatusBar,SafeAreaView } from "react-native"
const store = configureAppStore()
class Main extends Component {
 
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
         <StatusBar />
        <App />   
      </Provider>
      </SafeAreaView>
    );
  }
}

export default Main;