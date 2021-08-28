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
    FlatList,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'
import SideMenu from "../../components/SideMenu"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, colors } from '../../constants';

const data=[
{
	image:require('../../assets/images/jeepap.png'),
	name:"JEE MAINS",
	color:"#c20678",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	},{
		name:"Mathematics JEE Main 2019"
	},{
		name:"Chemistry JEE Main 2018"
	},{
		name:"Biology JEE Main 2017"
	}]
},
{
	image:require('../../assets/images/jeeadv.png'),
	name:"JEE Advanced",
	color:"#ff491a",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
},
{
	image:require('../../assets/images/neetpap.png'),
	name:"NEET",
	color:"#1575ef",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
},
{
	image:require('../../assets/images/boardpap.png'),
	name:"CBSC Board Exams",
	color:"#6845dd",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
}
]
class PreviousPapers extends Component{
	constructor(props){
		super(props);
		this.state={
			userDetails:"",
			token:"",
			papers:[],
			loading:true
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
        const token = await AsyncStorage.getItem('@access_token')
        if(token){
			this.setState({
				token: JSON.parse(token),
				userDetails:data
			},()=>this.getPapers())
            
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
  getPapers(){
var url = baseUrl + "/question-paper-type"

fetch(url, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'token': this.state.token
	},
}).then((response) =>

	response.json())
	.then((json) => {
		console.log("pappersssss", json)
		if (json.data) {

		   
			this.setState({
				loading: false,
				papers: json.data.questionPaperTypes,
			})

		} else {
			this.setState({
				loading: false,
				papers: [],
			})
		}
	}

	)
	.catch((error) => console.error(error))
  }
	onItem(item){
		Actions.push('prequestionpapers',{"item": item})
	}
	renderItem({item}){
		return(
			<TouchableHighlight onPress={this.onItem.bind(this,item)} underlayColor="transparent" activeOpacity={0.9}>
			<View
			style={{width:566/1.6,height:60,borderWidth:1,borderColor:colors.Themecolor,flexDirection:"row",
			marginVertical: 10,justifyContent:"space-between",alignItems:"center",alignSelf:"center"}}>
				<View style={{flex:0.25}}>
				<ImageBackground source={require('../../assets/images/pp1.png')} style={{width:42*1.4,height:43*1.4,justifyContent:"center",alignItems:"center"}}>
					<Image source={require('../../assets/images/object.png')} style={{width:746/23,height:930/23}}/>
				</ImageBackground></View>
				<View style={{flex:0.75,justifyContent:"center",alignItems:"flex-start",}}>
			<Text style={{color:colors.Themecolor,fontSize:18,fontWeight:"600"}}>{item.title}</Text></View>
			</View>
			</TouchableHighlight>
			)
	}
  closeControlPanel = () => {
    this._drawer.close()
    };
    openControlPanel = () => {
    this._drawer.open()
    };
	onBack(){
		Actions.pop()
	}
	render(){
		return(
      <Drawer
      type="overlay"
        ref={(ref) => this._drawer = ref}
         tapToClose={true}
         openDrawerOffset={100}
          content={ <SideMenu

          closeControlPanel={this.closeControlPanel}/>}
        >
			<View style={styles.mainview}>

			<View style={styles.middleview}>

			<View style={{flexDirection:"row",justifyContent:"space-between"}}>
			<View style={{marginTop: 20,marginLeft:20}}>
			<TouchableOpacity onPress={this.onBack.bind(this)}>
			<Image source={require('../../assets/images/left-arrow.png')}
			 style={styles.backimage}/>
			</TouchableOpacity>
			<Text style={{marginTop: 20,fontSize:15}}>Previous Question Papers</Text>
			</View>
			<Image source={require('../../assets/images/abst.png')} style={{width:339/2,height:242/2}}/>
			</View>
			<View style={{flex:1,marginTop: 10}}>
             {this.state.loading ? 

			  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
				  <Text>Loading...</Text>
			  </View> : 
			  this.state.papers.length > 0 ?
			 <FlatList data={ this.state.papers}
					renderItem={this.renderItem.bind(this)}
					 /> : 
					 <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
				  <Text>No Papers</Text>
			  </View> }

			</View>


			</View>
			<View style={styles.footerview}>

		 <Footer openControlPanel={this.openControlPanel}/>
			</View> 
			</View>
      </Drawer>
			)
	}
}
export default PreviousPapers
