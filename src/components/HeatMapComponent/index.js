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
import RNPickerSelect from 'react-native-picker-select';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, colors, imageUrl, Strings } from "../../constants"
import ProgressItem from '../ProgressItem'
import { Actions } from 'react-native-router-flux';
var performacelist = [

    { value: 'performance', label: 'Performance' },
    { value: 'progress', label: 'Progress' },

]
class HeatMapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectvalue: "",
            token: "",
            loading: true,
            ppkey: performacelist[0].value,
            subjectsflist: [],
            selectedsubid: '',
            performanceType: performacelist[0],
            studentHeatMapData: [],
            spinner: false


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
                console.log("subjectass", data)
                const token = await AsyncStorage.getItem('@access_token')
                if (token) {
                    this.setState({
                        token: JSON.parse(token),
                        userdata: data
                    })
                    this.getSubjectsList()
                } else {

                }

            } else {
                console.log("errorrr")
            }
        } catch (e) {
            return null;
        }
    }
    getSubjectsList() {
        var url = baseUrl + '/student/subjects/' + this.state.userdata.reference_id
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
        }).then((response) =>

            response.json())
            .then((json) => {

                if (json) {
                    console.log("jdhfjkld", json.data)
                    let subjects = json.data
                    let subjectsList = subjects?.subjects?.map(sub => {
                        return { label: sub.name, value: sub.name, id: sub.reference_id }

                    })
                    console.log("dmfnkdf", subjectsList)
                    this.setState({
                        subjectslist: subjectsList,
                        loading: false,
                        subjectvalue: subjectsList[0].label,
                        selectedsubid: subjectsList[0].id,
                    }, () => {
                        this.getStudentsheatmap()
                    })

                } else {
                    console.log("dadaada", JSON.stringify(json.message))
                }
            }

            )
            .catch((error) => console.error(error))
    }
    getStudentsheatmap() {
        this.setState({ spinner: true })
        var type = this.state.performanceType.value
        var gradeId = this.state.userdata.grade.reference_id;
        var subjectId = this.state.selectedsubid
        var url = baseUrl + `/analytics/student/subject/heat-map/${type}/${gradeId}/${subjectId}`
        console.log("dsvlkds", url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
        }).then((response) =>

            response.json())
            .then((json) => {

                if (json) {
                    console.log("json.sstata", JSON.stringify(json.data))

                    if (json.data) {
                        this.setState({
                            studentHeatMapData: json.data,
                            spinner: false
                        })
                    }else{
                        this.setState({
                            studentHeatMapData: [],
                            spinner: false
                        })
                    }
                } else {
                    console.log("dadaada", JSON.stringify(json.message))
                }
            }

            )
            .catch((error) => console.error(error))
    }
    onsubjectclick(value, index) {
        console.log("val", value, this.state.subjectslist[index - 1]);
        this.setState({
            subjectvalue: value,
            selectedsubid: this.state.subjectslist[index - 1].id

        }, () => this.getStudentsheatmap())
    }
    onperformacykey(value, index) {
        console.log("val", value, this.state.subjectslist[index - 1]);
        this.setState({
            ppkey: value,
            performanceType: performacelist[index - 1]


        }, () => this.getStudentsheatmap())
    }
    ontopic(item){
        console.log("dfdfdsfdsfdsfdsfdsf",item)
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
             //   alert(JSON.stringify(json))
                if (json.data) {
                   console.log("topiccccccccc....",JSON.stringify(json))
             
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
                        Actions.push('topicmainview', { "from": "heatmap", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData })
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
                    },()=> Actions.push('topicmainview', { "from": "heatmap", data: this.state.topicItem, topicsdata: this.state.chapterData, subjectData: this.state.subjectData }))
                    console.log(JSON.stringify(json.message))
                }
            }

            )
            .catch((error) => console.error(error))
       // 
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loading ?
                    null :
                    <View
                        style={{
                            height: 50, width: windowWidth / 1.1, marginTop: 10,
                            borderColor: "#695077", flexDirection: "row",paddingLeft:8,backgroundColor:colors.Themecolor,
                            borderWidth: 1, marginLeft: 20, justifyContent: "space-between", alignItems: "center"
                        }}>
                        <RNPickerSelect
                            value={this.state.subjectvalue}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={this.onsubjectclick.bind(this)}
                            items={this.state.subjectslist}
                        />
                        <Image source={require('../../assets/images/downarrow.png')} style={{
                            position: "absolute",
                            width: 20, height: 20, tintColor: "white", right: 10
                        }} />


                    </View>}
                {/* <View

                    style={{
                        height: 50, width: windowWidth / 1.1,
                        borderColor: "#695077", flexDirection: "row", marginTop: 20,
                        borderBottomWidth: 1, marginLeft: 20, justifyContent: "space-between", alignItems: "center"
                    }}>
                    <RNPickerSelect
                        value={this.state.ppkey}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={this.onperformacykey.bind(this)}
                        items={performacelist}
                    />
                    <Image source={require('../../assets/images/downarrow.png')} style={{
                        position: "absolute",
                        width: 20, height: 20, tintColor: colors.Themecolor, right: 0
                    }} />


                </View> */}
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 10, flexDirection: "row", flexWrap: 'wrap',
                     }}>
                        {this.state.studentHeatMapData &&
                            this.state.studentHeatMapData.map(item => (
                                <>
                                  <TouchableOpacity onPress={this.ontopic.bind(this,item)}>
                                    <ProgressItem
                                        name={item.name ? item.name : 'Test User'}
                                        status={item.status}
                                        score={item.score ? item.score : item.percentage ? item.percentage : 0}
                                        performedTests={
                                            this.state.performanceType.value === 'Performance'
                                                ? item.performedTests
                                                : item.percentage
                                        }
                                    />
                                    </TouchableOpacity>
                                </>
                            ))}

                    </View>
                    {this.state.studentHeatMapData.length > 0 ?
                        <View style={{ flex: 1, marginTop: 10, flexDirection: "row", 
                        flexWrap: 'wrap', justifyContent:"center" }}>
                         
                         <View style={{padding:5, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                             <View style={{height:10,width:10,backgroundColor:"grey"}}></View>
                             <Text style={{color:"black",marginLeft:5}}>Not Started</Text>
                         </View>
                         <View style={{padding:5,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                             <View style={{height:10,width:10,backgroundColor:"#c44921"}}></View>
                             <Text style={{color:"black",marginLeft:5}}>Score 0%-40%</Text>
                         </View>
                         <View style={{padding:5, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                             <View style={{height:10,width:10,backgroundColor:"#d88414"}}></View>
                             <Text style={{color:"black",marginLeft:5}}>Score 40%-60%</Text>
                         </View>
                         <View style={{padding:5, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                             <View style={{height:10,width:10,backgroundColor:"#a3ba6d"}}></View>
                             <Text style={{color:"black",marginLeft:5}}>Score 60%-80%</Text>
                         </View>
                         <View style={{padding:5, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                             <View style={{height:10,width:10,backgroundColor:"#016313"}}></View>
                             <Text style={{color:"black",marginLeft:5}}>Score above 80%</Text>
                         </View>

                        </View>

                        : null
                    }

                </ScrollView>
            </View>
        )
    }
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderWidth: 1,
        width: windowWidth / 1.1,
        borderColor: 'transparent',
        borderRadius: 8,
        color: 'white',
        marginTop: 10,
        // marginBottom:10,
        paddingRight: 10, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        borderWidth: 1,
        borderWidth: 0.5,
        width: windowWidth / 1.1,

        borderColor: 'transparent',
        borderRadius: 8,
        marginTop: 10,
        color: 'white',
        // marginBottom:10,
        paddingRight: 10, // to ensure the text is never behind the icon
    },
});
export default HeatMapComponent