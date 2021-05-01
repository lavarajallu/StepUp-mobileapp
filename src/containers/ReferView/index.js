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
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Share from 'react-native-share';


class ReferView extends Component {
    constructor(props) {
        super(props)
        this.state={
            refercode:"SMART123"
        }
    }

    onRefer(){
        const options =  {
              title:"text",
              subject: "Referal code",
              message: this.state.refercode,
            }
        Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }

    onBack(){
        Actions.pop()
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
                        
                        <Text style={styles.topHead}>Refer & Earn</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <Image source={require("../../assets/images/refer/referhead.png")}
                        style={styles.referlogo} />
                    <Text style={styles.bottomHeadText}>Refer now & earn up to 50 Points.</Text>
                    <Text style={styles.bottomSubText}>Share your code with your friends and get reward points.</Text>
                    <Text style={styles.referalcode}>YOUR REFERAL CODE</Text>
                    <ImageBackground source={require("../../assets/images/refer/referrect.png")}
                    style={styles.codeBox}>
                        <Text style={styles.boxText}>SMART123</Text>
                    </ImageBackground>
                    <TouchableOpacity onPress={this.onRefer.bind(this)} style={styles.submitbutton}>
                        <Text style={styles.buttonText}>REFER NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
export default ReferView