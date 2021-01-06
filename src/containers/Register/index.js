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
    TouchableOpacity
} from 'react-native';
import styles from "./styles"
import {Validations} from '../../helpers'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Header from '../../components/Header'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            FName:"",
            LName:"",
            pincode:"",
            password:"",
            confPassword:""
        };
        this.onChangeFName=this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePincode = this.onChangePincode.bind(this);
        this.onChangePassword =  this.onChangePassword.bind(this);
        this.onChangeConfPass = this.onChangeConfPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeFName(text){
        this.setState({
            FName:text
        })
    }
    onChangeLName(text){
        this.setState({
            LName:text
        })
    }
    onChangeEmail(text){
        this.setState({
            email:text
        })
    }
    onChangePincode(text){
        this.setState({
            pincode:text
        })
    }
    onChangePassword(text){
        this.setState({
            password:text
        })
    }
    onChangeConfPass(text){
        this.setState({
            confPassword:text
        })
    }
    onSubmit(){
        var {email,FName,LName,pincode,password,confPassword} = this.state;
        if (FName === "") {
            alert("Please enter First Name")
        } else if (LName === "") {
            alert("please enter Last Name")
        } else if (email === "") {
            alert("please enter Email")
        }else if (pincode === "") {
            alert("please enter Pincode")
        }else if (password === "") {
            alert("please enter Password")
        }else if (confPassword === "") {
            alert("please enter Confirm Password")
        }else if (!Validations.email(email)) {
            alert("please enter valid email")
        } else if (!Validations.validatePincode(pincode)){
            alert("please enter valid pincode")
        } else if (password != confPassword){
            alert("password and confirm password doesn't match")
        }else {
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
                        <Header />
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
                            <ImageBackground style={styles.submiticon}
                                source={require("../../assets/images/submit.png")}>
                                <Text style={styles.logintext}>Submit</Text>
                            </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>



            </>
        );
    }
}
export default Register;