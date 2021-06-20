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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            selectedIndex: this.props.screen === 'dashboard' || this.props.screen === 'classlist' ? 1 : 0,
            token:'',
            spinner:true,
            livesessionarray:[]
        };
    }
    componentDidMount(){

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
                              token: JSON.parse(token)
                          }, () => this.getClasses())
      
                      } else {
      
                      }
      
                  } else {
                      console.log("errorr")
                  }
              } catch (e) {
                  return null;
              }
          }
          getClasses(){
          const { topicData } = this.props;
      
          var url = baseUrl+"/live-class/student?chapter_id="+topicData.reference_id+"&offset=0&limit=1000"
          console.log("url",url)
          console.log("url",this.state.token)
          fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>
      
            response.json())
            .then((json) => {
                console.log("live dataaaa", JSON.stringify(json.data.data))
                if(json.data){
                  if(json.data.data.length > 0){
                    this.setState({
                      livesessionarray : json.data.data,
                      spinner: false
                    })
                  }else{
                    this.setState({
                      livesessionarray : [],
                      spinner: false
                    })
                  }
                }
            }
      
            )
            .catch((error) => console.error(error))
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
    onAnalytics(item){
        item["color"] = this.props.topicData.color
        this.props.onanalyticspress(item)
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
		}else if (percent < 50) {
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
             <View style={{borderWidth: 0, borderColor: "lightgrey",height:80,width:windowWidth/1.15,alignSelf:"center",
             backgroundColor: 'white',  borderWidth: 1,
             borderRadius: 5,
             borderColor: '#ddd',
             borderBottomWidth: 0,
             shadowColor: '#000000',
             marginVertical:10,
             shadowOffset: { width: 0, height: 2 },
             shadowOpacity: 0.9,
             shadowRadius: 3,
             elevation: 3,}}>
   <View style={{flex:1,flexDirection:"row"}}>
       <View style={{flex:0.85}}>
       <TouchableOpacity  onPress={this.onTopicPress.bind(this, item)} style={{flex:1,flexDirection:"row"}}>
       <View style={{flex:0.2,backgroundColor:this.props.topicData.color}}>
       {item.image !== "null" ? 
         <Image source={{uri:imageUrl+item.image}} style={{width:"100%",height:"100%",resizeMode:"cover"}}/>
                
        :<Image source={require('../../assets/images/noimage.png')}
        style={{width:60,height:60,resizeMode:"contain"}}/>}
       </View>
       <View style={{flex:0.85,justifyContent:"center",paddingLeft:10}}>
           {/* <Text style={{color:"#2E2E2E",fontSize:10}}>Topic {index+1}</Text> */}
           <Text style={{color:"#2E2E2E",fontWeight:"500",fontSize:13}}>{item.name}</Text>
       </View>
       </TouchableOpacity></View>
       <View style={{flex:0.15,justifyContent:"center",alignItems:"center"}}>
           <TouchableOpacity onPress={this.onAnalytics.bind(this,item)}>
         <Image source={require('../../assets/images/magnifier.png')} style={{width:20,height:20,tintColor: this.props.topicData.color}}/>
         </TouchableOpacity>
       </View>
   </View>
   <Progress.Bar progress={percent/100} width={windowWidth/1.15} height={5} color={color}
           unfilledColor={"lightgrey"} borderColor={"transparent"}/>
</View>
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
                 this.state.spinner ? 
                 <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                 <Text>Loading..</Text>
                 </View> : 

                 this.state.livesessionarray.length > 0 ? 
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
                         <LiveSession onTopicPress={this.onTopicPress.bind(this)} subjectData={this.props.subjectData} topicData={this.props.topicData}  livesessionarray={this.state.livesessionarray}/>
                     </View>}
                    
                     </View> : 

                            topicsArray.length>0 ? 
                                <FlatList
                                    data={topicsArray}
                                    renderItem={this.renderItem.bind(this)}
                                /> : 

                            
                                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

                                <Text>No Data</Text>
                                </View> 
                   
                     
                   

                     }

                
                     
         </View>
        )
    }
}
export default TopicsComponent