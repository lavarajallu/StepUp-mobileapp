import React, { Component, useEffect, useState } from 'react';
import { View, Text, TextInput,Dimensions, Image, TouchableOpacity,ScrollView, Touchable } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            userDetails: null,
            profile_pic: null
            
        }
    }
    componentDidMount(){
		
			this.getData()
	}

getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
		console.log("dataaa",data)
        this.setState({userDetails: data,profile_pic: data.profile_pic})
            
       
      }else{
        //Actions.push('login')
      }
    } catch(e) {
       return null;
    }
  }
    onBack() {
        Actions.pop()
    }
    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.topView}>
                    <View
                        style={styles.topShadow}>
                        <View style={styles.topsubview}>
                            <View style={styles.topleftview}>
                                <TouchableOpacity onPress={this.onBack.bind(this)}>
                                    <Image source={require('../../assets/images/refer/back.png')} style={styles.backIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topmiddleview}>
                                <Text style={styles.topHead}>Profile</Text>
                            </View>
                            <TouchableOpacity onPress={()=>Actions.push('editprofile')} style={styles.toprightview}>
                                <Text style={styles.inboxText}>Edit</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.92}}>
                <View style={styles.bottomtopvieW}>
                <LinearGradient colors={[" rgba(105, 80, 119, 0.08)", "rgba(132, 115, 147, 0.064)"]}
                            style={styles.gradientview}>

                            <View style={{ flex: 1 }}>
                                <View style={{flex:0.5,paddingLeft:15,flexDirection:"row",alignItems:"center"}}>
                                    { this.state.profile_pic  ? 
                               
                               <Image style={{
                                width: 80, height: 80, borderRadius: 80 / 2,
                                backgroundColor: 'white',
                                borderColor: 'white',
                            }} source={{ uri: "https://smarttesting.s3.ap-south-1.amazonaws.com"+this.state.userDetails.profile_pic }}></Image>
                            : <Image style={{
                                width: 80, height: 80, borderRadius: 80 / 2,
                                backgroundColor: 'white',
                                borderColor: 'white',
                            }} source={{ uri: 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png' }}></Image>
                           
                            }
                               <View style={{ flexDirection: 'column', marginLeft: 15,justifyContent:"center" }}>
                                    <Text style={{
                                        fontSize: 20,
                                        lineHeight: 28,
                                        color:"#695077"
                                        
                                    }}>{this.state.userDetails ? this.state.userDetails.name : null}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        lineHeight: 19,
                                        
                                        color: "#695077"
                                    }}>{this.state.userDetails ? this.state.userDetails.grade ? this.state.userDetails.grade.name :null : null}</Text>
                                </View>
                                </View>
                                <View style={{flex:0.5,marginTop:10}}>
                                <View style={{ }}>
                                    <Text style={{
                                        fontSize: 16,
                                        lineHeight: 19,
                                        paddingLeft:15,
                                        color: "#4E3F56"
                                    }}>Profile Completion</Text>
                                    <View style={{flexDirection:"row",marginTop:10,
                                    paddingVertical:10,marginHorizontal:10,
                                    borderRadius:10,backgroundColor:"white",
                                    justifyContent:"space-evenly",alignItems:"center",
                                    boxShadow:" 0px 4px 28px rgba(105, 80, 119, 0.2)"}}>
                                   <View>
                                   <Progress.Bar progress={0.6} width={windowWidth/1.25} height={5} color={"#695077"}/>
                                   </View>
                                   
                                    <Text>80%</Text>
                                    </View>
                                    
                                  
                                </View>

                                </View>
                              
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={styles.bottomsubView}>
                    <View style={{ paddingHorizontal: 15,paddingVertical:10,marginLeft:10 }}>
                            <Text style={{
                                fontSize: 15,
                                lineHeight: 21,
                                
                                color: "#4E3F56"
                            }}>Profile Details</Text>

                    </View>
                    <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps={'handled'}
                    style={{
                        backgroundColor: 'transparent',
      overflow: "hidden",
                    }}>
                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:10}}>
                        <Image
                        source={require('../../assets/images/refer/profileicon.png')}
                        style={{width:23,height:46}}/>
                        <TextInput 
                        placeholder="Name"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.name: null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20,}}/>
                    </View>

                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/gendericon.png')}
                        style={{width:23,height:25}}/>
                        <TextInput 
                        placeholder="gender"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.gender: null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>

                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/dobicon.png')}
                        style={{width:23,height:23}}/>
                        <TextInput 
                        placeholder="dob"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.dob: null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>

                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/phoneicon.png')}
                        style={{width:23,height:22}}/>
                        <TextInput 
                        placeholder="phone number"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.mobile_number: null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>
                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/emailicon.png')}
                        style={{width:23,height:28}}/>
                        <TextInput 
                        placeholder="email"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.email: null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>
                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/placeicon.png')}
                        style={{width:23,height:23}}/>
                        <TextInput 
                        placeholder="place"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.state: null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>
                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/boardicon.png')}
                        style={{width:23,height:23}}/>
                        <TextInput 
                        placeholder="board"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.board_id : null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>
                    <View style={{flexDirection:'row',alignItems:"center",marginLeft:20,paddingVertical:20}}>
                        <Image
                        source={require('../../assets/images/refer/gradeicon.png')}
                        style={{width:23,height:23}}/>
                        <TextInput 
                        placeholder="grade"
                        editable={false}
                        value={this.state.userDetails ? this.state.userDetails.grade ? this.state.userDetails.grade.name : null : null}
                        style={{height:40,width:windowWidth/1.3,borderColor:"#695077",borderBottomWidth:1,marginLeft:20}}/>
                    </View>
                    </ScrollView>
                    </View>
                 
                </View>

             
            </View>
        )
    }


}
