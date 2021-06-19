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
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
import LeaderComponent from "../../components/LeaderComponent";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class LeaderBoard extends Component {
    constructor(props) {
        super(props)
    }

    onBack(){
		Actions.pop()
	}

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../assets/images/dashboard/new/leader_bg.png')} style={{ width: windowWidth, height: 311 / 1.1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.25, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <TouchableOpacity onPress={this.onBack.bind(this)}>
                                <Image source={require("../../assets/images/left-arrow.png")}
                                    style={{ width: 30, height: 30, tintColor: "#FF7150" }} />
                            </TouchableOpacity>
                            <Text style={{ color: "#FF7150", marginLeft: 20, fontSize: 20 }}>{"Leader Board"}</Text>
                        </View>
                        <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}>
                            <View style={{ width: 294, height: 180, justifyContent: "flex-end" }}>
                                <ImageBackground source={require('../../assets/images/dashboard/new/leaderimage.png')} style={{ width: 323, height: 102, alignSelf: "center" }}>

                            
                                </ImageBackground>
                                <View style={{ width: 325, height: 200, backgroundColor: "transparent", position: "absolute", alignSelf: "center" }}>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ flex: 0.33, marginTop:30,}}>
                                            <View style={{ alignItems: "center" }}>
                                                <View style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: "blue", }}>
                                                    <Image source={require('../../assets/images/avatar-9.jpg')} style={{ width: 60, height: 60, borderRadius: 30, alignSelf: "center" }} />
                                                </View>
                                                <Text style={{ marginBottom: 10 }}>Name</Text>
                                                <Text style={{color:"white",marginTop:30,fontSize:20,marginLeft:10}}>2</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.34,  }}>
                                            <View style={{ alignItems: "center" }}>
                                                <View style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: "blue", }}>
                                                    <Image source={require('../../assets/images/avatar-9.jpg')} style={{ width: 60, height: 60, borderRadius: 30, alignSelf: "center" }} />
                                                </View>
                                                <Text style={{ marginBottom: 10 }}>Name</Text>
                                                <Text style={{color:"white",marginTop:40,fontSize:20,}}>1</Text>

                                            </View>
                                        </View>
                                        <View style={{ flex: 0.33,marginTop:30  }}>
                                            <View style={{ alignItems: "center" }}>
                                                <View style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: "blue", }}>
                                                    <Image source={require('../../assets/images/avatar-9.jpg')} style={{ width: 60, height: 60, borderRadius: 30, alignSelf: "center" }} />
                                                </View>
                                                <Text style={{ marginBottom: 10 }}>Name</Text>
                                                <Text style={{color:"white",marginTop:35,fontSize:20,marginRight:10}}>3</Text>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{
                    height: windowHeight / 1.6, width: windowWidth, backgroundColor: "white", alignSelf: "center",
                    position: "absolute", bottom: 0, borderTopRightRadius: 30, borderTopLeftRadius: 30,
                    shadowColor: 'red',elevation:10,
						shadowOffset: { width: 0, height: 5 },
						marginHorizontal: 20,
						shadowOpacity: 1,
						shadowRadius: 5,
  shadowRadius: 6,
                }}>
                    <LeaderComponent />
                </View>
            </View>

        )
    }
}
export default LeaderBoard