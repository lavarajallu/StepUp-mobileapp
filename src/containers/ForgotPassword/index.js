import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Header from '../../components/Header'
import { Validations } from '../../helpers'

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }
    onChangeEmail(text) {
        console.log("lkdfjkdjfk", text)
        this.setState({
            email: text
        })
    }

    onSubmit() {
        var email = this.state.email;
        if (email === "") {
            alert("Please enter email")
        } else if (!Validations.email(email)) {
            alert("please enter valid email")
        } else {
            console.log("hello")
        }
    }
    returnToLoginPage() {
        Actions.push('otp', { otpValue: '' })
    }

    render() {
        return (
            <>
                <ImageBackground
                    style={[styles.containter]}
                    source={require("../../assets/images/backblue.png")}
                />


                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.body}>
                        <Header title="forgot" />
                        <Image source={require("../../assets/images/logo.png")}
                            style={styles.logo} />
                        <Image source={require("../../assets/images/forgoticon.png")}
                            style={styles.forgoticon} />
                        <Text style={styles.forgottext}>Forgotton Password?</Text>
                        <Text style={styles.pleasetext}>Please Enter your email or mobile number </Text>
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Email</FloatingLabel>


                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <ImageBackground style={styles.submiticon}
                                    source={require("../../assets/images/submit.png")}>
                                    <Text style={styles.logintext}>Submit</Text>
                                </ImageBackground></TouchableOpacity>

                        </View>
                        <View style={styles.bottomview}>
                            <TouchableOpacity onPress={this.returnToLoginPage}>
                                <Text style={styles.helptext}>Return to Login?</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>



            </>
        );
    }
}
export default ForgotPassword;