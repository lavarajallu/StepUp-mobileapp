import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    FlatList,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ProgressCircle from 'react-native-progress-circle'
//import { BarChart } from 'react-native-charts'
import SummaryGraph from "../../components/SummaryGraph"
import { Validations } from '../../helpers'
import { colors } from "../../constants"
import { baseUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSpeedometer from 'react-native-speedometer'
import { color } from 'react-native-reanimated';
import Snackbar from 'react-native-snackbar';
import * as Progress from 'react-native-progress';
import AttemptAnalysis from './AttemptAnalysis'
import BarChartNew from './BarChart'
//import { BarChart, Grid,XAxis ,YAxis } from 'react-native-svg-charts'
import * as NewText  from 'react-native-svg'
import * as scale from 'd3-scale'

const labels =[
  {
    name: 'Poor',
    labelColor: '#ff5400',
    activeBarColor: 'orange',
  },
  {
    name: 'Average',
    labelColor: '#f4ab44',
    activeBarColor: 'yellow',
  },
  {
    name: 'Fair',
    labelColor: '#14eb6e',
    activeBarColor: 'green',
  },
]
const data = [
   { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       result:"correct"},
 { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       result:"wrong"},
        { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       result:"correct"}

]
class PracticeSummary extends Component {
    constructor(props) {
        super(props);
        this.state={
            numberofques: 5,
            correctanswer:3,
            useDetails:null,
            token:"",
            wronganswer:2,
            spinner: true,
            correctarray:null,
            questionsarray:[],
            wrongarray:null,
            analysis:null,
            marks:0,
            testResult:null
        }
    }
    componentDidMount() {
        //alert(JSON.stringify(this.props.testid))
           this.getData()
         }
         getData = async () => {
           try {
             const value = await AsyncStorage.getItem('@user')
             //alert(JSON.stringify(value))
             if (value !== null) {
               var data = JSON.parse(value)
               this.setState({
                 useDetails: data
               })
               const token = await AsyncStorage.getItem('@access_token')
               if (token && data) {
               //    alert("hiii")
                   this.setState({token: JSON.parse(token)})
                     this.getDataquestions(data, JSON.parse(token))
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
       getDataquestions(user,token){

        //alert(token)
        var url =baseUrl+"/user-test/"+this.props.testid

        console.log("urrlll",url)
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': token
            },
          }).then((response) =>
          
           response.json())
            .then((json) => {
            //  alert("jon"+JSON.stringify(json))
             /// const data = json.data;
            
              if (json.data) {
                  const data =  json.data
                   console.log("summary",json.data.questions[0])
                   this.setState({
                    analysis: json.data.analysis,
                    marks:json.data.marks,
                    questionsarray: json.data.questions 
                   })
                  var previousTest =  json.data;
                   if (previousTest && Object.keys(previousTest).length) {
                    let test_result = { ...previousTest }
                    let wrong_ans_count = test_result.questions.filter(
                      q => q.is_correct === false,
                    ).length
                    let correct_ans_count = test_result.questions.filter(
                      q => q.is_correct === true,
                    ).length
                    let lost_count = test_result.questions.filter(
                      q => q.analysis === 'Lost' || q.analysis === null,
                    ).length
                    let extra_count = test_result.questions.filter(
                      q => q.analysis === 'Extra Time',
                    ).length
                    let un_ans_count = test_result.questions.filter(
                      q => q.analysis === 'Un Answered',
                    ).length
                    let lightening_count = test_result.questions.filter(
                      q => q.analysis === 'Lightning Fast',
                    ).length
                    let shot_count = test_result.questions.filter(
                      q => q.analysis === 'What a Timing/ Shot',
                    ).length
                    let extra_inning_count = test_result.questions.filter(
                      q => q.analysis === 'Extra Innings/ Time',
                    ).length
                    test_result.wrong_ans_count = wrong_ans_count
                    test_result.correct_ans_count = correct_ans_count
                    test_result.lost_count = lost_count
                    test_result.extra_count = extra_count
                    test_result.un_ans_count = un_ans_count
                    test_result.lightening_count = lightening_count
                    test_result.shot_count = shot_count
                    test_result.extra_inning_count = extra_inning_count
                    this.setState({
                      testResult: test_result
                    })
                  }
                   var correctarray =[]
                   var wrongarray = []

                   json.data.questions.map((res,i)=>{
                       if(res.correct_answer === res.question.user_answer){
                          correctarray.push(res)
                       }else{
                           wrongarray.push(res)
                       }
                   })

                   this.setState({
                    correctarray: correctarray,
                     wrongarray: wrongarray,
                     spinner: false,
                   })

                   console.log(correctarray)
                    console.log(wrongarray.length)
                //   alert(JSON.stringify(json.data))
                //    this.setState({testloader: false})
                //    Alert.alert(
                //     "Step Up",
                //     json.message,
                //     [
                //       { text: "OK", onPress: () => {
                //         Actions.push('presummary',{index:this.props.index,smartres:this.props.smartres,topicData: this.props.topicData,topicindata:this.props.topicindata,subjectData:this.props.subjectData})
                //       }}
                //     ]
                //   );

              } else {
                this.setState({testloader: false})
                 
                alert(JSON.stringify(json.message))
               
              }
            }
      
            )
            .catch((error) =>  alert("gggg"+error))
       }
    onBack(){
      // alert(JSON.stringify(this.props.topicData))
        Actions.practicechapter({type:"reset",data: this.props.subjectData})
        //Actions.main()
    }

    onViewSolutions(){
      Actions.push('practicesolutions',{testid:this.props.testid,subjectData:this.props.subjectData})
    }

    render() {
        let stars = [];
		// Loop 5 times
        if(!this.state.spinner){
             for(var i = 0 ; i < this.state.correctarray.length ; i++){
                  stars.push((<Image style={{width:157/3.5,height:77/3.5,tintColor:colors.Themecolor,marginTop:10}}
                    source={require('../../assets/images/arrow.png')} />))
             }
                for(var i = 0 ; i < this.state.wrongarray.length ; i++){
                 stars.push((<Image style={{width:157/3.5,height:77/3.5,marginTop:10}} source={require('../../assets/images/arrow_gray.png')} />))
             }
               var percent = (this.state.correctarray.length / this.state.questionsarray.length)*10
        }
        const data = [ 50, 10, 40, 95, 85 ]

        const CUT_OFF = 50
        const Labels = ({  x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <NewText.Text
                    key={ index }
                    x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 14 }
                    fill={ value > CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                >
                    {value}
                </NewText.Text>
            ))
        )
		
        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={this.onBack.bind(this)} >
                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                    </TouchableOpacity>
                    {this.state.spinner ? <View style={{ height:"100%",width:"100%",
                       backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                      <Text>Loading...</Text>
                    </View>:
                <View style={styles.mainsubview}>
                  <ScrollView>
                
                  <View style={{backgroundColor:"white",padding:5,
                        //  shadowOffset: { width: 0, height: 5 },
                        //     shadowOpacity: 1,
                        //     shadowRadius: 5,
                        //     elevation: 10,
                        //     shadowColor: 'lightgrey',
                        marginTop:40,borderRadius: 10,justifyContent:'space-around',marginHorizontal: 20,height:windowWidth/2 }}>
                   
                   <Text style={{textAlign:"left",color:colors.Themecolor,fontSize:15,marginLeft:10}}>Performace</Text>
                        
      
                           <RNSpeedometer
                        size={windowWidth/2}
                        maxValue={this.state.testResult.marks ? this.state.testResult.marks : 20}
                        value={this.state.testResult.score ? this.state.testResult.score : 0}
                        currentValueText="Score-o-meter"
                        needleHeightRatio={0.7}
                        ringWidth={80}
                        needleTransitionDuration={3000}
                        needleTransition="easeElastic"
                        needleColor={'#695077'}
                        segmentColors={['#c54721', '#d88414', '#267093', '#a4b96e']}
                        labels={[
                          {
                            name: 'Poor',
                            labelColor: '#ff5400',
                            activeBarColor: 'orange',
                          },
                          {
                            name: 'Average',
                            labelColor: '#f4ab44',
                            activeBarColor: 'yellow',
                          },
                          {
                            name: 'Fair',
                            labelColor: '#14eb6e',
                            activeBarColor: 'green',
                          },
                          {
                            name: 'Fair',
                            labelColor: '#14eb6e',
                            activeBarColor: 'blue',
                          },
                        ]}/>
                        </View>
                        <View style={{backgroundColor:"white",paddingVertical:10,
                         shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            elevation: 10,
                            shadowColor: 'lightgrey',
                        marginTop:60,borderRadius: 10,justifyContent:'space-around',marginHorizontal: 20,}}>
                   
                   <Text style={{textAlign:"left",color:colors.Themecolor,fontSize:15,marginLeft:10}}>Attempt Analysis</Text>
                   <AttemptAnalysis testResult={this.state.testResult}/>
                   </View>
                        {/* <View style={{backgroundColor:"white",padding:20,
                         shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            elevation: 10,
                            shadowColor: 'lightgrey',
                        marginTop:60,borderRadius: 10,justifyContent:'space-around',marginHorizontal: 20 }}>
                          <View style={{marginHorizontal:5,}}>
                                    <View style={{padding:10,flexDirection:"row",flexWrap:"wrap",}}>
                                    { stars }
                                    </View>
                                </View>
                                <View style={{justifyContent: 'center',alignItems:"center" ,marginVertical:15}}>
                            <ProgressCircle
                                percent={percent}
                                radius={30}
                                borderWidth={5}
                                color={colors.Themecolor}
                                shadowColor="#999"
                                bgColor="white"
                            >
                            <Text style={{ fontSize: 18 }}>{this.state.correctarray.length+'/'+this.state.questionsarray.length }</Text>
                          </ProgressCircle>
                        </View>
                            <View style={{flexDirection:"row",marginHorizontal:30,justifyContent:"space-around"}}>
                                      <View style={{flexDirection:"row",justifyContent:"center"}}>
                                     <Image source={require("../../assets/images/right.png")} style={{width:79/3,height:79/3,marginRight:10}}/>
                                     <Text style={{fontSize:15,alignSelf:"center"}}>{this.state.correctarray.length} Correct</Text></View>
                                     <View style={{flexDirection:"row",justifyContent:"center"}}>
                                     <Image source={require("../../assets/images/wrong.png")} style={{width:79/3,height:79/3,marginRight:10}}/>
                                     <Text style={{fontSize:15,alignSelf:"center"}}>{this.state.wrongarray.length} Wrong</Text></View>
                                    </View>
                        </View> */}

               
                        <View style={{backgroundColor:"white",padding:10,
                         shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            elevation: 10,
                            shadowColor: 'lightgrey',
                        marginTop:40,borderRadius: 10,justifyContent:'space-around',marginHorizontal: 20 }}>
                          <Text
                          style={{textAlign:"left",color:colors.Themecolor,fontSize:15,marginBottom:20,marginLeft:10}}>Score</Text>
                           <BarChartNew questionsarray={this.state.questionsarray}/>
                        </View>

                        <TouchableOpacity onPress={this.onViewSolutions.bind(this)}
                        style={{height:40,width:200,alignSelf:"center",marginVertical:30,paddingHorizontal:20,backgroundColor:colors.Themecolor,justifyContent:"center",alignItems:"center",borderRadius:20}}>
                          <Text style={{color:"white"}}>Review Answers</Text>
                        </TouchableOpacity>
                  </ScrollView>
                  </View>
                 
                    }
            
                <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:18}}>Summary</Text>
                </View>
            </View>
        )
    }
}
export default PracticeSummary