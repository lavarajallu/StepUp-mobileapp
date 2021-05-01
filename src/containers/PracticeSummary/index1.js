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
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import RNSpeedometer from 'react-native-speedometer'
import { Validations } from '../../helpers'
import { colors,Strings } from "../../constants"
const data =Strings.data
import Pie from 'react-native-pie'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../../constants"

const labels =[
   {
     name: 'Very Bad',
     labelColor: '#ff2900',
     activeBarColor: 'red',
   },
   {
     name: 'Bad',
     labelColor: '#ff5400',
     activeBarColor: 'orange',
   },
   {
     name: 'Normal',
     labelColor: '#f4ab44',
     activeBarColor: 'yellow',
   },
   {
     name: 'Good',
     labelColor: '#f2cf1f',
     activeBarColor: 'lightgreen',
   },
   {
     name: 'Excellent',
     labelColor: '#14eb6e',
     activeBarColor: 'green',
   },
 ]
class PracticeSummary extends Component {
    constructor(props) {
        super(props);
        this.state={
            numberofques: 5,
            correctanswer:3,
            wronganswer:2,
            useDetails:{},
            questionsarray:[]

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
      var url =baseUrl+"/user-test/"+"a8313b6d-170f-4a72-83e5-5786b24f3245"

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
               console.log("summary",JSON.stringify(json.data.questions))
                 this.setState({
                 
                  questionsarray: json.data.questions 
                 })
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
              this.setState({testloader: fasle})
               
              alert(JSON.stringify(json.message))
             
            }
          }
    
          )
          .catch((error) =>  alert("gggg"+error))
     }
   onSolution(){
    Actions.push('practicesolutions')
   }
   onNext(){
    Actions.push('topicmainview')
   }
   onBack(){
    Actions.practicechapter()
   }
    render() {
        let stars = [];
        // Loop 5 times
        for (var i = 1; i <= 5; i++) {
            // Set the path to filled stars
            let path = require('../../assets/images/arrow.png');
            // If ratings is lower, set the path to unfilled stars
            if (i > this.state.correctanswer) {
                path = require('../../assets/images/arrow_gray.png');
            }
            // Push the Image tag in the stars array
            stars.push((<Image style={{width:157/3.5,height:77/3.5,}} source={path} />));
            var percent = (this.state.correctanswer / this.state.numberofques)*100
        }
        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                    </TouchableOpacity>
                  <Text style={{marginLeft:20,marginBottom:20,fontSize:20}}>Summary</Text>
                <View style={styles.mainsubview}>
                  <ScrollView>
                     <View style={styles.maininside}>
                       
                       <View style={styles.boxview}>
                       <View style={{marginTop:20}}>
                       <RNSpeedometer
                       labels= {labels}
                        value={50} size={200}/></View>
                       <TouchableOpacity onPress={this.onSolution.bind(this)} style={[styles.viewsolution,{marginTop:70}]}>
                       <Text style={styles.viewsolutiontext}>View Solutions</Text>
                       </TouchableOpacity>
                       </View>
                       <View style={styles.absview}>
                       <Text style={styles.viewsolutiontext}>Performace</Text>
                       </View>
                       


                       <View style={styles.boxview}>
                       <View style={{marginTop:40,paddingBottom:20,flexDirection:"row",justifyContent:"space-around"}}>
                         <Pie
                              radius={80}
                              sections={[
                                {
                                  percentage: 10,
                                  color: '#d5a720',
                                },
                                {
                                  percentage: 20,
                                  color: '#fe6625',
                                },
                                {
                                  percentage: 30,
                                  color: '#2aaffc',
                                },
                                {
                                  percentage: 40,
                                  color: '#2c9167',
                                },
                              ]}
                              strokeCap={'butt'}
                            />
                            <View style={{justifyContent:"space-around"}}>
                            <View style={{flexDirection:"row",justifyContent:"center",}}>
                            <View style={{height:20,width:20,borderRadius: 10,backgroundColor: '#d5a720',marginRight:10}}/>
                            <Text style={{fontSize:15}}>Lightening Fast</Text>
                            </View>
                           <View style={{flexDirection:"row",alignItems:"center",}}>
                            <View style={{height:20,width:20,borderRadius: 10,backgroundColor: '#2c9167',marginRight:10}}/>
                            <Text style={{fontSize:15}}>Perfect</Text>
                            </View>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{height:20,width:20,borderRadius: 10,backgroundColor: '#2aaffc',marginRight:10}}/>
                            <Text style={{fontSize:15}}>Slow Going</Text>
                            </View>
                            <View style={{flexDirection:"row",alignItems:"center",}}>
                            <View style={{height:20,width:20,borderRadius: 10,backgroundColor: '#fe6625',marginRight:10}}/>
                            <Text style={{fontSize:15}}>Incorrect</Text>
                            </View>
                            </View>
                       </View>
                       </View>
                       <View style={styles.absview2}>
                       <Text style={styles.viewsolutiontext}>Score</Text>
                       </View>
                       

                       <View style={styles.boxview}>
                       <View style={{marginTop:40}}>
                       {data.map((res,i)=>

                        <View style={{marginVertical: 10,flexDirection:"row",justifyContent:"space-around"}}>
                        <Text>Q{res.questionno}</Text>
                        <View 
                        style={{height:30,alignItems:"center",
                        backgroundColor: res.time === 0 ? '#fde9d0':'lightgreen',borderRadius: 20,width:windowWidth/1.4,flexDirection:"row"}}>

                        <View style={{flex:0.9,justifyContent: 'center',alignItems:"center" }}>
                        
                        
                         {Platform.OS === 'android' ? 
                                         <ProgressBar
                                         width={windowWidth/1.7}
                                              color={res.time === 0 ? "#fe742b" : "#37a157"}
                                              styleAttr="Horizontal"
                                              indeterminate={false}
                                              progress={0.5}
                                            />
                                         :
                                    <ProgressView
                                              progressTintColor="orange"
                                              trackTintColor="blue"
                                              progress={0.7}
                                    />}
                        </View>
                        <View style={{flex:0.1,}}>
                        <Text>{res.time}s</Text>
                        </View>

                        </View>
                        </View>

                        )}
                      </View>
                       
                       </View>
                       <View style={styles.absview3}>
                                          <Text style={styles.viewsolutiontext}>Statistics</Text>
                                          </View>

                     </View>
                     </ScrollView>
                </View>
                <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:20}}>Summary</Text>
                </View>
               
            </View>
        )
    }
}
export default PracticeSummary