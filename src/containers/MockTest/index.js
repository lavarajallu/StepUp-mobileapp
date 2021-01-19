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
	renderItem({item}){
		return(
			<TouchableOpacity onPress={this.onItem.bind(this,item)}>
			<ImageBackground source={item.image} style={{width:566/1.8,height:157/1.8,marginVertical: 20,justifyContent:"center",alignItems:"center"}}>
			<Text style={{color:item.color}}>{item.name}</Text>
			</ImageBackground>
			</TouchableOpacity>
			)
	}
	onBack(){
		Actions.dashboard()
	}
	render(){
		return(
			<View style={styles.mainview}>
			
			<View style={styles.middleview}>
			
			<View style={{flexDirection:"row",justifyContent:"space-between"}}>
			<View style={{marginTop: 40,marginLeft:20}}>
			<TouchableOpacity onPress={this.onBack.bind(this)}>
			<Image source={require('../../assets/images/left-arrow.png')} style={{width:30,height:30,tintColor:"orange"}}/>
			</TouchableOpacity>
			<Text style={{marginTop: 20,fontSize:15}}>Competitive Exam-Mocks</Text>
			</View>
			<Image source={require('../../assets/images/abst.png')} style={{width:339/2,height:242/2}}/>
			</View>
			<View style={{marginTop: 40,marginLeft:20}}>

			 <FlatList data={data}
					renderItem={this.renderItem.bind(this)}
					 />
			</View>


			</View>
			<View style={styles.footerview}>

		    <Footer/>
			</View>
			</View>	
			)
	}
}
export default MockTest;