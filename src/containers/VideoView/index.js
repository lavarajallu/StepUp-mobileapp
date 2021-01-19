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
    ActivityIndicator
} from 'react-native';
import styles from "./styles"
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
class VideoView extends  Component{
    constructor(props){
        super(props);
        this.state={
            spinner:true,
            isvisible:false
        }
    }
    // onLoadStart(){
    //     this.setState({
    //         spinner:true
    //     })
    // }
    // onLoadEnd(){
    //     this.setState({
    //         spinner:false
    //     })
    // }
    onNext(){
       Actions.push('weblinkview')
    }
    onOk(){
        this.setState({
            isvisible:false
        },()=>Actions.push('postassesment'))
    }
    onCancel(){
        this.setState({
            isvisible:false
        })
    }
	render(){
		return(
			    <View style={styles.mainView}>

                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                <View style={styles.mainsubview}>
                	<View style={{flex:1}}>
                    
                	
                	</View>
                </View>
                 <View style={styles.nextactivityview}>
                 <View style={styles.nextinner}>
                    <Text style={styles.activitytext}>Previous Activity</Text>
                    </View>
                    <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
                    <Text style={styles.activitytext}>Next Activity</Text>
                    </TouchableOpacity>
                    
                </View>
                 <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:20}}>Video</Text>
                </View>
                
            </View>
			)
	}
}

export default VideoView;