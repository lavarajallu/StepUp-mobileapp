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
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { Validations } from '../../helpers'
const data = [
{
    name:"Mathematics",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
},{
    name:"Physics",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
},{
    name:"Chemistry",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
},{
    name:"Biology",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
},{
    name:"Chemistry",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
},{
    name:"Biology",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
}]
class PracticeComponent extends Component {
    constructor(props) {
        super(props)
    }
    onItem(item){
        Actions.push("practicechapter",{"data":data})
    }
    onBack(){
        this.props.onBack()
    }
    renderItem({item}){
        var percent = item.progress*100
    return(
        <View  style={{ paddingTop: 30,marginTop: 10,marginBottom:20 }}>
                <TouchableOpacity onPress={this.onItem.bind(this,item)}
                    style={styles.rectview}>
                    <View style={styles.subview}>
                        <View style={styles.topsubview}></View>
                        <View style={styles.bottomsubview}>
                            <Text style={styles.subjectname}>{item.name}</Text>
                            {Platform.OS === 'android' ?
                                <View style={styles.progressview}>
                                    <View style={styles.progresstextview}>
                                        <Text style={styles.progresstext}>Progress</Text>
                                        <Text style={styles.progresstext}>{percent}%</Text></View>
                                        {Platform.OS === 'android' ? 
                                         <ProgressBar
                                              color="green"
                                              styleAttr="Horizontal"
                                              indeterminate={false}
                                              progress={0.5}
                                            />
                                         :
                                    <ProgressView
                                              progressTintColor="orange"
                                              trackTintColor="blue"
                                              progress={0.7}
                                    />}</View> : null}

                            <View style={styles.countview}>
                                <View style={styles.innercountview}>
                                    <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
                                    <Text style={styles.icontext}>{item.reads}</Text>
                                </View>
                                 <View style={styles.innercountview}>
                                    <Image source={require('../../assets/images/magnifier.png')} style={[styles.iconview,{tintColor:"grey"}]} />
                                    <Text style={styles.icontext}>{item.reads}</Text>
                                </View>
                                </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.relativeview}>
                    <ImageBackground source={item.image} style={{
                        width: 944 / 9,
                        height: 912 /9,
                        position: 'absolute',
                        justifyContent: "center",
                        alignSelf:'center',
                        top: -210,
                       // left: -140,
                         elevation: 12,
                    }}><Image source={item.insideimg} style={{
                        width: 944 / 13,
                        height: 912 /13,alignSelf:"center"}} />
                    </ImageBackground>
                </View></View>

        )
}
    render() {
        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                    </TouchableOpacity>
                <View style={styles.mainsubview}>
                <View style={styles.mainmiddleview}>
                <View style={styles.middleview}>
                <Text style={styles.textmain}>Practice</Text>
                </View>
                <View style={styles.listview}>
                
                <FlatList data={data} 
                            renderItem={this.renderItem.bind(this)}
                            style={{alignSelf: 'center'  }}
                             numColumns={2} 
                            // showVerticalScrollIndicator={false}
                             /></View><View style={{flex:0.1}}/>
                             </View>
                </View>
                    <ImageBackground source={require('../../assets/images/yellowround.png')} style={styles.subjectinner}>
                        <Image source={require('../../assets/images/math.png')} style={{alignSelf: "center",width:128/1.5,height:128/1.5 }} />
                    </ImageBackground>
            </View>
        )
    }
}
export default PracticeComponent