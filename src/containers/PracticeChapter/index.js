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
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../../components/Footer'
import { Validations } from '../../helpers'
import { colors } from "../../constants"
import Modal from 'react-native-modal';
const data=[
{
	image:require('../../assets/images/jeepap.png'),
	name:"Chapter-1",
	color:"#c20678",
	locked:false,
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
	name:"Chapter-2",
	color:"#ff491a",
	locked:false,
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
},
{
	image:require('../../assets/images/neetpap.png'),
	name:"Chapter-3",
	color:"#1575ef",
	locked:true,
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
},
{
	image:require('../../assets/images/boardpap.png'),
	name:"Chapter-4s",
	color:"#6845dd",
	locked:true,
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
}
]
class PracticeChapter extends Component{
	constructor(props){
		super(props);
		this.state={
			data: this.props.data,
			isvisible:false,
			newmodal:false
		}
	}
	onItem(item){
		this.setState({
			newmodal: true
		})
		//Actions.push('prequestionpapers',{"item": item})
	}
	onCancel(){
		this.setState({
			isvisible:false
		})
	}
	onOk(){
		this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('practiceassesment'))
		
	}
	onStarttext(){
		this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('practiceassesment'))
		
	}
	onReview(){
       this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('practicereview'))
	}
	renderItem({item,index}){
		console.log("slknkldsf",index, data.length)
		var color;
		if(item.locked){
			color="orange"
		}else{
			color="orange"
		}
		return(
			index%2 === 0 ? 
			<TouchableOpacity onPress={this.onItem.bind(this,item)} 
			 style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",marginRight:25}}>
			<Text style={{fontSize:15,paddingRight:5}}>{item.name}</Text>
			<View>
			<View style={{height:84,width:84,borderRadius: 42,borderWidth:10,borderColor:color,justifyContent:"center",alignItems:"center"}}>
			{item.locked ? <Image source={require('../../assets/images/practicelock.png')} style={{width:25,height:25}}/>:
			<Image source={require('../../assets/images/practiceplay.png')} style={{width:25,height:25}}/>
		    }
			</View>
			<View style={{height:10,marginTop:5,width:40,backgroundColor: color,transform:[{rotate:"-50deg"}]}}/>
			</View>
			</TouchableOpacity>
			:
			<TouchableOpacity onPress={this.onItem.bind(this,item)}  style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",marginLeft: 50}}>
			{data.length-1 === index ? 
				<View style={{height:84,width:84,borderRadius: 42,borderWidth:10,borderColor:color,justifyContent:"center",alignItems:"center"}}>
				<Text style={{color:colors.Themecolor}}>Start</Text>
				</View> : 
			<View>
			<View style={{height:84,width:84,borderRadius: 42,borderWidth:10,borderColor:color,justifyContent:"center",alignItems:"center",}}>
			{item.locked ? <Image source={require('../../assets/images/practicelock.png')} style={{width:25,height:25}}/>:
			<Image source={require('../../assets/images/practiceplay.png')} style={{width:25,height:25}}/>
		    }
			</View>
			<View style={{height:10,width:40,marginLeft:20,backgroundColor:color,transform:[{rotate:"50deg"}]}}>
			</View>
			</View>
			}

			<Text style={{fontSize:15,paddingLeft:10}}>{item.name}</Text>
			</TouchableOpacity>
			)
	}
	onBack(){
		Actions.practice()
	}
	onBackdrop(){
		this.setState({
			newmodal:false,
		})
	}
	render(){
		return(
			<View style={styles.mainview}>
			
			<View style={styles.middleview}>
			
			<View style={{flexDirection:"row",justifyContent:"space-between"}}>
			<View style={{marginTop: 40,marginLeft:20}}>
			<TouchableOpacity onPress={this.onBack.bind(this)}>
			<Image source={require('../../assets/images/left-arrow.png')} style={{width:30,height:30,tintColor:colors.Themecolor}}/>
			</TouchableOpacity>
			<Text style={{marginTop: 20,fontSize:15}}>Mathematics</Text>
			</View>
			<Image source={require('../../assets/images/practiceabs.png')} style={{width:339/2,height:242/2}}/>
			</View>
			<View style={{marginTop: 40,marginLeft:20,paddingVertical: 30}}>

			 <FlatList data={data.reverse()}
					renderItem={this.renderItem.bind(this)}
					 />
			</View>


			</View>
			<View style={styles.footerview}>

		    <Footer/>
			</View>
			 <Modal isVisible={this.state.isvisible}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15}}>
          <Text style={{color:"black",fontSize: 20,textAlign: 'center',marginTop:10}}>Your are about to begin your Practice Test</Text>
          <Text style={{fontSize: 15,marginHorizontal:30,textAlign: 'center',marginTop:10}}>Once you begin you have 20 minutes to finish the test</Text>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop:10}}>Are you ready to begin?</Text>
         <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:20 }}>
           <TouchableOpacity onPress={this.onOk.bind(this)} >
           <LinearGradient colors={['#239816', '#32e625']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text style={{color:"white"}}>OK</Text>
           </LinearGradient>
           </TouchableOpacity>
             <TouchableOpacity onPress={this.onCancel.bind(this)}>
              <LinearGradient colors={['#f14d65', '#fc8798']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
              <Text style={{color:"white"}}>CANCEL</Text>
               </LinearGradient>
           </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
       <Modal isVisible={this.state.newmodal} style={{justifyContent:"center",margin:0}} onBackdropPress={this.onBackdrop.bind(this)}>
                <View style={{ flex: 1,justifyContent:"flex-end" }}>
                <View style={{padding:20,backgroundColor: 'white',borderTopLeftRadius: 15,borderTopRightRadius: 15}}>
                 <Text style={{marginLeft:10,fontSize: 20}}>Go With..</Text>
                 <TouchableOpacity onPress={this.onReview.bind(this)} style={{flexDirection: 'row',marginLeft:20,marginTop:10}}>
                 <Image source={require("../../assets/images/icon_1.png")} style={{width:28,height:28,}}/>
                  <Text style={{marginLeft:15,fontSize:20}}>Review Previous Test</Text>
                  </TouchableOpacity>
                   <TouchableOpacity onPress={this.onStarttext.bind(this)} style={{flexDirection: 'row',marginLeft:20,marginTop:10}}>
                     <Image source={require("../../assets/images/icon_2.png")} style={{width:28,height:28}}/>
                      <Text style={{marginLeft:15,fontSize:20}}>Start New Test</Text>
                      </TouchableOpacity>
                  </View>
                </View>
             </Modal>
		        
			</View>	
			)
	}
}
export default PracticeChapter