import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Login, Register, ForgotPassword, Otp } from './src/containers'

const NavigationFlow = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar={true}>
                <Scene key="login" component={Login} initial={true} />
                <Scene key="register" component={Register} />
                <Scene key="forgotPassword" component={ForgotPassword} />
                <Scene key="otp" component={Otp} />
            </Stack>
        </Router>
    )
}

export default NavigationFlow