import React, { Component } from 'react';
import {
	ActivityIndicator,
	ImageBackground,
	View,
	Text,
	Dimensions,
	Image,
	TouchableHighlight,
	FlatList
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
import { baseUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
class LibraryComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			subjectsData: null,
			spinner: true,
			analyticsData: {},
			token: ""
		}
	}
	onChapter(item) {
		this.updateAnalytics()
		Actions.push('chapters', { data: item })
	}
	componentDidMount() {
		this.getData()
	}
	updateAnalytics() {
		var url = baseUrl + '/analytics/' + this.state.analyticsData.reference_id
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			},
		}).then((response) =>

			response.json())
			.then((json) => {

				if (json.data) {
					const data = json.data;
					//   alert(JSON.stringify(json));
					this.setState({
						analyticsData: data
					})
				} else {
					Toast.show(json.message, Toast.LONG);
				}
			}

			)
			.catch((error) => console.error(error))

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
					})
					this.getSubjects(data, JSON.parse(token))
					this.getanalytics(data, JSON.parse(token))
				} else {

				}

			} else {
				console.log("errorr")
			}
		} catch (e) {
			return null;
		}
	}
	getSubjects(user, toekn) {
		var url = baseUrl + '/student/subjects/' + user.reference_id + "?offset=0&limit=2&order_by=name&sort_order=DESC"
		console.log("value", url)
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
				if (data) {
					if (data.subjects) {
						this.setState
							({
								spinner: false,
								subjectsData: data.subjects
							})
					} else {
						this.setState
							({
								spinner: false,
								subjectsData: []
							})
					}
					//  AsyncStorage.setItem('@access-token', data.access_token)
					//  Actions.push('dashboard')
				} else {
					Toast.show(json.message, Toast.LONG);
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
	getanalytics(user, token) {
		var body = {
			user_id: user.reference_id,
			board_id: user.grade ? user.grade.board_id : null,
			grade_id: user.grade ? user.grade.reference_id : null,
			section_id: user.section ? user.section.reference_id : null,
			school_id: user.school ? user.school.reference_id : null,
			branch_id: user.grade ? user.grade.branch_id : null,
			page: "MyCourse_Subjects",
			type: "mobile",
			subject_id: null,
			chapter_id: null,
			topic_id: null,
			activity_id: null,
		}

		console.log("analyticsss", body)
		var url = baseUrl + '/analytics'
		console.log("value", url)
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
					//    Snackbar.show({
					// 	text: json.message,
					// 	duration: Snackbar.LENGTH_SHORT,
					//   });
				} else {
					Toast.show(json.message, Toast.LONG);
				}
			}

			)
			.catch((error) => console.error(error))
	}
	renderItem({ item }) {
		var colorsarray = ["#267093", "#697077", "#a4b96e", "#c54721"]
		var randomItem = colorsarray[Math.floor(Math.random() * colorsarray.length)];
		var bgcolor = randomItem
		const url = "https://smarttesting.s3.ap-south-1.amazonaws.com" + item.image
		var progress = 0 + (0.4 * Math.random())
		var percent = (item.percent) * 100;
		var color;
		if (percent > 50) {
			color = "green"
		} else if (color < 50) {
			color = "red"
		} else {
			color = "orange"
		}
		console.log("urlll", url)
		return (
			<TouchableHighlight onPress={this.onChapter.bind(this, item)} underlayColor="transparent" activeOpacity={0.9}
				style={{ backgroundColor: 'transparent', borderWidth: 0.1, borderColor: 'transparent', marginVertical: 5 }}>

				<ImageBackground source={require('../../assets/images/dashboard/pattern.png')}
					style={[styles.rectview, { backgroundColor: bgcolor }]} opacity={0.7} >
					<View style={styles.subview}>
						<View style={styles.topsubview}>
							<View style={{ flex: 0.5, }}>
								{item.image ?
									<Image source={{ uri: url }} style={{ width: 80, height: 80, resizeMode: "contain" }} />
									:
									<Image source={require('../../assets/images/noimage.png')}
										style={{ width: 60, height: 60, resizeMode: "contain" }} />}
							</View>
							<View style={{ flex: 0.5, paddingHorizontal: 0 }}>
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
					</View>
				</ImageBackground>

			</TouchableHighlight>

		)
	}
	render() {
		return (

			<View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={styles.headText}>My Library</Text>
					<Text style={styles.seelalltext}>View All ></Text>
				</View>

				{this.state.spinner ?
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<ActivityIndicator color={"black"} />
					</View> :
					this.state.subjectsData &&
						this.state.subjectsData.length > 0 ?
						<View style={{ flex: 1, justifyContent: "center" }}>
							<FlatList data={this.state.subjectsData}
								renderItem={this.renderItem.bind(this)}
								numColumns={2}
								showsHorizontalScrollIndicator={false}
							/></View> :
						<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
							<Text>No Data</Text>
						</View>



				}

			</View>
		)
	}
}
export default LibraryComponent
