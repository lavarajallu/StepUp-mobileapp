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
//import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import Dashboard from '../Dashboard';
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'

class Main extends Component{
	constructor(props){
		super(props)
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
			<View style={{flex:1}}>
			<View style={{flex:0.9}}>
			    <Dashboard />
			</View>
			<View style={{flex:0.1}}>

		    <Footer openControlPanel={this.openControlPanel}/>
			</View>
			</View>	
			</Drawer>
			)
	}
}
export default Main