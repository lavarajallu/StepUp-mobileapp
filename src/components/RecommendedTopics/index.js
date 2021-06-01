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
	ProgressBarAndroid,
	Platform,
	TouchableOpacity,
	FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import StringsOfLanguages from '../../StringsOfLanguages';

import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
	{
		name: "Rational Numbers",
		image: require('../../assets/images/dashboard/new/topic3.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.5,
		test: 6, read: 40
	},
	{
		name: "Volume of Cuboid",
		image: require('../../assets/images/dashboard/new/topic4.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.3,
		test: 6, read: 40
	},
	{
		name: "Volume of Cylinder",
		image:require('../../assets/images/dashboard/new/topic5.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.9,
		test: 6, read: 40
	}
	
	]
class RecommendedTopics extends Component {
	constructor(props) {
		super(props)
	}
		renderItem({ item }) {
		var percent = (item.progress) * 100;
		let color
		if(percent>80){
			color = "green"
		}else if(percent < 50){
			color ="red"
		}else{
			color = "orange"
		}
		return (
			<View style={{backgroundColor:"white",width:windowWidth/1.3,margin:10,alignSelf:"center",
			shadowOffset: { width: 0, height: 5 },
			shadowOpacity: 1,
			shadowRadius: 5,
			elevation: 10, borderRadius: 10
			
			   }}>
				<View style={{flex:1,flexDirection:"row",}}>
				<View style={{flex:0.25,}}>
					<Image source={item.image}
					  style={{width:70,height:70}}/>
				</View>
				<View style={{flex:0.75,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingLeft:10}}>
				 <Text>{item.name}</Text>
				<View style={{justifyContent:"center",alignItems:"center"}}>
				<LinearGradient colors={["#F63D80", "#FD6C71"]}
				style={{height:25,justifyContent:"center",alignItems:"center",paddingHorizontal:15,borderRadius:20,marginRight:10}}>
					<Text style={{color:"white",fontSize:12}}>Start</Text>
				</LinearGradient>
				</View>
				</View>
			
				</View>
			   
			</View>
		)
	}
	render() {
		return (
			<View>
			<View style={{flexDirection: 'row',justifyContent: 'space-between' ,alignItems:"center" }}>
			<Text style={{ marginLeft:15,fontSize:16,color:"#656565",fontWeight:"600"}}>{StringsOfLanguages.recommendedtopics}</Text>
			<TouchableOpacity>
			<Text style={{marginRight:15,fontSize:14,color:"#656565"}}>{StringsOfLanguages.seeall}</Text>
			</TouchableOpacity>
		  
			</View>
		
			<FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					horizontal={true}
					showsHorizontalScrollIndicator={false} />
	</View>
		)
	}
}
export default RecommendedTopics