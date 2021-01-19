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
class WebLinkView extends  Component{
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
          this.setState({
            isvisible:true
        })
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
                	 <WebView
                            source={{
                              uri: 'https://en.wikipedia.org/wiki/Physics'//'https://reactnative.dev/'
                            }}
                            style={{ marginTop: 20,overfloe:"hidden" }}/>
                	
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
                <Text style={{color:"white",fontSize:20}}>WebLink</Text>
                </View>
                 <Modal isVisible={this.state.isvisible}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15}}>
          <Text style={{color:"black",fontSize: 20,textAlign: 'center',marginTop:10}}>Your are about to begin your Post Assesment</Text>
          <Text style={{fontSize: 15,marginHorizontal:30,textAlign: 'center',marginTop:10}}>Once you begin you have 5 minutes to finish the test</Text>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop:10}}>Are you ready to begin?</Text>
         <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:20 }}>
           <TouchableOpacity onPress={this.onOk.bind(this)}>
           <LinearGradient colors={['#239816', '#32e625']}  style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text>OK</Text>
            </LinearGradient>
           </TouchableOpacity>
             <TouchableOpacity onPress={this.onCancel.bind(this)}>
           <LinearGradient colors={['#f14d65', '#fc8798']}   style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text>CANCEL</Text>
            </LinearGradient>
           </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
            </View>
			)
	}
}

export default WebLinkView;