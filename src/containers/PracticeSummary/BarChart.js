import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import { View, StyleSheet,Dimensions,Text } from 'react-native';
import React, { Component } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"

import * as Progress from 'react-native-progress';
import { TextInput } from 'react-native-gesture-handler';
const config = {
  hasYAxisBackgroundLines: true,
  xAxisLabelStyle: {
    rotation: 0,
    fontSize: 12,
    width: 70,
    yOffset: 4,
    xOffset: -15
  },
  yAxisLabelStyle: {
    rotation: 30,
    fontSize: 13,
    prefix: '$',
    position: 'bottom',
    xOffset: 15,
    decimals: 2,
    height: 100
  }
};
const data = [
    { questionno:"1",
        question:"dkfjkdfk;",
        correctans:"B",
        answers:[],
        result:"correct"},
  { questionno:"1",
        question:"dkfjkdfk;",
        correctans:"B",
        answers:[],
        result:"wrong"},
         { questionno:"1",
        question:"dkfjkdfk;",
        correctans:"B",
        answers:[],
        result:"correct"}
 
 ]
class BarChartNew extends Component{
    constructor(props){
        super(props)
    }
   
    render(){
        let { questionsarray } = this.props;
        return(
          
            questionsarray.map((res,i)=>
                <View style={{flex:1 ,flexDirection:"row"}}>
             <View style={{flex:0.1,marginVertical: 10,flexDirection:"row",justifyContent:"space-around"}}>
             <Text>Q{i}</Text>
              </View>

             <View style={{flex:0.8,justifyContent: 'center',alignItems:"center" }}>
             
             <View style={{height:20,backgroundColor:"lightgrey",justifyContent:"center"}}>
                
             <Progress.Bar progress={res.test_taken_time/100} width={windowWidth/1.5} height={20} color={"green"}/>
             </View>
             </View>
             <View style={{flex:0.1,justifyContent:"center",alignItems:"center"}}>

             <Text style={{color:'black',marginRight:5}}>{res.test_taken_time}s</Text>
            </View>
 </View>
             )
          
          )
    }
} 
export default BarChartNew;
