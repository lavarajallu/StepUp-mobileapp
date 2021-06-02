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
    TouchableHighlight
} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Star from 'react-native-star-view';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Validations } from '../../helpers'
import LiveSession from "../../components/LiveSession"
import * as Progress from 'react-native-progress';
import { baseUrl,imageUrl } from "../../constants"


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
    onTopicPress(item) {
        // alert(JSON.stringify(item))
        item["color"] = this.props.topicData.color
        this.props.onTopicPress(item)
    }
    onBack() {
       this.props.updateAnalytics()
        Actions.chapters({type:"reset",data:this.props.subjectData})


    }
    renderItem({ item, index }) {
        console.log("gggg",item)
        var percent = (item.percent);
        let color
        if(percent > 80 ){
			color = "green"
		}else if (color< 50) {
			color = "red"
		}else{
			color = "orange"
		}
        const starStyle = {
            width: 50,
            height: 10,
            color: "grey"
        };
        console.log("dfd",item.image)
        const url = imageUrl+item.image
        return ( 
             <TouchableOpacity onPress={this.onTopicPress.bind(this, item)} style={{borderWidth: 0, borderColor: "lightgrey",height:80,width:windowWidth/1.15,alignSelf:"center",
        backgroundColor: 'white', shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    marginVertical: 10,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,}}>
   <View style={{flex:1,flexDirection:"row"}}>
       <View style={{flex:0.2,backgroundColor:this.props.topicData.color}}>
       {item.image !== "null" ? 
         <Image source={{uri:imageUrl+item.image}} style={{width:"100%",height:"100%",resizeMode:"cover"}}/>
                
        :<Image source={require('../../assets/images/noimage.png')}
        style={{width:60,height:60,resizeMode:"contain"}}/>}
       </View>
       <View style={{flex:0.8,justifyContent:"center",paddingLeft:20}}>
           <Text style={{color:"#2E2E2E",fontSize:10}}>Topic {index+1}</Text>
           <Text style={{color:"#2E2E2E",fontWeight:"600",fontSize:15}}>{item.name}</Text>
       </View>
   </View>
   <Progress.Bar progress={percent/100} width={windowWidth/1.15} height={5} color={color}/>
</TouchableOpacity>
    //         <TouchableHighlight underlayColor="transparent" activeOpacity={0.9} onPress={this.onTopicPress.bind(this, item)}>
    //             <View style={styles.itemview}>
    //                 <View
    //                     style={styles.rectview}>
    //                     <View style={styles.innerrect}>
    //                         {item.image == "null" ? 
    //                         <Image source={require('../../assets/images/noimage.png')} style={styles.inerImage} />:
    //                         <Image source={{uri: url}} style={styles.inerImage} /> 
                            
                           
    // }
    //                     </View>
    //                     <View style={styles.leftinnerview}>
    //                         <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 5 }}>
    //                             <Text style={styles.subjectname}>{item.name}</Text>
    //                             <Image source={require('../../assets/images/magnifier.png')} style={{ width: 20, height: 20, alignSelf: "center", tintColor: "grey", marginRight: 10 }} />
    //                         </View>
    //                         <View style={styles.progressview}>
    //                             <View style={styles.progresstextview}>
    //                                 <Text style={styles.progresstext}>Progress</Text>
    //                                 <Text style={styles.progresstext}>{percent}%</Text></View>
    //                             <View style={{ paddingVertical: 5 }}>
    //                                 <Progress.Bar progress={item.percent/100} width={windowWidth / 1.45} height={5} color={color} />
    //                             </View>
    //                         </View>
    //                         <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 5 }}>
    //                             {/* {item.acadamics.map((res, i) =>
    //                                 <View>
    //                                     <Text style={{ textAlign: "center" }}>{res.name}</Text>
    //                                     <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 10, padding: 2 }}>
    //                                         <Star score={2} style={starStyle} />
    //                                     </View>
    //                                 </View>
    //                             )} */}

    //                         </View>

    //                     </View>
    //                 </View>
    //             </View>
    //         </TouchableHighlight>

        )
    }

    render() {
        const { topicData,topicsArray,role} = this.props;
        const url = imageUrl +topicData.image
        console.log("role",role)
        return (
            <View style={{flex:1}}>
                  {(role === 'General Student') ?
                    <View style={{flex:1,marginTop:10}}>
                    {topicsArray.length>0 ? 
                    <FlatList
                        data={topicsArray}
                        renderItem={this.renderItem.bind(this)}
                    /> : 
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

                    <Text>No Data</Text>
                    </View> }
                </View>:
                     <View style={{flex:1}}>
               
                     <SegmentedControlTab
                     values={["Topics", "Live Sessions"]}
                     tabsContainerStyle={{margin:20,}}
                     borderRadius={20}
                     tabStyle={{height:35,borderColor:this.props.topicData.color}}
                     firstTabStyle={{ borderRightWidth: 0 }}
                     activeTabStyle={{backgroundColor:this.props.topicData.color,}}
                     activeTabTextStyle={{color:"white"}}
                     tabTextStyle={{fontSize:15,color:this.props.topicData.color}}
                     selectedIndex={this.state.selectedIndex}
                     onTabPress={this.handleIndexChange}
                 />
                 {this.state.selectedIndex === 0 ?
                     <View style={{flex:1,}}>
                         {topicsArray.length>0 ? 
                         <FlatList
                             data={topicsArray}
                             renderItem={this.renderItem.bind(this)}
                         /> : 
                         <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     
                         <Text>No Data</Text>
                         </View> }
                     </View> :
                     <View style={{ flex: 1, backgroundColor: 'transaprent' }}>
                         <LiveSession onTopicPress={this.onTopicPress.bind(this)} subjectData={this.props.subjectData} topicData={this.props.topicData}/>
                     </View>}
                    
                     </View>
                     
                   

                     }

                
                     
         </View>
        )
    }
}
export default TopicsComponent