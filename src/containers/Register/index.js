import React, { Component } from 'react';
import {
    StyleSheet,
    Keyboard,
    ImageBackground,
    ScrollView,
    View,
    TextInput,
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
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';

import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, loginUser } from '../../store/auth/actions'
import { isUserAuthenticated } from '../../utils/helpers/authUtils'
import { baseUrl, colors } from '../../constants';
var radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];
var states = [
    { label: "Andhra Pradesh", value: "Andhra Pradesh", },
    { label: "Telengana", value: "Telengana", }
]
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
            mobile_number: "",
            spinner: false,
            device_token: "",
            showOTP: false,
            loading: false,
            genderval: null,
            otp: "",
            statevalue: ""
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
    componentDidMount() {
        var _this = this

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
                _this.setState({
                    device_token: token
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
            onRegistrationError: function (err) {
                console.log("jdkkc", err.message, err);
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
    onChangeMobile(text) {
        this.setState({
            mobile_number: text
        })
    }
    onSubmit() {
        // Actions.push('boards', { email: 'email' })
        var { email, mobile_number, FName, LName, pincode, password, confPassword, genderval, statevalue } = this.state;
        if (FName === "") {
            Alert.alert('Step Up', "Please enter First Name")
        } else if (LName === "") {
            Alert.alert('Step Up', "please enter Last Name")
        }else if (genderval === null) {
            Alert.alert('Step Up', "please select gender")
        } else if (email === "") {
            Alert.alert('Step Up', "please enter Email")
        }else if (password === "") {
            Alert.alert('Step Up', "please enter Password")
        } else if (confPassword === "") {
            Alert.alert('Step Up', "please enter Confirm Password")
        } else if (mobile_number === "") {
            Alert.alert('Step Up', "please enter Mobile number")
        }  else if (statevalue === "") {
            Alert.alert('Step Up', "please select state")
        } else if (pincode === "") {
            Alert.alert('Step Up', "please enter Pincode")
        }  else if (!Validations.email(email)) {
            Alert.alert('Step Up', "please enter valid email")
        } else if (password != confPassword) {
            Alert.alert('Step Up', "password and confirm password doesn't match")
        } else if (!Validations.phoneNumber(mobile_number)) {
            Alert.alert('Step Up', "please enter valid phone number")
        } else if (!Validations.validatePincode(pincode)) {
            Alert.alert('Step Up', "please enter valid pincode")
        } else {
            var genderva
            if (this.state.genderval === 0) {
                genderva = 'Male'
            } else if (this.state.genderval === 1) {
                genderva = 'Female'
            }
            this.setState({ spinner: true })
            const body = {
                name: FName + " " + LName,
                first_name: FName,
                last_name: LName,
                email: email,
                password: password,
                mobile_number: mobile_number,
                state: this.state.statevalue,
                provision: this.state.statevalue,
                pincode: pincode,
                gender: genderva,
                profile_pic: "",
                user_role: "General Student"
            }
            // this.props.registerUser(body)
            console.log("hello", body)
            fetch(baseUrl + '/user/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then((response) => response.json())
                .then((json) => {
                    console.log("JSOpmmmm",json)
                   // const data = json.data;
                    if (json.data) {
                        //this.loginapi()
                        this.setState({
                            showOTP: true
                        })
                    } else {
                        this.setState({ spinner: false })
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
    loginapi() {
        const body = {
            email: this.state.email,
            password: this.state.password,
            device_type: this.state.device_token.os,
            device_id: DeviceConstants.deviceId,
            device_token: this.state.device_token.token
        }

        console.log("hello", body)
        fetch(baseUrl + '/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => response.json())
            .then((json) => {
                const data = json.data;
                console.log("ddd", json)
                if (data) {
                    const userdata = data.user;
                    AsyncStorage.setItem('@user', JSON.stringify(data.user))
                    AsyncStorage.setItem('@access_token', JSON.stringify(data.access_token))
                    this.setState({ spinner: false })
                    Actions.push('boards', { userData: data.user })
                } else {
                    this.setState({ spinner: false })
                    alert(json.message)
                }
            }

            )
            .catch((error) => console.error(error))
    }

    onCancel() {
        Actions.login({ type: "reset" })
    }
    onchangeotp(text) {
        this.setState({ otp: text }, () => console.log("otppp", this.state.otp))
    }
    onVerify() {
        var mobile = this.state.otp;
        var email = this.state.email
        if (mobile === "") {
            alert("Please enter OTP")
        }

        else {
            this.setState({ loading: true })
            var body = { email: email, otp: mobile }
            console.log("Boyyy", body)

            // this.loginapi()
            fetch(baseUrl + '/user/verify-otp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then((response) =>

                response.json()
            )
                .then((json) => {
                    //   alert(JSON.stringify(json))
                    if (json) {
                        if (json.statusCode === 200) {
                            this.setState({ loading: false })
                            this.loginapi()
                        }
                        else {
                            this.setState({ loading: false })
                            this.loginapi()
                            // alert(json.message)
                        }
                    }
                }

                )
                .catch((error) => console.error(error))
            //  this.setState({
            //      showCnfpass: true
            //  })
        }
    }
    onsubjectclick(value, index) {
        // console.log("val", value, this.state.subjectslist[index - 1]);
        this.setState({
            statevalue: value,
            //selectedsubid: this.state.subjectslist[index - 1].id

        })
    }

    render() {
        const placeholder = {
            label: 'Select  State...',
            value: null,
            color: 'black',
        };
        return (
            this.state.showOTP ?
                <>
                    <>
                        <ImageBackground
                            style={[styles.containter]}
                            source={require("../../assets/images/backblue.png")}
                        />
                        <View style={{
                            backgroundColor: "white",
                            height: "90%",
                            margin: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: "transparent",
                            overflow: "hidden",
                        }}>
                            <Header title="registerotp" />
                            <Image source={require("../../assets/images/logo_icon1.png")}
                                style={{ width: 60, height: 60, alignSelf: "center", marginTop: 10 }} />
                            <View>
                                <Text style={{ fontSize: 15, alignSelf: "center", color: "#9B9C9C", marginVertical: 15 }}>An OTP has been sent to your email</Text>
                                <TextInput
                                    placeholderTextColor={"grey"}

                                    style={{
                                        borderBottomWidth: 1, borderColor: "#959595",
                                        marginHorizontal: 15,
                                        borderColor: '#2e2e2e',
                                        marginTop: 20,
                                        height: 40
                                    }}
                                    blurOnSubmit={false}
                                    value={this.state.otp}
                                    keyboardType={"number-pad"}
                                    returnKeyType={"done"}
                                    placeholder={"Enter OTP"}
                                    onChangeText={this.onchangeotp.bind(this)}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                ></TextInput>

                                <View style={{
                                    marginVertical: 10, marginHorizontal: 15, flexDirection: "row", justifyContent: "center", alignItems: 'center'
                                }}>
                                    <TouchableOpacity onPress={this.onVerify.bind(this)}>
                                        <View style={{
                                            width: 367 / 3, height: 90 / 3,
                                            marginVertical: 20,
                                            borderRadius: 20, overflow: "hidden", justifyContent: "center", alignSelf: 'center', backgroundColor: colors.Themecolor
                                        }}>
                                            <Text style={{
                                                textAlign: "center", color: "white", fontSize: 15
                                            }}>Verify</Text>
                                        </View></TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </>
                    {this.state.loading ?
                        <View style={{ position: 'absolute', backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", height: "100%", width: "100%" }}>
                            <ActivityIndicator color={"black"} />
                        </View> : null}
                </>
                :
                Platform.OS === 'android' ?
                    <>


                        <ImageBackground
                            style={[styles.containter]}
                            source={require("../../assets/images/backblue.png")}
                        />

                        <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            keyboardShouldPersistTaps={'handled'}
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={styles.scrollView}>
                            <View style={styles.body}>
                                <Header title="register" />
                                <Image source={require("../../assets/images/logo_icon1.png")}
                                    style={{ width: 80, height: 80, alignSelf: "center", marginTop: 10 }} />
                                <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    blurOnSubmit={false}
                                    onChangeText={this.onChangeFName}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >First Name</FloatingLabel>
                                <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    blurOnSubmit={false}
                                    onChangeText={this.onChangeLName}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Last Name</FloatingLabel>
                               
                                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                                    <RadioForm
                                        formHorizontal={true}
                                        animation={true}
                                    >
                                        {/* To create radio buttons, loop through your array of options */}
                                        {
                                            radio_props.map((obj, i) => (
                                                <RadioButton labelHorizontal={true} key={i} >
                                                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={this.state.genderval === i}
                                                        onPress={(value) => {
                                                            //  alert(value)
                                                            this.setState({ genderval: value })
                                                        }}
                                                        borderWidth={1}
                                                        buttonInnerColor={'#695077'}
                                                        buttonOuterColor={'#695077'}
                                                        buttonSize={10}
                                                        buttonOuterSize={20}
                                                        buttonStyle={{}}
                                                        buttonWrapStyle={{ marginLeft: 10 }}
                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        onPress={(value) => this.setState({ genderval: value })}
                                                        labelStyle={{ fontSize: 15, color: '#695077' }}
                                                        labelWrapStyle={{}}
                                                    />
                                                </RadioButton>
                                            ))
                                        }
                                    </RadioForm>
                                </View>
                                <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    blurOnSubmit={false}
                                    keyboardType={"email-address"}
                                    onChangeText={this.onChangeEmail}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Email</FloatingLabel>
   <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    blurOnSubmit={false}
                                    password={true}
                                    onChangeText={this.onChangePassword}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Create Password</FloatingLabel>
                                <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    blurOnSubmit={false}
                                    password={true}
                                    onChangeText={this.onChangeConfPass}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Confirm Password</FloatingLabel>
                                <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    blurOnSubmit={false}
                                    onChangeText={this.onChangeMobile}
                                    keyboardType={"numeric"}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Mobile Number</FloatingLabel>
                                <View
                                    style={{
                                        height: 50, width: windowWidth / 1.25, marginTop: 10,
                                        borderColor: "#695077", flexDirection: "row", paddingLeft: 8,
                                        borderBottomWidth: 1, marginLeft: 20, justifyContent: "space-between", alignItems: "center"
                                    }}>
                                    <RNPickerSelect
                                        placeholder={placeholder}
                                        value={this.state.statevalue}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={this.onsubjectclick.bind(this)}
                                        items={states}
                                    />
                                    <Image source={require('../../assets/images/downarrow.png')} style={{
                                        position: "absolute",
                                        width: 15, height: 15, tintColor: colors.Themecolor, right: 10
                                    }} />


                                </View>
                                <FloatingLabel
                                    placeholderTextColor={"grey"}

                                    labelStyle={styles.labelstyle}
                                    inputStyle={styles.input}
                                    style={styles.textinput}
                                    keyboardType={"numeric"}
                                    blurOnSubmit={false}
                                    onChangeText={this.onChangePincode}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Pin Code</FloatingLabel>
                             
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
                                <View style={{ position: 'absolute', backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", height: "100%", width: "100%" }}>
                                    <ActivityIndicator color={"black"} />
                                </View> : null}

                        </ScrollView>
                        {/* </KeyboardAvoidingView> */}



                    </>
                    :
                    <>


                        <ImageBackground
                            style={[styles.containter]}
                            source={require("../../assets/images/backblue.png")}
                        />

                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={50}
                            style={{ flex: 1 }}>
                            <ScrollView
                                contentInsetAdjustmentBehavior="automatic"
                                keyboardShouldPersistTaps={'handled'}
                                contentContainerStyle={{ flexGrow: 1 }}
                                style={styles.scrollView}>
                                <View style={styles.body}>
                                    <Header title="register" />
                                    <Image source={require("../../assets/images/logo_icon1.png")}
                                        style={{ width: 80, height: 80, alignSelf: "center", marginTop: 10 }} />
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
                                    <View style={{ flexDirection: 'row', alignItems: "center", paddingTop: 30 }}>

                                        <View style={{ paddingLeft: 20, }}>
                                            <RadioForm
                                                formHorizontal={true}
                                                animation={true}
                                            >
                                                {/* To create radio buttons, loop through your array of options */}
                                                {
                                                    radio_props.map((obj, i) => (
                                                        <RadioButton labelHorizontal={true} key={i} >
                                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                            <RadioButtonInput
                                                                obj={obj}
                                                                index={i}
                                                                isSelected={this.state.genderval === i}
                                                                onPress={(value) => {
                                                                    //  alert(value)
                                                                    this.setState({ genderval: value })
                                                                }}
                                                                borderWidth={1}
                                                                buttonInnerColor={'#695077'}
                                                                buttonOuterColor={'#695077'}
                                                                buttonSize={10}
                                                                buttonOuterSize={20}
                                                                buttonStyle={{}}
                                                                buttonWrapStyle={{ marginLeft: 10 }}
                                                            />
                                                            <RadioButtonLabel
                                                                obj={obj}
                                                                index={i}
                                                                labelHorizontal={true}
                                                                onPress={(value) => this.setState({ genderval: value })}
                                                                labelStyle={{ fontSize: 15, color: '#695077' }}
                                                                labelWrapStyle={{}}
                                                            />
                                                        </RadioButton>
                                                    ))
                                                }
                                            </RadioForm>
                                        </View>

                                    </View>
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
                                    <FloatingLabel
                                        labelStyle={styles.labelstyle}
                                        inputStyle={styles.input}
                                        style={styles.textinput}
                                        blurOnSubmit={false}
                                        onChangeText={this.onChangeMobile}
                                        keyboardType={"number-pad"}
                                        returnKeyType={"done"}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                    >Mobile Number</FloatingLabel>
                                    <View
                                        style={{
                                            height: 50, width: windowWidth / 1.25, marginTop: 10,
                                            borderColor: "#695077", flexDirection: "row", paddingLeft: 8,
                                            borderBottomWidth: 1, marginLeft: 20, justifyContent: "space-between", alignItems: "center"
                                        }}>
                                        <RNPickerSelect
                                            placeholder={placeholder}
                                            value={this.state.statevalue}
                                            style={pickerSelectStyles}
                                            useNativeAndroidPickerStyle={false}
                                            onValueChange={this.onsubjectclick.bind(this)}
                                            items={states}
                                        />
                                        <Image source={require('../../assets/images/downarrow.png')} style={{
                                            position: "absolute",
                                            width: 15, height: 15, tintColor: colors.Themecolor, right: 10
                                        }} />


                                    </View>
                                    <FloatingLabel
                                        labelStyle={styles.labelstyle}
                                        inputStyle={styles.input}
                                        style={styles.textinput}
                                        keyboardType={"number-pad"}
                                        returnKeyType={"done"}
                                        blurOnSubmit={false}
                                        onChangeText={this.onChangePincode}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                    >Pin Code</FloatingLabel>
                                   
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
                                    <View style={{ position: 'absolute', backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", height: "100%", width: "100%" }}>
                                        <ActivityIndicator color={"black"} />
                                    </View> : null}
                            </ScrollView>

                        </KeyboardAvoidingView>

                    </>
        );
    }
}
const mapStateToProps = state => {
    const { user, loading, error } = state.Auth
    console.log('state', user)
    return { user, loading, error }
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        borderWidth: 1,
        width: windowWidth / 1.1,
        borderColor: 'transparent',
        borderRadius: 8,
        color: 'black',
        marginTop: 10,
        // marginBottom:10,
        paddingRight: 10, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        borderWidth: 1,
        borderWidth: 0.5,
        width: windowWidth / 1.1,

        borderColor: 'transparent',
        borderRadius: 8,
        marginTop: 10,
        color: 'black',
        // marginBottom:10,
        paddingRight: 10, // to ensure the text is never behind the icon
    },
});
export default connect(mapStateToProps, { registerUser, loginUser })(Register)
//export default Register;