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
    Alert,
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
import { baseUrl, colors } from '../../constants';

var isAuthTokenValid
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: "",
            checked: false,
            hidePassword: true,
            spinner: false,
            device_token: '',
            showOTP: false,
            otp: ""
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onCheck = this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        //alert(this.props.localevalue)
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
        const username = await AsyncStorage.getItem('@email');

        if (username !== null) {
            const password = await AsyncStorage.getItem('@password');

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
                }, () => console.log(this.state.email))

            } else {

            }

        } else {
            ;
        }
        console.log('detailslogin,', this.props.user)

    }
    renderRedirectToRoot = async () => {
        isAuthTokenValid = await isUserAuthenticated()
        console.log("ddd", isAuthTokenValid)
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
        }, () => console.log(this.state.checked))
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
                email: "",
                password: ""
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
            this.setState({ spinner: true })
            
            console.log("hello")
            const body = {
                email: email,
                password: password,
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
                    console.log("ddd.........", json)
                    if (json.statusCode === 200) {
                           if(!json.data.user.grade_id){
                            const data = json.data;
                            this.setState({ spinner: false })
                            const userdata = data.user;
                            AsyncStorage.setItem('@user', JSON.stringify(data.user))
                            AsyncStorage.setItem('@access_token', JSON.stringify(data.access_token))
                            Actions.boards()
                           }else{
                            const data = json.data;
                            this.setState({ spinner: false })
                            const userdata = data.user;
                            AsyncStorage.setItem('@user', JSON.stringify(data.user))
                            AsyncStorage.setItem('@access_token', JSON.stringify(data.access_token))
                            Actions.dashboard()
                           }
                           
                    

                    } else {
                        this.setState({ spinner: false })
                        if(json.accountStatus === 201){
                           // alert("hiii")
                            this.onresend();
                            this.setState({ spinner: false, showOTP: true })
                        }else{
                            alert(json.message)
                        }
                      //  alert(json.message)
                    }
                }

                )
                .catch((error) => console.error(error))
            //Actions.push('boards')
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("newpropslogin", nextProps.user)
        if (nextProps.user) {
            Actions.push('main')
        }
        //return null;
    }
    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
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
                            this.setState({ loading: false, otp: "" })
                            //this.loginapi()
                            alert(json.message)
                        }
                    }
                }

                )
                .catch((error) => console.error(error))
        }
    }
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
    onresend() {
        this.setState({ spinner: true })
        var body = { email: this.state.email,verified_account: true }
        console.log("Boyyy", body)
        fetch(baseUrl + '/user/forgot-password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) =>
            response.json())
            .then((json) => {
                // alert(JSON.stringify(json))
                if (json) {
                    this.setState({ spinner: false })
                    if (json.statusCode === 200) {

                        Alert.alert(
                            "Step Up",
                            json.message,
                            [
                                { text: "OK" }
                            ]
                        );
                    } else {
                        alert(json.message)
                    }
                    // this.setState({ spinner: false })
                    // Actions.push('otp',{email: email})
                }
            }

            )
            .catch((error) => console.error(error))
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
                                <TouchableOpacity onPress={this.onresend.bind(this)}
                                    style={{ marginTop: 10, marginRight: 10, fontSize: 18, alignSelf: "flex-end" }}>
                                    <Text style={{ color: colors.Themecolor }}>Resent OTP?</Text>
                                </TouchableOpacity>
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

                <>

                    <ImageBackground
                        style={[styles.containter]}
                        source={require("../../assets/images/backblue.png")}
                    />
                    <View style={{ flex: 1, margin: 20, backgroundColor: "white", borderRadius: 20, overflow: "hidden" }}>
                        <View style={{ flex: 0.3, backgroundColor: "red", }}>
                            <Header title="login" />
                        </View>
                        <View style={{ flex: 0.7, justifyContent: "space-evenly", paddingHorizontal: 20, }}>
                            <Image source={require("../../assets/images/logo_icon1.png")}
                                style={{ width: 72, height: 72, alignSelf: "center" }} />
                            <View style={{ width: windowWidth / 1.25, alignSelf: "center", height: 50, borderBottomWidth: 1, borderColor: "lightgrey", justifyContent: 'center', }}>
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 8 }}
                                    placeholderTextColor={"grey"}

                                    placeholder={StringsOfLanguages.emailtextinput}
                                    blurOnSubmit={false}
                                    value={this.state.email}
                                    keyboardType={"email-address"}
                                    onChangeText={this.onChangeEmail}
                                    onSubmitEditing={() => this.secondTextInput.focus()}
                                ></TextInput>
                            </View>
                            <View style={{ width: windowWidth / 1.25, alignSelf: "center", height: 50, flexDirection: "row", borderBottomWidth: 1, borderColor: "lightgrey", justifyContent: 'center', }}>

                                <TextInput
                                    ref={(input) => { this.secondTextInput = input; }}
                                    placeholderTextColor={"grey"}
                                    style={{
                                        paddingLeft: 8, width: "85%",

                                        borderColor: '#2e2e2e'
                                    }}
                                    placeholder={StringsOfLanguages.passwordtextinput}
                                    value={this.state.password}
                                    secureTextEntry={this.state.hidePassword}
                                    onChangeText={this.onChangePassword}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                ></TextInput>
                                <TouchableOpacity activeOpacity={0.8}
                                    style={{ width: "15%", height: 50, justifyContent: "center", alignItems: "center" }}
                                    onPress={this.setPasswordVisibility}>
                                    <Image source={(this.state.hidePassword) ? require('../../assets/images/ic_visibility.png') : require('../../assets/images/ic_visibility_off.png')} style={{ resizeMode: 'contain', height: '50%', width: '50%', }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subview}>
                                <View style={styles.checkboxview}>

                                    {this.state.checked ?
                                        <TouchableOpacity onPress={() => this.onCheck(false)} style={styles.checkboxview}>
                                            <Image source={require("../../assets/images/check.png")} style={styles.checkbox} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.onCheck(true)} style={styles.checkboxview}>
                                            <Image source={require("../../assets/images/uncheck.png")} style={styles.checkbox} />
                                        </TouchableOpacity>
                                    }

                                    <Text style={styles.remembertext}>{StringsOfLanguages.rememberme}</Text></View>
                                <TouchableOpacity onPress={this.forgotPassword}>
                                    <Text style={styles.forgottext}>{StringsOfLanguages.forgotpassword}</Text>
                                </TouchableOpacity>

                            </View>
                            <Text style={styles.helptext}>{StringsOfLanguages.forgot}</Text>
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
                        <View style={{ position: 'absolute', backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", height: "100%", width: "100%" }}>
                            <ActivityIndicator color={"black"} />
                        </View> : null}




                </>
        );
    }
}
const mapStateToProps = state => {
    const { user, loading, error } = state.Auth
    console.log('state', user)
    return { user, loading, error }
}

export default connect(mapStateToProps, { loginUser })(Login)