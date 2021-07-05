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
    Platform
} from 'react-native';
//import styles from "./styles"
import { Table, Row, Rows } from 'react-native-table-component';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { baseUrl, imageUrl } from "../../constants"
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { VictoryPie, VictoryBar,VictoryTheme,VictoryChart } from "victory-native";
import ColumnChart from './ColumnChart.js'
import TimeSpentChart from './TimeSpentChart';
var graphicData = [
    { y: 20, x: '20%', name: "Incomplete" },
    { y: 90, x: '90%', name: "Complete" },
];
class TopicAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            isvisible: false,
            weblinkdata: null,
            analyticsData: {},
            token: "",
            topicpercentarray:[],
            topicactivitesdata:[],
            tableHead: [],
            tableData : [],
            quesloading: true,
            studenteasydaata:{},
            timespinner: true,
            timespentquestions : []
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
                    this.getTopicAnalysis()
                    this.getassesmentanalysis()
                    this.getquestionstimespent()
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
    getquestionstimespent(){
        ///student/questionsAnalysis/${topicCode}`
        console.log("gggggg",baseUrl + '/student/questionsAnalysis/'+ this.props.data.reference_id)
        fetch( baseUrl + '/student/questionsAnalysis/'+ this.props.data.reference_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
               //st data = json.data;
                console.log("newwwwwwwww", json)
                if(json.data){
                  
                    this.setState({
                        timespentquestions : json.data,
                        timespinner:false
                    })

                }else{
                    this.setState({
                        timespentquestions : [],
                        timespinner:false
                    })
                }
             
            }

            )
            .catch((error) => console.error(error))
    }
    getassesmentanalysis(){
        console.log("ddddd",this.props.data.reference_id)
      //  https://api.iconeducate.com/student/assessmentAnalysis/b2ab5c8d-92fc-4597-a7e6-6
        fetch( baseUrl + '/student/assessmentAnalysis/'+ this.props.data.reference_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
               //st data = json.data;
                console.log("sss", json)
                if(json.data){
                    const studentTopicPerformanceAnalysisData  = json.data
                    if (studentTopicPerformanceAnalysisData?.qusType) {
                        let questionAnalysis = []
                        Object.keys(studentTopicPerformanceAnalysisData.qusType).map(
                          (key) => {
                            let obj = studentTopicPerformanceAnalysisData.qusType[key]
                            questionAnalysis.push({
                              skill: key,
                              total: obj.correct + obj.wrong,
                              correct: obj.correct,
                              wrong: obj.wrong,
                            })
                          },
                        )
                        console.log("tabledata",questionAnalysis)
                       
                        
                        let finalsample = []
                        questionAnalysis.map((res,i)=>{
                            let sample = [];
                            sample.push(res.skill)
                            sample.push(res.total)
                            sample.push(res.correct)
                            sample.push(res.wrong)
                            finalsample.push(sample)
                        })
                       var tableHead = ['Skills', 'Total Questions', 'No Of Correct Questions', 'No Of Wrong Questions'];
                        var tableData = finalsample
                        console.log("tableHead",tableHead)
                        console.log("tabledataaaa",tableData)

                        this.setState({
                            tableHead : tableHead,
                            tableData: tableData,
                            studenteasydaata: studentTopicPerformanceAnalysisData,
                            quesloading: false
                        })
                      }

                }else{
                  
                }
             
            }

            )
            .catch((error) => console.error(error))
    }
    getTopicAnalysis(){
        console.log("ddddd",this.props.data.reference_id)
        fetch( baseUrl + '/student/topicAnalysis/'+ this.props.data.reference_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
               //st data = json.data;
                console.log("sss......", json.data)
                if(json.data){
                    var completion  = json.data.topicPercentage
                   var completepercent = completion ?  Math.round(completion) : 0
                   var incompletepercent =   completion ?  Math.round(100-completion) : 100
                  var obj1 =  { y: incompletepercent, x: incompletepercent+'%', name: "Incomplete" }
                   var obj2 = { y: completepercent, x: completepercent+'%', name: "Complete" }
                   var newarr = [];
                   newarr.push(obj1)
                   newarr.push(obj2);
                   console.log("ffff.....",newarr)
                   let progressItemList=[]
                    if(json.data.topicTimeSpent){
                        var timeSpentData = json.data.topicTimeSpent
                        console.log("timespecnt graph",timeSpentData)
                        if(Object.keys(timeSpentData)?.length>0){
                          let totalTime=Object.values(timeSpentData).reduce((a, b) => a + b, 0)
                          Object.keys(timeSpentData).map((key)=>{
                            let progressItem= { name: key, y: timeSpentData[key]/totalTime, x: timeSpentData[key]/totalTime,value:timeSpentData[key] };
                            progressItemList.push(progressItem) 
                          })
                          console.log("progressIte",progressItemList)
                    }
                }

                   this.setState({topicpercentarray : newarr,topicactivitesdata: progressItemList,loading: false})

                }else{
                    this.setState({
                        loading: false,
                    })
                }
             
            }

            )
            .catch((error) => console.error(error))
    }
    onBack() {
        //alert("hiii")
        Actions.pop()
       // Actions.topics({ type: "reset", data: this.props.topicsdata, subjectData: this.props.subjectData })
    }

    render() {
        const { data } = this.props
        var colorarray =[
            '#F94D48',
            '#30A6DC',
            '#C44921',
            '#734F96',
            '#D19DE6',
            '#734F96',
            '#6A5177',
            '#A3BA6D',
          ]
        return (
            <>
                <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}

                    style={{ width: "100%", height: "100%", backgroundColor: data.color }} opacity={0.5}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>

                                <View style={{ flex: 1, marginLeft: 20, flexDirection: "row", alignItems: "center" }}>

                                    <TouchableOpacity onPress={this.onBack.bind(this)}>
                                        <Image source={require("../../assets/images/left-arrow.png")}
                                            style={{ width: 30, height: 30, tintColor: "white", marginTop: 10 }} />
                                    </TouchableOpacity>

                                    <Text style={{ color: "white", fontSize: 15, marginLeft: 10 , marginRight:20}}>{data.name} Analysis</Text>

                                </View>

                            </View>
                        </View>
                        <View style={{ flex: 0.9, backgroundColor: "white", marginLeft: 10, marginRight: 10, borderRadius: 20, overflow: "hidden" }}>
                            <ScrollView>
                             {this.state.loading ? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                             <Text>Loading...</Text></View> :
                             <>
                                                 <View style={{width:windowWidth/1.25,backgroundColor:data.color,alignSelf:"center",borderRadius:10,marginVertical:10}}>

                             <Text style={{textAlign:"center",paddingVertical:10,color:"white",fontWeight:"bold"}}>Topic Analysis</Text>
                           </View>
                            <VictoryPie
                                data={this.state.topicpercentarray}
                                // width={250}
                                height={300}
                                innerRadius={60}
                                animate={{
                                    duration: 2000
                                }}
                                labels={({ datum }) => null}
                                labelRadius={({ innerRadius }) => innerRadius + 5}
                                colorScale={['#F94D48','#A3BA6D']}
                                style={{ labels: { fill: "white", fontSize: 15, fontWeight: "bold" , marginLeft:8} }}
                            />
                            <View style={{flexDirection:"row",justifyContent:"center"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <View style={{height:10,width:10,borderRadius:5,backgroundColor:"#A3BA6D"}}></View>
                                    <Text style={{marginLeft:8}}>Complete</Text>
                                </View>
                                <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                                    <View style={{height:10,width:10,borderRadius:5,backgroundColor:"#F94D48"}}></View>
                                    <Text style={{marginLeft:8}}>Incomplete</Text>
                                </View>
                            </View>
                            <VictoryPie
                                data={this.state.topicactivitesdata}
                                // width={250}
                                height={300}
                                innerRadius={0}
                                animate={{
                                    duration: 2000
                                }}
                                labels={({ datum }) => null}
                              
                                colorScale={colorarray}
                               // style={{ labels: { fill: "white", fontSize: 15, fontWeight: "bold" , marginLeft:8} }}
                            />
                              <View style={{flexDirection:"row",marginHorizontal:30,flexWrap:"wrap",marginBottom:20,justifyContent:"center"}}>
                            {this.state.topicactivitesdata.map((res,i)=>
                               res.value  ?
                                <View style={{flexDirection:"row",alignItems:"center",marginLeft:10}}>
                                    <View style={{height:10,width:10,borderRadius:5,backgroundColor:colorarray[i]}}></View>
                                    <Text style={{marginLeft:8}}>{res.name}</Text>
                                </View> : null
                            
                            )}
                            </View> 
                          
                          {this.state.quesloading ? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                             <Text>Loading...</Text></View>:

                            <View style={{flex: 1, padding: 16, paddingTop: 30, }}>
                            <Table borderStyle={{borderWidth: 1,borderColor:"lightgrey" }}>
                            <Row data={this.state.tableHead} textStyle={{margin: 6}}/>
                            <Rows data={this.state.tableData} textStyle={{margin: 6, }}/>
                            </Table>
                        </View> }
                        <View style={{width:windowWidth/1.25,backgroundColor:data.color,alignSelf:"center",borderRadius:10,marginVertical:10}}>
                        <Text style={{textAlign:"center",paddingVertical:10,fontWeight:"bold",color:"white"}}>Performance Analysis By Question Difficulty</Text>
                        </View>
                        {this.state.quesloading ? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                             <Text>Loading...</Text></View> :
                        <>
                        <ColumnChart
                            type="Easy"
                            question={this.state.studenteasydaata?.diffLevel?.Easy}
                        />

                        <ColumnChart
                        type="Medium"
                        question={this.state.studenteasydaata?.diffLevel?.Medium}
                      />
                 
                      <ColumnChart
                        type="Hard"
                        question={this.state.studenteasydaata?.diffLevel?.Hard}
                      />
                      {this.state.timespinner ? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                             <Text>Loading...</Text></View> :
                      <>
                    <View style={{width:windowWidth/1.25,backgroundColor:data.color,alignSelf:"center",borderRadius:10,marginVertical:10}}>

                        <Text style={{textAlign:"center",paddingVertical:10,color:"white",fontWeight:"bold"}}>Time Taken For Each Question</Text>
                        </View>
                        <TimeSpentChart topicsTimeTakenData={this.state.timespentquestions} />
                        </>
                      }
                      </>
                        
                        
                        }
                     
                   
                            </>
                         
    }
       </ScrollView>
                        </View>

                    </View>
                </ImageBackground>
            </>
        )
    }
}

export default TopicAnalysis;
