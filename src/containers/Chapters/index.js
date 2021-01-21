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
import SideMenu from "../../components/SideMenu"
import ChapterComponent from '../../components/ChapterComponent';
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'

class Chapters extends Component{
	constructor(props){
		super(props)
	}
	onBack(){
		Actions.pop()
	}
	 closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
	render(){
		return(
			<Drawer
			type="overlay"
                ref={(ref) => this._drawer = ref}
                 tapToClose={true}
                 openDrawerOffset={0.25} 
                content={ <SideMenu closeControlPanel={this.closeControlPanel}/>}
                >                  
			<View style={styles.mainview}>
				
			<View style={styles.topview}>
			<ChapterComponent onBack={this.onBack.bind(this)}/>

			</View>
			<View style={styles.footerview}>

		     <Footer openControlPanel={this.openControlPanel}/>
			</View>
			</View>	
			</Drawer>
			)
	}
}
export default Chapters