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
	TouchableHighlight,
	FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import StringsOfLanguages from './../../StringsOfLanguages';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


const data = [
	{
		name: StringsOfLanguages.leaderboard,
		key: "leaderboard",
		image: require("../../assets/images/dashboard/new/leader_board.png"),
		color1: "#277292",//"#7D4BEA",
		color2: "#277292",//"#441DFC",
		width: 44,
		height: 74,
		tintcolor: "transparent"
	}, {
		name: StringsOfLanguages.learninganalysis,
		key: 'learninganalysis',
		image: require("../../assets/images/dashboard/new/analysis_new.png"),
		width: 49,
		color1: "#d88212",
		color2: "#d88212",
		tintcolor: "transparent",
		height: 43,
	}, {
		name: StringsOfLanguages.mypractice,
		key: "mypractice",
		image: require("../../assets/images/dashboard/new/practice_new.png"),
		width: 51,
		height: 52,
		tintcolor: "transparent",
		color1: "#c44921",//"#F6815B",
		color2: "#c44921"// "#FC67A7",
	}, {
		name: StringsOfLanguages.mocktest,
		key: "mocktest",
		image: require("../../assets/images/dashboard/new/mock_new.png"),
		width: 52,
		color1: "#a3ba6d",//"#0D7B5A",
		color2: "#a3ba6d",//"#0D7B5A",
		height: 55,
		tintcolor: "#6B9B1A"
	},
	// {
	// 	name:"Leader Board",
	// 	image: require("../../assets/images/dashboard/leaderboard.png")
	// },
]
class LearningComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			langaugae: "",
			spinner: false,
			newdata: data
		}
	}
	onItem(item) {
		if (item === 'Previous Papers') {
			Actions.push("previouspapers")
		} else if (item === 'Mock Test') {
			Actions.push('mocktest')
		} else if (item === "My Practice") {
			Actions.push('practice')
		} else if(item === 'Learning Analysis'){
			Actions.push('analysis')
		}else{
			Actions.push('leaderboard')
		}
	}

	render() {
		return (
			this.state.spinner ? <Text>Loading....</Text> :
				<View>
					{/* <FlatList horizontal={true}   extraData={this.state} data={data} renderItem={this.renderItem.bind(this)}/> */}
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal:8 }}>
						<TouchableHighlight onPress={this.onItem.bind(this, "Leader Board")} underlayColor="transparent"
						 activeOpacity={0.9} style={{margin:5}}>
							<View style={{ justifyContent: "center", alignItems: "center", }}>
								<View style={{ height: 80, width: 80,  justifyContent: "center", alignItems: "center" }}>
								<Image source={require("../../assets/images/dashboard/new/1.png")} style={{ width:167 / 3, height: 167 / 3 }} /> 
								</View>
								<Text style={{ fontSize: 12 }}>{StringsOfLanguages.leaderboard}</Text></View>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.onItem.bind(this, "Learning Analysis")} underlayColor="transparent" activeOpacity={0.9} style={{margin:5}}>
							<View style={{  justifyContent: "center", alignItems: "center", }}>
								<View style={{ height: 80, width: 80, justifyContent: "center", alignItems: "center" }}>
								<Image source={require("../../assets/images/dashboard/new/2.png")} style={{ width:167/3, height: 167/3}} /> 
								</View>
								<Text style={{ fontSize: 12,  }}>{StringsOfLanguages.learninganalysis}</Text></View>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.onItem.bind(this, "My Practice")} underlayColor="transparent" activeOpacity={0.9}
						style={{margin:5}}>
							<View style={{ justifyContent: "center", alignItems: "center", }}>
								<View style={{ height: 80, width: 80,  justifyContent: "center", alignItems: "center" }}>
								<Image source={require("../../assets/images/dashboard/new/3.png")} style={{ width:167/3, height: 167/3}} /> 
								</View>
								<Text style={{ fontSize: 12 }}>{StringsOfLanguages.mypractice}</Text></View>
						</TouchableHighlight>
						<TouchableHighlight onPress={this.onItem.bind(this, "Mock Test")} underlayColor="transparent" activeOpacity={0.9}
						style={{margin:5}}>
							<View style={{justifyContent: "center", alignItems: "center", }}>
								<View style={{ height: 80, width: 80,justifyContent: "center", alignItems: "center" }}>
								<Image source={require("../../assets/images/dashboard/new/4.png")} style={{ width:167/3, height:167/3,tintColor:"#6B9B1A"}} /> 
								</View>
								<Text style={{ fontSize: 12 }}>{StringsOfLanguages.mocktest}</Text></View>
						</TouchableHighlight>
					
					</View>
					</ScrollView>
				</View>
		)
	}
}

export default LearningComponent;