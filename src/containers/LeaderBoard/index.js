import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Platform,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Modal from 'react-native-modal';

import { Actions } from 'react-native-router-flux';
import styles from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageUrl, colors } from '../../constants';
import LeaderComponent from "../../components/LeaderComponent";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import Drawer from 'react-native-drawer'
import { nullPlaceholder } from 'i18n-js';
import { TouchableNativeFeedback } from 'react-native';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: "",
            token: "",
            loading: true,
            currentstudent: {},
            leaderdata: [],
            isvisible:false,
            leadercriteria: [],
            ismypoints: false
        }
    }

    onBack() {
        Actions.pop()
    }

    componentDidMount() {
        this.getData()
    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    onmypoints(){
        var url = "http://api.newcleusit.com/leader-board-points/points"
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
        }).then((response) =>

            response.json())
            .then((json) => {
                console.log("pointssssssss", json)
                if (json.data) {

                   
                    this.setState({
                        spinner: false,
                        mypointsdata: json.data.pointsList.data,
                        ismypoints: true
                    })

                } else {
                    this.setState({
                        spinner: false,
                        ismypoints: true,
                        mypointsdata: [],
                    })
                }
            }

            )
            .catch((error) => console.error(error))

    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user')
            //  alert(JSON.stringify(value))
            if (value !== null) {
                var data = JSON.parse(value)

                const token = await AsyncStorage.getItem('@access_token')
                console.log("leaderdataaa", token)
                if (token) {
                    this.setState({
                        token: JSON.parse(token),
                        userDetails: data,
                    }, () => {this.getpoints(data)
                    this.getCriteria()})




                } else {

                }

            } else {
                console.log("errorrr")
            }
        } catch (e) {
            return null;
        }
    }

    getCriteria(){
        var url = "http://api.newcleusit.com/leader-board"
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
        }).then((response) =>

            response.json())
            .then((json) => {
                console.log("leadercriteria", json)
                if (json.data) {

                   
                    this.setState({
                        spinner: false,
                        leadercriteria: json.data,
                       // currentstudent: newObj
                    })

                } else {
                    this.setState({
                        spinner: false,
                        leadercriteria: [],
                    })
                }
            }

            )
            .catch((error) => console.error(error))
    }

    getpoints(data) {
        console.log("validpackages", this.state.token)
        var url = "http://api.newcleusit.com/leader-board-points/positions"
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
        }).then((response) =>

            response.json())
            .then((json) => {
                console.log("leaderboarddddd", json)
                if (json.data) {

                    let cUserRank = json.data.find((sr) => sr.reference_id === this.state.userDetails.reference_id)
                      let newObj
                    if (cUserRank) {
                        newObj = { ...cUserRank }
                        const rank = json.data.findIndex((sr) => sr.reference_id === this.state.userDetails.reference_id)
                        newObj.rank = rank + 1
                      }
                
                    console.log("lkjksdjfkdjf", newObj)
                    this.setState({
                        loading: false,
                        leaderdata: json.data,
                        currentstudent: newObj
                    })

                } else {
                    this.setState({
                        loading: false,
                        leaderdata: [],
                        currentstudent: {}
                    })
                }
            }

            )
            .catch((error) => console.error(error))
    }
    onrulebook(){
        this.setState({
            isvisible:true
        })
    }

    render() {
        return (

            <Drawer
                type="overlay"
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.25}
                content={<SideMenu closeControlPanel={this.closeControlPanel} />}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.08, flexDirection: "row", alignItems: "center", backgroundColor: colors.Themecolor,justifyContent:"space-between" }}>
                        <TouchableOpacity onPress={this.onBack.bind(this)}>
                            <Image source={require("../../assets/images/left-arrow.png")}
                                style={{ width: 30, height: 30, tintColor: "white", marginLeft: 10, }} />
                        </TouchableOpacity>
                        <Text style={{ color: "white",  fontSize: 20 }}>{"Leader Board"}</Text>
                        <TouchableOpacity style={{marginRight:10}} onPress={this.onrulebook.bind(this)}>
                            <Image source={require('../../assets/images/book.png')} style={{width:30,height:30,tintColor:"lightgrey"}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.84 }}>
                        {this.state.loading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text>Loading...</Text>
                            </View> :

                            this.state.leaderdata.length > 0 ?

                                <View style={{ flex: 1 }}>
                                    <ImageBackground source={require('../../assets/images/dashboard/new/leader_bg.png')}
                                        style={{ width: windowWidth, height: windowHeight }}>
                                        <View style={{ flex: 1 }}>


                                            <View style={{ flex: 1, alignItems: "center" }}>
                                                <View style={{ flex: 0.2, justifyContent: "flex-end" }}>

                                                    <View style={{ width: "100%", height: "100%", alignSelf: "center", flexDirection: "row" }}>
                                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                            <View style={{ flex: 0.33, marginTop: 30, }}>
                                                                <View style={{ alignItems: "center" }}>
                                                                    <View style={{ width: 65, height: 65, borderRadius: 65 / 2, borderWidth: 1, borderColor: colors.Themecolor, justifyContent: "center", alignItems: 'center' }}>
                                                                        {this.state.leaderdata[1].profile_pic ?
                                                                            <Image source={{ uri: imageUrl + this.state.leaderdata[1].profile_pic }}
                                                                                style={{ width: 60, height: 60, borderRadius: 60 / 2, alignSelf: "center" }} />
                                                                            :
                                                                            <Image source={require('../../assets/images/user.png')}
                                                                                style={{ width: 60, height: 60, borderRadius: 60 / 2, alignSelf: "center" }} />
                                                                        }
                                                                    </View>
                                                                    <View style={{
                                                                        width: 25, height: 25, backgroundColor: "green", position: "absolute", borderRadius: 25 / 2,
                                                                        justifyContent: "center", alignItems: "center", top: 45, right: 30
                                                                    }}>
                                                                        <Text style={{ color: "white" }}>2</Text>
                                                                    </View>
                                                                    <Text style={{ marginTop: 15 }}>{this.state.leaderdata[1].name}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flex: 0.34, }}>
                                                                <View style={{ alignItems: "center" }}>
                                                                    <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: colors.Themecolor, justifyContent: "center", alignItems: "center" }}>
                                                                        {this.state.leaderdata[0].profile_pic ?
                                                                            <Image source={{ uri: imageUrl + this.state.leaderdata[0].profile_pic }}
                                                                                style={{ width: 75, height: 75, borderRadius: 75 / 2, alignSelf: "center" }} />

                                                                            :
                                                                            <Image source={require('../../assets/images/user.png')} style={{ width: 75, height: 75, borderRadius: 75 / 2, alignSelf: "center" }} />
                                                                        }
                                                                        <View style={{
                                                                            width: 25, height: 25, backgroundColor: "green", position: "absolute", borderRadius: 25 / 2, alignSelf: "flex-end",
                                                                            justifyContent: "center", alignItems: "center", top: 55
                                                                        }}>
                                                                            <Text style={{ color: "white" }}>1</Text>
                                                                        </View>

                                                                    </View>
                                                                    <Text style={{ marginTop: 15 }}>{this.state.leaderdata[0].name}</Text>

                                                                </View>
                                                            </View>
                                                            <View style={{ flex: 0.33, marginTop: 30 }}>
                                                                <View style={{ alignItems: "center" }}>
                                                                    <View style={{ width: 65, height: 65, borderRadius: 65 / 2, borderWidth: 1, borderColor: colors.Themecolor, justifyContent: "center", alignItems: "center" }}>
                                                                        {this.state.leaderdata[2].profile_pic ?
                                                                            <Image source={{ uri: imageUrl + this.state.leaderdata[2].profile_pic }}
                                                                                style={{ width: 60, height: 60, borderRadius: 30, alignSelf: "center" }} />

                                                                            :
                                                                            <Image source={require('../../assets/images/user.png')} style={{ width: 60, height: 60, borderRadius: 30, alignSelf: "center" }} />
                                                                        }
                                                                    </View>
                                                                    <View style={{
                                                                        width: 25, height: 25, backgroundColor: "green", position: "absolute", borderRadius: 25 / 2,
                                                                        justifyContent: "center", alignItems: "center", top: 45, right: 30
                                                                    }}>
                                                                        <Text style={{ color: "white" }}>3</Text>
                                                                    </View>
                                                                    <Text style={{ marginTop: 10 }}>{this.state.leaderdata[2].name}</Text>

                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.8, }}>
                                                    <LeaderComponent leaderdata={this.state.leaderdata} />

                                                </View>
                                                <TouchableOpacity onPress={this.onmypoints.bind(this)} style={{ position: "absolute", width: windowWidth, height: 70,justifyContent:"center", backgroundColor: colors.Themecolor, 
                                                top: Platform.OS === 'android' ? windowHeight / 1.4: windowHeight / 1.5 }}>
                                                    <View style={{
                                                        height: 60,
                                                        width: windowWidth,  alignSelf: "center"
                                                    }}>
                                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                                            <View style={{ flex: 0.15, justifyContent: "center", alignItems: "center" }}>
                                                                <View style={{width:25,height:25,backgroundColor:"green",borderRadius:25/2,justifyContent:"center",alignItems:"center"}}>
                                                                <Text style={{ color: "white" }}>{this.state.currentstudent.rank}</Text>

                                                                </View>
                                                            </View>
                                                            <View style={{ flex: 0.65, flexDirection: "row", alignItems: "center" }}>
                                                                {this.state.currentstudent.profile_pic ?
                                                                    <Image source={{ uri: imageUrl + this.state.currentstudent.profile_pic }} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: "center" }} />

                                                                    :
                                                                    <Image source={require('../../assets/images/avatar-9.jpg')} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: "center" }} />
                                                                }
                                                                <Text style={{ marginLeft: 10,color:"white" }}>{this.state.currentstudent.name}</Text>
                                                            </View>
                                                            
                                                            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                                                           
                                                                <Text style={{color:"white"}}>{this.state.currentstudent.points}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View> :

                                <View style={{ flex: 0.9, justifyContent: "center", alignItems: "center" }}>
                                    <Text>No Data</Text>
                                </View>}
                    </View>
                    <View style={{ flex: 0.08, flexDirection: "row", alignItems: "center", backgroundColor: colors.Themecolor }}>
                        <Footer openControlPanel={this.openControlPanel} />

                    </View>
                </View>

                <Modal isVisible={this.state.isvisible}>
                         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                             <View style={{ width:windowWidth/1.2, height:windowHeight/1.5, backgroundColor: 'white', marginVertical: 15 }}>
                                <View style={{paddingVertical:20,backgroundColor:colors.Themecolor,flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
                                 <Text style={{fontSize:18,textAlign:"center",color:"white"}}>Rule Book</Text>
                                 <TouchableOpacity onPress={()=>this.setState({isvisible: false})}>
                                     <Image source={require('../../assets/images/cancel.png')} style={{width:30,height:30,tintColor:"white"}}/>
                                 </TouchableOpacity>
                                 </View>
                                 <View style={{backgroundColor:'white',}}>
                                     {this.state.leadercriteria && this.state.leadercriteria.length > 0 ?
                                     <ScrollView>
                                      {this.state.leadercriteria.map((res,i)=>
                                      <View style={{padding:20,margin:10,flexDirection:"row"}}>
                                        <View style={{flex:1,flexDirection:"row"}}>
                                            <View style={{flex:0.7,justifyContent:"center",}}>
                                            <Text>{res.name}</Text>

                                            </View>
                                            <View style={{flex:0.3,justifyContent:"center",alignItems:"flex-end"}}>
                                                <View style={{backgroundColor:colors.Themecolor,width:70,paddingVertical :5,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                                <Text style={{color:"white"}}>{res.points} pts</Text>

                                                </View>
                                            </View>
                                        </View>
                                        </View>

                                      )}
                                      </ScrollView>
                                     
                                     : <View style={{justifyContent:"center",alignItems:"center"}}>
                                     <Text>No data</Text></View> }
                                 </View>
                             </View>
                         </View>
                     </Modal>

                     <Modal isVisible={this.state.ismypoints}>
                         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                             <View style={{ width:windowWidth/1.2, height:windowHeight/1.5, backgroundColor: 'white', marginVertical: 15 }}>
                                <View style={{paddingVertical:20,backgroundColor:colors.Themecolor,flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
                                 <Text style={{fontSize:18,textAlign:"center",color:"white"}}>My Points</Text>
                                 <TouchableOpacity onPress={()=>this.setState({ismypoints: false})}>
                                     <Image source={require('../../assets/images/cancel.png')} style={{width:30,height:30,tintColor:"white"}}/>
                                 </TouchableOpacity>
                                 </View>
                                 <View style={{backgroundColor:'white',}}>
                                     {this.state.mypointsdata && this.state.mypointsdata.length > 0 ?
                                     <ScrollView>
                                      {this.state.mypointsdata.map((res,i)=>
                                      <View style={{padding:20,margin:10,flexDirection:"row"}}>
                                        <View style={{flex:1,flexDirection:"row"}}>
                                            <View style={{flex:0.7,justifyContent:"center",}}>
                                            <Text>{res.leaderBoard.name}</Text>

                                            </View>
                                            <View style={{flex:0.3,justifyContent:"center",alignItems:"flex-end"}}>
                                                <View style={{backgroundColor:colors.Themecolor,width:70,paddingVertical :5,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                                <Text style={{color:"white"}}>{res.leaderBoard.points} pts</Text>

                                                </View>
                                            </View>
                                        </View>
                                        </View>

                                      )}
                                      </ScrollView>
                                     
                                     :
                                     <View style={{justifyContent:"center",alignItems:"center"}}>
                                     <Text>No data</Text></View> }
                                 </View>
                             </View>
                         </View>
                     </Modal>

            </Drawer>
        )
    }
}
export default LeaderBoard