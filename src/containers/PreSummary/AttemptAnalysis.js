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
    TouchableOpacity
} from 'react-native';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Header from '../../components/Header'
import { Validations } from '../../helpers'
const AttemptAnalysis = (props) => {
    const {testResult}=props
    return (
      <>
        {testResult && Object.keys(testResult).length ? (
          <>
          
            <View style={{flex:1,padding:0}}>
                <View style={{flexDirection:"row",justifyContent:"space-evenly",padding:10}}>
                    <View>
                    <ImageBackground source={require('../../assets/images/correctimg.png')} style={{width:88/1.5,height:100/1.5,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",textAlign:"center",marginBottom:10,fontSize:15}}>{testResult.correct_ans_count?testResult.correct_ans_count:0}</Text>
                    </ImageBackground>
                    </View>
              <View>
              <ImageBackground source={require('../../assets/images/wrongimg.png')} style={{width:88/1.5,height:100/1.5,justifyContent:"center",alignItems:"center",marginLeft:40}}>
              <Text style={{color:"white",textAlign:"center",marginBottom:10,fontSize:15}}>{testResult.wrong_ans_count?testResult.wrong_ans_count:0}</Text>
              </ImageBackground>
              </View>
                 
                </View>
                <View style={{flex:1,flexDirection:"row"}}>
                <View style={{flex:0.5,justifyContent:"space-evenly",marginRight:20}}>
                <Text style={{marginTop:10,textAlign:"center",fontSize:13}}>Fast Answer: {testResult.lightening_count?testResult.lightening_count:0}</Text>
                <Text style={{marginTop:10,textAlign:"center",fontSize:13}}>Normal Answer: {testResult.shot_count?testResult.shot_count:0}</Text>
                <Text style={{marginTop:10,textAlign:"center",fontSize:13}}>Slow to Answer: {testResult.extra_inning_count?testResult.extra_inning_count:0}</Text>
                </View>
                  <View style={{flex:0.5,justifyContent:"space-evenly",marginLeft:-50}}>
                  <Text style={{marginTop:10,textAlign:"center",fontSize:13}}>Incorrect: {testResult.lost_count?testResult.lost_count:0}</Text>
                  <Text style={{marginTop:10,textAlign:"center",fontSize:13}}>Extra Time: {testResult.extra_time_count?testResult.extra_time_count:0}</Text>
                  <Text style={{marginTop:10,textAlign:"center",fontSize:13}}>Unanswered  {testResult.un_ans_count?testResult.un_ans_count:0}</Text>
                  </View>
                </View>
                {/* <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:50}}>
                  <Text>Lightning Fast: {testResult.lightening_count?testResult.lightening_count:0}</Text>
                  <Text>Lost: {testResult.lost_count?testResult.lost_count:0}</Text>
                </View>
                <View style={{flexDirection:"row",marginVertical:10}}>
                  <Text>What a Timing/Shot: {testResult.shot_count?testResult.shot_count:0}</Text>
                  <Text>Extra Time: {testResult.extra_time_count?testResult.extra_time_count:0}</Text>
                </View>
                <View style={{flexDirection:"row",}}>
                  <Text>Extra Innings: {testResult.extra_inning_count?testResult.extra_inning_count:0}</Text>
                  <Text style={{textAlign:"center"}}>Un Answered: {testResult.un_ans_count?testResult.un_ans_count:0}</Text>
                </View> */}
                
            </View>
          </>
        ) : null}
      </>
    )
  }
  
  export default AttemptAnalysis
  