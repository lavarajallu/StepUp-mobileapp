import React, { Component } from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    TextInput,
    Image,
    Keyboard,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header'
import { Validations } from '../../helpers'
import { baseUrl } from '../../constants';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            spinner: false,
            token:""
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }
  
    onChangeEmail(text) {
        console.log("lkdfjkdjfk", text)
        this.setState({
            email: text
        })
    }

    onSubmit() {
        var email = this.state.email;
        if (email === "") {
            alert("Please enter email")
        } else if (!Validations.email(email)) {
            alert("please enter valid email")
        } else {
            this.setState({ spinner: true })
           var body = { email: email }
           console.log("Boyyy",body)
           fetch(baseUrl+'/user/forgot-password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            }).then((response) => 
                response.json())
            .then((json) =>{
               // alert(JSON.stringify(json))
                if(json){
                    this.setState({ spinner: false })
                    if(json.statusCode === 200){
                       
                        Alert.alert(
                            "Step Up",
                            json.message,
                            [
                            { text: "OK", onPress: () => Actions.push('otp',{email: email})}
                            ]
                        );
                    }else{
                        alert(json.message)
                    }
                    // this.setState({ spinner: false })
                    // Actions.push('otp',{email: email})
                }
            }
             
            )
            .catch((error) => console.error(error))
        }
    }
    returnToLoginPage() {
        Actions.login({type:"reset"})
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
                        <Header title="forgot" />
                        <Image source={require("../../assets/images/logo_icon.png")}
                            style={{width:100,height:100,alignSelf:"center",marginTop:10}} />
                        <Image source={require("../../assets/images/forgoticon.png")}
                            style={styles.forgoticon} />
                        <Text style={styles.forgottext}>Forgot Password?</Text>
                        <Text style={styles.pleasetext}>Please Enter your email or mobile number </Text>
                        <TextInput
                            labelStyle={styles.labelstyle}
                            inputStyle={styles.input}
                            style={styles.textinput}
                            blurOnSubmit={false}
                            keyboardType={"email-address"}
                            placeholder={"Email"}
                            onChangeText={this.onChangeEmail}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        ></TextInput>


                        <View style={styles.subview}>
                            <TouchableOpacity onPress={this.onSubmit.bind(this)}>
                                <View style={styles.submiticon}
                                    source={require("../../assets/images/submit.png")}>
                                    <Text style={styles.logintext}>Submit</Text>
                                </View></TouchableOpacity>

                        </View>
                        <View style={styles.bottomview}>
                            <TouchableOpacity onPress={this.returnToLoginPage}>
                                <Text style={styles.helptext}>Return to Login?</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>

                {this.state.spinner ? 
                    <View style={{position:'absolute',backgroundColor:"rgba(255,255,255,0.3)",justifyContent:"center",height:"100%",width:"100%"}}>
                   <ActivityIndicator color={"black"}/>
                    </View> : null}

            </>
        );
    }
}
export default ForgotPassword;