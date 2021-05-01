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

class ContactUs extends Component {
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
                        
                        <Text style={styles.topHead}>Contact Us</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <View style={styles.bottomtopvieW}>
                    <LinearGradient colors={[" rgba(105, 80, 119, 0.08)" ,"rgba(132, 115, 147, 0.064)" ]}
                style={styles.gradientview}>
                    <ImageBackground source={require("../../assets/images/refer/contactlogo.png")}
                    style={styles.changelogo}>
                        <Image source={require('../../assets/images/refer/musiclogo.png')}
                        style={{
                            width:132/2,height:132/2
                        }}/>
                    </ImageBackground>
                   </LinearGradient>
                    </View>
                    <View style={styles.bottomsubView}>
                        <View style={styles.bottomsubview}>
                         <View style={styles.contentView}>
                         <ImageBackground source={require('../../assets/images/refer/circle.png')}
                         style={styles.circle}>
                                <Image source={require('../../assets/images/refer/phone.png')}
                                style={styles.phoneicon}/>
                            </ImageBackground>
                            <Text style={styles.subtext}>0987654321</Text>
                         </View>
                         <View style={styles.contentView}>
                         <ImageBackground source={require('../../assets/images/refer/circle.png')}
                         style={styles.circle}>
                                <Image source={require('../../assets/images/refer/link.png')}
                                style={styles.linkicon}/>
                            </ImageBackground>
                            <Text style={styles.subtext}>www.smartstepup.com</Text>
                         </View>
                         <View style={styles.contentView}>
                         <ImageBackground source={require('../../assets/images/refer/circle.png')}
                         style={styles.circle}>
                                <Image source={require('../../assets/images/refer/mail.png')}
                                style={styles.mailicon}/>
                            </ImageBackground>
                            <Text style={styles.subtext}>support@smartstepup.com</Text>
                         </View>
                         
                        </View>
                        
                        
                    </View>
              
            </View>
            </View>
 
        )
    }
}
export default ContactUs