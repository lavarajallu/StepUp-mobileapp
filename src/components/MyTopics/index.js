import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
import * as Progress from 'react-native-progress';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { baseUrl, imageUrl } from "../../constants"
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-async-storage/async-storage';
import StringsOfLanguages from '../../StringsOfLanguages';

class MyTopics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            token: '',
            topicsData: [],
            subjectData:{},
            chapterData:{},
            topicItem:{}
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
    getTopics() {
        var url = baseUrl + '/student/inProgressTopics/2'
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

    onMainTopic(item){
        var newarray = ["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var newitem = newarray[Math.floor(Math.random()*newarray.length)];
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
                        Actions.push('topicmainview', { "from": "dashboard", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData })
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
                    },()=> Actions.push('topicmainview', { "from": "dashboard", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData }))
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
                    <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
                        <View style={{ flex: 0.2, }}>
                            {item.image ?

                                <Image source={{ uri: imageUrl + item.image }}
                                    style={{ width: 50, height: 50 }} /> :
                                <Image source={require('../../assets/images/noimage.png')}
                                    style={{ width: 60, height: 60, resizeMode: "contain" }} />}
                        </View>
                        <View style={{ flex: 0.85, flexDirection: "row", justifyContent: "space-between", paddingLeft: 10, }}>
                            <View style={{ justifyContent: "space-evenly", }}>
                                <Text>{item.name}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5, paddingBottom: 5 }}>
                                    <Text>Progress</Text>
                                    <Text>{(item.progress)}%</Text>
                                </View>
                                <Progress.Bar progress={item.progress / 100} width={windowWidth / 2} height={2} color={color} />

                            </View>

                        </View>
                        <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 10, color: 'grey' }}>In Progress</Text>
                            {/* <Text style={{fontSize:12}}>12 April, 2021</Text> */}
                        </View>

                    </View>

                </TouchableOpacity>


            )
        } else {
            return null
        }
    }
    onViewall(){
        Actions.push('progresstopics')
    }
    render() {
        return (
            this.state.spinner ? null :

                this.state.topicsData.length > 0 ?
                    <View style={{marginVertical:10}}>
                        	<View style={{flexDirection: 'row',justifyContent: 'space-between'  }}>
                            <Text style={styles.headertext}>{StringsOfLanguages.mytopicsinprogress}</Text>
                            <TouchableOpacity onPress={this.onViewall.bind(this)}>
                            <Text style={styles.seelalltext}>{StringsOfLanguages.seeall}</Text>
                            </TouchableOpacity>
                          
                            </View>
                        
                        <FlatList data={this.state.topicsData}
                            renderItem={this.renderItem.bind(this)}
                            keyExtractor={(item, index) => item + index}
                            showsHorizontalScrollIndicator={false} />

                    </View> : null
        )
    }
}
export default MyTopics