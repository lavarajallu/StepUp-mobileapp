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
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import PracticeComponent from '../../components/PracticeComponent';
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'
import SideMenu from "../../components/SideMenu"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../../constants"
import { createNativeWrapper } from 'react-native-gesture-handler';
import { colors } from "../../constants"
import { resetWarningCache } from 'prop-types';


class Practice extends Component{
	constructor(props){
		super(props);
		this.state={
			token:"",
			spinner: true,
			subjectsData:null
		}
	}
	componentDidMount(){
		this.getData()
}
getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
        const token = await AsyncStorage.getItem('@access_token')
        if(token){
			this.setState({
				token: JSON.parse(token)
			})
            this.getSubjects(data,JSON.parse(token))
			//this.getanalytics(data,JSON.parse(token))
        }else{
            
        }
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
  getSubjects(user,toekn)
  {
	  //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
		   var url = baseUrl+ "/student/practiceSubjects/"+user.reference_id
		   console.log("value",url)
		  fetch(url ,{
				   method: 'GET',
				   headers: {
					   'Content-Type': 'application/json',
					   'token': toekn
				   }
				   }).then((response) =>
				   
					response.json())
				   .then((json) =>{
					   const data = json.data;
					   if(data){
						 if(data.subjects){
							console.log("subjects",data.subjects)
							var newarr = data.subjects
							newarr = [...newarr]
							 this.setState
							 ({
								 spinner: false,
								 subjectsData: data.subjects
							 })
						 }else{
						  this.setState
						  ({
							 spinner: false,
							 subjectsData: []
						  }) 
						 }
						  //  AsyncStorage.setItem('@access-token', data.access_token)
						  //  Actions.push('dashboard')
					   }else{
						   alert(JSON.stringify(json.message))
						   this.setState
						   ({
							  spinner: false,
							  subjectsData: []
						   })
					   }
				   }
					
				   )
				   .catch((error) => console.error(error))
			   //Actions.push('boards')
  }
	onBack(){
		Actions.dashboard({type:"reset"})
	}
  closeControlPanel = () => {
    this._drawer.close()
    };
    openControlPanel = () => {
    this._drawer.open()
    };
	render(){
		return(
     
			<View style={styles.mainview}>

			<View style={styles.topview}>
			   <ImageBackground source={require('../../assets/images/dashboard/new/learningbg.png')}
			   style={{width:"100%",height:288}}>
				   <View style={{flexDirection:"row",marginTop:20,marginLeft:10,alignItems:"center"}}>
				   <TouchableOpacity onPress={this.onBack.bind(this)}>
                        <Image source={require("../../assets/images/left-arrow.png")}
                            style={{width:30,height:30,tintColor:"white"}} />
                    </TouchableOpacity>
					<Text style={{color:"white",marginLeft:20,fontSize:20}}>My Practice</Text>
				   </View>
				 
			   </ImageBackground>
			   <View style={{height:windowHeight/1.3,width:windowWidth,backgroundColor:"white",alignSelf:"center",
			   position:"absolute",bottom:0,borderTopRightRadius:30,borderTopLeftRadius:30}}>
					{this.state.spinner  ? 

				<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
					<ActivityIndicator color="black"/>
				</View>:
				<PracticeComponent onBack={this.onBack.bind(this)} subjectsData = {this.state.subjectsData}/>

				}
			   </View>
				{/* <View style={{flex:0.8,backgroundColor:"red"}}>
							{this.state.spinner  ? 

			<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
				<ActivityIndicator color="black"/>
			</View>:
			<PracticeComponent onBack={this.onBack.bind(this)} subjectsData = {this.state.subjectsData}/>

			}
				</View>
			</View> */}
			
			

			</View>
			 <View style={styles.footerview}>

		     <Footer openControlPanel={this.openControlPanel}/>
			</View> 
			</View>
			)
	}
}
export default Practice
