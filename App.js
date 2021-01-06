/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Login from './src/containers/Login'
import Register from "./src/containers/Register"
import ForgotPassword from "./src/containers/ForgotPassword"
import Otp from "./src/containers/Otp"
class App extends Component {
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Otp/>
        </SafeAreaView>
      </>
    );
  }
 
};
export default App;
