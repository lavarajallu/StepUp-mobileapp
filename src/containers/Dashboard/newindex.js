import React, { Component } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ImageBackground,
	ScrollView,
	View,
	Text,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import Library from '../../components/Library';
import Loader from "../../components/Loader"
import { Validations } from '../../helpers'
import SideMenu from "../../components/SideMenu"
import Drawer from 'react-native-drawer'
import { colors, imageUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewSlider from 'react-native-view-slider'

import StringsOfLanguages from '../../StringsOfLanguages';
import { color } from 'react-native-reanimated';
const newdata = [
	{
		name: StringsOfLanguages.leaderboard,
		key: "leaderboard",
		image: require("../../assets/images/dashboard/new/leader_board.png"),
		color1: "#277292",//"#7D4BEA",
		color2: "#277292",//"#441DFC",
		width: 44,
		height: 74,
		tintcolor: "transparent"
	}, {
		name: StringsOfLanguages.learninganalysis,
		key: 'learninganalysis',
		image: require("../../assets/images/dashboard/new/analysis_new.png"),
		width: 49,
		color1: "#d88212",
		color2: "#d88212",
		tintcolor: "transparent",
		height: 43,
	}, {
		name: StringsOfLanguages.mypractice,
		key: "mypractice",
		image: require("../../assets/images/dashboard/new/practice_new.png"),
		width: 51,
		height: 52,
		tintcolor: "transparent",
		color1: "#c44921",//"#F6815B",
		color2: "#c44921"// "#FC67A7",
	}, {
		name: StringsOfLanguages.mocktest,
		key: "mocktest",
		image: require("../../assets/images/dashboard/new/mock_new.png"),
		width: 52,
		color1: "#a3ba6d",//"#0D7B5A",
		color2: "#a3ba6d",//"#0D7B5A",
		height: 55,
		tintcolor: "#6B9B1A"
	},
	// {
	// 	name:"Leader Board",
	// 	image: require("../../assets/images/dashboard/leaderboard.png")
	// },
]

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.getData = this.getData.bind(this)
		this.state = {
			loader: false,
			userName: "",
			profile_pic: "null",
			gradeName: "null",
			schoolname: "null",
			newdata: []
		}
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ loader: false });
			this.getData()
		}, 2000)


	}

	getData = async () => {
		try {
			const value = await AsyncStorage.getItem('@user')
			//  alert(JSON.stringify(value))
			if (value !== null) {
				var data = JSON.parse(value)
				console.log("dataaa", data)
				this.setData(data)

			} else {
				//Actions.push('login')
			}
		} catch (e) {
			return null;
		}
	}

	setData(data) {
		// alert(data.profile_pic)
		this.setState({
			userName: data.name ? data.name : data.first_name + " " + data.last_name,
			profile_pic: data.profile_pic ? imageUrl + data.profile_pic : "null",
			gradeName: data.grade ? data.grade.name : "null",
			newdata: newdata,
			schoolname: data.school ? data.school.name : "null"
		})
	}
	closeControlPanel = () => {
		this._drawer.close()
	};
	openControlPanel = () => {
		this._drawer.open()
	};
	onItem(item) {
		if (item.name === 'Previous Papers') {
			Actions.push("previouspapers")
		} else if (item.name === 'Mock Test') {
			Actions.push('mocktest')
		} else if (item.name === "My Practice") {
			Actions.push('practice')
		} else {
			Actions.push('analysis')
		}
	}

	render() {
		const url = imageUrl + this.state.profile_pic
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.mainview}>
					{this.state.loader ? (
						<Loader />
					) :
						<Drawer
							type="overlay"
							ref={(ref) => this._drawer = ref}
							tapToClose={true}
							openDrawerOffset={100}
							content={<SideMenu

								closeControlPanel={this.closeControlPanel} />}
						>
							<View style={{ width: "100%", height: "100%", }}>
								<View style={{ flex: 1 }}>
									<ScrollView contentContainerStyle={{ flexGrow: 1, }}>
										{/* <View style={{ flex: 0.2, marginHorizontal: 15, marginVertical: 15 }}>
											<Image source={require('../../assets/images/dashboardlogo1.png')}
												style={{ width: 117, height: 57 }} />
										</View> */}
										<View style={{ flex: 0.3, }}>
											<ViewSlider
												renderSlides={
													<>
														<View style={{
															paddingHorizontal: 20,
															justifyContent: 'space-around',
															width: windowWidth,
															padding: 10,
															alignItems: 'center',
															height: 200,
															flexDirection:"row",
															//backgroundColor:"red"
														}}>

														<Image source={require('../../assets/images/logo_icon2.png')}
												style={{ width: 1048/10, height: 1048/10 }} />
															<View>
																<Text>
																Everyone is sharing ideas{"\n"}on buzz!
																</Text>
																<Text style={{color:"red"}}>
																You should too
																</Text>
															</View>

														</View>
														<View style={{
															paddingHorizontal: 20,
															justifyContent: 'space-around',
															width: windowWidth,
															padding: 10,
															alignItems: 'center',
															height: 200,
															flexDirection:"row"
														}}>

															<Image source={require('../../assets/images/sliderimage.png')}
															style={{width:261/1.5,height:237/1.5}}/>
															<View>
																<Text>
																Everyone is sharing ideas{"\n"}on buzz!
																</Text>
																<Text style={{color:"red"}}>
																You should too
																</Text>
															</View>

														</View>

													</>
												}
												style={{
													alignSelf: 'center',
													justifyContent: 'center',
													alignItems: 'center',
													//backgroundColor: 'pink'
												}}     //Main slider container style
												height={230}    //Height of your slider
												slideCount={2}    //How many views you are adding to slide
												dots={true}     // Pagination dots visibility true for visibile 
												dotActiveColor='grey'     //Pagination dot active color
												dotInactiveColor='lightgrey'    // Pagination do inactive color
												dotsContainerStyle={{
													backgroundColor: 'transparent',
													position: 'absolute',
													bottom: 0
												}}     // Container style of the pagination dots
												//autoSlide = {true}    //The views will slide automatically
												slideInterval={1000}    //In Miliseconds
											/>
										</View>
										<View style={{ flex: 0.72, marginHorizontal: 0, }}>

											<Library />
										</View>
									</ScrollView>
								</View>
								<View style={styles.footerview}>

									<Footer openControlPanel={this.openControlPanel} />
								</View>
							</View></Drawer>}
				</View>
			</View>

		)
	}
}
export default Dashboard
