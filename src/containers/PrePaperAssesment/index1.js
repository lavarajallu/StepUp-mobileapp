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
    BackHandler,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, colors } from "../../constants"
import Snackbar from 'react-native-snackbar';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import MathJax from 'react-native-mathjax';
var alphabetarray = ["A", "B", "c", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


class PrePaperAssesment extends Component {
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
            analyticsData: {},
            token: "",
            modalshow: false,

        }
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);

        this.getData()
        setTimeout(() => {
            this.setState({ modalshow: true })
        }, 500)
        // this.starttimer()
    }
    backAction = () => {

        return true;
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user')
            // alert(JSON.stringify(value))
            if (value !== null) {
                var data = JSON.parse(value)
                this.setState({
                    useDetails: data,

                })
                const token = await AsyncStorage.getItem('@access_token')
                if (token && data) {

                    this.setState({ token: JSON.parse(token) })
                    //  this.getanalytics(data,JSON.parse(token))
                    // this.getQuestions()

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



    getQuestions() {
        console.log("dsnfjnvkdv", this.props.item)
      //  var url = baseUrl + "/previous-questions?previous_question_paper_id=" + this.props.item.reference_id
      var url = baseUrl + "/user-previous-test"
        console.log("urlll", url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
            body: JSON.stringify({
                "previous_question_paper_id": this.props.item.reference_id
            })
        }).then((response) =>

            response.json())
            .then((json) => {
                console.log("qusessss......", JSON.stringify(json.data))
                if (json.data) {
                    const data = json.data
                    let questions = []
                    data.questions && data.questions.map(data => {
                        let obj = {
                            question: data.reference_id,
                            user_answer: null,
                            test_taken_time: 1,
                        }
                        questions.push(obj)
                    })

                    this.setState({
                        questiosnarray: data.questions,
                        selectedItem: data.questions[0],
                        questionno: 0,
                        spinner: false,
                        finalarray: questions,
                        testid: data.reference_id

                    }, () => console.log("testid", this.state.testid))


                } else {
                    this.setState({
                        questiosnarray: [],
                        selectedItem: null,
                        questionno: 0,
                        spinner: false
                    })
                   // alert(JSON.stringify(json.message))

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
        let viewstyle;
        let textstyle;
        if (this.state.selectedItem === item) {
            viewstyle = [styles.circlefilled, { backgroundColor: colors.Themecolor, borderColor: colors.Themecolor }];
            textstyle = styles.circletext
        } else {
            viewstyle = [styles.borderfilled, { borderColor: colors.Themecolor }];
            textstyle = styles.bordertext
        }
        return (
            <TouchableOpacity
                onPress={this.onItem.bind(this, item, index)}
                style={viewstyle}>
                <Text style={textstyle} >{index + 1}</Text>
            </TouchableOpacity>
        )
    }
    onItem(item, index) {
        //  alert(index)
        this.setState({
            questionno: index,
            answerobj: {},
        }, () => {
            var nextItem = this.state.questiosnarray[index];
            this.setState({
                selectedItem: nextItem,

            }, () => {
                this.state.finalarray.map((res, i) => {

                    if (res.question === this.state.selectedItem.reference_id) {
                        //alert("Hiiii")
                        // console.log("ffff",res.question ,  "  ", this.state.selectedItem.reference_id)
                        this.setState({
                            answerobj: res
                        })
                    } else {
                        console.log("else.......")
                    }
                })
            }

            )
        })
    }
    onNext() {
        //   alert(JSON.stringify(this.state.answerobj))
        if (Object.keys(this.state.answerobj).length === 0) {
            alert("please select option")
        } else {
            this.setState({
                questionno: this.state.questionno + 1
            }, () => {
                var nextItem = this.state.questiosnarray[this.state.questionno];
                this.setState({
                    selectedItem: nextItem,
                    // answerobj : {}

                }, () => this.state.finalarray.map((res, i) => {

                    if (res.question === this.state.selectedItem.reference_id) {

                        // console.log("ffff",res.question ,  "  ", this.state.selectedItem.reference_id)
                        this.setState({
                            answerobj: res
                        })
                    } else {
                        this.setState({
                            answerobj: {}
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

            }, () => this.state.finalarray.map((res, i) => {

                if (res.question === this.state.selectedItem.reference_id) {

                    // console.log("ffff",res.question ,  "  ", this.state.selectedItem.reference_id)
                    this.setState({
                        answerobj: res
                    })
                } else {
                    this.setState({
                        answerobj: {}
                    })
                }
            }))
        })
    }

    onSubmit() {
        console.log("finalyarray", this.state.finalarray, "ddddd", this.state.testid)
        var newbody = {
            test_taken_time: 300,
            questions: this.state.finalarray
        }
        this.setState({
            isvisible: false
        }, () => {
            this.setState({ testloader: true })
            
                        var url = baseUrl + "/user-previous-test/" + this.state.testid
                        var body = newbody
                        var testid_id =  this.state.testid
                        console.log("bodyyy....", body)

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
                                    console.log("finallll",json)
                                if (json.data) {
                                    const data = json.data
                                    console.log("jsonssss finalllllll", json.data.reference_id, testid_id)
                                    this.setState({ testloader: false })
                                      Actions.push('prepapersummary', { testdata: json.data,testid: testid_id,item: this.props.newdata})
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

                    }
                )
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
    onok() {
        this.setState({
            modalshow: false
        }, () => {

            this.starttimer()
            this.getQuestions()
        })
    }
    onStartcancel() {
        this.setState({
            modalshow: false
        }, () => {
            Actions.prequestionpapers({ type: "reset", item: this.props.newdata })
        })
    }
    ongoback() {
        Actions.prequestionpapers({ type: "reset", item: this.props.newdata })
    }
    onAnswer(res) {
        console.log("answerrr...", this.state.finalarray)
        var answerkey = res.key;
        var questionId = this.state.selectedItem.reference_id
        var timecount = this.state.seconds;
        console.log(this.state.secondstime - timecount)
        var timess = this.state.secondstime - timecount
        // var obj = {
        //     "question": questionId,
        //     "user_answer": answerkey,
        //     "test_taken_time": timess
        // }
        //console.log("slkd", obj)
        // if(this.state.finalarray)
        // this.state.finalarray.map((res,i)=>{
        //     if(res.question === this.state.selectedItem.reference_id){
        //         this.state.finalarray.splice(i,1)
        //     }else{

        //     }
        // })
        let data = [...this.state.finalarray]
        let index = data.findIndex(p => p.question === this.state.selectedItem.reference_id)
        let obj = data[index]
        if (obj) {
            obj.user_answer = answerkey
            data[index] = Object.assign({}, obj)
            this.setState({ finalarray: data })
        }


        //this.state.finalarray.push(obj);

        this.setState({

            secondstime: timecount

        })
        console.log("dkjkdjkd", obj)
        this.setState({
            answerobj: obj
        }, () => {

        })
        this.scrollToIndex(this.state.questionno)




    }
    getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
    )
    scrollToIndex = (index) => {
        let randomIndex = index;
        this.flatListRef.scrollToIndex({ animated: true, index: randomIndex });
    }
    rednerAnswerItem({ item, index }) {

        return (

            <TouchableOpacity style={{ flexDirection: 'row', marginTop: index > 0 ? 10 : 0 }} onPress={this.onAnswer.bind(this, item)}>
                <Text style={{ marginTop: 8, alignSelf: 'center', marginLeft: 10 }}>{alphabetarray[index]}. </Text>
                <View style={{
                    width: '80%',
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: this.state.answerobj.user_answer === item.key ? colors.Themecolor : "lightgrey",
                    marginLeft: 10,
                    justifyContent: "center",
                    alignSelf: 'flex-start',
                }}>
                    <MathJax
                        mathJaxOptions={{
                            messageStyle: "none",
                            extensions: ["tex2jax.js"],
                            jax: ["input/TeX", "output/HTML-CSS"],
                            tex2jax: {
                                inlineMath: [
                                    ["$", "$"],
                                    ["\\(", "\\)"],
                                ],
                                displayMath: [
                                    ["$$", "$$"],
                                    ["\\[", "\\]"],
                                ],
                                processEscapes: true,
                            },
                            TeX: {
                                extensions: [
                                    "AMSmath.js",
                                    "AMSsymbols.js",
                                    "noErrors.js",
                                    "noUndefined.js",
                                ],
                            },
                        }}
                        // To set the font size change initial-scale=0.8 from MathJax class
                        style={{
                            width: '80%',
                            marginLeft: 10,
                            justifyContent: "center",
                            alignSelf: 'flex-start',
                        }}
                        html={item.value}
                    /></View>
            </TouchableOpacity>
        )
    }
    render() {

        return (

            <>
                <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
                    style={{ width: "100%", height: "100%", backgroundColor: colors.Themecolor }} opacity={0.5}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.08, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>

                                <View style={{ flex: 1, marginLeft: 20, flexDirection: "row", alignItems: "center" }}>

                                    {/* <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity> */}

                                    <Text style={{ color: "white", fontSize: 18, marginLeft: 10 }}>{this.props.item.title + " Paper Test"}</Text>

                                </View>

                            </View>
                        </View>
                        <View style={{ flex: 0.84, backgroundColor: "white", marginLeft: 10, marginRight: 10, borderRadius: 20, overflow: "hidden" }}>
                            {this.state.spinner ?
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text>Loading...</Text>
                                </View> :
                                this.state.questiosnarray.length > 0 ?
                                    <View style={{ flex: 1, }}>
                                        <View style={styles.mainbottomview}>
                                            <View style={styles.mainshadowview}>
                                                <View style={styles.headerview}>

                                                    <View style={styles.headrightview}>
                                                        <View style={[styles.timerview, { backgroundColor: colors.Themecolor }]}>
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
                                                            <Text style={{ fontSize: 13, marginTop: 10 }}>{this.state.questionno + 1}.</Text>
                                                            <MathJax
                                                                mathJaxOptions={{
                                                                    messageStyle: "none",
                                                                    extensions: ["tex2jax.js"],
                                                                    jax: ["input/TeX", "output/HTML-CSS"],
                                                                    tex2jax: {
                                                                        inlineMath: [
                                                                            ["$", "$"],
                                                                            ["\\(", "\\)"],
                                                                        ],
                                                                        displayMath: [
                                                                            ["$$", "$$"],
                                                                            ["\\[", "\\]"],
                                                                        ],
                                                                        processEscapes: true,
                                                                    },
                                                                    TeX: {
                                                                        extensions: [
                                                                            "AMSmath.js",
                                                                            "AMSsymbols.js",
                                                                            "noErrors.js",
                                                                            "noUndefined.js",
                                                                        ],
                                                                    },
                                                                }}
                                                                // To set the font size change initial-scale=0.8 from MathJax class
                                                                style={{
                                                                    borderRadius: 5,
                                                                    width: '95%',
                                                                    borderWidth: 0.5,
                                                                    borderColor: "white",
                                                                    alignSelf: 'center',
                                                                }} html={this.state.selectedItem.question.question} />
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
                        {this.state.questiosnarray.length > 0 ?
                            <View style={{ flex: 0.08, flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10, alignItems: "center" }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    {this.state.questionno === 0 ? <View style={{ flex: 0.5 }} /> :
                                        <View style={{ flex: 0.5, justifyContent: "flex-start", alignItems: "flex-start" }}>

                                            <TouchableOpacity style={{
                                                height: 30, width: 100, borderRadius: 20, backgroundColor: "white", paddingHorizontal: 10,
                                                justifyContent: "center", alignItems: "center"
                                            }} onPress={this.onPrevious.bind(this)}>
                                                <Text style={{ textAlign: "center", fontSize: 12, color: colors.Themecolor }}>Previous</Text>
                                            </TouchableOpacity></View>}
                                    <View style={{ flex: 0.5, justifyContent: "flex-start", alignItems: "flex-end" }}>
                                        {this.state.questionno + 1 === this.state.questiosnarray.length ?
                                            <TouchableOpacity style={{
                                                height: 30, width: 100, borderRadius: 20, backgroundColor: "white", paddingHorizontal: 10,
                                                justifyContent: "center", alignItems: "center"
                                            }} onPress={this.onSubmitText.bind(this)}>
                                                <Text style={{ textAlign: "center", fontSize: 12, color: colors.Themecolor }}>Submit</Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity style={{
                                                height: 30, width: 100, borderRadius: 20, backgroundColor: "white", paddingHorizontal: 10,
                                                justifyContent: "center", alignItems: "center"
                                            }} onPress={this.onNext.bind(this)}>
                                                <Text style={{ textAlign: "center", fontSize: 12, color: colors.Themecolor }}>Next</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>


                            </View> : null}
                    </View>
                </ImageBackground>
                {/* {this.state.modalshow ? 
                         <View style={{ height:windowHeight,position:"absolute",backgroundColor:"lightgrey" }}>
                             <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
                                 <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }}>You are about to begin the Assesment. Once you begin you have 5min to finish the test</Text>
                                 <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10, fontWeight:"600" }}> Are you ready to begin? </Text>
                                 <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>
                                    
                                     <TouchableOpacity onPress={this.onStartcancel.bind(this)}>
                                         <LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                             <Text style={{ color: "white" }}>CANCEL</Text>
                                         </LinearGradient>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={this.onok.bind(this)}>
                                         <LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                             <Text style={{ color: "white" }}>OK</Text>
                                         </LinearGradient>
                                     </TouchableOpacity>
                                 </View>
                             </View>
                         </View> : null
              } */}

                <Modal isVisible={this.state.isvisible}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
                            <Image source={require("../../assets/images/finger.png")} style={{ width: 96 / 1.5, height: 96 / 1.5, alignSelf: 'center' }} />
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{this.state.timeup ? "Time up! Please submit your assessment" : "Are you sure you want to submit assesment?"}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>

                                <TouchableOpacity onPress={this.onCancel.bind(this)}>
                                    <LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                        <Text style={{ color: "white" }}>CANCEL</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onSubmit.bind(this)} >
                                    <LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                        <Text style={{ color: "white" }}>SUBMIT</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.modalshow}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
                            <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }}>You are about to begin the Assesment. Once you begin you have 20mins to finish the test</Text>
                            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10, fontWeight: "600" }}> Are you ready to begin? </Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>

                                <TouchableOpacity onPress={this.onStartcancel.bind(this)}>
                                    <LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                        <Text style={{ color: "white" }}>CANCEL</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onok.bind(this)}>
                                    <LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                                        <Text style={{ color: "white" }}>OK</Text>
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

export default PrePaperAssesment;