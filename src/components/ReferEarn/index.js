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



class ReferEarn extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			
			<ImageBackground 
			source={require('../../assets/images/refer.png')}
			style={styles.imagestyles}>
               
			</ImageBackground>
			
			
			)
	}
}
export default ReferEarn