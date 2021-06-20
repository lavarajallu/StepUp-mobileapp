import React, { Component } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ImageBackground,
	ScrollView,
	View,
	Text,
	Dimensions,
	Platform,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import Modal from 'react-native-modal';
import Footer from '../../components/Footer'
import TopicsComponent from '../../components/TopicsComponent';
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'
import SideMenu from "../../components/SideMenu"
import { baseUrl,imageUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

class Topics extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isvisible: false,
			topicData: this.props.data,
			topicsArray: [],
			spinner: true,
			token:"",
			userdetails:"",
			analyticsData:{}
		}
	}
	closeControlPanel = () => {
		this._drawer.close()
	};
	openControlPanel = () => {
		this._drawer.open()
	};
	onTopic(item) {

		this.updateAnalytics()
		//	alert("dddd"+JSON.stringify(this.props.data))

		//	if(item.preasses){
		Actions.push('topicmainview', { "from": "topics", data: item, topicsdata: this.props.data, subjectData: this.props.subjectData })
		// }else{
		// 	this.setState({
		// 	isvisible:true
		// })
		// }

	}
	onanalyticspress(item){
		Actions.push('topicanalysis', { "from": "topics", data: item, topicsdata: this.props.data, subjectData: this.props.subjectData })
	}
	updateAnalytics(){
		//alert(this.state.analyticsData.reference_id)
		var url = baseUrl+'/analytics/'+this.state.analyticsData.reference_id
		fetch(url ,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			},
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
				
				if(json.data){
					const data = json.data;
				//   alert(JSON.stringify(json));
				   this.setState({
					   analyticsData: data
				   })
				//    Snackbar.show({
				// 	text: "Analytics Updated succesfully",
				// 	duration: Snackbar.LENGTH_SHORT,
				//   });
				}else{
					console.log(JSON.stringify(json.message))
				}
			}
			 
			)
			.catch((error) => console.error(error))
			
	}
	onOk() {
		this.setState({
			isvisible: false
		}, () => Actions.push('preassesment'))
	}
	onCancel() {
		this.setState({
			isvisible: false
		})
	}
	componentDidMount() {
		//alert("dfdfdf"+JSON.stringify(this.props.subjectData))
		this.getData()
	}
	onBack(){
		this.updateAnalytics()
		//alert(this.props.screen)
		if(this.props.screen === 'dashboard'){
			Actions.dashboard({type:"reset"})
        }else if(this.props.screen === "classlist"){
			Actions.liveclasslist({type:"reset"})

		}else{
			Actions.chapters({type:"reset",data:this.props.subjectData})

		}
	}
	getData = async () => {
		try {
			const value = await AsyncStorage.getItem('@user')
			//  alert(JSON.stringify(value))
			if (value !== null) {
				var data = JSON.parse(value)
				
				const token = await AsyncStorage.getItem('@access_token')
				console.log("subjectass", token)
				if (token && data) {
					this.setState({
						token: JSON.parse(token),
						userdetails: data
					})
					
					this.getTopics(data, JSON.parse(token))
					this.getanalytics(data,JSON.parse(token))
				} else {
					//console.log("hihii")
				}

			} else {
				alert("errorrr")
			}
		} catch (e) {
			return null;
		}
	}
	getanalytics(user, token) {
		const { data, subjectData } = this.props;
		var body = {
		  user_id: user.reference_id,
		  board_id: user.grade ? user.grade.board_id : null,
		  grade_id: user.grade ? user.grade.reference_id : null,
		  section_id: user.section ? user.section.reference_id : null,
		  school_id: user.school ? user.school.reference_id : null,
		  branch_id: user.grade ? user.grade.branch_id : null,
		  page: "MyCourse_Topics",
		  type: "mobile",
		  subject_id: subjectData.reference_id,
		  chapter_id: data.reference_id,
		  topic_id: null,
		  activity_id: null,
		}
	
	console.log("analyticsss", body)
		var url = baseUrl + '/analytics'
		//console.log("value", url)
		fetch(url, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'token': token
		  },
		  body: JSON.stringify(body)
		}).then((response) =>
	
		  response.json())
		  .then((json) => {
	
			if (json.data) {
			  const data = json.data;
			  //   alert(JSON.stringify(json));
			  this.setState({
				analyticsData: data
			  })
			//   Snackbar.show({
			// 	text: json.message,
			// 	duration: Snackbar.LENGTH_SHORT,
			//   });
			} else {
			  console.log(JSON.stringify(json.message))
			}
		  }
	
		  )
		  .catch((error) => console.error(error))
	  }
	getTopics(user, toekn) {

		const { data, subjectData } = this.props;
		//alert("hiiii")
		//grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
		var url;
		console.log("fff",user.grade_id , "")
		if (user.user_role === 'Student') {
			url = baseUrl + "/student/topics/" + user.grade.reference_id + "/" + subjectData.reference_id + "/" + data.reference_id + "?school_id=" + user.school_id + "&section_id=" + user.section_id
		} else if (user.user_role === 'General Student') {
			url = baseUrl + "/student/topics/" + user.grade.reference_id + "/" + subjectData.reference_id + "/" + data.reference_id + "?school_id=''&section_id=''"
		}
		//var url =baseUrl+"/student/topics/8283c5c7-0369-4bb0-8da0-acf1179833b2/2fd32b4e-86e8-4f0e-af29-b79a0efaf81c/23cdedb8-093a-4aeb-af7e-755fca8d3e2d?school_id=&section_id="
		console.log("topicvaluesssssss", url)
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': toekn
			}
		}).then((response) =>

			response.json())
			.then((json) => {
				const data = json.data;
				console.log("sss", data)
				if (data) {
					if (data.topics) {
					console.log("topics", json.data.topics)
						this.setState
							({
								spinner: false,
								topicsArray: data.topics.reverse()
							})
					} else {
						this.setState
							({
								spinner: false,
								topicsArray: []
							})
					}
					//  AsyncStorage.setItem('@access-token', data.access_token)
					//  Actions.push('dashboard')
				} else {
					alert(JSON.stringify(json.message))
					this.setState
						({
							spinner: false,
							topicsArray: []
						})
				}
			}

			)
			.catch((error) => console.error(error))
		//Actions.push('boards')
	}
	render() {
		return (
			<>
			{/* <ImageBackground source={require('../../assets/images/Mobile_bg_2.png')}
			style={{width:"100%",height:"100%",opacity:0.4}}/>
			<View style={{width:"100%",height:"100%",position:"absolute"}}>
			<Drawer
				type="overlay"
				ref={(ref) => this._drawer = ref}
				tapToClose={true}
				openDrawerOffset={0.25}
				content={<SideMenu closeControlPanel={this.closeControlPanel} />}
			>
				<View style={styles.mainview}>

					<View style={styles.topview}>
						{this.state.spinner ?
							<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
								<ActivityIndicator color={"black"} />
							</View> :
							<TopicsComponent subjectData={this.props.subjectData} updateAnalytics={this.updateAnalytics.bind(this)} onTopicPress={this.onTopic.bind(this)} topicData={this.state.topicData} topicsArray={this.state.topicsArray} />
						}
					</View>
					<View style={styles.footerview}>

						<Footer openControlPanel={this.openControlPanel} />
					</View>
					<View>
						<Modal isVisible={this.state.isvisible}>
							<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
								<View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, marginVertical: 15 }}>
									<Text style={{ color: "black", fontSize: 20, textAlign: 'center', marginTop: 10 }}>Your are about to begin your Pre Assesment</Text>
									<Text style={{ fontSize: 15, marginHorizontal: 30, textAlign: 'center', marginTop: 10 }}>Once you begin you have 5 minutes to finish the test</Text>
									<Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>Are you ready to begin?</Text>
									<View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20 }}>
										<TouchableOpacity onPress={this.onOk.bind(this)} >
											<LinearGradient colors={['#239816', '#32e625']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
												<Text style={{ color: "white" }}>OK</Text>
											</LinearGradient>
										</TouchableOpacity>
										<TouchableOpacity onPress={this.onCancel.bind(this)}>
											<LinearGradient colors={['#f14d65', '#fc8798']} style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
												<Text style={{ color: "white" }}>CANCEL</Text>
											</LinearGradient>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Modal>
					</View>
				</View>
			</Drawer>
			</View> */}
			      <Drawer
      type="overlay"
      ref={(ref) => this._drawer = ref}
      tapToClose={true}
      openDrawerOffset={0.25}
      content={<SideMenu closeControlPanel={this.closeControlPanel} />}
    >
      <View style={styles.mainview}>

        <View style={styles.topview}>
		<ImageBackground source={require('../../assets/images/dashboard/new/chapters_bg.png')}
                style={{ width: "100%", height: 288, backgroundColor: this.props.data.color, }} opacity={0.5}>
                <View style={{
                  flexDirection: "row", marginLeft: 20, alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
				  <View style={{flex:1,flexDirection:"row",alignItems:"center",marginTop:5}}>
						<View style={{flex:0.7,flexDirection:"row",alignItems:"center"}}>
						<TouchableOpacity onPress={this.onBack.bind(this)}>
                    <Image source={require('../../assets/images/refer/back.png')} style={{width:21,height:15,tintColor:"white"}} />
                  </TouchableOpacity>
                    <Text style={{ color: "white", marginHorizontal: 10, fontSize: 18 }}>{this.props.data.name}</Text>
						</View>
                      <View style={{flex:0.3,justifyContent:"center",alignItems:"center"}}>
					  {this.props.data.image !== "null" ?
                    <Image source={{ uri: imageUrl + this.props.data.image }} style={{ width: 60, height: 60, resizeMode: "contain", marginRight: 10, }} />

                    : <Image source={require('../../assets/images/noimage.png')}
                      style={{ width: 60, height: 60, resizeMode: "contain", marginRight: 10, }} />}
					  </View>
                    </View>
                 
                 </View>
                  
                </View>
              

              </ImageBackground>
       <View style={{height:Platform.OS === 'android'? windowHeight/1.3:windowHeight/1.35,width:windowWidth,backgroundColor:"white",alignSelf:"center",
       position:"absolute",bottom:0,borderTopRightRadius:25,borderTopLeftRadius:25}}>
        {this.state.spinner ? 
         <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
           <Text>Loading...</Text>
        </View> 
        :
		<TopicsComponent subjectData={this.props.subjectData} updateAnalytics={this.updateAnalytics.bind(this)}
		onTopicPress={this.onTopic.bind(this)} onanalyticspress={this.onanalyticspress.bind(this)}
		screen={this.props.screen}
		topicData={this.state.topicData} topicsArray={this.state.topicsArray} role={this.state.userdetails.user_role}/>}
      
       </View>
        </View>
        <View style={styles.footerview}>

          <Footer openControlPanel={this.openControlPanel} />
        </View>
      </View>
    </Drawer>
			</>
		)
	}
}
export default Topics