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
    BackHandler,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ProgressCircle from 'react-native-progress-circle'
import SummaryGraph from "../../components/SummaryGraph"
import { Validations } from '../../helpers'
import { colors } from "../../constants"
import { baseUrl,imageUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSpeedometer from 'react-native-speedometer'
import AttemptAnalysis from './AttemptAnalysis'
import TimeSpentChart from '../../components/TimeSpentChart'
import AssessmentComparisonChart from "../../components/AssessmentComparisonChart"

import BarChartNew from './BarChart'
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
class PreSummary extends Component {
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
            testResult:null,
            review: false,
            prepostdata:{},
            loadingspi: true
        }
    }
    componentDidMount() {
         // alert("typeeee"+JSON.stringify(this.props.testtype))
         this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
          if(this.props.review){
            this.setState({
              review: true
            })
          }
           this.getData()
         }
         backAction = () => {
          this.onBack()
        }
        componentWillUnmount() {
            this.backHandler.remove();
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
                     this.getprevspost(data, JSON.parse(token))
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
       getprevspost(user,token){
         console.log("graphhh",baseUrl+"/analytics/student/preVsPost/"+this.props.topicindata.reference_id)
        var url =baseUrl+"/analytics/student/preVsPost/"+this.props.topicindata.reference_id
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
        }).then((response) =>
        
         response.json())
          .then((json) => {
           //alert("jon"+JSON.stringify(json))
           /// const data = json.data;
          
            if (json.data) {
               this.setState({
                 prepostdata: json.data,
                 loadingspi:false
               },()=>console.log("fff",this.state.prepostdata,this.state.loadingspi))
            } else {
              this.setState({prepostdata: {}, loadingspi:false})
               
            //  alert(JSON.stringify(json.message))
             
            }
          }
    
          )
          .catch((error) =>  alert("gggg"+error))
       }
       getDataquestions(user,token){

     //   console.log("this.props.testid",this.props.testid)
        var url =baseUrl+"/user-test/"+this.props.testid

        //console.log("urrlll",url)
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
                  // console.log("summary",json)
                   this.setState({
                   
                    questionsarray: json.data.questions 
                   })
                   var correctarray =[]
                   var wrongarray = []
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
                      q => q.analysis === 'Incorrect' || q.analysis === null,
                    ).length
                    let extra_count = test_result.questions.filter(
                      q => q.analysis === 'Extra Time',
                    ).length
                    let un_ans_count = test_result.questions.filter(
                      q => q.analysis === 'Unanswered ',
                    ).length
                    let lightening_count = test_result.questions.filter(
                      q => q.analysis === 'Fast Answer',
                    ).length
                    let shot_count = test_result.questions.filter(
                      q => q.analysis === 'Normal Answer',
                    ).length
                    let extra_inning_count = test_result.questions.filter(
                      q => q.analysis === 'Slow to Answer',
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
                   json.data.questions.map((res,i)=>{
                     console.log("dddd",res.correct_answer , " ,,",res.user_answer)
                       if(res.correct_answer === res.user_answer){
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
        Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
        //Actions.main()
    }
    onPrevious(){
      var newarray = this.props.smartres;
      var newobj = newarray[this.props.index-1]
      var index= this.props.index
     // alert(JSON.stringify(newobj))
     if(newobj){
      if(newobj.type === 'YOUTUBE'){
        Actions.push('videoview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type ==='VIDEO'){
        Actions.push('normalvideoview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type==='OBJ' || newobj.type === 'POST' || newobj.type === 'SUB'){
        Actions.push('preassesment',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type ==="PDF"){
        Actions.push('pdfview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type ==="WEB"){
        Actions.push('weblinkview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type === 'PRE'){
        Actions.topicmainview({data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
      }else if(newobj.type ==="GAMES"){
        Actions.push('games',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }
     }else{
      Actions.topicmainview({data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
   }
      
    }
    onNext(){
        var newarray = this.props.smartres;
          var newobj = newarray[this.props.index+1]
          var index= this.props.index
          //alert(JSON.stringify(newobj))
        if(newobj){
          if(newobj.type === 'YOUTUBE'){
            Actions.push('videoview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==='VIDEO'){
            Actions.push('normalvideoview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type === "PRE" || newobj.type==='OBJ' || newobj.type === 'POST' || newobj.type === 'SUB'){
            Actions.push('preassesment',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="PDF"){
            Actions.push('pdfview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="WEB"){
            Actions.push('weblinkview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="GAMES"){
            Actions.push('games',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }
         }else{
            Actions.topicmainview({data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
         }
    }
    onViewSolutions(){
      Actions.push('presolutions',{testid:this.props.testid,data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
    }
    render() {
      const { topicindata } = this.props;
    
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
		
        return (
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
             
                <Text style={{ color: "white", fontSize: 18,marginLeft:10}}>{
                this.props.testtype === "POST" ? "Post-Test Analysis" : this.props.testtype === "PRE" ? "Pre-Test Analysis" : "Summary"}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View>
                <View style={{flex : this.state.review ?  0.9  :0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
                {this.state.spinner ? <View style={{ height:"100%",width:"100%",
                       backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                      <Text>Loading...</Text>
                    </View>:
                <View style={styles.mainsubview}>
                 
                    <View style={{flex:1}}>
                    <ScrollView>
                    <View style={{backgroundColor:"white",padding:5,
                        //  shadowOffset: { width: 0, height: 5 },
                        //     shadowOpacity: 1,
                        //     shadowRadius: 5,
                        //     elevation: 10,
                        //     shadowColor: 'lightgrey',
                        marginTop:20,
                        borderRadius: 10,justifyContent:'space-around',marginHorizontal: 20,height:windowWidth/2 }}>
                   
                   <Text style={{textAlign:"left",fontSize:16,marginLeft:10}}>Performace</Text>
                        
      
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
                        
                        labelNoteStyle={{fontSize:20}}
                        labels={[
                          {
                            name: 'Poor',
                            labelColor: '#c54721',
                          
                            activeBarColor: '#c54721',
                          },
                          {
                            name: 'Average',
                            labelColor: '#d88414',
                            activeBarColor: '#d88414',
                          },
                          {
                            name: 'Fair',
                            labelColor: '#267093',
                            activeBarColor: '#267093',
                          },
                          {
                            name: 'Fair',
                            labelColor: '#a4b96e',
                            activeBarColor: '#a4b96e',
                          },
                        ]}/>
                        </View>
                    {/* <View style={{
                         shadowOffset: { width: 0, height: 5 },paddingVertical:20,
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            borderColor:"lightgrey",borderWidth:0.5,
                            shadowColor: 'lightgrey',
                        marginTop:60,borderRadius: 10,
                        backgroundColor: 'white',justifyContent:'space-around',marginHorizontal: 20, }}>
                          <Text style={{textAlign:"left",color:colors.Themecolor,fontSize:15,marginLeft:10}}>Attempt Analysis</Text>
                                <View style={{padding:5,marginHorizontal:30,}}>
                                    <View style={{padding:10,flexDirection:"row",flexWrap:"wrap"}}>
                                    { stars }
                                    </View>
                                </View>
                          <View style={{justifyContent: 'center',alignItems:"center" ,paddingVertical:20}}>
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
                                <View style={{backgroundColor:"white",paddingVertical:10,
                                shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 1,
                                    shadowRadius: 5,
                                    elevation: 10,
                                    shadowColor: 'lightgrey',
                                marginTop:60,borderRadius: 10,justifyContent:'space-around',marginHorizontal: 20,}}>
                          
                          <Text style={{textAlign:"left",fontSize:16,marginLeft:10}}>Attempt Analysis</Text>
                          <AttemptAnalysis testResult={this.state.testResult}/>
                          </View>
                            <View style={{marginVertical:20}}>
                                    
                               {/* <BarChartNew questionsarray={this.state.questionsarray}/> */}
                               <TimeSpentChart testResult={this.state.testResult} />
                            
                            </View>
                             {this.props.testtype === "POST" ? 
                             !this.state.loadingspi ? 
                            <AssessmentComparisonChart topicPreVsPostData={this.state.prepostdata} /> : null
                            :null}
                            {this.props.testtype === "PRE" ? null :
                            <TouchableOpacity onPress={this.onViewSolutions.bind(this)}
                        style={{height:40,width:200,alignSelf:"center",marginVertical:30,paddingHorizontal:20,backgroundColor:topicindata.color,justifyContent:"center",alignItems:"center",borderRadius:20}}>
                          <Text style={{color:"white"}}>Review Answers</Text>
                        </TouchableOpacity> }
                            </ScrollView>
                    </View>
                 
                    
                </View>}
                </View>
                {this.state.review ?  null  : 
                <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
                
                <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
              justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
                   <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Previous Activity</Text>
                       </TouchableOpacity>
             
                       <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
              justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
                   <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Next Activity</Text>
                       </TouchableOpacity>
  
                </View> }
              </View>
            </ImageBackground>
        )
    }
}
export default PreSummary