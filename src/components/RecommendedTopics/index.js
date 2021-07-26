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
import LinearGradient from 'react-native-linear-gradient';

import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import StringsOfLanguages from '../../StringsOfLanguages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import styles from "./styles"
import { baseUrl , imageUrl } from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
	{
		name: "Rational Numbers",
		image: require('../../assets/images/dashboard/new/topic3.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.5,
		test: 6, read: 40
	},
	{
		name: "Volume of Cuboid",
		image: require('../../assets/images/dashboard/new/topic4.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.3,
		test: 6, read: 40
	},
	{
		name: "Volume of Cylinder",
		image:require('../../assets/images/dashboard/new/topic5.png'),
		insideimg: require('../../assets/images/math.png'),
		progress: 0.9,
		test: 6, read: 40
	}
	
	]
class RecommendedTopics extends Component {
	constructor(props) {
		super(props)
		this.state={
			token : '',
			topicsData:[],
			spinner: true

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
                if (token) {
                    this.setState({
                        token: JSON.parse(token)
                    }, () => this.getTopics())

                } else {

                }

            } else {
                console.log("errorr")
            }
        } catch (e) {
            return null;
        }
    }
	onMainTopic(item){
        var newarray = ["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var newitem = newarray[Math.floor(Math.random()*newarray.length)];
        var url = baseUrl + '/topic/' + item.reference_id
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
        }).then((response) =>

            response.json())
            .then((json) => {

                if (json.data) {
             //    console.log("topiccccccccc....",JSON.stringify(json.data.topic.subject))
                 
                    this.setState({
                        topicItem: json.data.topic,
                       subjectData:json.data.topic.subject,
                       chapterData: json.data.topic.chapter
                    },()=>{
						var bgcolor;
                        if(json.data.topic.subject.color){
                            bgcolor = json.data.topic.subject.color
                        }else{
                            bgcolor = newitem
                        }
                        this.state.topicItem["color"] = bgcolor
                       // alert(JSON.stringify(this.state.topicItem.color))
                        Actions.push('topicmainview', { "from": "dashboard", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData })
                    })
                } else {
                    // var obj = {
                    //     reference_id:  item.topic_id,
                    //     name:"topic1"
                    // }
                    // var obj1= {
                    //     reference_id:  item.chapter_id,
                    //     name:"Chapter1"
                    // }
                    // var obj2 ={
                    //     reference_id:  item.subject_id,
                    //     name:"subject1"
                    // }
                    // this.setState({
                    //     topicItem: obj,
                    //     chapterData:obj1,
                    //     subjectData: obj2
                    // },()=> Actions.push('topicmainview', { "from": "dashboard", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData }))
                    // console.log(JSON.stringify(json.message))
                }
            }

            )
            .catch((error) => console.error(error))
       // 
    }
	getTopics() {
	//	localhost:3000/student/recommendedLearning

        var url = baseUrl + '/student/recommendedLearning'
        console.log("value", this.state.token)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
               console.log("recomme.................", JSON.stringify(json))
                if (json.data) {
                    this.setState({
                        topicsData: json.data,
                        spinner: false
                    })
                } else {
                    //alert("ffff"+JSON.stringify(json.message))
                    Toast.show(json.message, Toast.LONG);
                    this.setState
                        ({
                            topicsData: [],
                            spinner: false,
                        })
                }
               
            }

            )
            .catch((error) => console.error(error))
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
			<TouchableOpacity onPress={this.onMainTopic.bind(this,item)} style={{backgroundColor:"white",width:windowWidth/1.3,margin:10,alignSelf:"center",
			shadowOffset: { width: 0, height: 5 },
			shadowOpacity: 1,
			shadowRadius: 5,
			elevation: 10, borderRadius: 10,paddingVertical:10
			
			   }}>
				<View style={{flex:1,flexDirection:"row",}}>
				<View style={{flex:0.25,justifyContent:"center",alignItems:"center"}}>
				{item.image ?

<Image source={{ uri: imageUrl + item.image }}
	style={{ width: 70, height: 70 }} /> :
<Image source={require('../../assets/images/noimage.png')}
	style={{ width: 50, height: 50, resizeMode: "contain" }} />}
		
				</View>
				<View style={{flex:0.5,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingLeft:10}}>
				 <Text>{item.name}</Text>
				 </View>
				<View style={{flex:0.25,justifyContent:"center",alignItems:"center"}}>
				<LinearGradient colors={["#F63D80", "#FD6C71"]}
				style={{height:25,justifyContent:"center",alignItems:"center",paddingHorizontal:15,borderRadius:20,marginRight:10}}>
					<Text style={{color:"white",fontSize:12}}>{"Start"}</Text>
				</LinearGradient>
				</View>
				</View>
			
			   
			</TouchableOpacity>
		)
	}
	render() {
		return (
			this.state.spinner ? null :
			this.state.topicsData.length > 0 ?
			<View>
			<View style={{flexDirection: 'row',justifyContent: 'space-between' ,alignItems:"center",marginTop:20 }}>
			<Text style={{ marginLeft:15,fontSize:16,color:"#656565",fontWeight:"600"}}>{StringsOfLanguages.recommendedtopics}</Text>
			<TouchableOpacity>
			{/* //<Text style={{marginRight:15,fontSize:14,color:"#656565"}}>{StringsOfLanguages.seeall}</Text> */}
			</TouchableOpacity>
		  
			</View>
			<FlatList data={this.state.topicsData}
					renderItem={this.renderItem.bind(this)}
					horizontal={true}
					extraData={true}
					showsHorizontalScrollIndicator={false} />
	</View>  :null
		)
	}
}
export default RecommendedTopics