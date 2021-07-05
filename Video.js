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
import MathJax from 'react-native-mathjax';

import { baseUrl, imageUrl } from "./src/constants"
import Snackbar from 'react-native-snackbar';
import DOMParser from 'react-native-html-parser';
import HtmlText from 'react-native-html-to-text';
import { colors } from "./src/constants"
var alphabetarray = ["A","B","c","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var interval;
class PreAssesment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: null,
            previousItem: null,
            isvisible: false,
            finalarray: [],
            answerobj: {},
            selectedAnswerObj:{},
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
        this.getQuestions()
        //this.getData()
        
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

                    // this.setState({ token: JSON.parse(token) })
                    //   this.getanalytics(data,JSON.parse(token))
                    this.getQuestions()
                    

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
      getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
      )
    scrollToIndex = (index) => {
        let randomIndex = index;
        this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
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
                            // this.setState({
                            //     spinner: false
                            // })
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
                                            Actions.push('reviewpostsummary',{ type:"reset",testtype:this.props.data.type, from :this.props.from,activityid: this.props.data.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                                        }
                                    },
                                ]
                            );
                        } else {
                            this.starttimer()
                            // this.setState({
                            //     spinner: false
                            // })
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
                                            this.starttimer()
                                            this.getQuestions()
                                        }
                                    },{
                                        text: "Review Previous Test", onPress: () => {
                                            Actions.push('reviewpostsummary',{ type:"reset",testtype:this.props.data.type,from :this.props.from,activityid: this.props.data.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                                        }
                                    },

                                ]
                            );
                        }
                        else if (json.data.total_count >= 2) {
                            // this.setState({
                            //     spinner: false
                            // })
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
                                            Actions.push('reviewpostsummary',{ type:"reset", testtype:this.props.data.type,activityid: this.props.data.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData,from:this.props.from })
                                        }
                                    }
                                ]
                            );
                        } else {
                            this.starttimer()
                            // this.setState({
                            //     spinner: false
                            // })
                            this.getQuestions()
                           
    
                        }
                    }else if(this.props.data.type === 'OBJ'){
                        this.starttimer()
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
                        this.starttimer()
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
        var data = {
            questions: [{
                created_by: '-1',
                is_deleted: false,
                id: 0,
                tenant_id: 0,
                reference_id: '68498b9b-f66c-4881-848b-e36a787f3cf9',
                marks: 1,
                assigned_time: 30,
                question: {
                    created_by: '-1',
                    is_deleted: false,
                    id: 0,
                    tenant_id: 0,
                    question: '<p>Each pair of figures is similar. Find the missing side?</p>\n\n<p><img alt="" src="https://stepup-india.s3.ap-south-1.amazonaws.com/image/stepuplive-images/20190310041509827.PNG" style="width:30%" /></p>\n',
                    timeinsec: null,
                    options: [{
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '1',
                            value: '<p>110</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '2',
                            value: '<p>90</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '3',
                            value: '<p>99</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '4',
                            value: '<p>109</p>\n'
                        }
                    ]
                }
            },
            {
                created_by: '-1',
                is_deleted: false,
                id: 0,
                tenant_id: 0,
                reference_id: 'dccf5cbd-c786-4d55-b14b-4692b49c7e06',
                marks: 1,
                assigned_time: 30,
                question: {
                    created_by: '-1',
                    is_deleted: false,
                    id: 0,
                    tenant_id: 0,
                    question: '<p>Each pair of figures is similar. Find the missing side?</p>\n\n<p><img alt="" src="https://stepup-india.s3.ap-south-1.amazonaws.com/image/stepuplive-images/20200131100903717.png" style="width:30%" /></p>\n',
                    timeinsec: null,
                    options: [{
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '1',
                            value: '<p>5</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '2',
                            value: '<p>3</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '3',
                            value: '<p>1</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '4',
                            value: '<p>2</p>\n'
                        }
                    ]
                }
            },
            {
                created_by: '-1',
                is_deleted: false,
                id: 0,
                tenant_id: 0,
                reference_id: '72a4cbe2-2bff-4798-bae8-38749493c7bd',
                marks: 1,
                assigned_time: 30,
                question: {
                    created_by: '-1',
                    is_deleted: false,
                    id: 0,
                    tenant_id: 0,
                    question: '<p>Each pair of figures is similar. Find the missing side?</p>\n\n<p><img alt="" src="https://stepup-india.s3.ap-south-1.amazonaws.com/image/stepuplive-images/20190310035235365.PNG" style="width:30%" /></p>\n',
                    timeinsec: null,
                    options: [{
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '1',
                            value: '<p>5</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '2',
                            value: '<p>6</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '3',
                            value: '<p>3</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '4',
                            value: '<p>9</p>\n'
                        }
                    ]
                }
            },
            {
                created_by: '-1',
                is_deleted: false,
                id: 0,
                tenant_id: 0,
                reference_id: '15242c40-bfff-460e-8983-b31d15ff6696',
                marks: 1,
                assigned_time: 30,
                question: {
                    created_by: '-1',
                    is_deleted: false,
                    id: 0,
                    tenant_id: 0,
                    question: '<p>Each pair of figures is similar. Find the missing side?</p>\n\n<p><img alt="" src="https://stepup-india.s3.ap-south-1.amazonaws.com/image/stepuplive-images/20190310040452598.PNG" style="width:30%" /></p>\n',
                    timeinsec: null,
                    options: [{
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '1',
                            value: '<p>8</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '2',
                            value: '<p>9</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '3',
                            value: '<p>10</p>\n'
                        },
                        {
                            created_by: '-1',
                            is_deleted: false,
                            id: 0,
                            tenant_id: 0,
                            key: '4',
                            value: '<p>6</p>\n'
                        }
                    ]
                }
            }]
        }
        this.setState({
            questiosnarray: data.questions,
            selectedItem: data.questions[0],
            questionno: 0,
            spinner: false
        })
  


    }
    starttimer() {
     interval = setInterval(() => {
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
        const {topicindata } = this.props;
        let viewstyle;
        let textstyle;
        if (this.state.selectedItem === item) {
            viewstyle = [styles.circlefilled,{backgroundColor:"red",borderColor:"red"}];
            textstyle = styles.circletext
        } else {
            viewstyle = [styles.borderfilled,{borderColor: "red"}];
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
        this.scrollToIndex(this.state.questionno)
     //   alert(JSON.stringify(this.state.answerobj))
        if(Object.keys(this.state.answerobj).length === 0){
            alert("please select option")
        }else{
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
                            })
                        }else{
                            this.setState({
                                answerobj:{}
                            })
                        }
                    }))
            })
        }
       
    }
    onPrevious() {
        this.setState({
            questionno: this.state.questionno - 1
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
                        })
                    }else{
                        this.setState({
                            answerobj:{}
                        })
                    }
                }))
        })
    }

    onSubmit() {
        clearInterval(interval);
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
                        this.updateAnalytics()
                                        Actions.push('presummary', {type:"reset",testtype:this.props.data.type,from:this.props.from, testid: this.state.testid, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                        // Alert.alert(
                        //     "Step Up",
                        //     json.message,
                        //     [
                        //         {
                        //             text: "OK", onPress: () => {
                        //                 this.updateAnalytics()
                        //                 Actions.push('presummary', {from:this.props.from, testid: this.state.testid, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData })
                        //             }
                        //         }
                        //     ]
                        // );

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
    onSubmitText() {
        //alert(JSON.stringify(this.props.topicData))
        this.setState({
            isvisible: true
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
      
            this.setState({
             //   questionno: this.state.questionno + 1,
                answerobj : obj 
            }, () => {
                // var nextItem = this.state.questiosnarray[this.state.questionno];
                // this.setState({
                //     selectedItem: nextItem,
                //    // answerobj : {}

                // }, () => this.state.finalarray.map((res,i)=>{
                   
                //     if(res.question === this.state.selectedItem.reference_id){
                       
                //         // console.log("ffff",res.question ,  "  ", this.state.selectedItem.reference_id)
                //         this.setState({
                //             answerobj : res
                //         },()=>
                //         {this.state.answerobj = res;
                //        // alert("Hiiii"+JSON.stringify(this.state.answerobj))
                //     })
                //     }else{
                //         this.setState({
                //             answerobj:{}
                //         })
                //     }
                // }))
            })
            this.scrollToIndex(this.state.questionno)
        


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

    rednerAnswerItem ({item,index}) {
        const  {  topicindata } = this.props
       return(
         
    //     <View style={styles.answermain}>
    //     <View style={styles.answersub}>
    //         <Text style={styles.answernum}>{alphabetarray[index]}. </Text>
    //         <TouchableOpacity onPress={this.onAnswer.bind(this, item)}
    //             style={[styles.answertextview, { backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "white",borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey" }]}>
    //                 {/* <HtmlText style={styles.answertext} html={res.value}></HtmlText> */}
    //             <Text style={[styles.answertext,{color: this.state.answerobj.user_answer === item.key ? "white" : 'black'}]}>{item.value}</Text>
    //         </TouchableOpacity>
    //     </View>
    // </View>
    <TouchableOpacity style={{ flexDirection: 'row', marginTop:index > 0 ? 10: 0}} onPress={this.onAnswer.bind(this, item)}>
    <Text style={{ marginTop: 8, alignSelf: 'center' ,marginLeft:10}}>{alphabetarray[index]}. </Text>
    <View style={{width: '80%',
        borderWidth: 2,
        borderRadius:10,
        borderColor: this.state.answerobj.user_answer === item.key ? "red" : "lightgrey",
        marginLeft:10,
        justifyContent:"center",
        alignSelf: 'flex-start',}}>
    <MathJax
        // To set the font size change initial-scale=0.8 from MathJax class
        style={{ //backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
        width: '80%',
        // borderWidth: 2,
        // borderRadius:10,
        // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
        marginLeft:10,
        justifyContent:"center",
        alignSelf: 'flex-start',}} html={item.value} /></View>
</TouchableOpacity>
       )
    }

    render() {
        const { topicindata} = this.props
        return (
         

<MathJax
  // HTML content with MathJax support
 //html={'<p>Solve the following quadratic equations by factorization:</p>\n\n<p><span class="math-tex">(\\frac{x-a}{x-b}+ \\frac{x-b}{x-a}=\\frac{a}{b}+\\frac{b}{a})</span></p>\\n'}
  html={'<p>Solve the following quadratic equations by factorization:</p>\\n\\n<p><span class="math-tex">(\\frac{x-a}{x-b}+ frac{x-b}{x-a}=frac{a}{b}+frac{b}{a})</span></p>\\n'}
  mathJaxOptions={{
    messageStyle: 'none',
    extensions: [ 'tex2jax.js' ],
    jax: [ 'input/TeX', 'output/HTML-CSS' ],
    tex2jax: {
      inlineMath: [ ['$','$'], ['(',')'] ],
      displayMath: [ ['$','$'], ['[',']'] ],
      processEscapes: true,
    },
    TeX: {
      extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
    } 
  }}
 
/>

//             <>
//             <ImageBackground source={require('./src/assets/images/dashboard/new/activitybg.jpg')}
//             style={{width:"100%",height:"100%",backgroundColor:"green"}} opacity={0.5}>
//               <View style={{flex:1}}>
//               <View style={{flex:0.08,flexDirection:"row"}}>
//           <View style={{flex:1}}>

//               <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
//                 {/* <TouchableOpacity onPress={this.onBack.bind(this)}>
//                 <Image source={require("../../assets/images/left-arrow.png")}
//                   style={{ width: 25, height: 25, tintColor: "white",}} />
//               </TouchableOpacity> */}
             
//                 <Text style={{ color: "white", fontSize: 18     ,marginLeft:10}}>{"his.props.data.activity"}</Text>
               
//               </View>

//               </View>
             
//           </View>
//                 <View style={{flex:0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
//                     { this.state.spinner ?
//                     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
//                             <Text>Loading...</Text>
//                         </View> : 
//                          this.state.questiosnarray.length > 0 ?
//                         <View style={{ flex: 1, }}>
//                             <View style={styles.mainbottomview}>
//                                 <View style={styles.mainshadowview}>
//                                     <View style={styles.headerview}>
                                       
//                                         <View style={styles.headrightview}>
//                                             <View style={[styles.timerview,{backgroundColor:"red"}]}>
//                                                 <Image source={require('./src/assets/images/timer.png')} style={{ width: 25, height: 25, alignSelf: "center", marginRight: 10 }} />
//                                                  <Text style={styles.timertext}>{parseInt(this.state.seconds / 60, 10)}:{parseInt(this.state.seconds % 60, 10)}</Text>

//                                             </View>
//                                         </View>
//                                     </View>

//                                     <View style={styles.listview}>
//                                         <ScrollView
//                                             contentInsetAdjustmentBehavior="automatic"
//                                             keyboardShouldPersistTaps={'handled'}
//                                         >
//                                             <View style={styles.circlesview}>
//                                                 <FlatList data={this.state.questiosnarray}
//                                                  ref={(ref) => { this.flatListRef = ref; }}
//                                                  initialScrollIndex={0}
//                                                  getItemLayout={this.getItemLayout}
//                                                     keyExtractor={(item, index) => String(index)}
//                                                     renderItem={this.renderItem.bind(this)}
//                                                     horizontal={true}
//                                                     showsHorizontalScrollIndicator={false} />
//                                             </View>
                                            
//                                                 <View style={{ flexDirection: 'row', paddingStart: 15, paddingEnd: Platform.OS === 'ios' ? 10 : 10, marginTop:10}}>
//                                             <Text style={{ fontSize: 13, marginTop: 10 }}>{this.state.questionno+1}.</Text>
//                                             <MathJax
//                                                 // To set the font size change initial-scale=0.8 from MathJax class
//                                                 style={{ borderRadius: 5,
//                                                     width: '95%',
//                                                     borderWidth: 0.5,
//                                                     borderColor:"white",
//                                                     alignSelf: 'center',}} html={this.state.selectedItem.question.question} />
//                                         </View>
//                                                 <FlatList data={this.state.selectedItem.question.options}
                                              
//                                                     keyExtractor={(item, index) => String(index)}
//                                                     renderItem={this.rednerAnswerItem.bind(this)}
//                                                     //horizontal={true}
//                                                     showsHorizontalScrollIndicator={false} />
//                                                 {/* {this.state.selectedItem.question.options.map((res, i) =>
                                                   
//                                                 )} */}
// </ScrollView>
//                                     </View>
//                                 </View>
//                             </View>

//                         </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                             <Text>No data</Text>
//                             <TouchableOpacity onPress={this.ongoback.bind(this)}>
//                                 <Text>GO BACK</Text>
//                             </TouchableOpacity>
//                         </View>
//     }
//                 </View>
//                 {this.state.questiosnarray.length > 0  ?
//                 <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
//                     <View style={{flex:1,flexDirection:"row"}}>
//                     {this.state.questionno === 0  ? <View style={{flex:0.5}}/> : 
//                      <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-start"}}>

//                  <TouchableOpacity style={{ height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
//               justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
//                    <Text style={{ textAlign:"center",fontSize:12}}>Previous</Text>
//                        </TouchableOpacity></View> }
//                        <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-end"}}>
//                        {this.state.questionno + 1 === this.state.questiosnarray.length ?
//                          <TouchableOpacity style={{height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
//                          justifyContent:"center",alignItems:"center"}} onPress={this.onSubmitText.bind(this)}>
//                   <Text style={{ textAlign:"center",fontSize:12,}}>Submit</Text>
//                       </TouchableOpacity> :
//                        <TouchableOpacity style={{height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
//                           justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
//                    <Text style={{ textAlign:"center",fontSize:12,}}>Next</Text>
//                        </TouchableOpacity>
//                            }               
//                            </View>
//                     </View> 
           
  
//                 </View> : null }
//               </View>
//             </ImageBackground>
  

//                        <Modal isVisible={this.state.isvisible}>
//                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                              <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
//                                  <Image source={require("./src/assets/images/finger.png")} style={{ width: 96 / 1.5, height: 96 / 1.5, alignSelf: 'center' }} />
//                                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{this.state.timeup ? "Time up! Please submit your assessment" : "Are you sure you want to submit assesment?"}</Text>
//                                  <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>
//                                      <TouchableOpacity onPress={this.onSubmit.bind(this)} >
//                                          <LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
//                                              <Text style={{ color: "white" }}>SUBMIT</Text>
//                                          </LinearGradient>
//                                      </TouchableOpacity>
//                                      <TouchableOpacity onPress={this.onCancel.bind(this)}>
//                                          <LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
//                                              <Text style={{ color: "white" }}>CANCEL</Text>
//                                          </LinearGradient>
//                                      </TouchableOpacity>
//                                  </View>
//                              </View>
//                          </View>
//                      </Modal>
                   
//                      {this.state.testloader ?
//                          <View style={{ width: "100%", height: "100%", backgroundColor: "transparent", position: "absolute", justifyContent: "center", alignItems: "center" }}>
//                              <ActivityIndicator color="black" />
//                          </View>
//                          : null
//                      }
//               </>
        )
    }
}

export default PreAssesment;