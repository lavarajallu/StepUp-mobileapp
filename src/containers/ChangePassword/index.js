import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
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

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state={
            refercode:"SMART123",
            currentpassword:'',
            newpass:"",
            cnfPass:""
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
    onsubmit(){

    }

    render() {
        return (
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
                      <TextInput 
                        style={styles.textInput}
                        placeholder="Current Password"
                        value={this.state.currentpassword}
                        onChangeText={this.onChangeText.bind(this)}/>
                         <TextInput 
                        style={styles.textInput}
                        placeholder="New Password"
                        value={this.state.newpass}
                        onChangeText={this.onChangeNew.bind(this)}/>
                         <TextInput 
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        value={this.state.cnfPass}
                        onChangeText={this.onChangeText.bind(this)}/>
                          <TouchableOpacity onPress={this.onsubmit.bind(this)} style={styles.submitbutton}>
                        <Text style={styles.buttonText}>UPDATE PASSWORD</Text>
                    </TouchableOpacity>
                    </View>
              
            </View>
            </View>
 
        )
    }
}
export default ChangePassword