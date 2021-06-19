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
import { baseUrl } from '../../constants';
import styles from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import Toast from 'react-native-simple-toast';
const data=[
{
	name:"Helloooo",
	image: require('../../assets/images/algebra.png'),
	type:"join"
},{
	name:"Helloooo",
	image: require('../../assets/images/algebra.png'),
	type:"view"
},{
  name:"Helloooo",
  image: require('../../assets/images/algebra.png'),
  type:"join"
}]


class LiveSession extends Component{
	constructor(props){
		super(props)
    this.state={
      token: "",
      livesessionarray:[],
      spinner: false,
      loading: true,
      meetingUrl:""
    }
	}


componentDidMount(){
  this.getData()
}
 getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user')
            //  alert(JSON.stringify(value))
            if (value !== null) {
                var data = JSON.parse(value)
                const token = await AsyncStorage.getItem('@access_token')
                if (token) {
                    this.setState({
                        token: JSON.parse(token)
                    })

                } else {

                }

            } else {
                console.log("errorr")
            }
        } catch (e) {
            return null;
        }
    }
  //   getClasses(){
  //   const { topicData } = this.props;

  //   var url = baseUrl+"/live-class/student?chapter_id="+topicData.reference_id+"&offset=0&limit=1000"
  //   console.log("url",url)
  //   console.log("url",this.state.token)
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'token': this.state.token
  //     }
  // }).then((response) =>

  //     response.json())
  //     .then((json) => {
  //         console.log("topicdattaaa", JSON.stringify(json.data))
  //         if(json.data){
  //           if(json.data.data.length > 0){
  //             this.setState({
  //               livesessionarray : json.data.data,
  //               spinner: false
  //             })
  //           }else{
  //             this.setState({
  //               livesessionarray : [],
  //               spinner: false
  //             })
  //           }
  //         }
  //     }

  //     )
  //     .catch((error) => console.error(error))
 // }
  onJoinLiveClass(item){
    var live_class_id = item.reference_id;
    let date = moment(new Date()).format('YYYY-MM-DD')
    let time = moment(new Date()).format('HH:mm')
    var url = baseUrl+`/live-class/${live_class_id}/join/attendee?date=${date}&time=${time}`
    console.log("tt",url)
    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'token': this.state.token
      }
  }).then((response) =>

      response.json())
      .then((json) => {
          console.log("topicdattaaa", JSON.stringify(json))
        //  alert(JSON.stringify(json))
          if(json.statusCode === 200){
            console.log("joinn",json)
            this.setState({
              meetingUrl: json.data,
              loading:false,
            },()=> Actions.push("livesessionactivity",{meetingUrl:json.data}))
            //json.statusCode
          }else{
            this.setState({loading: false})
            Toast.show(json.message, Toast.LONG);
          }
      }

      )
      .catch((error) => console.error(error))
   // Actions.push("livesessionactivity",{data:item})
  }
        renderItem({ item }) {
      
        return (
          <View style={styles.itemview}>
          <View style={styles.itemsubview}>
          <View style={styles.itemsubtopview}>
           <View style={styles.itemtopmainview}>
           <View style={styles.itemtopleftview}>
           <Image source={require('../../assets/images/liveimg.png')} style={{width:"100%",height:"100%",resizeMode:"contain"}}/>
           </View>
            <View style={{flex:0.7,justifyContent:"center"}}>
            <Text style={styles.testname}>{item.name}</Text>
            <View style={styles.descriptionview}>
            {/* <Image source={require('../../assets/images/dashboard/new/desliveicon.png')} style={styles.descriptionicon} /> */}
            <Text style={styles.descriptiontext}>{item.description}</Text>
            </View>
            
            </View>
           </View>
          </View>
           <View style={styles.itemsubbottomview}>
           <View style={styles.itesmbottomsubview}>
            <Image source={require('../../assets/images/dashboard/new/clockliveicon.png')} style={styles.iconview} />
            <Text style={styles.icontext}>{item.form_time}</Text>
            </View>
            <View style={styles.itesmbottomsubview}>
            <Image source={require('../../assets/images/dashboard/new/calliveicon.png')} style={styles.iconview} />
            <Text style={styles.icontext}>{item.date}</Text>
            </View>
            {/* {item.type === 'view' ? 
            <View style={{paddingVertical: 8,paddingHorizontal: 20,borderWidth:1,borderRadius:30,
            backgroundColor: this.props.topicData.color,borderWidth:0}}>
              <Text style={{color:"white",fontSize:12}}>VIEW</Text>
            </View>
            : */}
             <TouchableOpacity onPress={this.onJoinLiveClass.bind(this,item)} style={{paddingVertical: 8,paddingHorizontal: 20,borderWidth:1,borderRadius:20,
             borderColor: 'transparent',backgroundColor: '#E32346'}}>
              <Text style={{color:"white",fontSize:12}}>JOIN</Text>
            </TouchableOpacity>
           {/* //} */}
           </View>
          </View>
          </View>
        )
    }
	render(){
    const { subjectData } = this.props
		return(
			
		<View style={styles.mainview}>
      {this.state.spinner ? 
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text>Loading...</Text>
          </View> 

          :
          <FlatList data={this.props.livesessionarray}
          renderItem={this.renderItem.bind(this)}
          showsHorizontalScrollIndicator={false} />

    }
		
		</View>
			
			
			)
	}
}
export default LiveSession