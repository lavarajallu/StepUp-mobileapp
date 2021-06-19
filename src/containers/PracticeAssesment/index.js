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
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import MathJax from 'react-native-mathjax';
var alphabetarray = ["A","B","c","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


class PracticeAssesment extends Component {
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
            spinner: true,
            questionno: 0,
            seconds: 1200, secondstime: 1200, testid: "", token: "", testloader: false,
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
                    //  this.getanalytics(data,JSON.parse(token))
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
        var url = baseUrl+'/analytics'
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
           //alert(JSON.stringify(json));
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
                                            this.ongoback()
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
                                    }
                                ]
                            );
                        } else {
    
                            this.getQuestions()
    
                        }
                    }else{ this.getQuestions()}
                    

                } else {
                    alert(JSON.stringify(json.message))

                }
            }

            )
            .catch((error) => console.error(error))
    }
    getQuestions() {
       var body;
        if(this.props.data.type){
           body  = {
            test_type: "Subject",
            subject_id: this.props.data.reference_id,
           }
        }else{
            body = {
                test_type: "Chapter",
                chapter_id: this.props.data.reference_id,
    
            }
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
               // alert(JSON.stringify(json))
                if (json.data) {
                    const data = json.data
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
        setInterval(() => {

            this.setState({ seconds: this.state.seconds - 1 })
        }, 1000)
    }
    renderItem({ item, index }) {
        const {data } = this.props;
        const topicindata = data
        let viewstyle;
        let textstyle;
        if (this.state.selectedItem === item) {
            viewstyle = [styles.circlefilled,{backgroundColor:topicindata.color,borderColor:topicindata.color}];
            textstyle = styles.circletext
        } else {
            viewstyle = [styles.borderfilled,{borderColor: topicindata.color}];
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
        this.setState({
            isvisible: false
        }, () => {
            var url = baseUrl + "/user-test/" + this.state.testid
            var body = { questions: this.state.finalarray }
            console.log("bodyyy",body)
            this.setState({ testloader: true })
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
                        console.log("jsonssss",json.data)
                        this.setState({ testloader: false })
                        Actions.push('practicesummary', { subjectData:this.props.subjectData,testid: this.state.testid, data: this.props.data })
                        // Alert.alert(
                        //     "Step Up",
                        //     json.message,
                        //     [
                        //         {
                        //             text: "OK", onPress: () => {
                        //                // a8313b6d-170f-4a72-83e5-5786b24f3245
                        //                 Actions.push('practicesummary', { subjectData:this.props.subjectData,testid: this.state.testid, data: this.props.data })
                        //             }
                        //         }
                        //     ]
                        // );

                    } else {
                        this.setState({ testloader: fasle })

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
    // onsubmitmodal() {
    //     //alert(JSON.stringify(this.props.topicData))
    //     this.setState({
    //         isvisible: false
    //     }, () => {
    //         console.log("final", this.state.finalarray)
    //        // Actions.push('presummary', { testid: this.state.testid, topicData: this.props.topicData, subjectData: this.props.subjectData, index: this.props.index, smartres: this.props.smartres })
    //     })
    // }

    onSubmitText() {
        //alert(JSON.stringify(this.props.topicData))
        this.setState({
            isvisible: true
        })
    }
    ongoback() {
        Actions.practicechapter({type:"reset",data: this.props.subjectData})
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
    getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
      )
    scrollToIndex = (index) => {
        let randomIndex = index;
        this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
      }
      rednerAnswerItem ({item,index}) {
        const  {  data } = this.props
        const topicindata  = data
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
        borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
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
        const { data } = this.props
        const topicindata = data
        return (
            // this.state.spinner ?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            //    <Text>Loading...</Text>
            // </View> :

            //     <View style={styles.mainview}>
            //         <View style={styles.topview}>
            //             <Text style={styles.toptext}>{"Practice Test"}</Text>
            //         </View>
            //         {this.state.questiosnarray.length > 0 ?
            //             <View style={{ flex: 1, }}>
            //                 <View style={styles.mainbottomview}>
            //                     <View style={styles.mainshadowview}>
            //                         <View style={styles.headerview}>
            //                             <View style={styles.headerleftview}>
            //                                 <Text style={styles.headtext}></Text>
            //                             </View>
            //                             <View style={styles.headrightview}>
            //                                 <View style={styles.timerview}>
            //                                     <Image source={require('../../assets/images/timer.png')} style={{ width: 25, height: 25, alignSelf: "center", marginRight: 10 }} />
            //                                     <Text style={styles.timertext}>{parseInt(this.state.seconds / 60, 10)}:{parseInt(this.state.seconds % 60, 10)}</Text>

            //                                 </View>
            //                             </View>
            //                         </View>

            //                         <View style={styles.listview}>
            //                             <ScrollView
            //                                 contentInsetAdjustmentBehavior="automatic"
            //                                 keyboardShouldPersistTaps={'handled'}
            //                             >
            //                                 <View style={styles.circlesview}>
            //                                     <FlatList data={this.state.questiosnarray}
            //                                      ref={(ref) => { this.flatListRef = ref; }}
            //                                      initialScrollIndex={0}
            //                                      getItemLayout={this.getItemLayout}
            //                                         keyExtractor={(item, index) => String(index)}
            //                                         renderItem={this.renderItem.bind(this)}
            //                                         horizontal={true}
            //                                         showsHorizontalScrollIndicator={false} />
            //                                 </View>
            //                                 <View style={styles.questionsview}>
            //                                     <View style={styles.questioninnerview}>
            //                                         <Text style={styles.questionnum}>{this.state.questionno+1}. </Text>
            //                                         <Text style={styles.questiontext}>{this.state.selectedItem.question.question.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            //                                     </View>
            //                                     {this.state.selectedItem.question.options.map((res, i) =>
            //                                         <View style={styles.answermain}>
            //                                             <View style={styles.answersub}>
            //                                                 <Text style={styles.answernum}>{i+1}. </Text>
            //                                                 <TouchableOpacity onPress={this.onAnswer.bind(this, res)}
            //                                                     style={[styles.answertextview, { borderColor: "lightgrey", }]}>
            //                                                     <Text style={styles.answertext}>{res.value.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            //                                                 </TouchableOpacity>
            //                                             </View>
            //                                         </View>
            //                                     )}

            //                                 </View></ScrollView>
            //                         </View>
            //                     </View>
            //                 </View>

            //             </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //                 <Text>No data</Text>
            //                 <TouchableOpacity onPress={this.ongoback.bind(this)}>
            //                     <Text>GO BACK</Text>
            //                 </TouchableOpacity>
            //             </View>}
            //         <Modal isVisible={this.state.isvisible}>
            //             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //                 <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
            //                     <Image source={require("../../assets/images/finger.png")} style={{ width: 96 / 1.5, height: 96 / 1.5, alignSelf: 'center' }} />
            //                     <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>Are you sure you want to submit assesment?</Text>
            //                     <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>
            //                         <TouchableOpacity onPress={this.onSubmit.bind(this)} >
            //                             <LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
            //                                 <Text style={{ color: "white" }}>SUBMIT</Text>
            //                             </LinearGradient>
            //                         </TouchableOpacity>
            //                         <TouchableOpacity onPress={this.onCancel.bind(this)}>
            //                             <LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
            //                                 <Text style={{ color: "white" }}>CANCEL</Text>
            //                             </LinearGradient>
            //                         </TouchableOpacity>
            //                     </View>
            //                 </View>
            //             </View>
            //         </Modal>
            //         {this.state.testloader ?
            //             <View style={{ width: "100%", height: "100%", backgroundColor: "transparent", position: "absolute", justifyContent: "center", alignItems: "center" }}>
            //                 <ActivityIndicator color="black" />
            //             </View>
            //             : null
            //         }
            //     </View>
            
            <>
            <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
            style={{width:"100%",height:"100%",backgroundColor:topicindata.color}} opacity={0.5}>
              <View style={{flex:1}}>
              <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                {/* <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity> */}
             
                <Text style={{ color: "white", fontSize: 18     ,marginLeft:10}}>{"Practice Test"}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View>
                <View style={{flex:0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
                    { this.state.spinner ?
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text>Loading...</Text>
                        </View> : 
                         this.state.questiosnarray.length > 0 ?
                        <View style={{ flex: 1, }}>
                            <View style={styles.mainbottomview}>
                                <View style={styles.mainshadowview}>
                                    <View style={styles.headerview}>
                                       
                                        <View style={styles.headrightview}>
                                            <View style={[styles.timerview,{backgroundColor:topicindata.color}]}>
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
                                                 ref={(ref) => { this.flatListRef = ref; }}
                                                 initialScrollIndex={0}
                                                 getItemLayout={this.getItemLayout}
                                                    keyExtractor={(item, index) => String(index)}
                                                    renderItem={this.renderItem.bind(this)}
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false} />
                                            </View>
                                            
                                                <View style={{ flexDirection: 'row', paddingStart: 15, paddingEnd: 10 }}>
                                            <Text style={{ fontSize: 13, marginTop: 10 }}>{this.state.questionno+1}.</Text>
                                            <MathJax
                                                // To set the font size change initial-scale=0.8 from MathJax class
                                                style={{ borderRadius: 5,
                                                    width: '95%',
                                                    borderWidth: 0.5,
                                                    borderColor:"white",
                                                    alignSelf: 'center',}} html={this.state.selectedItem.question.question} />
                                        </View>
                                                <FlatList data={this.state.selectedItem.question.options}
                                              
                                                    keyExtractor={(item, index) => String(index)}
                                                    renderItem={this.rednerAnswerItem.bind(this)}
                                                    //horizontal={true}
                                                    showsHorizontalScrollIndicator={false} />
                                                {/* {this.state.selectedItem.question.options.map((res, i) =>
                                                   
                                                )} */}
</ScrollView>
                                    </View>
                                </View>
                            </View>

                        </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text>No data</Text>
                            <TouchableOpacity onPress={this.ongoback.bind(this)}>
                                <Text>GO BACK</Text>
                            </TouchableOpacity>
                        </View>
    }
                </View>
                {this.state.questiosnarray.length > 0  ?
                <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
                    <View style={{flex:1,flexDirection:"row"}}>
                    {this.state.questionno === 0  ? <View style={{flex:0.5}}/> : 
                     <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-start"}}>

                 <TouchableOpacity style={{ height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
              justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
                   <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Previous</Text>
                       </TouchableOpacity></View> }
                       <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-end"}}>
                       {this.state.questionno + 1 === this.state.questiosnarray.length ?
                         <TouchableOpacity style={{height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
                         justifyContent:"center",alignItems:"center"}} onPress={this.onSubmitText.bind(this)}>
                  <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Submit</Text>
                      </TouchableOpacity> :
                       <TouchableOpacity style={{height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
                          justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
                   <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Next</Text>
                       </TouchableOpacity>
                           }               
                           </View>
                    </View> 
           
  
                </View> : null }
              </View>
            </ImageBackground>

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
              </>
        )
    }
}

export default PracticeAssesment;