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

import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
	{
		name: "Rational Numbers",
		image: require('../../assets/images/algebra.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.5,
		test: 6, read: 40
	},
	{
		name: "Rational Numbers",
		image: require('../../assets/images/algebra.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.5,
		test: 6, read: 40
	},
	{
		name: "Rational Numbers",
		image: require('../../assets/images/algebra.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.5,
		test: 6, read: 40
	}
	// }, {
	// 	name: "Irrational Numbers",
	// 	image: require('../../assets/images/yellowround.png'),
	// 	insideimg: require('../../assets/images/math.png'),
	// 	progress: 0.7, test: 6, read: 40
	// }
	]
class RecommendedTopics extends Component {
	constructor(props) {
		super(props)
	}
	renderItem({ item }) {
		var percent = (item.progress) * 100;
		return (
            <View>
			<View style={styles.itemview}>
				<View
					style={styles.rectview}>
                        <View style={styles.subview}>
                        <Image source={item.image} style={styles.imagestyles}/>
							<Text style={styles.subjectname}>{item.name}</Text>
                        
						
					</View>
                    
				</View>
				</View>
                <View 
                style={styles.outerview}></View>
</View>
		)
	}
	render() {
		return (

			<View style={styles.mainview}>
				<Text style={styles.headertext}>Recommended Topics</Text>
				<FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					showsHorizontalScrollIndicator={false} />

			</View>
		)
	}
}
export default RecommendedTopics