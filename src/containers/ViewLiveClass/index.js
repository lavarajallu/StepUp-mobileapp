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
    Platform,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { baseUrl,imageUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
class ViewLiveClass extends  Component{
    constructor(props){
        super(props);
        this.state={
            spinner:true,
            liverecording:"",
            token:"",
        }
    }
    componentDidMount() {
     this.getData()
    }
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@user')
        //  alert(JSON.stringify(value))
        if (value !== null) {
          var data = JSON.parse(value)
  
          const token = await AsyncStorage.getItem('@access_token')
          if (token && data) {
            this.setState({
              token: JSON.parse(token)
            })
            this.getrecording(JSON.parse(token))
          } else {
            console.log("hihii")
          }
  
        } else {
          alert("errorrr")
        }
      } catch (e) {
        return null;
      }
    }
  

    getrecording(token) {
      const { data } = this.props
      console.log("ddddddddd",data)
      const url = baseUrl+"/live-class/"+data.reference_id+"/recording"
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      }).then((response) => response.json())
        .then((json) => {
  
          const data = json.data;
          // alert(JSON.stringify(data))
          console.log("view recording......", json)
          if (data) {
             console.log("ljdfkldfd",data)
             this.setState({
                liverecording: data,
                spinner: false
             }) 
  
          } else {
            this.setState({
                liverecording: null,
                spinner: false
             }) 
  
            //alert(JSON.stringify(json.message))
  
          }
        }
  
        )
        .catch((error) => console.error(error))
  
    }
    onBack(){
    //   this.updateAnalytics()
    //   Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
      Actions.pop({type:"reset"})
    }
   
  
	render(){
    const { topicindata } = this.props
		return(
          <>
          <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
         
          style={{width:"100%",height:"100%",backgroundColor:topicindata.color}} opacity={0.5}>
            <View style={{flex:1}}>
            <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity>
             
                <Text style={{ color: "white", fontSize: 18,marginLeft:10}}>{"Live Class Recording"}</Text>
               
              </View>

              </View>
          </View>
              <View style={{flex:0.9,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
               {this.state.spinner ? 
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Loading..</Text>
                    </View>
                    :
                    this.state.liverecording ? 
                    
                      <WebView
                              source={{
                                uri: this.state.liverecording
                              }}
                              style={{ marginTop: 20,overfloe:"hidden" }}/>
                              :
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>No Recording</Text>
                        </View>
                }
              </View>
             
            </View>
          </ImageBackground>

        {/* <View style={{position:"absolute",height:44,backgroundColor:topicindata.color,paddingHorizontal:20,alignSelf:"center",
        borderRadius:20,top: Platform.OS === 'android' ? 90 : 100,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"white",fontSize:17}}>{this.props.data.activity}</Text>
            </View> */}
    </>
			)
	}
}

export default ViewLiveClass;
