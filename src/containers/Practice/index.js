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
import PracticeComponent from '../../components/PracticeComponent';
import { Validations } from '../../helpers'

class Practice extends Component{
	constructor(props){
		super(props)
	}
	onBack(){
		Actions.dashboard()
	}
	render(){
		return(
			<View style={styles.mainview}>
				
			<View style={styles.topview}>
			<PracticeComponent onBack={this.onBack.bind(this)}/>

			</View>
			<View style={styles.footerview}>

		    <Footer/>
			</View>
			</View>	
			)
	}
}
export default Practice