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
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { loginUser } from '../../store/auth/actions'
import { isUserAuthenticated } from '../../utils/helpers/authUtils'
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header'
import { Validations } from '../../helpers'
import { baseUrl } from '../../constants';
var isAuthTokenValid 
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: "",
            checked: false,
            spinner:false
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onCheck = this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
                device_type: "ANDROID",
                device_id: "device_id",
                device_token: "device_token"
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
    componentDidMount(){
        console.log('detailslogin,',this.props.user)
      
    }
    static getDerivedStateFromProps(nextProps, prevState) {
         console.log("newpropslogin",nextProps.user)
         if(nextProps.user){
             Actions.push('main')
         }
        //return null;
      }
    render() {
       
        return (
            
            <>
              
                <ImageBackground
                    style={[styles.containter]}
                    source={require("../../assets/images/backblue.png")}
                />


            
                    <View style={styles.body}>
                        <Header title="login" />
                        <Image source={require("../../assets/images/logo.png")}
                            style={styles.logo} />
                        
                        <TextInput
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            placeholder="Email/Mobile Number"
                            blurOnSubmit={false}
                            keyboardType={"email-address"}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => this.secondTextInput.focus()}
                        ></TextInput>
                        <TextInput
                            ref={(input) => { this.secondTextInput = input; }}
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={this.onChangePassword}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        ></TextInput>
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