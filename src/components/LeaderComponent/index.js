import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import SegmentedControlTab from "react-native-segmented-control-tab";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import styles from "./styles"
const data = [
    {
        name:"Name",
        score:"Score",
        id:1
    },
    {
        name:"Name",
        score:"Score",
        id:2
    },
    {
        name:"Name",
        score:"Score",
        id:3
    },
    {
        name:"Name",
        score:"Score",
        id:4
    },
    {
        name:"Name",
        score:"Score",
        id:5
    }
]
class LeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex : 0
        };
    }
    handleIndexChange = index => {
        this.setState({
          ...this.state,
          selectedIndex: index
        });
      };
      renderToday({item,index}){
          return(
              <View style={{height:70,backgroundColor:"#ECECEC",
              width:windowWidth/1.05,marginVertical:10,alignSelf:"center"}}>
                  <View style={{flex:1,flexDirection:"row"}}>
                      <View style={{flex:0.15,justifyContent:"center",alignItems:"center"}}>
                          <Text style={{color:"#3F3E3E"}}>{item.id}</Text>
                      </View>
                      <View style={{flex:0.65,flexDirection:"row",alignItems:"center"}}>
                      <Image source={require('../../assets/images/avatar-9.jpg')} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: "center" }} />
                      <Text style={{marginLeft:10}}>{item.name}</Text>
                      </View>
                      <View style={{flex:0.2,justifyContent:"center",alignItems:"center"}}>
                      <Text>{item.score}</Text>
                      </View>
                  </View>
              </View>
          )
      }
   
    render() {
      
        return (
           <View style={{flex:1}}>
               <View style={{borderRadius:30,padding:10,marginVertical:10}}>
               <SegmentedControlTab
                    values={["Today", "Week", "All"]}
                    borderRadius={30}
                    tabStyle={{backgroundColor:"#EDDEFE",}}
                    selectedIndex={this.state.selectedIndex}
                    activeTabStyle={{backgroundColor:"#9863DF",}}
                    onTabPress={this.handleIndexChange}
                    activeTabTextStyle={{color:"white"}}
                      tabTextStyle={{color:"#9863DF"}}
                    />
               </View>
              
            {this.state.selectedIndex === 0 ?
                <View style={{flex:1}}>
                   <FlatList data={data} renderItem={this.renderToday.bind(this)}
                   ListFooterComponent={()=>
                    <View style={{margin:20,alignItems:"center",justifyContent:"center"}}>

                    <LinearGradient colors={["#2E61AE","#DB338E"]}  start={{ x: 0, y: 0.5 }} style={{height:50,paddingHorizontal:20,width:150,borderRadius:30,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{color:"white",fontSize:15}}>View More</Text>
                </LinearGradient>
                </View>
                   }
                   />
                  
                </View> :
                this.state.selectedIndex === 1 ?
                <View style={{ flex: 1, backgroundColor: 'green' }}>
                    
                </View> : 
                 <View style={{ flex: 1, backgroundColor: 'blue' }}>
                    
                 </View>}
               
           </View>
        );
    }
}
export default LeaderComponent;