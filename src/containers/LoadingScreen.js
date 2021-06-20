import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
var _this;
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import StringsOfLanguages from './../StringsOfLanguages';
import { colors } from "../constants"

 
class LoadingScreen extends Component{
	constructor(props){
		super(props)
    this.state={
      deviceToken: '',
      viewlanguage: false
    }
	}

	componentDidMount(){
    _this = this;


//     PushNotification.localNotification({
//   //... You can use all the options from localNotifications
//   channelId: "stepupchannel", 
//   message: "My Notification Message", // (required)
//   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
// });
            this.getData()
    }
    
  getData = async () => {
    try {
    
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
        console.log("data...",data)
        const token = await AsyncStorage.getItem('@access_token')
        if(data.grade_id){
          const localevalue = await AsyncStorage.getItem('@localevalue');
         //alert("dddd"+localevalue)
        if(localevalue){
          StringsOfLanguages.setLanguage(localevalue);
          Actions.push('dashboard')
        }else{
          StringsOfLanguages.setLanguage('en');
        }
          //  Actions.push('dashboard')
        }else{
            Actions.push('boards')
        }
       
      }else{
        // this.setState({
        //   viewlanguage: true
        // })
        Actions.push('login',{deviceToken:this.state.deviceToken})
      }
    } catch(e) {
       return null;
    }
  }
  onLanguage(value){
   
    StringsOfLanguages.setLanguage(value);
    AsyncStorage.setItem('@localevalue', value);

   // navigation.navigate('ContentScreen', {selectedLanguage: value});
    Actions.push('login',{deviceToken:this.state.deviceToken,localevalue: value})
  }
	render(){
		return(
          this.state.viewlanguage ? 
          <>
          <ImageBackground source={require('./../assets/images/Mobile_bg_1.png')}
          style={{width:"100%",height:"100%",opacity:0.5}}/>
          <View style={{width:"100%",height:"100%",position:"absolute"}}>
          <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
            		<Image source={require('../assets/images/logo_icon1.png')}
					 style={{width:1048/10,height:1048/10,alignSelf:"center"}} />
        <TouchableOpacity onPress={this.onLanguage.bind(this,'en')} style={{height:50,paddingHorizontal:10,backgroundColor:colors.Themecolor,width:100,justifyContent:"center",alignItems:"center",marginTop:30}}>
          <Text style={{color:"white"}}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLanguage.bind(this,'th')} style={{height:50,paddingHorizontal:10,backgroundColor:colors.Themecolor,width:100,marginTop:30,justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"white"}}>Thai</Text>
        </TouchableOpacity>
      </View></View></>
          
          :
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Image source={require('./../assets/images/step-up2.gif')} style={{width:300,height:280,alignSelf:"center"}}/>
            </View>
			
			)
	}
}
export default LoadingScreen