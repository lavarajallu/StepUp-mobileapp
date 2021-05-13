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
import * as Progress from 'react-native-progress';

import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Footer from '../../components/Footer'
import Library from '../../components/Library';
import Loader from "../../components/Loader"
import { Validations } from '../../helpers'
import SideMenu from "../../components/SideMenu"
import Drawer from 'react-native-drawer'
import { colors, imageUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

import { baseUrl } from "../../constants"
import { TextInput } from 'react-native-gesture-handler';

class Subjects extends Component{
	constructor(props){
		super(props)
		this.getData = this.getData.bind(this)
		this.state={
			spinner: true,
            subjectsData:[],
            token:""
		}
	}
	componentDidMount(){
		// setTimeout(() => {
		// 	this.setState({loader: false});
			this.getData()
		//}, 2000)
		
       
	}
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
        const token = await AsyncStorage.getItem('@access_token')
        if(token){
			this.setState({
				token: JSON.parse(token)
			})
            this.getSubjects(data,JSON.parse(token))
			//this.getanalytics(data,JSON.parse(token))
        }else{
            
        }
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
  getSubjects(user,toekn)
{
    //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
         var url = baseUrl+'/student/subjects/'+user.reference_id
         console.log("value",url)
        fetch(url ,{
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'token': toekn
                 }
                 }).then((response) =>
                 
                  response.json())
                 .then((json) =>{
                    // alert(JSON.stringify(json))
                     const data = json.data;
                     if(data){
                       if(data.subjects){
                           this.setState
                           ({
                               spinner: false,
                               subjectsData: data.subjects
                           })
                       }else{
                        this.setState
                        ({
                           spinner: false,
						   subjectsData: []
                        }) 
                       }
                        //  AsyncStorage.setItem('@access-token', data.access_token)
                        //  Actions.push('dashboard')
                     }else{
                         alert(JSON.stringify(json.message))
                         this.setState
                         ({
                            spinner: false,
							subjectsData: []
                         })
                     }
                 }
                  
                 )
                 .catch((error) => console.error(error))
             //Actions.push('boards')
}
 
	closeControlPanel = () => {
		this._drawer.close()
	  };
	  openControlPanel = () => {
		this._drawer.open()
	  };
      onBack(){
        Actions.dashboard({type:"reset"})
      }
      onChapter(item){
		//this.updateAnalytics()
		Actions.push('chapters',{data:item})
	}
      renderItem({ item ,index }) {
        // var imagesarray=[
        //     require('../../assets/images/dashboard/new/sub1.png'),
        //     require('../../assets/images/dashboard/new/sub2.png'),
        //     require('../../assets/images/dashboard/new/sub3.png'),
        //     require('../../assets/images/dashboard/new/sub4.png')
        // ]
		var colorsarray = ["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var randomItem = colorsarray[Math.floor(Math.random()*colorsarray.length)];
		var bgcolor = randomItem
        colorsarray.splice(randomItem)
		const url = imageUrl +item.image
        console.log("ssssss",item.percent)
		var progress = 0+ (0.4 * Math.random())
		var percent = (item.percent)
		var color;
		if(percent > 50 ){
			color = "green"
		}else if (color< 50) {
			color = "red"
		}else{
			color = "orange"
		}
		console.log("urlll",url)
        colorsarray.push(randomItem)
        item["color"] = bgcolor
		return (
		   <TouchableOpacity onPress={this.onChapter.bind(this,item)} underlayColor="transparent" activeOpacity={0.9}
		   style={{ height:155,backgroundColor: 'transparent',width:windowWidth/1.1,borderWidth:0.1,borderColor: 'transparent',
           marginVertical:5,overflow:"hidden",borderRadius:10,alignSelf:"center"}}>
					
					 <ImageBackground source={require('../../assets/images/dashboard/new/subjects_bg.png')} 
					 style={{width:windowWidth/1.1,height:145,alignSelf:"center",backgroundColor:item.color}}
                     opacity={0.5}>

                         <View style={{flex:1}}>
                             <View style={{flex:0.5,}}>
                                 <View style={{flex:1,flexDirection:"row"}}>
                                     <View style={{flex:0.6,paddingLeft:20,justifyContent:"center"}}>
                                         <View style={{width:70,height:70,borderRadius:50,backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                                         {item.image ? 
                                        <Image source={{uri: url}} style={{width: 60,height: 60,resizeMode:"cover",borderRadius:30}} />
                                        :
                                        <Image source={require('../../assets/images/noimage.png')}
                                        style={{width:80,height:80,resizeMode:"contain"}}/>}
                                         </View>
                                  
                                     </View>
                                     <View style={{flex:0.3,justifyContent:"center", alignItems:"flex-end",paddingRight:20,}}>
                                         <Text style={{color:"white",textAlign:"left"}}>Chapters: {item.chaptersCount}</Text>
                                         <Text  style={{color:"white",textAlign:"left"}}>Topics: {item.topicsCount}</Text>
                                     </View>
                                 </View>
                             </View>

                             <View style={{flex:0.3,justifyContent:"center"}}>
                                 <Text style={{color:"white",fontSize:15,fomtWeight:"bold",paddingLeft:20}}>{item.name}</Text>
                             </View>
                             <View style={{flex:0.3,flexDirection:"row",justifyContent:"space-around"}}>
                             <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									 <Text style={styles.icontext}>3</Text>
								 </View>
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/magnifier.png')} style={styles.iconview} />
								 </View>
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									 <Text style={styles.icontext}>3</Text>
								 </View>
                             </View>
                         </View>
					 {/* <View style={styles.subview}>
						 <View style={styles.topsubview}>
							 <View style={{flex:0.5,}}>
							{item.image ? 
							 <Image source={{uri: url}} style={{width:80,height:80,resizeMode:"contain"}} />
							 :
							  <Image source={require('../../assets/images/noimage.png')}
							  style={{width:60,height:60,resizeMode:"contain"}}/>}
							 </View>
					         <View style={{flex:0.5,paddingHorizontal:0}}>
							 <Text style={styles.subjectname}>{item.name}</Text>
							 </View>
						 </View>
						 <View style={styles.bottomsubview}>
							 <View style={styles.countview}>
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									 <Text style={styles.icontext}>{item.chaptersCount}</Text>
								 </View>
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/magnifier.png')} style={styles.iconview} />
								 </View>
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									 <Text style={styles.icontext}>{item.topicsCount}</Text>
								 </View></View>
						 </View>
					 </View> */}
           </ImageBackground>
           <Progress.Bar progress={percent/100} width={windowWidth/1.1} height={5} color={color}
           unfilledColor={"lightgrey"} borderColor={"transparent"}/>
					
					</TouchableOpacity>

		)
	}
	render(){
		return(
			<>
			{/* <ImageBackground source={require('../../assets/images/Mobile_bg_2.png')}
			style={{width:"100%",height:"100%",opacity:0.4}}/>
			<View style={{width:"100%",height:"100%",position:"absolute"}}> */}
			<View style={styles.mainview}>
			
				<Drawer
				type="overlay"
					ref={(ref) => this._drawer = ref}
					 tapToClose={true}
					 openDrawerOffset={100} 
					  content={ <SideMenu

						closeControlPanel={this.closeControlPanel}/>}
					>
			<View style={{width:"100%",height:"100%",}}>
			<View style={{flex:1}}>
				<View style={{flex:1,}}>
               
				<View style={{flex:0.25,alignItems:"flex-end",justifyContent:"center"}}>
					<Image source={require('../../assets/images/dashboard/new/subjabs.png')}
					style={{width:236,height:181}}/>
					<View style={{position: 'absolute' ,flex:1,height:"100%",width:"100%" ,justifyContent: 'space-evenly',}}>
					{/* <Image source={require('../../assets/images/logo_icon.png')}
					style={{width:70,height:70,marginLeft: 20}}/> */}
                    <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={this.onBack.bind(this)}>
                                    <Image source={require('../../assets/images/refer/back.png')} style={styles.backIcon} />
                     </TouchableOpacity>
                     
                    </View>
                    <Text style={{marginLeft:20,color:colors.Themecolor,fontSize:20}}>My Library</Text>
					</View>
				</View>
				<View style={{flex:0.75,marginHorizontal: 0,}}>
                    {this.state.spinner ? <Text>Loading.....</Text> :
                    this.state.subjectsData.length > 0 ?
                  
                    <FlatList data={this.state.subjectsData} 
                    renderItem={this.renderItem.bind(this)}
                     />
                     : null}
                  
			    </View>
				</View>
	    	       <View style={styles.footerview}>

					    <Footer openControlPanel={this.openControlPanel}/>
						</View>
				</View>


						</View></Drawer>
			</View>
			{/* </View> */}
			</>
			)
	}
}
export default Subjects
