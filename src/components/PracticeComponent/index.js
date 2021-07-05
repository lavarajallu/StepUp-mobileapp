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
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
import * as Progress from 'react-native-progress';
const windowHeight = Dimensions.get('window').height;
import { Validations } from '../../helpers'
import { imageUrl } from '../../constants';
const data = [
    {
        name: "Mathematics",
        reads: 30,
        progress: 0.5,
        image: require('../../assets/images/yellowround.png'),
        insideimg: require('../../assets/images/math.png'),
    }, {
        name: "Physics",
        reads: 30,
        progress: 0.5,
        image: require('../../assets/images/yellowround.png'),
        insideimg: require('../../assets/images/math.png'),
    }, {
        name: "Chemistry",
        reads: 30,
        progress: 0.5,
        image: require('../../assets/images/yellowround.png'),
        insideimg: require('../../assets/images/math.png'),
    }, {
        name: "Biology",
        reads: 30,
        progress: 0.5,
        image: require('../../assets/images/yellowround.png'),
        insideimg: require('../../assets/images/math.png'),
    }, {
        name: "Chemistry",
        reads: 30,
        progress: 0.5,
        image: require('../../assets/images/yellowround.png'),
        insideimg: require('../../assets/images/math.png'),
    }, {
        name: "Biology",
        reads: 30,
        progress: 0.5,
        image: require('../../assets/images/yellowround.png'),
        insideimg: require('../../assets/images/math.png'),
    }]
    var b = [];
class PracticeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectsData: this.props.subjectsData,
            spineer: true
        }
    }
    onItem(item) {
        Actions.push("practicechapter", {data: item })
    }
    onBack() {
        this.props.onBack()
    }
    componentDidMount() {
        if (this.props.subjectsData) {
            console.log(JSON.stringify(this.props.subjectsData))
            this.setState({
                subjectsData: this.props.subjectsData,
                spineer: false
            })
        }
    }
    renderItem({ item }) {
        var colorsarray =["#FF603D","#0A7FD7","#9863DF","#5D9702","#0D7B5A","#D09A12"]
		var randomItem = colorsarray[Math.floor(Math.random()*colorsarray.length)];
        var bgcolor ;
        
        var percent = (item.percent)

        console.log("item,item", item)
        const url = imageUrl + item.image
        var progress = 0 + (0.4 * Math.random())
        // var percent = (item.percent) * 100;
        var color;
        if (percent > 80) {
            color = "green"
        } else if (color < 50) {
            color = "red"
        } else {
            color = "orange"
        }
        if(item.color) {
			bgcolor = item.color
		}else{
            item["color"] = randomItem
            bgcolor = randomItem
		}
       console.log("itemmmmmmmmm",item)
        return (
            <TouchableHighlight onPress={() => this.onItem(item)} underlayColor="transparent" activeOpacity={0.9} style={{ backgroundColor: 'transparent', borderWidth: 0.1, borderColor: 'transparent', margin: 5, flex: 1 }}>

<ImageBackground source={require('../../assets/images/dashboard/pattern.png')}
					style={[styles.rectview, { backgroundColor: bgcolor}]} opacity={0.5} >
                    <View style={styles.subview}>
                        <View style={styles.topsubview}>

                            {item.image ?

                                <Image source={{ uri: url }} style={{ alignSelf: "center", width: 128 / 2.5, height: 128 / 2.5, marginTop: 8, marginRight: 5 }} />
                                : <Image source={require('../../assets/images/noimage.png')}
                                    style={{ width: 128 / 2.5, height: 128 / 2.5, resizeMode: "contain" }} />}

                            <Text style={styles.subjectname}>{item.name}</Text>



                        </View>
                        <View style={styles.bottomsubview}>
                            <View style={styles.countview}>
                                <View style={{ paddingVertical: 10, width: "100%", borderRadius: 3,justifyContent:"center" }}>
                                <View style={{alignItems:"center",justifyContent:"center"}}>
							        <View style={styles.innercountview}>
									  <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									  <Text style={styles.icontext}>{item.chaptersCount}</Text>
								  </View>
								  <Text style={{color:"white",fontSize:8}}>Chapters</Text></View>
								 {/* <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/magnifier.png')} style={styles.iconview} />
								 </View> */}
									   {/* <View style={{alignItems:"center",justifyContent:"center"}}>
								  <View style={styles.innercountview}>
									  <Image source={require('../../assets/images/2.png')} style={styles.iconview} />
									  <Text style={styles.icontext}>{item.topicsCount}</Text>
								  </View>
								  <Text style={{color:"white",fontSize:8}}>Topic</Text>
								  </View> */}
                                    </View> 
                            </View>
                        </View>
                    </View>
                </ImageBackground>

            </TouchableHighlight>

        )
    }
    render() {
        return (

            <View style={{ flex: 1 }}>

                {/* <View style={{ flex: 0.1, justifyContent: "center" }}>
                    <TouchableOpacity onPress={this.onBack.bind(this)}>
                        <Image source={require("../../assets/images/left-arrow.png")}
                            style={styles.backimage} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.2, justifyContent: "flex-start", alignItems: "center", }}>
                    <ImageBackground source={require('../../assets/images/Asset_2.png')}
                        style={{ width: 123 / 1.5, height: 127 / 1.5, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                        <Image source={require('../../assets/images/math.png')} style={{ alignSelf: "center", width: 128 / 2.5, height: 128 / 2.5, borderRadius: 32, marginTop: 8, marginRight: 5 }} />
                    </ImageBackground>

                    <Text style={styles.textmain}>{"Practice"}</Text>

                </View> */}
                <View style={{ flex: 1 }}>
                    {this.state.spineer ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={"black"} /></View>
                        :
                        <FlatList data={this.state.subjectsData}
                            renderItem={this.renderItem.bind(this)}
                            numColumns={2}
                        // showVerticalScrollIndicator={false}
                        />
                    }
                </View>

            </View>
        )
    }
}
export default PracticeComponent
