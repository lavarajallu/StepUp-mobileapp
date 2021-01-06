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
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Header from '../../components/Header'
import { Validations } from '../../helpers'

class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: "",
            confpassword: false,
        };
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onConfirmPass = this.onConfirmPass.bind(this)
        this.onVerify = this.onVerify.bind(this)
        this.onSent = this.onSent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeMobile(text) {
        console.log("lkdfjkdjfk", text)
        this.setState({
            mobile: text
        })
    }
    onChangePassword(text) {
        console.log("lkdfjkdjfk", text)
        this.setState({
            password: text
        })
    }
    onConfirmPass(text) {
        this.setState({
            confpassword: text
        })
    }
    onSent() {
        var mobile = this.state.mobile;
        if (mobile === "") {
            alert("Please enter mobile number")
        } else if (!Validations.validateMobileWithCC(mobile)) {
            alert("please enter valid mobile number")
        } else {
            console.log("hello")
        }
    }
    onVerify() {
        var mobile = this.state.mobile;
        if (mobile === "") {
            alert("Please enter email")
        } else if (!Validations.validateMobileWithCC(mobile)) {
            alert("please enter valid mobile number")
        } else {
            console.log("hello")
        }
    }
    onSubmit() {
        var { password, confpassword } = this.state
        if (password === "") {
            alert("please enter Password")
        } else if (confpassword === "") {
            alert("please enter Confirm Password")
        } else if (password != confpassword) {
            alert("password and confirm password doesn't match")
        } else {
            console.log("hello")
        }
    }
    render() {
        return (
            <>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <ImageBackground
                        style={[styles.containter]}
                        source={require("../../assets/images/backblue.png")}
                    />



                    <View style={styles.body}>
                        <Header title="otp" />
                        <Image source={require("../../assets/images/logo.png")}
                            style={styles.logo} />
                        <Text style={styles.helptext}>An OTP has been sent to your email/mobile</Text>
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            keyboardType={"numeric"}
                            onChangeText={this.onChangeMobile}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Mobile</FloatingLabel>

                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onVerify}>
                                <ImageBackground style={styles.submiticon}
                                    source={require("../../assets/images/submit.png")}>
                                    <Text style={styles.logintext}>Verify</Text>
                                </ImageBackground></TouchableOpacity>
                            <TouchableOpacity onPress={this.onSent}>
                                <View style={styles.createview}>
                                    <Text style={styles.createtext}>Request OTP</Text>
                                </View></TouchableOpacity>
                        </View>
                        <View style={styles.bottomview}>
                            <FloatingLabel
                                labelStyle={styles.labelstyle}
                                inputStyle={styles.input}
                                style={styles.textinput}
                                blurOnSubmit={false}
                                password={true}
                                onChangeText={this.onChangePassword}
                                onSubmitEditing={() => Keyboard.dismiss()}
                            >Create Password</FloatingLabel>
                            <FloatingLabel
                                labelStyle={styles.labelstyle}
                                inputStyle={styles.input}
                                style={styles.textinput}
                                blurOnSubmit={false}
                                password={true}
                                onChangeText={this.onConfirmPass}
                                onSubmitEditing={() => Keyboard.dismiss()}
                            >Confirm Password</FloatingLabel>
                        </View>

                        <TouchableOpacity onPress={this.onSubmit}>
                            <ImageBackground style={styles.submiticon}
                                source={require("../../assets/images/submit.png")}>
                                <Text style={styles.logintext}>Submit</Text>
                            </ImageBackground></TouchableOpacity>

                    </View>
                </ScrollView>



            </>
        );
    }
}
export default Otp;