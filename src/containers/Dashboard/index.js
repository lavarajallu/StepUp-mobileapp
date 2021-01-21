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
			<ImageBackground source={require('../../assets/images/dashboard_bg.jpg')} style={{width:"100%",height:"100%"}}>
			<View style={{flex:1}}>
				<View style={{flex:0.15,alignItems:"flex-end",justifyContent:"center"}}>
					<Image style={{width:200/1.5,height:200/1.5}} source={require('../../assets/images/dash_image.png')}/>
					<View 
					style={{paddingVertical:2,flexDirection:"row",width:windowWidth/1.08,borderRadius: 10,backgroundColor: 'white',position: 'absolute',alignSelf:"center" }}>
					<View style={{flex:0.3,justifyContent: 'center',alignItems:"center"}}>
						<Image source={require('../../assets/images/dash_logo.png')} style={{width:279/4,height:298/4}}/>
						</View>
						<View style={{flex:0.6,justifyContent:  'center',alignItems:"center"  }}>
						<Text style={{fontSize:15,color:"#2d5283"}}>Welcome</Text>
						<Text style={{fontSize:20,color:"#2d5283"}}>Kumar</Text>
						</View>
						<View style={{flex:0.3}}/>
					</View>
				</View>
				<View style={{flex:0.75,marginHorizontal: 10}}>
                <View style={styles.middleview}>
			           <Library/>

			    </View>
			    </View>
	    	<View style={styles.footerview}>
			
					    <Footer/>
						</View>
				</View>
			
			
						</ImageBackground>
			</View>	
			)
	}
}
export default Dashboard