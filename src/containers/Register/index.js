import React, { Component } from 'react';
import {
    SafeAreaView,
    Keyboard,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from 'react-native';
import styles from "./styles"
import DeviceConstants from 'react-native-device-constants';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Validations } from '../../helpers'
import { Actions } from 'react-native-router-flux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Header from '../../components/Header'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser,loginUser } from '../../store/auth/actions'
import { isUserAuthenticated } from '../../utils/helpers/authUtils'
import { baseUrl } from '../../constants';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            FName: "",
            LName: "",
            pincode: "",
            password: "",
            confPassword: "",
            mobile_number:"",
            spinner: false,
            device_token:""
        };
        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePincode = this.onChangePincode.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPass = this.onChangeConfPass.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount(){
        var _this  = this
     
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
              console.log("TOKEN:", token);
              _this.setState({
                  device_token : token
              })
            },
          
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
          
              // process the notification
          
              // (required) Called when a remote is received or opened, or local notification is opened
              notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
          
            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
              console.log("ACTION:", notification.action);
              console.log("NOTIFICATION:", notification);
          
              // process the action
            },
          
            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function(err) {
              console.log("jdkkc",err.message, err);
            },
          
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
          
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
          
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
          });
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
    onChangeMobile(text){
        this.setState({
            mobile_number : text
        })
    }
    onSubmit() {
       // Actions.push('boards', { email: 'email' })
        var { email,mobile_number, FName, LName, pincode, password, confPassword } = this.state;
        if (FName === "") {
            Alert.alert('Step Up', "Please enter First Name")
        } else if (LName === "") {
            Alert.alert('Step Up', "please enter Last Name")
        } else if (email === "") {
            Alert.alert('Step Up', "please enter Email")
        } else if (mobile_number === "") {
            Alert.alert('Step Up', "please enter Mobile number")
        }else if (pincode === "") {
            Alert.alert('Step Up', "please enter Pincode")
        } else if (password === "") {
            Alert.alert('Step Up', "please enter Password")
        } else if (confPassword === "") {
            Alert.alert('Step Up', "please enter Confirm Password")
        } else if (!Validations.email(email)) {
            Alert.alert('Step Up', "please enter valid email")
        } else if(!Validations.phoneNumber(mobile_number)){
            Alert.alert('Step Up', "please enter valid phone number")
        }else if (!Validations.validatePincode(pincode)) {
            Alert.alert('Step Up', "please enter valid pincode")
        } else if (password != confPassword) {
            Alert.alert('Step Up', "password and confirm password doesn't match")
        } else {
              this.setState({spinner: true})
              const body ={
               name: FName+" "+LName,
              first_name: FName,
              last_name: LName,
              email: email,
              password:password,
              mobile_number: mobile_number,
              state: "AP",
              provision: "AP",
              pincode: pincode,
              gender: "Female",
              profile_pic: "",
              user_role: "General Student"
            }
           // this.props.registerUser(body)
            // console.log("hello",body)
            fetch(baseUrl+'/user/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
                }).then((response) => response.json())
                .then((json) =>{
                    const data = json.data;
                    if(data){
                        this.loginapi()
                    }else{
                        this.setState({spinner: false})
                        alert(json.message)
                    }
                }
                 
                )
                .catch((error) => console.error(error))
            //Actions.push('boards')
        }
    }
    // componentDidMount(){
    //     console.log('userdetails,',this.props.user)
    // }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //      console.log("newpropsss",nextProps.user)
    //      if(nextProps.user){
    //          if(nextProps.user.access_token){
    //             Actions.push('boards')
    //          }else{
    //             //  const body = {
    //             //     email: this.state.email,
    //             //     password: this.state.password,
    //             //  }
    //             // this.props.loginUser(body)
                
    //          }
            
    //      }
    //     return null;
    //   }
    //   componentDidUpdate(prevProps, prevState) {
    //     console.log("prevProps",this.props.user)
    //     if(prevProps.user!= this.props.user){
    //         if(this.props.user.access_token){
    //            Actions.push('boards')
    //         }else{
    //             const body = {
    //                             email: this.state.email,
    //                             password: this.state.password,
    //                          }
    //                         this.props.loginUser(body)
                            
    //         }
           
    //     }
    //   }
   loginapi(){
    const body ={
        email: this.state.email,
        password: this.state.password,
        device_type: this.state.device_token.os,
        device_id: DeviceConstants.deviceId,
        device_token: this.state.device_token.token
     }
    
     console.log("hello",body)
     fetch(baseUrl+'/user/login', {
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
         }).then((response) => response.json())
         .then((json) =>{
             const data = json.data;
             console.log("ddd",json)
             if(data){
                 const userdata = data.user;
                 AsyncStorage.setItem('@user', JSON.stringify(data.user))
                 AsyncStorage.setItem('@access_token', JSON.stringify(data.access_token))
                 this.setState({spinner: false})
                 Actions.push('boards',{userData:data.user})
             }else{
                this.setState({spinner: false})
                 alert(json.message)
             }
         }
          
         )
         .catch((error) => console.error(error))
   }

   onCancel(){
       Actions.login({type:"reset"})
   }

    render() {
        return (
            <>


                <ImageBackground
                    style={[styles.containter]}
                    source={require("../../assets/images/backblue.png")}
                />
  {/* <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={50}
                    style={{ flex: 1 }}> */}

                 <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{flexGrow: 1}}
                    style={styles.scrollView}>
                    <View style={styles.body}>
                        <Header title="register" />
                        <Image source={require("../../assets/images/logo_icon2.png")}
                            style={{width:80,height:80,alignSelf:"center",marginTop:10}} />
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
                            keyboardType={"email-address"}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Email</FloatingLabel>
                        <FloatingLabel
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            onChangeText={this.onChangeMobile}
                            keyboardType={"numeric"}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        >Mobile Number</FloatingLabel>
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
                            <TouchableOpacity onPress={this.onCancel.bind(this)} style={styles.createview}>
                                <Text style={styles.createtext}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <View style={styles.submiticon}>
                                    <Text style={styles.logintext}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.spinner ? 
                    <View style={{position:'absolute',backgroundColor:"rgba(255,255,255,0.3)",justifyContent:"center",height:"100%",width:"100%"}}>
                   <ActivityIndicator color={"black"}/>
                    </View> : null}
                   
                 </ScrollView>
                 {/* </KeyboardAvoidingView> */}



            </>
        );
    }
}
const mapStateToProps = state => {
    const { user, loading, error } = state.Auth
    console.log('state',user)
    return { user, loading, error }
  }
  
  export default connect(mapStateToProps, { registerUser,loginUser })(Register)
//export default Register;