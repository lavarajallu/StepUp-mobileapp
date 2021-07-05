import React, { Component } from 'react';
import {
    SafeAreaView,
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
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, loginUser } from '../../store/auth/actions'
import { isUserAuthenticated } from '../../utils/helpers/authUtils'
import { baseUrl ,colors} from '../../constants';

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
            otp: ""
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
        var { email, mobile_number, FName, LName, pincode, password, confPassword } = this.state;
        if (FName === "") {
            Alert.alert('Step Up', "Please enter First Name")
        } else if (LName === "") {
            Alert.alert('Step Up', "please enter Last Name")
        } else if (email === "") {
            Alert.alert('Step Up', "please enter Email")
        } else if (mobile_number === "") {
            Alert.alert('Step Up', "please enter Mobile number")
        } else if (pincode === "") {
            Alert.alert('Step Up', "please enter Pincode")
        } else if (password === "") {
            Alert.alert('Step Up', "please enter Password")
        } else if (confPassword === "") {
            Alert.alert('Step Up', "please enter Confirm Password")
        } else if (!Validations.email(email)) {
            Alert.alert('Step Up', "please enter valid email")
        } else if (!Validations.phoneNumber(mobile_number)) {
            Alert.alert('Step Up', "please enter valid phone number")
        } else if (!Validations.validatePincode(pincode)) {
            Alert.alert('Step Up', "please enter valid pincode")
        } else if (password != confPassword) {
            Alert.alert('Step Up', "password and confirm password doesn't match")
        } else {
            this.setState({ spinner: true })
            const body = {
                name: FName + " " + LName,
                first_name: FName,
                last_name: LName,
                email: email,
                password: password,
                mobile_number: mobile_number,
                state: "AP",
                provision: "AP",
                pincode: pincode,
                gender: "",
                profile_pic: "",
                user_role: "General Student"
            }
            // this.props.registerUser(body)
            // console.log("hello",body)
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
        this.setState({ otp: text },()=>console.log("otppp",this.state.otp))
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

    render() {
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
                                    marginTop:20,
                                    height:40
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
                                    onChangeText={this.onChangeMobile}
                                    keyboardType={"numeric"}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                >Mobile Number</FloatingLabel>
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
                                        keyboardType={"number-pad"}
                                        returnKeyType={"done"}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                    >Mobile Number</FloatingLabel>
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

export default connect(mapStateToProps, { registerUser, loginUser })(Register)
//export default Register;