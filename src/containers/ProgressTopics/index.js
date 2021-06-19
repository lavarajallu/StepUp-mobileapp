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
import * as Progress from 'react-native-progress';

import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import Library from '../../components/Library';
import Loader from "../../components/Loader"
import { Validations } from '../../helpers'
import SideMenu from "../../components/SideMenu"
import Drawer from 'react-native-drawer'
import { colors } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

import { baseUrl,imageUrl } from "../../constants"
import { TextInput } from 'react-native-gesture-handler';
var b =[]
class ProgressTopics extends Component{
	constructor(props){
		super(props)
		this.getData = this.getData.bind(this)
		this.state={
			spinner: true,
            topicsData:[],
            token:""
		}
	}
	componentDidMount(){
		// setTimeout(() => {
		// 	this.setState({loader: false});
			this.getData()
		//}, 2000)
		
       
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
    getTopics() {
        var url = baseUrl + '/student/inProgressTopics/0'
        console.log("value", url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
                console.log("topicdattaaa", JSON.stringify(json.data))
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
        //Actions.push('boards')
    }
	closeControlPanel = () => {
		this._drawer.close()
	  };
	  openControlPanel = () => {
		this._drawer.open()
	  };
      onBack(){
          Actions.dashboard({type:"reset"})
      }
      onChapter(item){
		//this.updateAnalytics()
		Actions.push('chapters',{data:item})
	}
    chooseName = function (a) {
        // var unique = true;
        // var num = a[Math.floor(Math.random() * a.length-5) | 0];
        // var name = a.splice(num,1);
        // a.push(name);
        // return num;
        // console.log("nummm",num)
        var unique = true;
        b.length = 6;
        var num = Math.floor(Math.random() * a.length);
        var name = a[num];    
            for (var i = 0; i < a.length; i++) {
            if (b[i] == name) {
               this.chooseName(a);
                unique = false;
                break;
                }
            }
            if (unique == true) {
            console.log("name",name);
            b.unshift(name);
            
            }
            return name
    }
    onMainTopic(item){
        var newarray =["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var newitem = this.chooseName(newarray);//newarray[Math.floor(Math.random()*newarray.length)];
        var url = baseUrl + '/topic/' + item.topic_id
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
                 console.log("topiccccccccc....",JSON.stringify(json.data.topic.subject))
                 
                    this.setState({
                        topicItem: json.data.topic,
                       subjectData:json.data.topic.subject,
                       chapterData: json.data.topic.chapter
                    },()=>{
                        this.state.topicItem["color"] = newitem
                       // alert(JSON.stringify(this.state.topicItem.color))
                        Actions.push('topicmainview', { "from": "progresstopics", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData })
                    })
                } else {
                    var obj = {
                        reference_id:  item.topic_id,
                        name:"topic1"
                    }
                    var obj1= {
                        reference_id:  item.chapter_id,
                        name:"Chapter1"
                    }
                    var obj2 ={
                        reference_id:  item.subject_id,
                        name:"subject1"
                    }
                    this.setState({
                        topicItem: obj,
                        chapterData:obj1,
                        subjectData: obj2
                    },()=> Actions.push('topicmainview', { "from": "progresstopics", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData }))
                    console.log(JSON.stringify(json.message))
                }
            }

            )
            .catch((error) => console.error(error))
       // 
    }
    renderItem({ item }) {

        if (item !== null) {
            console.log("vvvvvv", item)
            var percent
            let color
            if (item.progress) {
                console.log("fffff", item.progress)
                percent = (item.progress);

                if (percent > 80) {
                    color = "green"
                } else if (percent < 50) {
                    color = "red"
                } else {
                    color = "orange"
                }
            }

            return (
                <TouchableOpacity onPress={this.onMainTopic.bind(this, item)} style={{
                    backgroundColor: "white", width: windowWidth / 1.1, margin: 10, alignSelf: "center",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    elevation: 10, borderRadius: 10, paddingVertical: 5

                }}>
                    <View style={{ flex: 1, flexDirection: "row", padding: 5 ,}}>
                        <View style={{ flex: 0.2, }}>
                            {item.image ?

                                <Image source={{ uri: imageUrl + item.image }}
                                    style={{ width: "100%", height: "100%" }} /> :
                                <Image source={require('../../assets/images/noimage.png')}
                                    style={{ width: "100%", height: "100%", resizeMode: "contain" }} />}
                        </View>
                        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", paddingLeft: 10, }}>
                            <View style={{ flex:1,justifyContent: "space-evenly"}}>
                                <Text>{item.name}</Text>
                             
                            {/* <Text style={{ fontSize: 10, color: 'grey' }}>In Progress</Text> */}
                        
                                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5, paddingBottom: 5 }}>
                                    <Text>Progress</Text>
                                    <Text>{(item.progress)}%</Text>
                                </View> */}
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",}}>
                                <Progress.Bar progress={item.progress / 100} width={windowWidth / 1.8} height={2} color={color} />
                                <Text style={{marginRight:10,fontSize:12}}>{Math.round(item.progress)}%</Text>
                                </View>
                               
