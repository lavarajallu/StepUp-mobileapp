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



class SideMenu extends Component{
	constructor(props){
		super(props)
	}

	onCLose(){
		this.props.closeControlPanel()
	}

	render(){
		return(
			
			<View style={styles.mainview}>
			<View style={styles.topview}>
			<TouchableOpacity onPress={this.onCLose.bind(this)}>
			<Image source={require('../../assets/images/modalclose.png')} style={styles.closeicon}/>
			</TouchableOpacity>
			</View>
			<View style={{flex:0.9}}/>
			</View>
			
			
			)
	}
}
export default SideMenu