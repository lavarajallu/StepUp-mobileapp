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
import SegmentedControlTab from "react-native-segmented-control-tab";
import Star from 'react-native-star-view';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { Validations } from '../../helpers'
import LiveSession from "../../components/LiveSession"

const data = [
    {
        name: "Mathematics",
        image: require('../../assets/images/algebra.png'),
        insideimg: require('../../assets/images/math.png'),
        progress: 0.7,
        test: 6, read: 40,
        preasses:true,
        acadamics:[
        {
            name:"Acadamics"
        },
        {
            name:"IIT"
        },{
            name:"JEE"
        },
        {
            name:"NEET"
        }]
    },{
        name: "Physics",
        image: require('../../assets/images/algebra.png'),
        insideimg: require('../../assets/images/math.png'),
        progress: 0.2,
        test: 6, read: 40,
        preasses:false,
         acadamics:[
        {
            name:"Acadamics"
        },
        {
            name:"IIT"
        },{
            name:"JEE"
        },
        {
            name:"NEET"
        }]
    },{
        name: "Chemistry",
        preasses:true,
        image: require('../../assets/images/algebra.png'),
        insideimg: require('../../assets/images/math.png'),
        progress: 0.9,
        test: 6, read: 40,
         acadamics:[]
    },]

class TopicsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
      selectedIndex: 0
    };
    }
    handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };
     onTopicPress(item){
     // alert(JSON.stringify(item))
     this.props.onTopicPress(item)
    }
    onBack(){
      Actions.pop()
    }
    renderItem({ item }) {
        var percent = (item.progress) * 100;
        let color
        if(percent>80){
            color = "green"
        }else if(percent < 50){
            color ="red"
        }else{
            color = "orange"
        }
         const starStyle = {
      width: 50,
      height: 10,
      color:"grey"
    };
        return (
            <View  style={styles.itemview}>
                <TouchableOpacity onPress={this.onTopicPress.bind(this,item)}
                    style={styles.rectview}>
                    <View style={styles.innerrect}>
                    <Image source={item.image} style={styles.inerImage} />
                    </View>
                    <View style={styles.leftinnerview}>
                    <View style={{flexDirection: 'row',justifyContent:"space-between",marginVertical: 10 }}>
                    <Text style={styles.subjectname}>{item.name}</Text>
                    <Image source={require('../../assets/images/magnifier.png')} style={{width:20,height:20,alignSelf:"center",tintColor:"grey",marginRight:10}}/>
                    </View>
                    <View style={styles.progressview}>
                                    <View style={styles.progresstextview}>
                                        <Text style={styles.progresstext}>Progress</Text>
                                        <Text style={styles.progresstext}>{percent}%</Text></View>
                                    {Platform.OS === 'android' ? 
                                         <ProgressBar
                                              color={color}
                                              styleAttr="Horizontal"
                                              indeterminate={false}
                                              progress={item.progress}
                                            />
                                         :
                                    <ProgressView
                                              progressTintColor="orange"
                                              trackTintColor="blue"
                                              progress={0.7}
                                    />}
                                    </View> 
                                   <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                                   {item.acadamics.map((res,i)=>
                                        <View>
                                        <Text style={{textAlign:"center"}}>{res.name}</Text>
                                        <View style={{borderWidth: 1,borderColor:"grey",borderRadius:10,padding:2}}>
                                       <Star score={2} style={starStyle} />
                                        </View>
                                        </View>
                                    )}
                                
                                   </View>
                        
                    </View>
                     </TouchableOpacity>
                    </View>

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
                <Text style={styles.textmain}>Number Systems</Text>
                </View>
                <View style={styles.listview}>
                 <SegmentedControlTab
                      values={["Topics", "Live Sessions"]}
                      tabStyle={styles.tabstyle}
                       firstTabStyle={{borderRightWidth: 0}}
                      activeTabStyle={styles.activetab}
                      activeTabTextStyle={styles.activetabtext}
                      tabTextStyle={styles.tabtext}
                      selectedIndex={this.state.selectedIndex}
                      onTabPress={this.handleIndexChange}
                    />
                    {this.state.selectedIndex ===0 ? 
                    <View style={{flex:1}}>
                   <FlatList data={data}
                    renderItem={this.renderItem.bind(this)}
                    showsHorizontalScrollIndicator={false} />
                    </View> :
                     <View style={{flex:0.8,}}>
                     <LiveSession onTopicPress={this.onTopicPress.bind(this)}/>
                    </View>}
                </View>
                <View style={{flex:0.08,backgroundColor: '#f6f7fb'}}/>
                </View>
                </View>
                <View style={styles.subjectouter}>
                    <ImageBackground source={require('../../assets/images/yellowround.png')} style={styles.subjectinner}>
                        <Image source={require('../../assets/images/math.png')} style={{alignSelf: "center",width:128/1.5,height:128/1.5 }} />
                    </ImageBackground></View>
            </View>
        )
    }
}
export default TopicsComponent