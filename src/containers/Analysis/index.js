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
    ActivityIndicator
} from 'react-native';
import { colors, imageUrl } from "../../constants"
import {
    PieChart,
} from "react-native-chart-kit";
import { Actions } from 'react-native-router-flux';
import RNSpeedometer from 'react-native-speedometer'

import Footer from '../../components/Footer'
const windowWidth = Dimensions.get('window').width;
import * as Progress from 'react-native-progress';
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../../constants"
import SideMenu from "../../components/SideMenu"
import Drawer from 'react-native-drawer'
var imagesarray = [
    require('../../assets/images/dashboard/new/orangebg.png'),
    require('../../assets/images/dashboard/new/bluebg.png'),
    require('../../assets/images/dashboard/new/purplebg.png'),
    require('../../assets/images/dashboard/new/greenbg.png')
]
import { ProgressCircle } from 'react-native-svg-charts'
import { VictoryPie } from "victory-native";
import SemiCircleDonut from './SemiCircleDonut';
import PolarRadialBar from './PolarRadialBar';
import ActivityRings from "react-native-activity-rings";
import StringsOfLanguages from '../../StringsOfLanguages';

var bloomsdata = [
    {
        label: "Create",
        value: 0.7,
        color: "#6A5177",
        backgroundColor: "lightgrey"
    },
    {
        label: "Evaluate",
        value: 0.6,
        color: "#A3BA6D",
        backgroundColor: "lightgrey"
    },
    {
        label: "Analyze",
        value: 0.5,
        color: "#D88212",
        backgroundColor: "lightgrey"
    },
    {
        label: "Apply",
        value: 0.3,
        color: "#F94D48",
        backgroundColor: "lightgrey"
    },
    {
        label: "Understand",
        value: 0.5,
        color: "#D19DE6",
        backgroundColor: "lightgrey"
    },
    {
        label: "Remember",
        value: 0.9,
        color: "#30A6DC",
        backgroundColor: "#cccccc"
    }
]
const activityConfig = {
    width: 300,
    height: 300,
    radius: 32,
    ringSize: 12,
}
var graphicData = [
    { y: 20, x: '20%', name: "Mathematics" },
    { y: 90, x: '90%', name: "Physics" },
    { y: 50, x: '50%', name: "Chemistry" },
    { y: 60, x: '60%', name: "Biology" },
    { y: 50, x: '50%', name: "English" },
    { y: 60, x: '60%', name: "Hindi" },
];
var colorarray = ["#6a5177", "#d88212", "#277292", "#a3ba6d", "#deb026", "#c44921", "red", "green", "blue"]
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
class Analysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: {},
            subjectsData: null,
            spinner: true,
            chaptersData: [],
            loading: false,
            piesections: [],
            piesectiondatacount: null,
            pieloading: true,
            allavergae: "",
            allsectiondata: [],
            mainsubjects: [],
            allSubjectData: [],
            user: {},
            blommsData: "",
            bloomsloading: false,
            speedometercount: 0,
            bloomsectioncount: null
        }
    }
    async componentDidMount() {
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
                        token: JSON.parse(token),
                        user: data,
                    })
                    this.getSubjects(data, JSON.parse(token))
                    // this.getanalytics(data,JSON.parse(token))
                } else {

                }

            } else {
                console.log("errorr")
            }
        } catch (e) {
            return null;
        }
    }
    getSubjects(user, toekn) {
        //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
        var url = baseUrl + '/student/subjects/' + user.reference_id
        console.log("value", url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': toekn
            }
        }).then((response) =>

            response.json())
            .then((json) => {

                if (json.data) {
                    console.log("subject", json.data)
                    const data = json.data;
                    if (data.subjects) {
                        let newArray = data.subjects.slice(0, 9)
                        var newarray1 = []
                        var count = 0
                        data.subjects.map((res, i) => {
                            count = count + res.percent
                            var obj = { y: 20, x: +res.percent + '%', name: res.name }
                            newarray1.push(obj)

                        })


                        this.setState({
                            allsectiondata: newarray1,
                            allavergae: Math.floor(count / data.subjects.length)
                        })

                        // })
                        newArray.unshift({
                            name: 'All',
                            image: require('../../assets/images/dashboard/new/alllearning.png')
                        })
                        this.setState
                            ({
                                spinner: false,
                                mainsubjects: data.subjects,
                                subjectsData: newArray,
                                selectedTab: newArray[0],
                                loading: true,
                            }, () => this.getChapter(user, toekn))
                    } else {
                        this.setState
                            ({
                                spinner: false,
                                subjectsData: [],
                                selectedTab: {}
                            })
                    }
                    //  AsyncStorage.setItem('@access-token', data.access_token)
                    //  Actions.push('dashboard')
                } else {
                    alert(JSON.stringify(json.message))
                    this.setState
                        ({
                            spinner: false,
                            subjectsData: [],
                            selectedTab: {}
                        })
                }
            }

            )
            .catch((error) => console.error(error))
        //Actions.push('boards')
    }
    getChapter() {
        if (this.state.selectedTab.name === "All") {
            this.getAllSubjectsData()

        } else {
            this.getChaptersdata()
            this.getpiechatdata()
            this.gtBloomsData()
        }


    }
    gtBloomsData() {

        console.log("this.state.user", this.state.user)
        console.log("this.state.selected", this.state.selectedTab)
        var grade_id = this.state.user.grade_id;
        var subjectId = this.state.selectedTab.reference_id
        var url = baseUrl + '/taxonomy/student/subject-wise/' + grade_id + '/' + subjectId
        this.setState({ bloomsloading: true })
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {

                if (json.data) {
                    console.log("bloomsdataa", json.data)
                    if (json.data) {
                        var colorsarray = ['#6A5177', '#A3BA6D', '#D88212', '#F94D48', '#D19DE6', '#30A6DC']
                        var newarraynew = []
                        var count = 0 
                        json.data.map((res,i)=>{
                            var obj =  {
                                label: res.type,
                                value: res.percentage/100,
                                totalQuestions: res.totalQuestions,
                                correctAnswers: res.correctAnswers,
                                color: colorsarray[i],
                                backgroundColor: "lightgrey"
                            }
                            count = count + res.percentage
                            newarraynew.push(obj)
                        })
                        console.log("bloomssection", newarraynew)
                        this.setState({
                            blommsData: newarraynew,
                            bloomsloading: false,
                            bloomsectioncount: count
                        })

                    } else {
                        this.setState({
                            blommsData: {},
                            bloomsloading: false
                        })
                    }
                } else {
                    alert(JSON.stringify(json.message))

                }
            }

            )
            .catch((error) => console.error(error))
    }
    getAllSubjectsData() {
        var url = baseUrl + '/student/subjectAssessmentAnalysis'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {

                if (json.data) {
                    console.log("ddddd", json.data)
                    if (json.data.length > 0) {

                        // this.setState({
                        //     allSubjectData: json.data
                        // })
                        var finalarray = []
                        json.data.map((res, i) => {
                            var leveles = res.diffLevel;
                            var easycount = leveles.Easy.correct + leveles.Easy.inCorrect + leveles.Easy.unAnswered
                            var mediumcount = leveles.Medium.correct + leveles.Medium.inCorrect + leveles.Medium.unAnswered
                            var hardcount = leveles.Hard.correct + leveles.Hard.inCorrect + leveles.Hard.unAnswered
                            var totalQuestions = easycount + mediumcount + hardcount
                            var correctanswers = leveles.Easy.correct + leveles.Medium.correct + leveles.Hard.correct
                            var easyPercent = 0
                            var mediumPercent = 0
                            var hardPercent = 0
                            if (easycount > 0) {
                                easyPercent = leveles.Easy.correct > 0 ? (leveles.Easy.correct / easycount) * 100 : 0
                            }
                            if (mediumcount > 0) {
                                mediumPercent = leveles.Medium.correct > 0 ? (leveles.Medium.correct / mediumcount) * 100 : 0
                            }
                            if (hardcount > 0) {
                                hardPercent = leveles.Hard.correct > 0 ? (leveles.Hard.correct / hardcount) * 100 : 0
                            }
                            // var mediumPercent = (leveles.Medium.correct/mediumcount)*100
                            // var hardPercent = leveles.Hard.correct > 0 ? (leveles.Hard.correct/hardcount)*100 : 0 
                            var obj = {
                                subjectName: res.subject.name,
                                testAttempts: res.attempts,
                                avgQueTime: parseFloat(res.averageTime).toFixed(2),
                                totalQuestions: totalQuestions,
                                correctAnswer: correctanswers,
                                easy: parseFloat(easyPercent).toFixed(2),
                                medium: parseFloat(mediumPercent).toFixed(2),
                                hard: parseFloat(hardPercent).toFixed(2)
                            }
                            console.log("objjjj", obj)
                            finalarray.push(obj)
                        })
                        console.log("finalarray", finalarray)
                        this.setState({
                            allSubjectData: finalarray
                        }, () => console.log("allSubjectData", this.state.allSubjectData))
                        this.setState({
                            loading: false
                        })
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                } else {
                    alert(JSON.stringify(json.message))
                    this.setState
                        ({
                            loading: false,
                            chaptersData: []
                        })
                }
            }

            )
            .catch((error) => console.error(error))
    }
    getpiechatdata() {
        const { user, token } = this.state
        this.setState({ pieloading: true })
        var url = baseUrl + "/student/subject/speedometer/" + user.grade_id + "/" + this.state.selectedTab.reference_id
        // if (user.user_role === 'Student') {
        //     url = baseUrl + "/student/learningAnalytics/chapters/" + user.grade_id + "/" + this.state.selectedTab.reference_id + "?school_id=" + user.school_id + "&section_id=" + user.section_id
        // } else if (user.user_role === 'General Student') {
        //     url = baseUrl + "/student/learningAnalytics/chapters/" + user.grade_id + "/" + this.state.selectedTab.reference_id + "?school_id=''&section_id=''"
        // }

        //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1

        console.log("1111111", url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
                const data = json.data;
                console.log("sss", data)
                if (data) {
                    if (data) {
                        var count = 0
                        // {json.data.map((res,i)=>{
                        //     count = count + res.percentage
                        // })}
                        // console.log("piesections",count,"    ",json.data)
                        this.setState({
                            //piesections : json.data,
                            speedometercount: data.postTestPercentage,
                            pieloading: false,
                            //piesectiondatacount : count
                        })

                    } else {
                        this.setState
                            ({
                                speedometercount: 0,
                                pieloading: false,
                                chaptersData: [],
                                //piesections:[]
                            })
                    }
                    //  AsyncStorage.setItem('@access-token', data.access_token)
                    //  Actions.push('dashboard')
                } else {
                    alert(JSON.stringify(json.message))
                    this.setState
                        ({
                            chaptersData: [],
                            piesections: [],
                            pieloading: false,
                        })
                }
            }

            )
            .catch((error) => console.error(error))
        //Actions.push('boards')
    }
    getChaptersdata() {
        const { user, token } = this.state
        var url;
        if (user.user_role === 'Student') {
            url = baseUrl + "/student/learningAnalytics/chapterTest/" + user.grade_id + "/" + this.state.selectedTab.reference_id + "?school_id=" + user.school_id + "&section_id=" + user.section_id
        } else if (user.user_role === 'General Student') {
            url = baseUrl + "/student/learningAnalytics/chapterTest/" + user.grade_id + "/" + this.state.selectedTab.reference_id + "?school_id=''&section_id=''"
        }

        //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1

        console.log("1111111", url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
                const data = json.data;
                console.log("sss", data)
                if (data) {
                    if (data) {
                        console.log("newdata", json.data)
                        this.setState
                            ({

                                chaptersData: data,
                                loading: false,
                            })
                        // var piearray = [];
                        // var colorsarray = ["#267093", "#697077", "#a4b96e", "#c54721"]
                        // data.map((res, i) => {

                        // var randomItem = colorsarray[Math.floor(Math.random() * colorsarray.length)];
                        //     var obj = {
                        //         name: res.name,
                        //         population: 2800000,
                        //         color: randomItem,
                        //         legendFontColor: "#7F7F7F",
                        //         legendFontSize: 10
                        //     }
                        //     piearray.push(obj)
                        // })
                        // console.log("array",piearray)
                        // this.setState({
                        //     piesections: piearray,
                        //     loading: false,
                        // })

                    } else {
                        this.setState
                            ({
                                loading: false,
                                chaptersData: []
                            })
                    }
                    //  AsyncStorage.setItem('@access-token', data.access_token)
                    //  Actions.push('dashboard')
                } else {
                    alert(JSON.stringify(json.message))
                    this.setState
                        ({
                            loading: false,
                            chaptersData: []
                        })
                }
            }

            )
            .catch((error) => console.error(error))
        //Actions.push('boards')
    }

    onBack() {
        Actions.pop()
    }
    onTab(res) {
        //alert(JSON.stringify(resetWarningCache))
        this.setState({

            selectedTab: res,

        }, () => this.getChapter())
    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    render() {

        return (
            <>
                <Drawer
                    type="overlay"
                    ref={(ref) => this._drawer = ref}
                    tapToClose={true}
                    openDrawerOffset={100}
                    content={<SideMenu

                        closeControlPanel={this.closeControlPanel} />}
                >
                    <ImageBackground source={require('../../assets/images/dashboard/new/learningbg.png')}
                        style={{ width: "100%", height: 288 }}>
                        <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 10, alignItems: "center" }}>
                            <TouchableOpacity onPress={this.onBack.bind(this)}>
                                <Image source={require("../../assets/images/left-arrow.png")}
                                    style={{ width: 30, height: 30, tintColor: "white" }} />
                            </TouchableOpacity>
                            <Text style={{ color: "white", marginLeft: 20, fontSize: 20 }}>{StringsOfLanguages.learninganalysis}</Text>

                        </View>
                    </ImageBackground>
                    <View style={{
                        height: windowHeight / 1.2, width: windowWidth, backgroundColor: "white", alignSelf: "center",
                        position: "absolute", bottom: 0, borderTopRightRadius: 20, borderTopLeftRadius: 20, overflow: "hidden"
                    }}>
                        {this.state.spinner ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={"black"} />
                        </View>
                            :
                            <View style={{ flex: 1 }}>

                                <View style={{ flex: 0.98 }}>
                                    <View style={{ flex: 1, paddingTop: 20 }}>
                                        <View style={{ flex: 0.2, flexDirection: "row", borderBottomWidth: 1, borderColor: "lightgrey" }}>
                                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                                {this.state.subjectsData.map((res, i) => {
                                                    var colorsarray = ["#6a5177", "#d88212", "#277292", "#a3ba6d", "#deb026", "#c44921"]
                                                    var randomItem = colorsarray[Math.floor(Math.random() * colorsarray.length)];
                                                    var bgcolor = randomItem
                                                    return (
                                                        i === 0 ?
                                                            <TouchableOpacity onPress={this.onTab.bind(this, res)}
                                                                style={{
                                                                    borderBottomWidth: 3,
                                                                    borderColor: this.state.selectedTab.name === res.name ? "#A44084" : "transparent",
                                                                    paddingHorizontal: 10, marginHorizontal: 10, justifyContent: "center",
                                                                }}>
                                                                <ImageBackground source={res.image} style={{ width: 80, height: 80, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>


                                                                </ImageBackground>
                                                                <Text style={{ textAlign: "center", color: "#656565" }}>{res.name}</Text>
                                                            </TouchableOpacity> :
                                                            <TouchableOpacity onPress={this.onTab.bind(this, res)}
                                                                style={{
                                                                    borderBottomWidth: 3,
                                                                    borderColor: this.state.selectedTab.name === res.name ? "#A44084" : "transparent",
                                                                    paddingHorizontal: 10, marginHorizontal: 10, justifyContent: "center",
                                                                }}>
                                                                <View style={{ width: 75, height: 75, borderRadius: 75 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center", backgroundColor: res.color ? res.color : bgcolor }}>
                                                                    <Image source={{ uri: imageUrl + res.image }} style={{
                                                                        width: 40, height: 40,
                                                                        alignSelf: "center",
                                                                    }} />

                                                                </View>
                                                                <Text style={{ textAlign: "center", color: "#656565", paddingTop: Platform.OS === 'ios' ? 10 : 0 }}>{res.name}</Text>
                                                            </TouchableOpacity>
                                                    )
                                                })}
                                            </ScrollView>

                                        </View>

                                        <View style={{ flex: 0.8, flexDirection: "row", }}>
                                            {this.state.loading ?
                                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                    <ActivityIndicator color={"black"} />
                                                </View> :
                                                this.state.selectedTab.name === 'All' ?
                                                    <ScrollView>
                                                        <View style={{ flex: 1 }}>
                                                            <View style={{
                                                                paddingVertical: 20,
                                                                width: windowWidth,
                                                                marginVertical: 10,
                                                                alignSelf: "center",
                                                                borderBottomWidth: 1, borderColor: "#DFDFDF",
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}>
                                                                <Text style={{ fontSize: 13, color: "#656565" }}>{StringsOfLanguages.overallstatistics}</Text>
                                                                <Text style={{ fontSize: 20, color: "#656565", fontWeight: '800' }}>{StringsOfLanguages.allsubjects}</Text>
                                                                <View style={{ height: 250, justifyContent: "center", alignItems: "center" }}>
                                                                    <VictoryPie
                                                                        data={this.state.allsectiondata}
                                                                        // width={250}
                                                                        height={300}
                                                                        innerRadius={50}
                                                                        animate={{
                                                                            duration: 2000
                                                                        }}
                                                                        labelRadius={({ innerRadius }) => innerRadius + 5}
                                                                        colorScale={["#6a5177", "#d88212", "#277292", "#a3ba6d", "#deb026", "#c44921",]}
                                                                        // labelPosition={({ index }) => index
                                                                        //         ? "centroid"
                                                                        //         : "startAngle"
                                                                        //     }
                                                                        labelPlacement={({ index }) => "parallel"
                                                                        }
                                                                        style={{ labels: { fill: "white", fontSize: 15, fontWeight: "bold" } }}
                                                                    />

                                                                </View>


                                                                <View style={{ position: "absolute", height: 250, top: 70, justifyContent: "center", alignItems: "center" }}>
                                                                    <Text style={{ fontSize: 15, color: "#656565", textAlign: "center" }}>{this.state.allavergae}%{"\n"}{StringsOfLanguages.overall}</Text>
                                                                </View>
                                                                <View style={{
                                                                    marginHorizontal: 10, flexDirection: "row", justifyContent: "space-evenly",
                                                                    flexWrap: "wrap"
                                                                }}>
                                                                    {this.state.allsectiondata.map((res, i) => (
                                                                        <View style={{ paddingHorizontal: 10, alignSelf: "flex-start", flexDirection: "row", marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                                                            <View style={{ width: 10, height: 10, backgroundColor: colorarray[i] }} />
                                                                            <Text style={{ textAlign: "center", marginLeft: 5 }}>{res.name}</Text>
                                                                        </View>
                                                                    ))}
                                                                </View>

                                                            </View>
                                                            {
                                                                this.state.allSubjectData.map((res, i) => (
                                                                    <View style={{
                                                                        paddingVertical: 20,
                                                                        width: windowWidth,
                                                                        marginVertical: 5,
                                                                        backgroundColor: 'white', alignSelf: "center",
                                                                        borderBottomWidth: 1, borderColor: "#DFDFDF",
                                                                        // shadowColor: 'black',
                                                                        // shadowOffset: { width: 0, height: 5 },
                                                                        // shadowOpacity: 1,
                                                                        // shadowRadius: 5,
                                                                        // elevation: 10, borderRadius: 10,
                                                                        justifyContent: "center"
                                                                    }}>
                                                                        <Text style={{ marginLeft: 20, color: colors.Themecolor, fontSize: 18 }}>{res.subjectName}</Text>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 30 }}>
                                                                            <View>
                                                                                <Image source={require('../../assets/images/dashboard/new/correct.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                                <Text style={{ textAlign: "center", color: "#656565" }}>{StringsOfLanguages.correct}</Text>
                                                                                <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.correctAnswer}/{res.totalQuestions}</Text>
                                                                            </View>
                                                                            <View>
                                                                                <Image source={require('../../assets/images/dashboard/new/attempted.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                                <Text style={{ textAlign: "center", color: "#656565" }}>{StringsOfLanguages.attempted}</Text>
                                                                                <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.testAttempts}</Text>
                                                                            </View>
                                                                            <View>
                                                                                <Image source={require('../../assets/images/dashboard/new/speed.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                                <Text style={{ textAlign: "center", color: "#656565" }}>{StringsOfLanguages.avgspeed}</Text>
                                                                                <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.avgQueTime}s</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ marginTop: 30, marginHorizontal: 20 }}>

                                                                            <View>
                                                                                <View style={{ flexDirection: "row" }}>
                                                                                    <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                        <Text style={{ textAlign: "left", fontSize: 11, color: "#88C400" }}>{StringsOfLanguages.easy}</Text>


                                                                                    </View>
                                                                                    <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                        <Progress.Bar progress={res.easy / 100} width={windowWidth / 2} height={10}
                                                                                            borderColor={"#0A7FD7"}
                                                                                            color={res.easy > 50 ? "#88C400" : 50 < res.easy < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                    </View>
                                                                                    <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                        <Text style={{ textAlign: "center", fontSize: 12 }}>{res.easy}%</Text>
                                                                                    </View>
                                                                                </View>

                                                                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                    <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                        <Text style={{ textAlign: "left", fontSize: 11, color: "#0A7FD7" }}>{StringsOfLanguages.medium}</Text>


                                                                                    </View>
                                                                                    <View style={{ flex: 0.65, justifyContent: "center" }}>
                                                                                        <Progress.Bar progress={res.medium / 100} width={windowWidth / 2} height={10}
                                                                                            borderColor={"#0A7FD7"}
                                                                                            color={res.medium > 50 ? "#88C400" : 50 < res.medium < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                    </View>
                                                                                    <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                        <Text style={{ textAlign: "center", fontSize: 12 }}>{res.medium}%</Text>
                                                                                    </View>
                                                                                </View>

                                                                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                    <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                        <Text style={{ textAlign: "left", fontSize: 11, color: "#FE3939" }}>{StringsOfLanguages.hard}</Text>


                                                                                    </View>
                                                                                    <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                        <Progress.Bar progress={res.hard / 100} width={windowWidth / 2} height={10}
                                                                                            borderColor={"#0A7FD7"}
                                                                                            color={res.hard < 30 ? "#FE3939" : res.hard < 70 ? "#0A7FD7" : "#88C400"} />
                                                                                    </View>
                                                                                    <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                        <Text style={{ textAlign: "center", fontSize: 12 }}>{res.hard}%</Text>
                                                                                    </View>
                                                                                </View>




                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                ))}



                                                        </View>
                                                    </ScrollView>
                                                    :
                                                    <ScrollView>
                                                        <View style={{ flex: 1,paddingTop:20}}>
                                                        <Text style={{ marginVertical: 10, textAlign: "center", fontWeight: "bold" }}>Course Progress Average</Text>

                                                            <RNSpeedometer
                                                                size={windowWidth / 1.5}
                                                                minValue={0}
                                                                maxValue={100}
                                                                //maxValue={this.state.testResult.marks ? this.state.testResult.marks : 20}
                                                                value={this.state.speedometercount ? Math.round(this.state.speedometercount) : 0}
                                                                currentValueText="Score-o-meter"
                                                                needleHeightRatio={0.7}
                                                                ringWidth={80}
                                                                needleTransitionDuration={3000}
                                                                needleTransition="easeElastic"
                                                                needleColor={'#695077'}
                                                                segmentColors={['#c54721', '#d88414', '#267093', '#a4b96e']}

                                                                labelNoteStyle={{ fontSize: 20 }}
                                                                labels={[
                                                                    {
                                                                        name: 'Poor',
                                                                        labelColor: '#c54721',

                                                                        activeBarColor: '#c54721',
                                                                    },
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
                                                                        name: 'Good',
                                                                        labelColor: '#267093',
                                                                        activeBarColor: '#267093',
                                                                    },
                                                                    {
                                                                        name: 'Excellent',
                                                                        labelColor: '#a4b96e',
                                                                        activeBarColor: '#a4b96e',
                                                                    },
                                                                ]} />

                                                            <View style={{ marginTop: 70 }}>
                                                                {this.state.bloomsloading ? <Text style={{ textAlign: "center" }}>{StringsOfLanguages.loading}</Text>
                                                                    :
                                                                    this.state.bloomsectioncount > 0 ?
                                                                        <>
                                                                            <Text style={{ marginVertical: 10, textAlign: "center", fontWeight: "bold" }}>Bloom's Taxonomy Average</Text>
                                                                            {/* <PolarRadialBar subjectTaxonomyData={this.state.bloomsdata} /> */}

<ActivityRings data={this.state.blommsData} config={activityConfig} />
                                                                            <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 30, alignItems: "center", justifyContent: "center" }}>
                                                                                {this.state.blommsData.map((res, i) => (
                                                                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                                                                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: res.color }} />
                                                                                        <Text style={{ marginLeft: 5 }}>{res.label}</Text>
                                                                                        <Text style={{ marginLeft: 5 }}>{"("}{res.value*100}{"%)"}</Text>

                                                                                    </View>
                                                                                ))}
                                                                            </View>
                                                                        </> : null}

                                                            </View>
                                                            {this.state.chaptersData.map((res, i) => (
                                                                <View style={{
                                                                    paddingVertical: 20,
                                                                    width: windowWidth,
                                                                    marginVertical: 5,
                                                                    backgroundColor: 'white', alignSelf: "center",
                                                                    borderBottomWidth: 1, borderColor: "#DFDFDF",
                                                                    // shadowColor: 'black',
                                                                    // shadowOffset: { width: 0, height: 5 },
                                                                    // shadowOpacity: 1,
                                                                    // shadowRadius: 5,
                                                                    // elevation: 10, borderRadius: 10,
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <Text style={{ marginLeft: 20, fontSize: 18 }}>{res.name}</Text>
                                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 30 }}>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/correct.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>{StringsOfLanguages.correct}</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.correctAnswer}/{res.totalQuestions}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/attempted.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>{StringsOfLanguages.attempted}</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.testAttempts}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/speed.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>{StringsOfLanguages.avgspeed}</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.avgQueTime}s</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                                                                        <View>
                                                                            <View style={{ flexDirection: "row" }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 ,color:"#88C400"}}>{StringsOfLanguages.easy}</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                    <Progress.Bar progress={res.easy / 100} width={windowWidth / 2} height={10}
                                                                                     borderColor={"#0A7FD7"}
                                                                                        color={res.easy > 50 ? "#88C400" : 50 < res.easy < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{res.easy}%</Text>
                                                                                </View>
                                                                            </View>

                                                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11,color:"#0A7FD7" }}>{StringsOfLanguages.medium}</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center" }}>
                                                                                    <Progress.Bar progress={res.medium / 100} width={windowWidth / 2} height={10}
                                                                                    borderColor={"#0A7FD7"}
                                                                                        color={res.medium > 50 ? "#88C400" : 50 < res.medium < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{res.medium}%</Text>
                                                                                </View>
                                                                            </View>

                                                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 , color:"#FE3939"}}>{StringsOfLanguages.hard}</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                    <Progress.Bar progress={res.hard / 100} width={windowWidth / 2} height={10}
                                                                                    borderColor={"#0A7FD7"}
                                                                                        color={res.hard < 30 ? "#FE3939" : res.hard < 70 ? "#0A7FD7" : "#88C400"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{res.hard}%</Text>
                                                                                </View>
                                                                            </View>




                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    </ScrollView>
                                            }
                                        </View>

                                    </View>
                                </View>
                                <View style={{ flex: 0.12 }}>
                                    <Footer openControlPanel={this.openControlPanel} />
                                </View>
                            </View>

                        }
                    </View>

                </Drawer>
            </>
        )
    }
}
export default Analysis