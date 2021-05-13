import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Alert,
    ActivityIndicator,
    View,
    Text,
    Dimensions,
    TextInput,
    Image,
    Keyboard,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants';
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state={
            refercode:"SMART123",
            currentpassword:'',
            newpass:"",
            cnfPass:"",
            email:""
        }
    }
    componentDidMount(){
		this.getData()
}
getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
       
			this.setState({
				email: data.email
			})
         //   this.getChapters(data,JSON.parse(token))
			
        } else{
              console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
    onChangeText(text){
        this.setState({
            currentpassword:text
        })
    }
    onChangeTextConf(text){
        this.setState({
            cnfPass: text
        })
    }
    onChangeNew(text){
        this.setState({
            newpass: text
        })
    }
    onBack(){
        Actions.pop()
    }
    onsubmit() {
        var { newpass, cnfPass } = this.state
        var email = this.state.email
        if (newpass === "") {
            alert("please enter Password")
        } else if (cnfPass === "") {
            alert("please enter Confirm Password")
        } else if (newpass != cnfPass) {
            alert("password and confirm password doesn't match")
        } else {
            this.setState({ loading: true })
            var body = {email: email , password: cnfPass}
            console.log("Boyyy",body)
            fetch(baseUrl+'/user/change-password', {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(body)
             }).then((response) =>
                 response.json())
             .then((json) =>{
                 if(json){
                  //   alert(JSON.stringify(json))
                     this.setState({ loading: false })
                     if(json.statusCode === 200){
                        Alert.alert(
                        "Step Up",
                        "Password Changed Successfully, Please login again",
                        [
                        { text: "OK", onPress: () => Actions.dashboard({type:"reset"}) }
                        ]
                    );
                     }else{
                         alert(json.messgae)
                     }
                     
                    
                 }
             }
              
             )
             .catch((error) => console.error(error))

        }
    }

    render() {
        return (
            <>
            <View style={styles.mainView}>
                <View style={styles.topView}>
                    <View
                        style={styles.topShadow} >
                            <TouchableOpacity onPress={this.onBack.bind(this)}>
                            <Image source={require('../../assets/images/refer/back.png')} style={styles.backIcon} />
                            </TouchableOpacity>
                        
                        <Text style={styles.topHead}>Change Password</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <View style={styles.bottomtopvieW}>
                    <LinearGradient colors={[" rgba(105, 80, 119, 0.08)" ,"rgba(132, 115, 147, 0.064)" ]}
                style={styles.gradientview}>
                    <Image source={require("../../assets/images/refer/changelock.png")}
                    style={styles.changelogo}/>
                   </LinearGradient>
                    </View>
                    <View style={styles.bottomsubView}>
                      {/* <TextInput 
                        style={styles.textInput}
                        placeholder="Current Password"
                        value={this.state.currentpassword}
                        onChangeText={this.onChangeText.bind(this)}/> */}
                         <TextInput 
                        style={styles.textInput}
                        placeholder="New Password"
                        value={this.state.newpass}
                        onChangeText={this.onChangeNew.bind(this)}/>
                         <TextInput 
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        value={this.state.cnfPass}
                        onChangeText={this.onChangeTextConf.bind(this)}/>
                          <TouchableOpacity onPress={this.onsubmit.bind(this)} style={styles.submitbutton}>
                        <Text style={styles.buttonText}>UPDATE PASSWORD</Text>
                    </TouchableOpacity>
                    </View>
              
            </View>
            </View>
  {this.state.loading ? 
    <View style={{position:'absolute',backgroundColor:"rgba(255,255,255,0.3)",justifyContent:"center",height:"100%",width:"100%"}}>
   <ActivityIndicator color={"black"}/>
    </View> : null}
            </>
 
        )
    }
}
export default ChangePassword