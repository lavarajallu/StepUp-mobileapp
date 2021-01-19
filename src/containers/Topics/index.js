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
var FloatingLabel = require('react-native-floating-labels');
import Modal from 'react-native-modal';
import Footer from '../../components/Footer'
import TopicsComponent from '../../components/TopicsComponent';
import { Validations } from '../../helpers'

class Topics extends Component{
	constructor(props){
		super(props)
		this.state={
			isvisible: false
		}
	}
	onTopic(item){
		//alert("dddd"+JSON.stringify(item))
		
		if(item.preasses){
			Actions.push('topicmainview',{"from":"topics"})
		}else{
			this.setState({
			isvisible:true
		})
		}
		
	}
	onOk(){
		this.setState({
			isvisible:false
		},()=>Actions.push('preassesment'))
	}
	onCancel(){
		this.setState({
			isvisible:false
		})
	}
	render(){
		return(
			<View style={styles.mainview}>
				
			<View style={styles.topview}>
			<TopicsComponent onTopicPress={this.onTopic.bind(this)}/>

			</View>
			<View style={styles.footerview}>

		    <Footer/>
			</View>
			<View>
      <Modal isVisible={this.state.isvisible}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15}}>
          <Text style={{color:"black",fontSize: 20,textAlign: 'center',marginTop:10}}>Your are about to begin your Pre Assesment</Text>
          <Text style={{fontSize: 15,marginHorizontal:30,textAlign: 'center',marginTop:10}}>Once you begin you have 5 minutes to finish the test</Text>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop:10}}>Are you ready to begin?</Text>
         <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:20 }}>
           <TouchableOpacity onPress={this.onOk.bind(this)} >
           <LinearGradient colors={['#239816', '#32e625']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text style={{color:"white"}}>OK</Text>
           </LinearGradient>
           </TouchableOpacity>
             <TouchableOpacity onPress={this.onCancel.bind(this)}>
              <LinearGradient colors={['#f14d65', '#fc8798']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
              <Text style={{color:"white"}}>CANCEL</Text>
               </LinearGradient>
           </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
    </View>
			</View>	
			)
	}
}
export default Topics