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
        {x: '0', y: 30},
        {x: 'Physics', y: 20},
        {x: 'Chemistry', y: 70},
        {x: 'Biollogy', y: 50},
        {x:'Mathematics', y :30}
      ],
      color: 'green'
    },
    {
      seriesName: 'Post Assesment',
      data: [
        {x: '0', y: 20},
        {x: 'Physics', y: 80},
        {x: 'Chemistry', y: 60},
        {x: 'Biology', y: 40},
        {x:'Mathematics', y :30}
      ],
      color: 'orange'
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
            yAxisColor={'red'}
            xAxisGridLineColor={'grey'}
            yAxisGridLineColor={'grey'}
            width={'100%'}
			      height={windowHeight/4} numberOfYAxisGuideLine={5} 
			 />
			 </View>
			</View>
		)
	}
}
export default MyPerformance