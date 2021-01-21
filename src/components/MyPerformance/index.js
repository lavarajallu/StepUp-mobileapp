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
import PureChart from 'react-native-pure-chart';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let sampleData = [
    {
      seriesName: 'Pre Assesment',
      data: [
        {x: '0', y: 20},
        {x: 'Physics', y: 30},
        {x: 'Chemistry', y: 50},
        {x: 'Biollogy', y: 70},
        {x:'Mathematics', y :90}
      ],
      color: 'orange'
    },
    {
      seriesName: 'Post Assesment',
      data: [
        {x: '0', y: 5},
        {x: 'Physics', y: 20},
        {x: 'Chemistry', y: 40},
        {x: 'Biology', y: 60},
        {x:'Mathematics', y :80}
      ],
      color: 'green'
    }
  ]
class MyPerformance extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (

	<View style={styles.mainview}>
				<Text style={styles.headtext}>My Performance</Text>
				<View style={styles.chartview}>
			 <PureChart 
			 data={sampleData}
			  type='line'
			   showEvenNumberXaxisLabel = {false} 
			   
                 xAxisColor={'black'}
		            yAxisColor={'black'}
		            xAxisGridLineColor={'grey'}
		            yAxisGridLineColor={'grey'}
		            width={'100%'}
			      height={windowHeight/4} numberOfYAxisGuideLine={5} 
			 />

			 <View style={{flex:1,flexDirection: 'row',justifyContent:"space-around",marginVertical: 10}}>
			 	<View style={{flexDirection:"row"}}>
			 		<View style={{width:20,height:20,backgroundColor: 'orange'}}/>
			 		<Text style={{marginLeft:5}}>Pre-Assesment</Text>
			 	</View>
			 		<View style={{flexDirection:"row"}}>
			 		<View style={{width:20,height:20,backgroundColor: 'green'}}/>
			 		<Text style={{marginLeft:5}}>Post-Assesment</Text>
			 	</View>
			 </View>
			 </View>
			</View>
		)
	}
}
export default MyPerformance