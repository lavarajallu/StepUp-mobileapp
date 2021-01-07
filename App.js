/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Login, Register, ForgotPassword, Otp, Boards,Grades } from './src/containers'

const App = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} initial={true} />
        <Scene key="register" component={Register} />
        <Scene key="forgotPassword" component={ForgotPassword} />
        <Scene key="otp" component={Otp} />
        <Scene key="boards" component={Boards} />
        <Scene key="grades" component={Grades} />
      </Stack>
    </Router>
  )
}

export default App
