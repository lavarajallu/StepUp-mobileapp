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
import LibraryComponent from "../../components/LibraryComponent"
import LearningComponent from "../../components/LearningComponent"
import MyTopics from "../../components/MyTopics"
import ReferEarn from "../../components/ReferEarn"
import RecommendedTopics from "../../components/RecommendedTopics"
import MyProgress from "../../components/MyProgress"
import MyPerformance from "../../components/MyPerformance"
class Library extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<ScrollView contentContainerStyle={{flexGrow:1}}>
			<View style={styles.mainview}>

			
			<View style={styles.subview}>
			<LearningComponent/>
			<View style={styles.line}/>
			<LibraryComponent/>
			
			<MyProgress/>
			<View style={styles.line}/>
			<MyPerformance/>
			<View style={styles.line}/>
			<ReferEarn/>
			<View style={styles.line}/>
			<MyTopics/>
			<View style={styles.line}/>
			<RecommendedTopics/>
			</View>
			</View>
			</ScrollView>
			
			)
	}
}
export default Library