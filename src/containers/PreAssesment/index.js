import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    Alert,
    Image,
    Keyboard,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';
import DOMParser from 'react-native-html-parser';
import HtmlText from 'react-native-html-to-text';
import { colors } from "../../constants"

class PreAssesment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: null,
            previousItem: null,
            isvisible: false,
            finalarray: [],
            answerobj: {},
            useDetails: null,
            questiosnarray: [],
            timeup:false,
            spinner: true,
            questionno: 0,
            seconds: 300, secondstime: 300, testid: "", token: "", testloader: false,
              analyticsData:{},
            token:""
        }
    }
    componentDidMount() {

        this.getData()
        this.starttimer()
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

                    this.setState({ token: JSON.parse(token) })
                      this.getanalytics(data,JSON.parse(token))
                    this.onAssesment()

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
     removeHtmlTags = value => {
        // let sourceHTML = value.getElementsByTagName("p");
        // sourceHTML = sourceHTML.replace(/<--!(?:.|\n)*?-->/gm, '');
        // console.log("ddddd",sourceHTML);
        
    //     const parser = new DOMParser.DOMParser();
    //     const parsed = parser.parseFromString(value, 'text/html');
    //     console.log(parsed.getElementsByAttribute('tagName', 'p'));
        
    //    console.log("dddddd",JSON.parse(parsed))
        return value
      }
    getanalytics(user,token){
        var type;
        if(this.props.data.type === "PRE"){
            type = "MyCourse_preassessment"
        }else if(this.props.data.type === 'POST'){
            type = "MyCourse_postassessment"
        }else if(this.props.data.type === 'OBJ'){
            type= "MyCourse_objassessment"
        }else{
            type = "MyCourse_subjectiveAssessment"
        }
        var body={
          user_id: user.reference_id,
          board_id: user.grade ? user.grade.board_id : null,
          grade_id:   user.grade ? user.grade.reference_id : null,
          section_id: user.section? user.section.reference_id : null,
          school_id: user.school ? user.school.reference_id :null,
          branch_id : user.grade ? user.grade.branch_id : null,
          page:type,
          type:"mobile",
          subject_id:this.props.subjectData.reference_id,
          chapter_id:this.props.topicData.reference_id,
          topic_id:this.props.topicindata.reference_id,
          activity_id:this.props.data.reference_id,
        }
          
        console.log("analyticsss",body)
        var url = baseUrl+'/analytics'
        console.log("value",url)
         fetch(url ,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token
            },
            body:JSON.stringify(body)
            }).then((response) =>
            
             response.json())
            .then((json) =>{
              
              if(json.data){
                const data = json.data;
              //   alert(JSON.stringify(json));
                 this.setState({
                   analyticsData: data
                 })
                //  Snackbar.show({
                // text: json.message,
                // duration: Snackbar.LENGTH_SHORT,
                // });
              }else{
                console.log(JSON.stringify(json.message))
              }
            }
             
            )
            .catch((error) => console.error(error))
      }
      updateAnalytics(){
        //alert(this.state.analyticsData.reference_id)
        var url = baseUrl+'/analytics/'+this.state.analyticsData.reference_id
        fetch(url ,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'token': this.state.token
          },
          }).then((response) =>
          
           response.json())
          .then((json) =>{
            
            if(json.data){
              const data = json.data;
            //   alert(JSON.stringify(json));
               this.setState({
                 analyticsData: data
               })
            //    Snackbar.show({
            // 	text: "Analytics Updated succesfully",
            // 	duration: Snackbar.LENGTH_SHORT,
            //   });
            }else{
              console.log(JSON.stringify(json.message))
            }
          }
           
          )
          .catch((error) => console.error(error))
        }
    onAssesment() {
        var url = baseUrl + "/user-test/assigned-activity/" + this.props.data.reference_id

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) => response.json())
            .then((json) => {


                if (json.data) {
                    const data = json.data;
                  //  alert("dff"+JSON.stringify(data))
                    console.log("total_count",data.total_count)
                    if(this.props.data.type === "PRE"){
                        if (json.data.total_count > 0) {
                            this.setState({
                                spinner: false
                            })
                            Alert.alert(
                                "Step Up",
                                "Sorry you have reached your maximum number of attempts in this assesment",
                                [
                                    {
                                        text: "OK", onPress: () => {
                                            this.ongoback()
                                        }
                                    }
                                ]
                            );
                        } else {
                            this.setState({
                                spinner: false
                            })
                            this.getQuestions()
    
                        }
                    }else if(this.props.data.type === 'POST'){
                        //alert("hiii"+json.data.total_count)
                        if(json.data.total_count == 1){
                            //alert("hiii")
                            Alert.alert(
                                "Step Up",
                                "You have alredy attempted one time Do you want to start a new test or review previous test ? ",
                                [
                                    {
                                        text: "Cancel", onPress: () => {
                                            this.ongoback()
                                        }
                                    },
                                    {
                                        text: "New Test", onPress: () => {
                                            this.getQuestions()
                                        }
                                    },{
                                        text: "Review Previous Test", onPress: () => {
                                            Actions.push('reviewpostsummary',{ from :this.props.from,activityid: this.props.data.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                                        }
                                    },

                                ]
                            );
                        }
                        else if (json.data.total_count >= 2) {
                            this.setState({
                                spinner: false
                            })
                            Alert.alert(
                                "Step Up",
                                "Sorry you have reached your maximum number of attempts in this assesment",
                                [
                                    {
                                        text: "OK", onPress: () => {
                                            this.ongoback()
                                        }
                                    },{
                                        text: "Review Previous Test", onPress: () => {
                                            Actions.push('reviewpostsummary',{ activityid: this.props.data.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData,from:this.props.from })
                                        }
                                    }
                                ]
                            );
                        } else {
                            this.setState({
                                spinner: false
                            })
                            this.getQuestions()
                           
    
                        }
                    }else if(this.props.data.type === 'OBJ'){
                        this.getQuestions()
                        // Alert.alert(
                        //     "Step Up",
                        //     "",
                        //     [
                        //         {
                        //             text: "Take New Test", onPress: () => {
                        //                 this.getQuestions()
                        //             }
                        //         },{
                        //             text: "Review Previous Test", onPress: () => {
                        //                 Actions.push('practicereview',{ activityid: this.props.data.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                        //             }
                        //         }
                        //     ]
                        // );
                        
                    }else{
                        this.getQuestions()
                    }
                    

                } else {
                    alert(JSON.stringify(json.message))

                }
            }

            )
            .catch((error) => console.error(error))
    }
    getQuestions() {
        // alert("hi"+ JSON.stringify(this.props.data))
        // alert("sdsds"+this.props.data.reference_id)
        const body = {
            test_type: "Topic",
            assignedactivityId: this.props.data.reference_id,

        }
        var url = baseUrl + "/user-test"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
            body: JSON.stringify(body)
        }).then((response) =>
            response.json())
            .then((json) => {

                if (json.data) {
                    const data = json.data
                    console.log("sdsd", json.data)
                    this.setState({
                        testid: data.reference_id,
                        questiosnarray: data.questions,
                        selectedItem: data.questions[0],
                        questionno: 0,
                        spinner: false
                    })


                } else {
                    this.setState({
                        questiosnarray: [],
                        selectedItem: null,
                        questionno: 0,
                        spinner: false
                    })
                    alert(JSON.stringify(json.message))

                }
            }

            )
            .catch((error) => alert("gggg" + error))
    }
    starttimer() {
        var interval = setInterval(() => {
 //  console.log(this.state.seconds)
        if(this.state.seconds === 0){
            clearInterval(interval);
            this.setState({
                timeup:true
            },()=>{
                this.setState({
                    isvisible: true
                })
            })
        }
            this.setState({ seconds: this.state.seconds - 1 })
        }, 1000)
    }
    renderItem({ item, index }) {
        let viewstyle;
        let textstyle;
        if (this.state.selectedItem === item) {
            viewstyle = styles.circlefilled;
            textstyle = styles.circletext
        } else {
            viewstyle = styles.borderfilled;
            textstyle = styles.bordertext
        }
        return (
            <TouchableOpacity
            onPress={this.onItem.bind(this,item,index)}
                style={viewstyle}>
                <Text style={textstyle} >{index+1}</Text>
            </TouchableOpacity>
        )
    }
    onItem(item,index) {
      //  alert(index)
        this.setState({
            questionno: index ,
            answerobj: {},
        }, () => {
            var nextItem = this.state.questiosnarray[index];
            this.setState({
                selectedItem: nextItem,

            }, () => {
                this.state.finalarray.map((res,i)=>{
                   
                    if(res.question === this.state.selectedItem.reference_id){
                       //alert("Hiiii")
                        // console.log("ffff",res.question ,  "  ", this.state.selectedItem.reference_id)
                        this.setState({
                            answerobj : res
                        })
                    }
                })
            }
            
            )
        })
    }
    onNext() {
        this.setState({
            questionno: this.state.questionno + 1
        }, () => {
            var nextItem = this.state.questiosnarray[this.state.questionno];
            this.setState({
                selectedItem: nextItem,

            })
        })
    }
    onPrevious() {
        var item = this.state.selectedItem;
        var questionno = item.questionno;
        //alert(questionno)
        var prenumber = questionno - 1
        var preItem = data[prenumber - 1];
        this.setState({
            selectedItem: preItem
        })
    }

    onSubmit() {
        this.setState({
            isvisible: false
        }, () => {
            var url = baseUrl + "/user-test/" + this.state.testid
            console.log("finalarr", this.state.finalarray)
            var body = { questions: this.state.finalarray }
            this.setState({ testloader: true })
            console.log("cmnvlksd", url)
            console.log("cmnvlksd", body)
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': this.state.token
                },
                body: JSON.stringify(body)
            }).then((response) =>

                response.json())
                .then((json) => {
                    // alert("jon"+JSON.stringify(json))
                    /// const data = json.data;

                    if (json.data) {
                        const data = json.data
                        console.log("sdsd", json)
                        this.setState({ testloader: false })
                        Alert.alert(
                            "Step Up",
                            json.message,
                            [
                                {
                                    text: "OK", onPress: () => {
                                        this.updateAnalytics()
                                        Actions.push('presummary', {from:this.props.from, testid: this.state.testid, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                                    }
                                }
                            ]
                        );

                    } else {
                        this.setState({ testloader: false })

                        alert(JSON.stringify(json.message))

                    }
                }

                )
                .catch((error) => alert("gggg" + error))

            // this.setState({
            //     isvisible: true
            // })
        })
    }
    onCancel() {
        this.setState({
            isvisible: false
        })
    }
    onsubmitmodal() {
        //alert(JSON.stringify(this.props.topicData))
        this.setState({
            isvisible: false
        }, () => {
            console.log("final", this.state.finalarray)
            Actions.push('presummary', { testid: this.state.testid, topicData: this.props.topicData, subjectData: this.props.subjectData, index: this.props.index, smartres: this.props.smartres })
        })
    }
    ongoback() {
        this.updateAnalytics()
        Actions.topicmainview({from:this.props.from, type:"reset",data: this.props.topicindata, topicsdata: this.props.topicData, screen: "summary", subjectData: this.props.subjectData })
    }
    onAnswer(res) {
        //alert(JSON.stringify( this.state.selectedItem))
        var answerkey = res.key;
        var questionId = this.state.selectedItem.reference_id
        var timecount = this.state.seconds;
        console.log(this.state.secondstime - timecount)
        var timess = this.state.secondstime - timecount
        var obj = {
            "question": questionId,
            "user_answer": answerkey,
            "test_taken_time": timess
        }
        //console.log("slkd", obj)
       // if(this.state.finalarray)
        this.state.finalarray.map((res,i)=>{
            if(res.question === this.state.selectedItem.reference_id){
                this.state.finalarray.splice(i,1)
            }else{
               
            }
        })
        this.state.finalarray.push(obj);
        
        this.setState({

            secondstime: timecount

        })
        //  alert("dfd"+this.state.questionno + this.state.questiosnarray.length)
        if (this.state.questionno + 1 === this.state.questiosnarray.length) {
            // alert("dfd")
            this.setState({
                isvisible: true
            })
            //this.onSubmit()
        } else {
            this.setState({
                questionno: this.state.questionno + 1
            }, () => {
                var nextItem = this.state.questiosnarray[this.state.questionno];
                this.setState({
                    selectedItem: nextItem,
                   // answerobj : {}

                }, () => this.state.finalarray.map((res,i)=>{
                   
                    if(res.question === this.state.selectedItem.reference_id){
                       
                        // console.log("ffff",res.question ,  "  ", this.state.selectedItem.reference_id)
                        this.setState({
                            answerobj : res
                        },()=>
                        {this.state.answerobj = res;
                       // alert("Hiiii"+JSON.stringify(this.state.answerobj))
                    })
                    }else{
                        this.setState({
                            answerobj:{}
                        })
                    }
                }))
            })
        }


        // var question = this.state.selectedItem;
        // var answer = res;

        // var answerid = res.answerid
        // var questionno = this.state.selectedItem.questionno;
        // var question = this.state.selectedItem.question;
        // var correctanswer = this.state.selectedItem.correctanswer;
        // var result;
        // if(answerid === correctanswer){
        //     result = true;
        // }else{
        //     result = false
        // }
        // var obj = {

        //     questionno,
        //     question,
        //     answerid,
        //     correctanswer,
        //     result
        // }
        // this.setState({
        //     answerobj : obj
        // },()=>console.log("dddd",this.state.answerobj))
        // //finalarray.push(obj);
    }

    render() {
        return (
            this.state.spinner ?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
               <Text>Loading...</Text>
            </View> :

                <View style={styles.mainview}>
                    <View style={styles.topview}>
                        <Text style={styles.toptext}>{this.props.data.activity}</Text>
                    </View>
                    {this.state.questiosnarray.length > 0 ?
                        <View style={{ flex: 1, backgroundColor: "green" }}>
                            <View style={styles.mainbottomview}>
                                <View style={styles.mainshadowview}>
                                    <View style={styles.headerview}>
                                        <View style={styles.headerleftview}>
                                            <Text style={styles.headtext}>{this.props.data.name}</Text>
                                        </View>
                                        <View style={styles.headrightview}>
                                            <View style={styles.timerview}>
                                                <Image source={require('../../assets/images/timer.png')} style={{ width: 25, height: 25, alignSelf: "center", marginRight: 10 }} />
                                                <Text style={styles.timertext}>{parseInt(this.state.seconds / 60, 10)}:{parseInt(this.state.seconds % 60, 10)}</Text>

                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.listview}>
                                        <ScrollView
                                            contentInsetAdjustmentBehavior="automatic"
                                            keyboardShouldPersistTaps={'handled'}
                                        >
                                            <View style={styles.circlesview}>
                                                <FlatList data={this.state.questiosnarray}
                                                    keyExtractor={(item, index) => String(index)}
                                                    renderItem={this.renderItem.bind(this)}
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false} />
                                            </View>
                                            <View style={styles.questionsview}>
                                                <View style={styles.questioninnerview}>
                                                    <Text style={styles.questionnum}>{this.state.questionno+1}. </Text>
                                                    {/* <HtmlText style={styles.questiontext} html={this.state.selectedItem.question.question}></HtmlText> */}

                                                    <Text style={styles.questiontext}>{this.state.selectedItem.question.question.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                                                </View>
                                                {this.state.selectedItem.question.options.map((res, i) =>
                                                    <View style={styles.answermain}>
                                                        <View style={styles.answersub}>
                                                            <Text style={styles.answernum}>{i+1}. </Text>
                                                            <TouchableOpacity onPress={this.onAnswer.bind(this, res)}
                                                                style={[styles.answertextview, { borderColor: this.state.answerobj.user_answer === res.key ? colors.Themecolor : "lightgrey", }]}>
                                                                    {/* <HtmlText style={styles.answertext} html={res.value}></HtmlText> */}
                                                                <Text style={styles.answertext}>{res.value.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )}

                                            </View></ScrollView>
                                    </View>
                                </View>
                            </View>

                        </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text>No data</Text>
                            <TouchableOpacity onPress={this.ongoback.bind(this)}>
                                <Text>GO BACK</Text>
                            </TouchableOpacity>
                        </View>}
                    <Modal isVisible={this.state.isvisible}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
                                <Image source={require("../../assets/images/finger.png")} style={{ width: 96 / 1.5, height: 96 / 1.5, alignSelf: 'center' }} />
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{this.state.timeup ? "Time up! Please submit your assessment" : "Are you sure you want to submit assesment?"}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>
                                    <TouchableOpacity onPress={this.onSubmit.bind(this)} >
                                        <LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                            <Text style={{ color: "white" }}>SUBMIT</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onCancel.bind(this)}>
                                        <LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                            <Text style={{ color: "white" }}>CANCEL</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                   
                    {this.state.testloader ?
                        <View style={{ width: "100%", height: "100%", backgroundColor: "transparent", position: "absolute", justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color="black" />
                        </View>
                        : null
                    }
                </View>
        )
    }
}

export default PreAssesment;