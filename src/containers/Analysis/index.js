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
import { color } from 'react-native-reanimated';

var graphicData = [
    { y: 20, x: '20%', name: "Mathematics" },
    { y: 90, x: '90%', name: "Physics" },
    { y: 50, x: '50%', name: "Chemistry" },
    { y: 60, x: '60%', name: "Biology" },
    { y: 50, x: '50%', name: "English" },
    { y: 60, x: '60%', name: "Hindi" },
];
var colorarray = ["#6a5177", "#d88212", "#277292", "#a3ba6d", "#deb026", "#c44921","red","green","blue"]
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
            allavergae:"",
            allsectiondata:[],
            mainsubjects:[],
            user: {}
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
                            count = count+ res.percent
                            var obj  = { y: 20, x: +res.percent+'%', name: res.name }
                            newarray1.push(obj)
                            
                        })
                       

                     this.setState({
                         allsectiondata:newarray1 ,
                         allavergae:  Math.floor(count / data.subjects.length)
                     })

                        // })
                        newArray.unshift({
                            name: 'All',
                            image: require('../../assets/images/dashboard/new/alllearning.png')
                        })
                        this.setState
                            ({
                                spinner: false,
                                mainsubjects:data.subjects,
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
            this.setState({
                loading: false
            })
        } else {
            this.getChaptersdata()
            this.getpiechatdata()
        }


    }
    getpiechatdata() {
        const { user, token } = this.state
        var url;
        if (user.user_role === 'Student') {
            url = baseUrl + "/student/learningAnalytics/chapters/" + user.grade_id + "/" + this.state.selectedTab.reference_id + "?school_id=" + user.school_id + "&section_id=" + user.section_id
        } else if (user.user_role === 'General Student') {
            url = baseUrl + "/student/learningAnalytics/chapters/" + user.grade_id + "/" + this.state.selectedTab.reference_id + "?school_id=''&section_id=''"
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
                        console.log("chaptersssss", json.data)
                        var piearray = [];
                        var colorsarray = ["#267093", "#697077", "#a4b96e", "#c54721"]
                        var count = 0
                        data.map((res, i) => {

                            count = count + res.percentage
                            // var randomItem = colorsarray[Math.floor(Math.random() * colorsarray.length)];
                            // var obj = {
                            //     name: res.name,
                            //     population: 2800000,
                            //     color: randomItem,
                            //     legendFontColor: "#7F7F7F",
                            //     legendFontSize: 10,
                            //     percentagevalue: res.percentage
                            // }
                            // piearray.push(obj)
                        })
                        console.log("array22222", count / data.length)
                        this.setState({
                            piesections: Math.floor(count / data.length),
                            loading: false,

                        })

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
                        console.log("chaptersssss", json.data)
                        this.setState
                            ({

                                chaptersData: data
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
            selectedTab: res
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
                            <Text style={{ color: "white", marginLeft: 20, fontSize: 20 }}>Learning Analysis</Text>

                        </View>
                        {/* <Text style={{color:"white",paddingHorizontal:20,flexWrap:"wrap",marginTop:20}}>Track your Learning performance and progress reports</Text> */}
                    </ImageBackground>
                    <View style={{
                        height: windowHeight / 1.2, width: windowWidth, backgroundColor: "white", alignSelf: "center",
                        position: "absolute", bottom: 0, borderTopRightRadius: 30, borderTopLeftRadius: 30
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
                                                    var colorsarray = imagesarray
                                                    var randomItem = colorsarray[Math.floor(Math.random() * colorsarray.length)];
                                                    var bgcolor = randomItem
                                                    return (
                                                        i === 0 ?
                                                            <TouchableOpacity onPress={this.onTab.bind(this, res)}
                                                                style={{
                                                                    borderBottomWidth: 3,
                                                                    borderColor: this.state.selectedTab.name === res.name ? "#A44084" : "transparent",
                                                                    paddingHorizontal: 10, marginHorizontal: 10, justifyContent: "center"
                                                                }}>
                                                                <ImageBackground source={res.image} style={{ width: 80, height: 80, justifyContent: "center", alignItems: "center" }}>


                                                                </ImageBackground>
                                                                <Text style={{ textAlign: "center", color: "#656565" }}>{res.name}</Text>
                                                            </TouchableOpacity> :
                                                            <TouchableOpacity onPress={this.onTab.bind(this, res)}
                                                                style={{
                                                                    borderBottomWidth: 3,
                                                                    borderColor: this.state.selectedTab.name === res.name ? "#A44084" : "transparent",
                                                                    paddingHorizontal: 10, marginHorizontal: 10, justifyContent: "center"
                                                                }}>
                                                                <ImageBackground source={bgcolor} style={{ width: 80, height: 80, justifyContent: "center", alignItems: "center" }}>
                                                                    <Image source={{uri: imageUrl +res.image}} style={{ width: 35, height: 35,
                                                                     alignSelf: "center",  }} />

                                                                </ImageBackground>
                                                                <Text style={{ textAlign: "center", color: "#656565" }}>{res.name}</Text>
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
                                                                <Text style={{ fontSize: 13, color: "#656565" }}>Overall Statistics</Text>
                                                                <Text style={{ fontSize: 20, color: "#656565", fontWeight: '800' }}>All Subjects</Text>
                                                               <View style={{height:250,justifyContent:"center",alignItems:"center"}}>
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
                                                                    <Text style={{ fontSize: 15, color: "#656565", textAlign: "center" }}>{this.state.allavergae}%{"\n"}overall</Text>
                                                                </View>
                                                                <View style={{marginHorizontal:10,flexDirection:"row",justifyContent:"space-evenly",
                                                                flexWrap:"wrap"}}>
                                                                {this.state.allsectiondata.map((res,i)=>(
                                                                    <View style={{paddingHorizontal:10,alignSelf:"flex-start",flexDirection:"row",marginTop:10,justifyContent:"center",alignItems:"center"}}>
                                                                        <View style={{width:10,height:10,backgroundColor:colorarray[i]}}/>
                                                                        <Text style={{textAlign:"center",marginLeft:5}}>{res.name}</Text>
                                                                     </View>
                                                                 ))}
                                                                </View>
                                                                
                                                            </View>
                                                            <View style={{
                                                                    paddingVertical: 5,
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
                                                                   
                                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/correct.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>Correct</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{10}/{20}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/attempted.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>Attempted</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{3}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/speed.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>Avg. Speed</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{130}s</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                                                                        <View>
                                                                            <View style={{ flexDirection: "row" }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 }}>Easy</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                    <Progress.Bar progress={90 / 100} width={windowWidth / 2} height={10}
                                                                                        color={90 > 50 ? "#88C400" : 50 < 90 < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{90}%</Text>
                                                                                </View>
                                                                            </View>

                                                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 }}>Medium</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center" }}>
                                                                                    <Progress.Bar progress={60 / 100} width={windowWidth / 2} height={10}
                                                                                        color={60 > 50 ? "#88C400" : 50 < 60 < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{60}%</Text>
                                                                                </View>
                                                                            </View>

                                                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 }}>Hard</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                    <Progress.Bar progress={20 / 100} width={windowWidth / 2} height={10}
                                                                                        color={20 < 30 ? "#FE3939" : 20 < 70 ? "#0A7FD7" : "#88C400"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{20}%</Text>
                                                                                </View>
                                                                            </View>




                                                                        </View>
                                                                    </View>
                                                                </View>

                                                        </View>
                                                    </ScrollView>
                                                    :
                                                    <ScrollView>
                                                        <View style={{ flex: 1, }}>
                                                            <View style={{
                                                                paddingVertical: 20,
                                                                width: windowWidth,
                                                                marginVertical: 10,
                                                                backgroundColor: 'white', alignSelf: "center",
                                                                borderBottomWidth: 1, borderColor: "#DFDFDF",
                                                                // shadowColor: 'black',
                                                                // shadowOffset: { width: 0, height: 5 },
                                                                // shadowOpacity: 1,
                                                                // shadowRadius: 5,
                                                                // elevation: 10, borderRadius: 10,
                                                                justifyContent: "center"
                                                            }}>
                                                                {/* <PieChart
                                        data={this.state.piesections}
                                        hasLegend={false}
                                        width={windowWidth}
                                        height={220}
                                        paddingLeft={windowWidth / 6}
                                        chartConfig={chartConfig}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}

                                    /> */}
                                                                <ProgressCircle style={{ height: 150, }} progress={this.state.piesections / 100}
                                                                    strokeWidth={10} progressColor={"#FF603D"}>

                                                                </ProgressCircle>
                                                                <View style={{ position: "absolute", alignSelf: "center" }}>
                                                                    <Text style={{ color: "#656565", fontSize: 20, textAlign: "center" }}>{this.state.piesections}%</Text>
                                                                    <Text style={{ color: "#656565", fontSize: 10, textAlign: "center" }}>Avg.{"\n"}Performance</Text>
                                                                </View>
                                                                {/* <View style={{ paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                                        {this.state.piesections.map((res, i) => (
                                            <View style={{ flexDirection: "row", margin: 10, justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: res.color, marginRight: 10 }} />
                                                <Text>{res.name} ({Math.floor(res.percentagevalue)}%)</Text>

                                            </View>

                                        ))}
                                    </View> */}
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
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>Correct</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.correctAnswer}/{res.totalQuestions}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/attempted.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>Attempted</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.testAttempts}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../../assets/images/dashboard/new/speed.png')} style={{ width: 40, height: 40, alignSelf: "center", resizeMode: "contain" }} />
                                                                            <Text style={{ textAlign: "center", color: "#656565" }}>Avg. Speed</Text>
                                                                            <Text style={{ textAlign: "center", color: "#656565", fontWeight: "bold" }}>{res.avgQueTime}s</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                                                                        <View>
                                                                            <View style={{ flexDirection: "row" }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 }}>Easy</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                    <Progress.Bar progress={res.easy / 100} width={windowWidth / 2} height={10}
                                                                                        color={res.easy > 50 ? "#88C400" : 50 < res.easy < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{res.easy}%</Text>
                                                                                </View>
                                                                            </View>

                                                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 }}>Medium</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center" }}>
                                                                                    <Progress.Bar progress={res.medium / 100} width={windowWidth / 2} height={10}
                                                                                        color={res.medium > 50 ? "#88C400" : 50 < res.medium < 30 ? "#0A7FD7" : "#FE3939"} />
                                                                                </View>
                                                                                <View style={{ flex: 0.15, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{res.medium}%</Text>
                                                                                </View>
                                                                            </View>

                                                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                                                                    <Text style={{ textAlign: "left", fontSize: 11 }}>Hard</Text>


                                                                                </View>
                                                                                <View style={{ flex: 0.65, justifyContent: "center", }}>
                                                                                    <Progress.Bar progress={res.hard / 100} width={windowWidth / 2} height={10}
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