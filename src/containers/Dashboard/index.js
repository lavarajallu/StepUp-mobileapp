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
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Footer from '../../components/Footer'
import Library from '../../components/Library';
import { Validations } from '../../helpers'

class Dashboard extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<View style={styles.mainview}>
			<View style={styles.topview}>
			<Text style={styles.toptext}>Welcome Madhav</Text>
			<Image source={require("../../assets/images/notify.png")} style={{width:24,height:24}}/>
			</View>
			<View style={styles.middleview}>
			<Library/>

			</View>
			<View style={styles.footerview}>

		    <Footer/>
			</View>
			</View>	
			)
	}
}
export default Dashboard