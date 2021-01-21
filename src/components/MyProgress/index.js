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
    color:"#dc9332",
    backgroundColor:"lightgrey",// ring will use color from theme
  },
  {
    label: "ACTIVITY",
    value: 0.7,
    color: "#4286a0",
    title:"Physics",
     backgroundColor:"lightgrey",
  },
  {
    label: "RINGS",
    value: 0.6,
    title:"Chemistry",
    color: "#e0ba42",//"#4286a0",
     backgroundColor:"lightgrey",
  }, {
    value: 0.5,
    title:"Biology",
    color:"#aec282",//"#dc9332",
     backgroundColor:"lightgrey", // ring will use color from theme
  },

];
const activityConfig = {
  width: windowWidth/1,
  height: windowHeight/3,
  radius: 32,
  ringSize: 10,
}
class MyProgress extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (

	   <View style={styles.mainview}>
				<Text style={styles.headtext}>My Progress</Text>
        <View style={{borderWidth:0,borderColor:"lightgrey",padding:10,backgroundColor: 'white', shadowColor:'black',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,borderRadius: 10}}>
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
			</View>
		)
	}
}
export default MyProgress