                            </View>

                        </View>
                      

                    </View>

                </TouchableOpacity>


            )
        } else {
            return null
        }
    }

	render(){
		return(
			<>
			{/* <ImageBackground source={require('../../assets/images/Mobile_bg_2.png')}
			style={{width:"100%",height:"100%",opacity:0.4}}/>
			<View style={{width:"100%",height:"100%",position:"absolute"}}> */}
			<View style={styles.mainview}>
			
				<Drawer
				type="overlay"
					ref={(ref) => this._drawer = ref}
					 tapToClose={true}
					 openDrawerOffset={100} 
					  content={ <SideMenu

						closeControlPanel={this.closeControlPanel}/>}
					>
			<View style={{width:"100%",height:"100%",}}>
			<View style={{flex:1}}>
				<View style={{flex:1,}}>
                <View style={{flex:0.15,justifyContent:"center",flexDirection:"row"}}>
					<View style={{flex:0.7,flexDirection:"row",alignItems:"center",marginLeft:20}}>
                    <TouchableOpacity onPress={this.onBack.bind(this)}>
                                    <Image source={require('../../assets/images/refer/back.png')} style={{width:21,height:15,color:colors.Themecolor}} />
                     </TouchableOpacity>
                     <Text style={{marginLeft:20,color:colors.Themecolor,fontSize:20}}>My Topics in Progress</Text>
                    </View>
                    <View style={{flex:0.3,}}>
                    <Image source={require('../../assets/images/dashboard/new/subjabs.png')}
					style={{width:"100%",height:"120%",resizeMode:"cover"}}/>

                    </View>
				</View>
				{/* <View style={{flex:0.2,alignItems:"flex-end",justifyContent:"flex-start",}}>
					<Image source={require('../../assets/images/practiceabs.png')}
					style={{width:339/2,height:242/2}}/>
					<View style={{position: 'absolute' ,flex:1,height:"100%",width:"100%" ,justifyContent: 'space-evenly',}}>
					{/* <Image source={require('../../assets/images/logo_icon.png')}
					style={{width:70,height:70,marginLeft: 20}}/> */}
                    {/* <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={this.onBack.bind(this)}>
                                    <Image source={require('../../assets/images/refer/back.png')} style={styles.backIcon} />
                     </TouchableOpacity>
                     
                    </View>
                    <Text style={{marginLeft:20,color:colors.Themecolor,fontSize:20}}>My Topics In Progress</Text>
					</View> 
				</View> */}
				<View style={{flex:0.85,marginHorizontal: 0,}}>
                    {this.state.spinner ?
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Loading.....</Text></View> :
                    this.state.topicsData.length > 0 ?
                  
                    <FlatList data={this.state.topicsData} 
                    renderItem={this.renderItem.bind(this)}
                     />
                     : null}
                  
			    </View>
				</View>
	    	       <View style={styles.footerview}>

					    <Footer openControlPanel={this.openControlPanel}/>
						</View>
				</View>


						</View></Drawer>
			</View>
			{/* </View> */}
			</>
			)
	}
}
export default ProgressTopics
