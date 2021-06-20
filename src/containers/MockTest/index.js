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
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'
import SideMenu from "../../components/SideMenu"

const data=[
{
	image:require('../../assets/images/jeepap.png'),
	name:"JEE MAINS",
	color:"#c20678",
	papers:[
	{
		name:"Chemistry"
	},{
		name:"Mathematics "
	},{
		name:"Physics"
	},{
		name:"Biology"
	}]
},
{
	image:require('../../assets/images/jeeadv.png'),
	name:"JEE Advanced",
	color:"#ff491a",
	papers:[
	{
		name:"Mathematics"
	}]
},
{
	image:require('../../assets/images/neetpap.png'),
	name:"NEET",
	color:"#1575ef",
	papers:[
	{
		name:"Mathematics"
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
class MockTest extends Component{
	constructor(props){
		super(props)
	}
	onItem(item){
		Actions.push('mocktestpapers',{"item": item})
	}
  closeControlPanel = () => {
    this._drawer.close()
    };
    openControlPanel = () => {
    this._drawer.open()
    };
	renderItem({item}){
		return(
			<TouchableOpacity onPress={this.onItem.bind(this,item)}>
			<ImageBackground source={item.image}
			style={{width:566/1.6,height:157/1.6,marginVertical: 10,justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
			<Text style={{color:item.color}}>{item.name}</Text>
			</ImageBackground>
			</TouchableOpacity>
			)
	}
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

			
			<Text style={{marginTop: 20,fontSize:15}}>Competitive Exam-Mocks</Text>
			</View>
			<Image source={require('../../assets/images/abst.png')} style={{width:339/2,height:242/2,alignSelf:"center"}}/>
			</View>
			<View style={{flex:1,marginTop: 20,alignItems:"center"}}>
			<Image source={require('../../assets/images/comingsoon.jpeg')}
               style={{width:windowWidth/1.2,height:512}}/>
			{/*} <FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					 /> */}
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
export default MockTest;
