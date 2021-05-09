import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TextInput,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity,
    Alert
} from 'react-native';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Header from '../../components/Header'
import { Validations } from '../../helpers'
import { Actions } from 'react-native-router-flux';

class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: "",
            confpassword: false,
            showCnfpass: false,
            hidecnfPassword: true,
            hidePassword: true
        };
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onConfirmPass = this.onConfirmPass.bind(this)
        this.onVerify = this.onVerify.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeMobile(text) {
        this.setState({
            mobile: text
        })
    }
    onChangePassword(text) {
        this.setState({
            password: text
        })
    }
    onConfirmPass(text) {
        this.setState({
            confpassword: text
        })
    }
    onVerify() {
        var mobile = this.state.mobile;
        if (mobile === "") {
            alert("Please enter OTP")
        }
     
         else {
             this.setState({
                 showCnfpass: true
             })
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
            Alert.alert(
                "Step Up",
                "Password Changed Successfully, Please login again",
                [
                  { text: "OK", onPress: () => Actions.login({type:"reset"}) }
                ]
              );
        }
    }
    setPasswordVisibility = ()=>{
        this.setState({
            hidePassword: !this.state.hidePassword
        })
    }
    setNewPasswordVisibility = ()=>{
        this.setState({
            hidecnfPassword: !this.state.hidecnfPassword
        })
    }
    render() {
        return (
            <>

                    <ImageBackground
                        style={[styles.containter]}
                        source={require("../../assets/images/backblue.png")}
                    />



                    <View style={styles.body}>
                        <Header title="otp" />
                        <Image source={require("../../assets/images/logo_icon.png")}
                            style={{width:100,height:100,alignSelf:"center",marginTop:10}} />
                        {this.state.showCnfpass ? 

                        <View style={{flex:1,justifyContent:"space-evenly"}}>
                              <View style={{width:windowWidth/1.25,alignSelf:"center",height:50,}}>
                        
                        <TextInput
                            ref={(input) => { this.firstTextInput = input; }}
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={{height:"100%",width:"100%",borderBottomWidth:1}}
                            placeholder="Password"
                            value={this.state.password}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={this.onChangePassword}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        ></TextInput>
                           <TouchableOpacity activeOpacity={0.8}
                           style={{ position: 'absolute', right: 3, height: 40, width: 35, padding: 2 }}
                            onPress={this.setPasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../../assets/images/ic_visibility.png') : require('../../assets/images/ic_visibility_off.png')} style={{ resizeMode: 'contain', height: '100%', width: '70%', }} />
                        </TouchableOpacity>
                        </View>
                        <View style={{width:windowWidth/1.25,alignSelf:"center",height:50,}}>
                        
                        <TextInput
                            ref={(input) => { this.secondTextInput = input; }}
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={{height:"100%",width:"100%",borderBottomWidth:1}}
                            placeholder="Confirm Password"
                            value={this.state.confpassword}
                            secureTextEntry={this.state.hidecnfPassword}
                            onChangeText={this.onConfirmPass}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        ></TextInput>
                           <TouchableOpacity activeOpacity={0.8} 
                           style={{ position: 'absolute', right: 3, height: 40, width: 35, padding: 2 }} 
                           onPress={this.setNewPasswordVisibility}>
                            <Image source={(this.state.hidecnfPassword) ? require('../../assets/images/ic_visibility.png') : require('../../assets/images/ic_visibility_off.png')} style={{ resizeMode: 'contain', height: '100%', width: '70%', }} />
                        </TouchableOpacity>
                        </View>
                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <View style={styles.submiticon}>
                                    <Text style={styles.logintext}>Submit</Text>
                                </View></TouchableOpacity>
                        </View>
                        </View>

                        :

                        <View>
                        <Text style={styles.helptext}>An OTP has been sent to your email</Text>
                        <TextInput
                          
                            style={styles.textinput}
                            blurOnSubmit={false}
                            value={this.state.otp}
                            keyboardType={"numeric"}
                            placeholder={"Enter OTP"}
                            onChangeText={this.onChangeMobile}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        ></TextInput>

                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onVerify}>
                                <View style={styles.submiticon}>
                                    <Text style={styles.logintext}>Verify</Text>
                                </View></TouchableOpacity>
                        </View>
                        </View>}

                    </View>




            </>
        );
    }
}
export default Otp;
