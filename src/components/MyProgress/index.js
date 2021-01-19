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
import { Actions } from 'react-native-router-flux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ActivityRings from "react-native-activity-rings";  

const activityData = [
  {
    value: 0.8, 
    title:"Mathematics",
    color:"green",
    backgroundColor:"lightgrey",// ring will use color from theme
  },
  {
    label: "ACTIVITY",
    value: 0.6,
    color: "yellow",
    title:"Physics",
     backgroundColor:"lightgrey",
  },
  {
    label: "RINGS",
    value: 0.2,
    title:"Chemistry",
    color: "blue",
     backgroundColor:"lightgrey",
  }, {
    value: 0.8,
    title:"Biology",
    color:"orange",
     backgroundColor:"lightgrey", // ring will use color from theme
  },

];
const activityConfig = {
  width: windowWidth/1,
  height: windowHeight/2,
  radius: 32,
  ringSize: 14,
}
class MyProgress extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (

	<View style={styles.mainview}>
				<Text style={styles.headtext}>My Progress</Text>

			<ActivityRings  data={activityData} config={activityConfig} />
			<View style={styles.bottomview}>
			{activityData.map((item,i)=>
				<View style={styles.innerview}>
			 <View style={[styles.subjectview,{backgroundColor:item.color}]}></View>
			 <Text style={styles.subjecttext}>{item.title}</Text>
			 </View>
				)}
			
			</View>
			</View>
		)
	}
}
export default MyProgress