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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: "",
            checked: false,
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onCheck = this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeEmail(text) {
        console.log("lkdfjkdjfk", text)
        this.setState({
            email: text
        })
    }
    onChangePassword(text) {
        console.log("lkdfjkdjfk", text)
        this.setState({
            password: text
        })
    }
    onCheck() {
        this.setState({
            checked: !this.state.checked
        })
    }
    createAccount() {
        Actions.push('register', { email: 'email' })
    }
    forgotPassword() {
        Actions.push('forgotPassword', { forgotPassword: 'forgotPassword' })
    }
    onSubmit() {
        var email = this.state.email;
        var password = this.state.password;
        if (email === "") {
            alert("Please enter email")
        } else if (password === "") {
            alert("please enter password")
        } else if (!Validations.email(email)) {
            alert("please enter valid email")
        } else {
            Actions.push('dashboard')
            console.log("hello")
        }
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
                        <Header title="login" />
                        <Image source={require("../../assets/images/logo.png")}
                            style={styles.logo} />
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Email</FloatingLabel>
                        <FloatingLabel
                            ref={(input) => { this.secondTextInput = input; }}
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            password={true}
                            onChangeText={this.onChangePassword}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Password</FloatingLabel>
                        <View style={styles.subview}>
                            <View style={styles.checkboxview}>
                                <TouchableOpacity onPress={this.onCheck} style={styles.checkboxview}>
                                    {this.state.checked ?
                                        <Image source={require("../../assets/images/check.png")} style={styles.checkbox} />
                                        :

                                        <Image source={require("../../assets/images/uncheck.png")} style={styles.checkbox} />

                                    }
                                </TouchableOpacity>
                                <Text style={styles.remembertext}>Remember me</Text></View>
                            <TouchableOpacity onPress={this.forgotPassword}>
                                <Text style={styles.forgottext}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <View style={styles.submiticon}
                                    >
                                    <Text style={styles.logintext}>Log In</Text>
                                </View></TouchableOpacity>
                            <View style={styles.createview}>
                                <TouchableOpacity onPress={this.createAccount}>
                                    <Text style={styles.createtext}>Create Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottomview}>
                            <Text style={styles.helptext}>Forgotton your login details? Get help Signing in</Text>
                            <View style={styles.socialiconview}>
                                <Image source={require("../../assets/images/fb.png")} style={styles.socialicon} />
                                <Image source={require("../../assets/images/google.png")} style={styles.socialicon} />
                                <Image source={require("../../assets/images/twitter.png")} style={styles.socialicon} />
                            </View>
                        </View>

                    </View>
                </ScrollView>



            </>
        );
    }
}
export default Login;