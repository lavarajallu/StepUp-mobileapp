import React, { Component } from 'react';
import {
    SafeAreaView,
    TextInput,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator,
    Platform
} from 'react-native';
import { connect } from 'react-redux'
import { loginUser } from '../../store/auth/actions'
import { isUserAuthenticated } from '../../utils/helpers/authUtils'
import { Actions } from 'react-native-router-flux';
import DeviceConstants from 'react-native-device-constants';
import LocalizedStrings from 'react-native-localization';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import Header from '../../components/Header'
import { Validations } from '../../helpers'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import StringsOfLanguages from './../../StringsOfLanguages';
import { baseUrl } from '../../constants';

var isAuthTokenValid 
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: "",
            checked: false,
            hidePassword: true,
            spinner:false,
            device_token:''
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onCheck = this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount(){
        //alert(this.props.localevalue)
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
        const username = await AsyncStorage.getItem('@email');
       
        if (username !== null) {
          const password =  await AsyncStorage.getItem('@password');
           
            if (password !== null) {
                  // 
       
              var details = {
                  email: username,
                  password: password
              }
              
              this.setState({
                  email: username,
                  password: password,
                  checked: true
              },()=>console.log(this.state.email))
              
            }else{
              
          }
        
        }else{
          ;
        }
         console.log('detailslogin,',this.props.user)
       
     }
    renderRedirectToRoot = async () => {
         isAuthTokenValid = await isUserAuthenticated()
        console.log("ddd",isAuthTokenValid)
        if (isAuthTokenValid) {
          Actions.push('main')
        }
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
    onCheck(value) {
       // alert(value)
        this.setState({
            checked: value
        },()=>console.log(this.state.checked))
        if (value === true) {
            //user wants to be remembered.
             
           AsyncStorage.setItem('@email', this.state.email);
           AsyncStorage.setItem('@password', this.state.password);
            } else {
              this.forgetUser();
            }
    }
    rememberUser = async () => {
      
      
        };
        getRememberedUser = async () => {
            
          
        };
        forgetUser = async () => {
          try {
            await AsyncStorage.removeItem('@email');
            await AsyncStorage.removeItem('@password');
            this.setState({
                email:"",
                password:""
            })
          } catch (error) {
           // Error removing
          }
        };
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
        } 
        // else if(!Validations.phoneNumber(email)){
            
        // }
        // else if (!Validations.email(email)) {
        //    // alert("please enter valid email")
        // } 
        else {
            this.setState({spinner: true})
        //     const body ={
        //         email: email,
        //         password: password,
        //         device_type: "ANDROID",
        //         device_id: "device_id",
        //         device_token: "device_token"
        //      }
        //   //  this.props.loginUser(email, password)
        //     Actions.push('dashboard')
            console.log("hello")
            const body ={
                email: email,
                password: password,
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
                        this.setState({spinner: false})
                         const userdata = data.user;
                         AsyncStorage.setItem('@user', JSON.stringify(data.user))
                         AsyncStorage.setItem('@access_token', JSON.stringify(data.access_token))
                         Actions.dashboard()
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
  
    static getDerivedStateFromProps(nextProps, prevState) {
         console.log("newpropslogin",nextProps.user)
         if(nextProps.user){
             Actions.push('main')
         }
        //return null;
      }
      setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {
       
        return (
            
            <>
              
                <ImageBackground
                    style={[styles.containter]}
                    source={require("../../assets/images/backblue.png")}
                />
                    <View style={{flex:1,margin:20,backgroundColor:"white",borderRadius:20,overflow:"hidden"}}>
                       <View style={{flex:0.3,backgroundColor:"red",}}>
                       <Header title="login" />
                       </View>
                       <View style={{flex:0.7,justifyContent:"space-evenly",paddingHorizontal:20,}}>
                       <Image source={require("../../assets/images/logo_icon1.png")}
                            style={{width:72,height:72,alignSelf:"center"}} />
                        <View style={{width:windowWidth/1.25,alignSelf:"center",height:50,borderBottomWidth: 1, borderColor: "lightgrey", justifyContent: 'center',}}>
                        <TextInput
                            style={{width:"100%",paddingLeft:8}}
                            placeholder={StringsOfLanguages.emailtextinput}
                            blurOnSubmit={false}
                            value={this.state.email}
                            keyboardType={"email-address"}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => this.secondTextInput.focus()}
                        ></TextInput>
                        </View>
                        <View style={{width:windowWidth/1.25,alignSelf:"center",height:50,flexDirection:"row", borderBottomWidth: 1, borderColor: "lightgrey", justifyContent: 'center',}}>
                        
                        <TextInput
                            ref={(input) => { this.secondTextInput = input; }}
                            style={{paddingLeft:8,width:"85%",
    
                            borderColor: '#2e2e2e'}}
                            placeholder={StringsOfLanguages.passwordtextinput}
                            value={this.state.password}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={this.onChangePassword}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        ></TextInput>
                           <TouchableOpacity activeOpacity={0.8}
                            style={{width:"15%",height:50,justifyContent:"center",alignItems:"center"}}
                            onPress={this.setPasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../../assets/images/ic_visibility.png') : require('../../assets/images/ic_visibility_off.png')} style={{ resizeMode: 'contain', height: '50%', width: '50%', }} />
                        </TouchableOpacity>
                        </View>
                         <View style={styles.subview}>
                            <View style={styles.checkboxview}>
                                
                                    {this.state.checked ?
                                    <TouchableOpacity onPress={()=>this.onCheck(false)} style={styles.checkboxview}>
                                        <Image source={require("../../assets/images/check.png")} style={styles.checkbox} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=>this.onCheck(true)} style={styles.checkboxview}>
                                        <Image source={require("../../assets/images/uncheck.png")} style={styles.checkbox} />
                                        </TouchableOpacity>
                                    }
                               
                                <Text style={styles.remembertext}>{StringsOfLanguages.rememberme}</Text></View>
                            <TouchableOpacity onPress={this.forgotPassword}>
                                <Text style={styles.forgottext}>{StringsOfLanguages.forgotpassword}</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <Text  style={styles.helptext}>{StringsOfLanguages.forgot}</Text>
                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <View style={styles.submiticon}
                                    >
                                    <Text style={styles.logintext}>{StringsOfLanguages.login}</Text>
                                </View></TouchableOpacity>
                            <View style={styles.createview}>
                                <TouchableOpacity onPress={this.createAccount}>
                                    <Text style={styles.createtext}>{StringsOfLanguages.createaccount}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View style={styles.bottomview}>
                            
                            {/* <View style={styles.socialiconview}>
                                <Image source={require("../../assets/images/fb.png")} style={styles.socialicon} />
                                <Image source={require("../../assets/images/google.png")} style={styles.socialicon} />
                                <Image source={require("../../assets/images/twitter.png")} style={styles.socialicon} />
                            </View> 
                        </View> */}
                       </View>
                    </View>
                    {this.state.spinner ? 
                    <View style={{position:'absolute',backgroundColor:"rgba(255,255,255,0.3)",justifyContent:"center",height:"100%",width:"100%"}}>
                   <ActivityIndicator color={"black"}/>
                    </View> : null}
               
           
              

            </>
        );
    }
}
const mapStateToProps = state => {
    const { user, loading, error } = state.Auth
    console.log('state',user)
    return { user, loading, error }
  }
  
  export default connect(mapStateToProps, { loginUser })(Login)