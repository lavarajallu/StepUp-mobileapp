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
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LibraryComponent from "../../components/LibraryComponent/index1"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LearningComponent from "../../components/LearningComponent"
import MyTopics from "../../components/MyTopics"
import ReferEarn from "../../components/ReferEarn"
import RecommendedTopics from "../../components/RecommendedTopics"
import MyProgress from "../../components/MyProgress"
import MyPerformance from "../../components/MyPerformance"
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl } from '../../constants';
import moment from "moment";
const data =[
	{
		name:"Title1",
		day:"Sun",
		date: "17",
		time: "08:00am"
	},
	{
		name:"Title1",
		day:"Mon",
		date: "17",
		time: "10:00am"
	},
]
const data1 =[
	{
		name:"Title1",
		day:"Sun",
		date: "17",
		time: "08:00am"
	},
	{
		name:"Title1",
		day:"Mon",
		date: "17",
		time: "10:00am"
	},
]
class Library extends Component {
	constructor(props) {
		super(props)
		this.state={
			announcementsData: []
		}
	}

	async componentDidMount(){
		const value = await AsyncStorage.getItem('@access_token')
        if(value !== null) {
            console.log("vv",value)
           this.setState({token: JSON.parse(value)},()=>this.getAnnouncemnt())
        }
	//	this.getAnnouncemnt()
	}
	getAnnouncemnt(){
		fetch( baseUrl+'/announcements/student/logs', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			}
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
			   console.log("announcemnets....",json)
			   
				if(json.data){
					if(json.data.length > 0){
					   console.log("announcemnets",json.data)
				         this.setState({
							announcementsData:json.data
						 })
					  
					}else{
					   this.setState({
						   announcementsData: [],loading: false
					   })
					}
				   
				}else{
				   this.setState({
					   announcementsData: [],loading: false
				   })
				}
			   }
			 
			)
			.catch((error) => console.error(error))
	}
	getliveclasses(){
		fetch( baseUrl+'/announcements/student/logs', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			}
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
			   console.log("announcemnets....",json)
			   
				if(json.data){
					if(json.data.length > 0){
					   console.log("announcemnets",json.data)
				         this.setState({
							announcementsData:json.data
						 })
					  
					}else{
					   this.setState({
						   announcementsData: [],loading: false
					   })
					}
				   
				}else{
				   this.setState({
					   announcementsData: [],loading: false
				   })
				}
			   }
			 
			)
			.catch((error) => console.error(error))
	}


	renderItem({item}){
		var date =  moment(new Date(item.from_date)).format('MM/DD')
		var day  =moment(new Date(item.from_date)).format('dddd'); 
		var colorsarray = ["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var randomItem = colorsarray[Math.floor(Math.random()*colorsarray.length)];
			var bgimage = randomItem
		return(
			<View style={{ overflow: "hidden", flexDirection: "row", margin: 10, justifyContent: "space-between", backgroundColor: "transparent",paddingVertical:5 }}>
								<View style={{ flex: 1, flexDirection: "row",}}>
									<View style={{ flex: 0.3, backgroundColor: "transparent", justifyContent: "center" }}>
										<View style={{width:80,height:60,backgroundColor:randomItem,justifyContent:"center",alignItems:"center",opacity:0.1}}>
											
										
										</View>
										<View style={{position:"absolute",width:80,height:60,justifyContent:"center",alignItems:"center"}}>
										<Text style={{color:randomItem}}>{day}</Text>
										<Text style={{color:randomItem}}>{date}</Text>
										</View>
									</View>
									<View style={{ flex: 0.7, justifyContent: "flex-start" }}>
										<Text style={{fontSize:15}}>{item.title}</Text>
										<Text style={{fontSize:10}}>{item.description}</Text>
									</View>
									{/* <View style={{ flex: 0.25, justifyContent: "center" , flexDirection:"row",alignItems:"center"}}>
										<Image source={require('../../assets/images/dashboard/new/clockliveicon.png')} style={{width:10,height:10,alignSelf:"center"}}/>
										<Text style={{fontSize:10,marginLeft:5}}>{item.from_date}</Text>
									
									</View> */}
								</View>


							</View>
		)
	}

	renderItemLive({item}){
		var colorsarray = ["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var randomItem = colorsarray[Math.floor(Math.random()*colorsarray.length)];
			var bgimage = randomItem
		return(
			<View style={{ overflow: "hidden", flexDirection: "row", margin: 10, justifyContent: "space-between", backgroundColor: "transparent",paddingVertical:5 }}>
								<View style={{ flex: 1, flexDirection: "row",}}>
									<View style={{ flex: 0.2, backgroundColor: "transparent", justifyContent: "center" }}>
										<View style={{width:60,height:60,backgroundColor:randomItem,justifyContent:"center",alignItems:"center",opacity:0.1}}>
											
										
										</View>
										<View style={{position:"absolute",width:60,height:60,justifyContent:"center",alignItems:"center"}}>
										<Text style={{color:randomItem}}>{item.day}</Text>
										<Text style={{color:randomItem}}>{item.date}</Text>
										</View>
									</View>
									<View style={{ flex: 0.55, justifyContent: "flex-start" }}>
										<Text style={{fontSize:15}}>{item.name}</Text>
										<Text style={{fontSize:10}}>This the description of the annuncemnets example</Text>
									</View>
									<View style={{ flex: 0.25, justifyContent: "center" , flexDirection:"row",alignItems:"center"}}>
										<Image source={require('../../assets/images/dashboard/new/clockliveicon.png')} style={{width:10,height:10,alignSelf:"center"}}/>
										<Text style={{fontSize:10,marginLeft:5}}>{item.time}</Text>
									
									</View>
								</View>


							</View>
		)
	}

	render() {
	
		return (
			<View style={styles.mainview}>


				<View style={styles.subview}>
					<LearningComponent />
					
					<LibraryComponent />
					<View style={{height:1,width:windowWidth/1.2,backgroundColor: 'lightgrey',opacity:0.8,marginVertical:30,alignSelf:"center"}}/>
					<MyTopics />
					
					<ReferEarn />
                    <RecommendedTopics />
					{/* <MyProgress />*/}

					{/* <MyPerformance />  */}

				   {this.state.announcementsData.length > 0 ? 
				
					<View style={{
						borderWidth: 0, borderColor: "lightgrey",
						 backgroundColor: 'white', shadowColor: 'black',marginVertical:20,
						shadowOffset: { width: 0, height: 5 },
						marginHorizontal: 20,
						shadowOpacity: 1,
						shadowRadius: 5,
						elevation: 10,
					}}>
						<View style={{ flex: 1 }}>
						<LinearGradient colors={['#FFB32A', '#F97FA8']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"red",height:60,alignItems:"center",paddingHorizontal:10 }}>
								<Text style={{color:"white"}}>Announcements</Text>
								<Text style={{color:"white"}}>See All</Text>
							</LinearGradient>

							<FlatList data={this.state.announcementsData} renderItem={this.renderItem.bind(this)}/>

						</View>
					</View> : null }
					<View style={{
						borderWidth: 0, borderColor: "lightgrey",
						 backgroundColor: 'white', shadowColor: 'black',marginVertical:20,
						shadowOffset: { width: 0, height: 5 },
						marginHorizontal: 20,
						shadowOpacity: 1,
						shadowRadius: 5,
						elevation: 10,
					}}>
						<View style={{ flex: 1 }}>
						<LinearGradient colors={['#9467F6', '#59C6F1']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"red",height:60,alignItems:"center",paddingHorizontal:10 }}>
								<Text style={{color:"white"}}>Live Classes</Text>
								<Text style={{color:"white"}}>See All</Text>
							</LinearGradient>

							<FlatList data={data1} renderItem={this.renderItemLive.bind(this)}/>

						</View>
					</View>
					<View style={{
						borderWidth: 0, borderColor: "lightgrey", backgroundColor: 'white', shadowColor: 'black',
						shadowOffset: { width: 0, height: 5 },
						marginVertical:20,marginHorizontal:20,
						shadowOpacity: 1,
						shadowRadius: 5,
						elevation: 10, borderRadius: 10
					}}>
						<View style={{ flex: 1 }}>
						<LinearGradient colors={['#29C7B5', '#3FE497']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"red",height:60,alignItems:"center",paddingHorizontal:10 }}>
								<Text style={{color:"white"}}>Leader Board</Text>
								<Text style={{color:"white"}}>See All</Text>
							</LinearGradient>
                              <View style={{margin:30,width:294,height:200,justifyContent:"flex-end"}}>
								  <ImageBackground source={require('../../assets/images/dashboard/new/leader.png')} style={{width:294,height:93}}>
								  <View style={{flex:1,flexDirection:"row"}}>
									<View style={{flex:0.33,justifyContent:"flex-end"}}>
									<View style={{alignItems:"center"}}>
										<View style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:"blue",}}>
										<Image source={require('../../assets/images/avatar-9.jpg')} style={{width:60,height:60,borderRadius:30,alignSelf:"center"}}/>
										</View>
										<Text style={{marginBottom:10}}>Name</Text>
										<ImageBackground source={require('../../assets/images/dashboard/new/leader1.png')} style={{width:"100%",height:70,justifyContent:"center",alignItems:"center"}}>
											<Text style={{fontSize:20,color:"white"}}>2</Text>
											</ImageBackground>
									</View>
									</View>
									<View style={{flex:0.34,justifyContent:"flex-end"}}>
									<View style={{alignItems:"center"}}>
										<View style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:"blue",}}>
										<Image source={require('../../assets/images/avatar-9.jpg')} style={{width:60,height:60,borderRadius:30,alignSelf:"center"}}/>
										</View>
										<Text style={{marginBottom:10}}>Name</Text>
										<ImageBackground source={require('../../assets/images/dashboard/new/leader2.png')} style={{width:"100%",height:93,justifyContent:"center",alignItems:"center",}}>
										<Text style={{fontSize:20,color:"white"}}>1</Text>
											</ImageBackground>
									</View>
									</View>

									<View style={{flex:0.33,justifyContent:"flex-end"}}>
									<View style={{alignItems:"center"}}>
										<View style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:"blue",}}>
										<Image source={require('../../assets/images/avatar-9.jpg')} style={{width:60,height:60,borderRadius:30,alignSelf:"center"}}/>
										</View>
										<Text style={{marginBottom:10}}>Name</Text>
										<ImageBackground source={require('../../assets/images/dashboard/new/leader3.png')} style={{width:"100%",height:63,justifyContent:"center",alignItems:"center"}}>
										<Text style={{fontSize:20,color:"white"}}>3</Text>
											</ImageBackground>
									</View>
									</View>

								</View> 
							
								  </ImageBackground>
							  </View>
						    {/* <View style={{margin:30,height:200,width:300,}}>
								<View style={{flex:1,flexDirection:"row"}}>
									<View style={{flex:0.33,justifyContent:"flex-end"}}>
									<View style={{alignItems:"center"}}>
										<View style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:"blue",}}>
										<Image source={require('../../assets/images/avatar-9.jpg')} style={{width:60,height:60,borderRadius:30,alignSelf:"center"}}/>
										</View>
										<Text style={{marginBottom:10}}>Name</Text>
										<ImageBackground source={require('../../assets/images/dashboard/new/leader1.png')} style={{width:"100%",height:70,justifyContent:"center",alignItems:"center"}}>
											<Text style={{fontSize:20,color:"white"}}>2</Text>
											</ImageBackground>
									</View>
									</View>
									<View style={{flex:0.34,justifyContent:"flex-end"}}>
									<View style={{alignItems:"center"}}>
										<View style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:"blue",}}>
										<Image source={require('../../assets/images/avatar-9.jpg')} style={{width:60,height:60,borderRadius:30,alignSelf:"center"}}/>
										</View>
										<Text style={{marginBottom:10}}>Name</Text>
										<ImageBackground source={require('../../assets/images/dashboard/new/leader2.png')} style={{width:"100%",height:93,justifyContent:"center",alignItems:"center",}}>
										<Text style={{fontSize:20,color:"white"}}>1</Text>
											</ImageBackground>
									</View>
									</View>

									<View style={{flex:0.33,justifyContent:"flex-end"}}>
									<View style={{alignItems:"center"}}>
										<View style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:"blue",}}>
										<Image source={require('../../assets/images/avatar-9.jpg')} style={{width:60,height:60,borderRadius:30,alignSelf:"center"}}/>
										</View>
										<Text style={{marginBottom:10}}>Name</Text>
										<ImageBackground source={require('../../assets/images/dashboard/new/leader3.png')} style={{width:"100%",height:63,justifyContent:"center",alignItems:"center"}}>
										<Text style={{fontSize:20,color:"white"}}>3</Text>
											</ImageBackground>
									</View>
									</View>

								</View> 
							
							</View>*/}
					

						</View>
					</View>
				

				</View>
			</View>

		)
	}
}
export default Library