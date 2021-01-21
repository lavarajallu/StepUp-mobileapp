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
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
	{
		name: "Mathematics",
		bg: require('../../assets/images/math_bg.png'),
		image: require('../../assets/images/yellowround.png'),
		insideimg: require('../../assets/images/subinside.png'),
		progress: 0.5,
		test: 6, read: 40
	}, {
		name: "Physics",
		image: require('../../assets/images/yellowround.png'),
		insideimg: require('../../assets/images/subinside.png'),
		bg: require('../../assets/images/physics_bg.png'),
		progress: 0.7, test: 6, read: 40
	}, {
		name: "Chemistry",
		image: require('../../assets/images/yellowround.png'),
		insideimg: require('../../assets/images/subinside.png'),
		bg: require('../../assets/images/chemistry_bg.png'),
		progress: 0.3, test: 6, read: 40
	}, {
		name: "Biology",
		image: require('../../assets/images/yellowround.png'),
		insideimg: require('../../assets/images/subinside.png'),
		bg: require('../../assets/images/Biology.png'),
		progress: 0.7, test: 6, read: 40
	}]
class LibraryComponent extends Component {
	constructor(props) {
		super(props)
	}
	onChapter(item){
      Actions.push('chapters')
	}
	renderItem({ item }) {
		var progress = 0+ (0.4 * Math.random())
		var percent = (item.progress) * 100;
		var color;
		if(percent > 50 ){
			color = "green"
		}else if (color< 50) {
			color = "red"
		}else{
			color = "orange"
		}
		return (
			<TouchableOpacity onPress={this.onChapter.bind(this,item)} style={{ paddingVertical: 20 }}>
			<ImageBackground source={item.bg} style={styles.rectview}>
				
					<View style={styles.subview}>
						<View style={styles.topsubview}>
					<View  style={{
						width: 944 /12,
						height: 912 / 12,
						justifyContent: 'center',
						alignItems:"center",
						backgroundColor: 'white',
						marginTop:10,
						marginLeft:10,
						borderRadius: 20
						//left: -240,
					}}><Image source={item.insideimg} style={{width:96/1.5,height:96/1.5}} />
					</View>
						</View>
						<View style={styles.bottomsubview}>
							<Text style={styles.subjectname}>{item.name}</Text>
							{Platform.OS === 'android' ?
								<View style={styles.progressview}>
									<View style={styles.progresstextview}>
										<Text style={styles.progresstext}>Progress</Text>
										<Text style={styles.progresstext}>{percent}%</Text></View>
										{Platform.OS === 'android' ? 
										 <ProgressBar
										      color={color}
									          styleAttr="Horizontal"
									          indeterminate={false}
									          progress={0.5}
									        />
										 :
									<ProgressView
									          progressTintColor="orange"
									          trackTintColor="blue"
									          progress={0.7}
									/>}</View> : null}

							<View style={styles.countview}>
								<View style={styles.innercountview}>
									<Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									<Text style={styles.icontext}>{item.test}</Text>
								</View>
								<View style={styles.innercountview}>
									<Image source={require('../../assets/images/magnifier.png')} style={styles.iconview} />
								</View>
								<View style={styles.innercountview}>
									<Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									<Text style={styles.icontext}>{item.read}</Text>
								</View></View>
						</View>
					</View>
				</ImageBackground>
				</TouchableOpacity>

		)
	}
	render() {
		return (

			<View>
			<Text style={{marginLeft:15,marginTop:10,fontSize:20}}>My Library</Text>
				<FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					horizontal={true}
					showsHorizontalScrollIndicator={false} />

			</View>
		)
	}
}
export default LibraryComponent