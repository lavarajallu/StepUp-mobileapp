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
var FloatingLabel = require('react-native-floating-labels');
import Footer from '../../components/Footer'
import Library from '../../components/Library';
import Loader from "../../components/Loader"
import { Validations } from '../../helpers'
import SideMenu from "../../components/SideMenu"
import Drawer from 'react-native-drawer'
import { colors } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import StringsOfLanguages from '../../StringsOfLanguages';
import { color } from 'react-native-reanimated';
const newdata=[
	{
		name:StringsOfLanguages.leaderboard,
		key :"leaderboard",
		image: require("../../assets/images/dashboard/new/leader_board.png"),
		color1:"#277292",//"#7D4BEA",
		color2: "#277292",//"#441DFC",
		width:44,
		height:74,
		tintcolor:"transparent"
	},{
		name:StringsOfLanguages.learninganalysis,
		key:'learninganalysis',
		image: require("../../assets/images/dashboard/new/analysis_new.png"),
		width:49,
		color1:"#d88212",
		color2: "#d88212",
		tintcolor:"transparent",
		height:43,
	},{
		name:StringsOfLanguages.mypractice,
		key:"mypractice",
		image: require("../../assets/images/dashboard/new/practice_new.png"),
		width:51,
		height:52,
		tintcolor:"transparent",
		color1:"#c44921",//"#F6815B",
		color2: "#c44921"// "#FC67A7",
	},{
		name:StringsOfLanguages.mocktest,
		key: "mocktest",
		image: require("../../assets/images/dashboard/new/mock_new.png"),
		width:52,
		color1:"#a3ba6d",//"#0D7B5A",
		color2: "#a3ba6d",//"#0D7B5A",
		height:55,
		tintcolor:"#6B9B1A"
	},
	// {
	// 	name:"Leader Board",
	// 	image: require("../../assets/images/dashboard/leaderboard.png")
	// },
	]

class Dashboard extends Component{
	constructor(props){
		super(props)
		this.getData = this.getData.bind(this)
		this.state={
			loader:false,
			userName: "",
			profile_pic: "null",
			gradeName:"null",
			schoolname:"null",
			newdata:[]
		}
	}
	componentDidMount(){
		setTimeout(() => {
			this.setState({loader: false});
			this.getData()
		}, 2000)
		
       
	}

getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
		console.log("dataaa",data)
        this.setData(data)
       
      }else{
        //Actions.push('login')
      }
    } catch(e) {
       return null;
    }
  }
 
  setData(data){
	 // alert(data.profile_pic)
	  this.setState({
		  userName: data.name ? data.name : data.first_name+" "+data.last_name,
		  profile_pic: data.profile_pic ? 'https://smarttesting.s3.ap-south-1.amazonaws.com'+data.profile_pic : "null",
		  gradeName: data.grade ? data.grade.name : "null",
		  newdata:newdata,
		   schoolname: data.school ? data.school.name : "null"})
  }
	closeControlPanel = () => {
		this._drawer.close()
	  };
	  openControlPanel = () => {
		this._drawer.open()
	  };
	  onItem(item){
		if(item.name === 'Previous Papers') {
			Actions.push("previouspapers")
		}else if (item.name === 'Mock Test'){
			Actions.push('mocktest')
		}else if(item.name === "My Practice"){
			Actions.push('practice')
		}else{
			Actions.push('analysis')
		}
	}

	render(){
		const url = 'https://smarttesting.s3.ap-south-1.amazonaws.com'+ this.state.profile_pic
		return(
			<>
		 <ImageBackground source={require('../../assets/images/Mobile_bg_1.png')}
			style={{width:"100%",height:"100%",opacity:0.5}}/>
			<View style={{width:"100%",height:"100%",position:"absolute"}}>
			<View style={styles.mainview}>
			{this.state.loader ? (
				<Loader/>
				):
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
				<View style={{flex:1}}>
			<ScrollView contentContainerStyle={{flexGrow:1,}}>
				<View style={{flex:0.2,alignItems:"flex-end",justifyContent:"center"}}>
					<Image source={require('../../assets/images/dashboard/new/dashboardabs_new.png')}
					style={{width:263/1.2,height:235/1.5}}/>
					<View style={{position: 'absolute' ,flex:1,height:"100%",width:"100%" ,justifyContent: 'center'}}>
					{/* <Image source={require('../../assets/images/logo_icon.png')}
					style={{width:70,height:70,marginLeft: 20}}/> */}
                    <View style={{marginLeft:20,marginTop:20}}>
                    <Text style={{color:colors.Themecolor//"#FFB13D"
					,fontSize:15}}>{StringsOfLanguages.hello}</Text>
                       <Text style={{color:colors.Themecolor//"#FFB13D"
					   ,fontWeight:"bold",fontSize:25}}>{this.state.userName}</Text>
                    </View>
                       
					</View>
				</View>
				<View style={{flex:0.7,marginHorizontal: 0,}}>
				
                  <Library/>
			    </View>
				</ScrollView>
				</View>
	    	       <View style={styles.footerview}>

					    <Footer openControlPanel={this.openControlPanel}/>
						</View>
				</View>


						</View></Drawer>}
			</View>
			 </View>
			</>
			)
	}
}
export default Dashboard
