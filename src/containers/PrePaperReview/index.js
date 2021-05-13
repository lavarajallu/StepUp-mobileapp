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
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class PrePaperReview extends Component{
	constructor(props){
		super(props)
		this.state={
			isvisible: false
		}
	}

	onBack(){
		Actions.pop()
	}

	onTest(){
		Actions.push('prepapersummary')
	}
	
	render(){
		return(
			<View style={styles.mainView}>
				<View style={styles.topview}>
					<View style={styles.topleftview}>
					<TouchableOpacity onPress={this.onBack.bind(this)}>
					<Image source={require("../../assets/images/left-arrow.png")} style={styles.backarrow}/>
					</TouchableOpacity>
					</View>
					<View style={styles.topmiddleview}>
					<Text style={styles.topmiddletext}>Review Summary</Text>
					</View>
					<View style={styles.toprightview}></View>
				</View>
				<View style={styles.middleview}>
				<View style={styles.subview}>
		          <Text style={styles.headtext}>Score</Text>
		          <View style={styles.lineview}/>
		          <TouchableOpacity onPress={this.onTest.bind(this)} style={styles.scoreview}>
		          <Text>Test 01</Text>
		          <View style={styles.progressview}>
		         
		          {/* {Platform.OS === 'android' ? 
					 <ProgressBar
					      color="#fe742b"
					      width={windowWidth/1.6}

				          styleAttr="Horizontal"
				          indeterminate={false}
				          progress={0.5}
				        />
					 :
				<ProgressView
				          progressTintColor="orange"
				          trackTintColor="blue"
				          progress={0.7}
				/>} */}
		          <Text style={{marginLeft:5}}>2/5</Text>
		          </View>
          </TouchableOpacity>
            <TouchableOpacity  onPress={this.onTest.bind(this)} style={styles.scoreview}>
		           <Text>Test 02</Text>
		          <View style={styles.progressview}>

		          {/* {Platform.OS === 'android' ? 
					 <ProgressBar
					      color="green"
					      width={windowWidth/1.6}
					      
				          styleAttr="Horizontal"
				          indeterminate={false}
				          progress={0.5}
				        />
					 :
				<ProgressView
				          progressTintColor="orange"
				          trackTintColor="blue"
				          progress={0.7}
				/>} */}
		          <Text style={{marginLeft:5}}>4/5</Text>
		          </View>
          </TouchableOpacity>
          </View>
				</View>
	
			</View>	
			)
	}
}
export default PrePaperReview