import React, { Component } from 'react';
import {
	Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageUrl } from '../../constants';
const data = [
	{
		name: "Profile",
		icon: require("../../assets/images/sidemenu/profile.png")
	},
	{
		name: "Notifictions",
		icon: require("../../assets/images/sidemenu/notification.png")
	},
	// {
	// 	name: "Refer & Earn",
	// 	icon: require("../../assets/images/sidemenu/refer.png")
	// },
	{
		name: "Change Password",
		icon: require("../../assets/images/sidemenu/changepass.png")
	},
	{
		name: "Contact Us",
		icon: require("../../assets/images/sidemenu/call.png")
	},
	{
		name:"Buy Package",
		icon:require("../../assets/images/box.png")

	}
	
	// {
	// 	name: "Change Language",
	// 	icon:require("../../assets/images/sidemenu/profile.png")
	// }
]


class SideMenu extends Component {
	constructor(props) {
		super(props)
		this.getData = this.getData.bind(this)
		this.state={
			loader:false,
			userName: "null",
			profile_pic: "null",
			gradeName:"null",
			schoolname:"null",
			username:""
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
        this.setData(data)
       
      }else{
        //Actions.push('login')
      }
    } catch(e) {
       return null;
    }
  }
  setData(data){
	var username
	if(data.name){
		username = data.name
	}else{
		if(data.first_name){
			if(data.last_name){
				username  = data.first_name + " " + data.last_name
			}else{
				username = data.first_name
			}
		}else if(data.last_name){
			username = data.last_name
		}
	}
	  this.setState({
		  userName: username,
		  profile_pic: data.profile_pic ? imageUrl +data.profile_pic : "null",
		  gradeName: data.grade ? data.grade.name  : "null",
		   schoolname: data.school ? data.school.name : "null"})
  }
	onCLose() {
		this.props.closeControlPanel()
	}
	onRefer(item){
		this.props.closeControlPanel()
		if(item.name === 'Refer & Earn'){
		
			Actions.push('referview')
		}else if(item.name === 'Change Password'){
			Actions.push('changepassword')
		}else if(item.name === 'Contact Us'){
			Actions.push('contactus')
		}else if(item.name === "Notifictions"){
			Actions.push('notifications',{title:"menu"})
		}else if(item.name === 'Profile'){
			Actions.push('profile')
		}else if (item.name === "Change Language"){
			 Actions.push('settings')
		}else if(item.name === 'Buy Package'){
			Actions.push('buypackages')

		}
	}
	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={this.onRefer.bind(this,item)} style={styles.rowView}>
				<View style={styles.rowLeft}>
					<Image source={item.icon} style={styles.rowIcon} />

				</View>
				<View style={styles.rowMiddle}>
					<Text style={styles.rowText}>{item.name}</Text>
				</View>
				<View style={styles.rowLast}>
					<Image source={require("../../assets/images/next.png")} style={styles.rowNext} />

				</View>
			</TouchableOpacity>
		)
	}
	onLogout(){
		Alert.alert(
			"Step Up",
			"Are you sure you want to logout?",
			[
			  {
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			  },
			  { text: "OK", onPress: () => {
				AsyncStorage.removeItem('@user')
				AsyncStorage.removeItem('@access_token')
				Actions.login({ type: "reset" }) 
			  }}
			]
		  );
		
	}

	render() {
		const url = imageUrl + this.state.profile_pic
		return (

			<View style={styles.mainview}>
				<ImageBackground source={require("../../assets/images/sidemenubg.png")}
					style={styles.bg}>
					<View style={styles.bgtop}>
					<Image source={require("../../assets/images/menu_icon.png")} style={{width:22,height:21}}/>
					</View>
					<View style={styles.bgmiddle}>
						<View style={styles.middleTop}>
						{this.state.profile_pic !== 'null' ?
                      <Image source={{uri: this.state.profile_pic}} style={{width:55,height:55,borderRadius: 55/2,alignSelf: 'center' }}/>
                      :  <Image source={require('../../assets/images/dashboard/user.png')} style={{width:55,height:55,borderRadius: 55/2,alignSelf: 'center' }}/>}
							<Text style={styles.profilename}>{this.state.userName}</Text>
							<View style={{borderWidth:1,borderColor:"white",paddingHorizontal:10,borderRadius:30,marginTop:10}}>
								<Text style={styles.graderText}>{this.state.gradeName}</Text>
							</View>
						</View>
						<View style={styles.middleBottom}>
							<FlatList data={data}
								renderItem={this.renderItem.bind(this)}
							/>

						</View>


					</View>
					<View style={styles.bglast}>

						<TouchableOpacity onPress={this.onLogout.bind(this)} style={styles.logoutview}>
							<Text>Logout</Text>
						</TouchableOpacity>

					</View>
				</ImageBackground>
			</View>


		)
	}
}
export default SideMenu