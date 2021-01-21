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

const data=[
{
	name:"Leader Board",
	image: require("../../assets/images/leaderboard.png")
},{
	name:"Learning Analysis",
	image: require("../../assets/images/analysis.png")
},{
	name:"Previous Papers",
	image: require("../../assets/images/prepapers.png")
},{
	name:"Mock Test",
	image: require("../../assets/images/test.png")
},{
	name:"My Practice",
	image: require("../../assets/images/practice.png")
}]
class LearningComponent extends Component{
	constructor(props){
		super(props)
	}
	onItem(item){
		if(item.name === 'Previous Papers') {
			Actions.push("previouspapers")
		}else if (item.name === 'Mock Test'){
			Actions.push('mocktest')
		}else if(item.name === "My Practice"){
			Actions.push('practice')
		}else{}
	}
	renderItem({item}){
	return(
		<TouchableOpacity onPress={this.onItem.bind(this,item)} style={{pdding:20,marginHorizontal:10,marginTop:20}}>
			<Image source={item.image} style={styles.image}/>
			<Text style={styles.subtext}>{item.name}</Text>
			</TouchableOpacity>
		)
}
	render(){
		return(
			
			<View>
			<Text style={{marginLeft:15,marginTop:10,fontSize:20}}>My Learning</Text>
			<FlatList data={data} 
			renderItem={this.renderItem.bind(this)}
			 horizontal={true}
			 showsHorizontalScrollIndicator={false}/>
		
			</View>
			)
	}
}
export default LearningComponent