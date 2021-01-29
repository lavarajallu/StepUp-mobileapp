import React, { Component } from 'react';
import {
    SafeAreaView,
    Keyboard,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import styles from "./styles"
import { Validations } from '../../helpers'
import { Actions } from 'react-native-router-flux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Header from '../../components/Header'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            FName: "",
            LName: "",
            pincode: "",
            password: "",
            confPassword: ""
        };
        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePincode = this.onChangePincode.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPass = this.onChangeConfPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeFName(text) {
        this.setState({
            FName: text
        })
    }
    onChangeLName(text) {
        this.setState({
            LName: text
        })
    }
    onChangeEmail(text) {
        this.setState({
            email: text
        })
    }
    onChangePincode(text) {
        this.setState({
            pincode: text
        })
    }
    onChangePassword(text) {
        this.setState({
            password: text
        })
    }
    onChangeConfPass(text) {
        this.setState({
            confPassword: text
        })
    }
    onSubmit() {
       // Actions.push('boards', { email: 'email' })
        var { email, FName, LName, pincode, password, confPassword } = this.state;
        if (FName === "") {
            Alert.alert('Step Up', "Please enter First Name")
        } else if (LName === "") {
            Alert.alert('Step Up', "please enter Last Name")
        } else if (email === "") {
            Alert.alert('Step Up', "please enter Email")
        } else if (pincode === "") {
            Alert.alert('Step Up', "please enter Pincode")
        } else if (password === "") {
            Alert.alert('Step Up', "please enter Password")
        } else if (confPassword === "") {
            Alert.alert('Step Up', "please enter Confirm Password")
        } else if (!Validations.email(email)) {
            Alert.alert('Step Up', "please enter valid email")
        } else if (!Validations.validatePincode(pincode)) {
            Alert.alert('Step Up', "please enter valid pincode")
        } else if (password != confPassword) {
            Alert.alert('Step Up', "password and confirm password doesn't match")
        } else {
            console.log("hello")
            Actions.push('boards')
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
                        <Header title="register" />
                        <Image source={require("../../assets/images/logo.png")}
                            style={styles.logo} />
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            onChangeText={this.onChangeFName}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >First Name</FloatingLabel>
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            onChangeText={this.onChangeLName}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Last Name</FloatingLabel>
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Email/Mobile</FloatingLabel>
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeText={this.onChangePincode}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Pin Code</FloatingLabel>
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
                            onChangeText={this.onChangeConfPass}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Confirm Password</FloatingLabel>
                        <View style={styles.subview}>
                            <View style={styles.createview}>
                                <Text style={styles.createtext}>Cancel</Text>
                            </View>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <View style={styles.submiticon}>
                                    <Text style={styles.logintext}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>



            </>
        );
    }
}
export default Register;