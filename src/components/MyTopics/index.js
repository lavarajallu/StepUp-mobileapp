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
	Platform,
	TouchableOpacity,
	FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
	{
		name: "Mathematics",
		image: require('../../assets/images/algebra.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.7,
		test: 6, read: 40
	},{
		name: "Mathematics",
		image: require('../../assets/images/algebra.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.2,
		test: 6, read: 40
	},{
		name: "Mathematics",
		image: require('../../assets/images/algebra.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.9,
		test: 6, read: 40
	}]
class MyTopics extends Component {
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
			<View style={styles.itemview}>
				<View
					style={styles.rectview}>
					<View style={styles.innerrect}>
					<Image source={item.image} style={styles.inerImage} />
					</View>
					<View style={styles.leftinnerview}>
					<Text style={styles.subjectname}>{item.name}</Text>
					  <View style={styles.progressview}>
									<View style={styles.progresstextview}>
										<Text style={styles.progresstext}>Progress</Text>
										<Text style={styles.progresstext}>{percent}%</Text></View>
									{Platform.OS === 'android' ? 
										 <ProgressBar
										      color={color}
									          styleAttr="Horizontal"
									          indeterminate={false}
									          progress={item.progress}
									        />
										 :
									<ProgressView
									          progressTintColor="orange"
									          trackTintColor="blue"
									          progress={0.7}
									/>}
									</View> 
					</View>
					</View></View>

		)
	}
	render() {
		return (

			<View>
				<Text style={styles.headertext}>My Topics - in Progress</Text>
				<FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					showsHorizontalScrollIndicator={false} />

			</View>
		)
	}
}
export default MyTopics