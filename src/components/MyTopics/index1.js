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
import styles from "./styles"
import * as Progress from 'react-native-progress';
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
			        <View  style={{ marginTop:30,marginBottom: 30 }}>
                <TouchableOpacity
                    style={styles.rectview}>
                    <View style={styles.subview}>
                        <View style={styles.topsubview}></View>
                        <View style={styles.bottomsubview}>
                            <Text style={styles.subjectname}>{item.name}</Text>
                                <View style={styles.progressview}>
                                    <View style={styles.progresstextview}>
                                        <Text style={styles.progresstext}>Progress</Text>
                                        <Text style={styles.progresstext}>{percent}%</Text></View>
                                        <View style={{marginTop:5}}>
                                        <Progress.Bar progress={item.progress} width={windowWidth/2.7} height={10} color={"lightgreen"}/>
                                       </View>
                                        </View>

                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.relativeview}>
                    <ImageBackground source={item.image} style={{
                        width: 944 / 12,
                        height: 912 /12,
                        position: 'absolute',
                        justifyContent: "center",
                        alignSelf:'center',
                        top: -180,
                       // left: -140,
                         elevation: 12,
                    }}><Image source={item.insideimg} style={{
                        width: 944 / 13,
                        height: 912 /13,alignSelf:"center",position: 'absolute',
                        justifyContent: "center",
                        alignSelf:'center',
                        top: -210,
                       // left: -140,
                         elevation: 12,}} />
                    </ImageBackground>
                </View></View>

		)
	}
	render() {
		return (

			<View>
				<Text style={styles.headertext}>My Topics In Progress</Text>
				<FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					horizontal={true}
					showsHorizontalScrollIndicator={false} />

			</View>
		)
	}
}
export default MyTopics