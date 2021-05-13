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


class Dashboard extends Component{
	constructor(props){
		super(props)
		this.getData = this.getData.bind(this)
		this.state={
			loader:false,
			userName: "null",
			profile_pic: "null",
			gradeName:"null",
			schoolname:"null"
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
		  profile_pic: data.profile_pic ? imageUrl +data.profile_pic : "null",
		  gradeName: data.grade ? data.grade.name : "null",
		   schoolname: data.school ? data.school.name : "null"})
  }
	closeControlPanel = () => {
		this._drawer.close()
	  };
	  openControlPanel = () => {
		this._drawer.open()
	  };
	render(){
		const url = imageUrl + this.state.profile_pic
		return(
			<>
			<ImageBackground source={require('../../assets/images/Mobile_bg_2.png')}
			style={{width:"100%",height:"100%",opacity:0.4}}/>
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
				<View style={{flex:0.3,alignItems:"flex-end",justifyContent:"center",}}>
					<Image source={require('../../assets/images/dashboard/abstract.png')} style={{width:263/1.2,height:235/1.2}}/>
					<View style={{position: 'absolute' ,flex:1,height:"100%",width:"100%" ,justifyContent: 'center'}}>
					<Image source={require('../../assets/images/logo_icon.png')}
					style={{width:80,height:80,marginLeft: 20}}/>
                     <View style={{padding:20,flexDirection: 'row' ,}}>
                      <View style={{width:60,height:60,borderRadius:30,borderWidth: 3,borderColor:colors.Themecolor,justifyContent: 'center'}}>
						  {this.state.profile_pic != 'null' ?
                      <Image source={{uri: this.state.profile_pic}} style={{width:55,height:55,borderRadius: 55/2,alignSelf: 'center' }}/>
                      :  <Image source={require('../../assets/images/dashboard/user.png')} style={{width:55,height:55,borderRadius: 55/2,alignSelf: 'center' }}/>}
                      </View>
                      <View style={{marginLeft:10}}>
                       <Text style={{fontSize: 15,color:"black"}}>{this.state.userName}</Text>
                       <View style={{paddingLeft:5,paddingRight: 5,borderWidth: 1,borderRadius: 10,borderColor: colors.Themecolor,marginTop: 3}}>
                        <Text style={{color:colors.Themecolor}}>{this.state.gradeName}</Text>
                        </View>
                       
                      </View>
                     </View>

					</View>
				</View>
				<View style={{flex:0.6,marginHorizontal: 0,}}>
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
			</View></>
			)
	}
}
export default Dashboard
