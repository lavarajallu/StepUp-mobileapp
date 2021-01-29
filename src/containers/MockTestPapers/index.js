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
import Modal from 'react-native-modal';
const data=[
{
	image:require('../../assets/images/jeepap.png'),
	name:"JEE MAINS",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	},{
		name:"Mathematics JEE Main 2019"
	},{
		name:"Mathematics JEE Main 2018"
	},{
		name:"Mathematics JEE Main 2017"
	}]
},
{
	image:require('../../assets/images/jeeadv.png'),
	name:"JEE Advanced",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
},
{
	image:require('../../assets/images/neetpap.png'),
	name:"NEET",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
},
{
	image:require('../../assets/images/boardpap.png'),
	name:"CBSC Board Exams",
	papers:[
	{
		name:"Mathematics JEE Main 2020"
	}]
}
]
class MockTestPapers extends Component{
	constructor(props){
		super(props);
		this.state={
			isvisible:false,
			newmodal:false,
			item:{}
		}
	}
	onItem(item){
		this.setState({
			item:item,
			
		},()=>{
			this.setState({
				newmodal:true
			})
		})
	}
	renderItem({item}){
		return(
			<TouchableOpacity onPress={this.onItem.bind(this,item)} style={{padding:20,margin:20,backgroundColor: 'white',flexDirection:"row",width:windowWidth/1.2,justifyContent:  'space-between', shadowOffset: { width: 0, height: 5 },//marginBottom:20,
          shadowOpacity: 1,
          borderRadius: 10,
          shadowRadius: 5,
          elevation: 10,shadowColor: 'grey'  }}>
			<Text>{item.name}</Text>
			<View 
			style={styles.itemstart}>
			<Text style={{color:"white"}}>Start</Text>
			</View>
			</TouchableOpacity>
			)
	}
	onBack(){
		Actions.pop()
	}
	onClose(){
		this.setState({
			isvisible:false
		})
	}
	onStarttext(){
		this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('mocktestassesment',{"item":this.state.item}))
		
	}
	onReview(){
		this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('mocktestreview',{"item":this.state.item}))
        
	}
	onBackdrop(){
		this.setState({
			newmodal:false
		})
	}
	render(){
		return(
			<View style={styles.mainview}>
			
			<View style={styles.middleview}>
			
			<View style={{flexDirection:"row",justifyContent:"space-between"}}>
			<View style={{marginTop: 40,marginLeft:20}}>
			<TouchableOpacity onPress={this.onBack.bind(this)}>
			<Image source={require('../../assets/images/left-arrow.png')} 
			style={styles.backimage}/>
			</TouchableOpacity>
			<Text style={{marginTop: 20,fontSize:15}}>Previous Question Papers</Text>
			</View>
			<Image source={require('../../assets/images/abst.png')} style={{width:339/2,height:242/2}}/>
			</View>
			<View style={{flex:1,marginTop:30}}>

			 <FlatList data={this.props.item.papers}
					renderItem={this.renderItem.bind(this)}
					 />
			</View>


			</View>
			<View style={styles.footerview}>

		    <Footer/>
			</View>
			 <Modal isVisible={this.state.isvisible}>
		        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
		         <View style={{backgroundColor: 'white',borderRadius: 15,margin: 25,overflow:"hidden"}}>
		        	
		        	<ImageBackground source={require("../../assets/images/modalimage.png")}
		        	 style={{width:windowWidth/1.1,height:306/3,}}>
		        	<View style={{flex:0.2,}}>
		        	<Text style={{textAlign:"center",color:"white",marginTop:5}}>{this.state.item.name}</Text>
		        	</View>
		        	<View style={{flex:0.8,flexDirection: 'row',justifyContent:"space-between",alignItems:"flex-end"}}>
		        	   <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:20}}>
		        	   <Image source={require('../../assets/images/modalques.png')} style={{width:30,height:30}}/>
		        	   <Text style={{marginLeft:10}}>30 Questions</Text>
		        	   </View>
		        	    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:20}}>
		        	   <Image source={require('../../assets/images/modaltimer.png')} style={{width:30,height:30}}/>
		        	   <Text style={{marginLeft:10}}>60 Minutes</Text>
		        	   </View>
		        	</View>
		        	</ImageBackground>
		        	<View style={{height:1,backgroundColor: 'orange',opacity:0.5, shadowOffset: { width: 0, height: 5 },marginTop:10,
				          shadowOpacity: 1,
				          shadowRadius: 5,
				          elevation: 15,shadowColor:"orange"}}>
			          </View>
		            <View>
		            <Text style={{textAlign:"center",fontSize:20,marginTop:5}}>Instructions</Text>
		            <View style={{flexDirection:"row",marginLeft: 15,marginTop:15}}>
		            <Image source={require('../../assets/images/modalhelp.png')} style={{width:77/3,height:72/3}}/>
		            <Text style={{marginLeft:10,paddingRight:50}}>1.0 marks are awarded for correct attempts and 0.0 marks for wrong attempts.</Text>
		            </View>
		            <View style={{flexDirection:"row",marginLeft: 15,marginTop:15}}>
		            <Image source={require('../../assets/images/modalhelp.png')} style={{width:77/3,height:72/3}}/>
		            <Text style={{marginLeft:10,marginRight:10}}>Tap on options to select the correct answer.</Text>
		            </View>
		            <View style={{justifyContent:"center",alignItems:"center"}}>
		            <TouchableOpacity onPress={this.onStarttext.bind(this)}>
		            <ImageBackground source={require('../../assets/images/modalbutton.png')} style={{width:256/2,height:97/2,marginVertical: 10,justifyContent:"center",alignItems:"center"}}>
		              <Text style={{color:"white",fontSize:15}}>Start Test</Text>
		            </ImageBackground>
		            </TouchableOpacity>
		            </View>
		            </View>
		        </View>
		        <TouchableOpacity onPress={this.onClose.bind(this)} style={{position:"absolute",top:170,left:windowWidth/1.2}}>
		        <Image source={require('../../assets/images/modalclose.png')}
		          style={{width:144/4,height:144/4}}/>
		          </TouchableOpacity>
		         </View>
	
		      </Modal>
		       <Modal isVisible={this.state.newmodal} onBackdropPress={this.onBackdrop.bind(this)} style={{justifyContent:"center",margin:0}}>
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
export default MockTestPapers;