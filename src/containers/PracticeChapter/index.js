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
import { baseUrl } from "../../constants"

import Modal from 'react-native-modal';
import Drawer from 'react-native-drawer'
import SideMenu from "../../components/SideMenu"
import AsyncStorage from '@react-native-async-storage/async-storage';

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
			newmodal:false,
			token:"",
			chaptersData:null,
			subject:{},
			chaptersDataNew:null,
			spinner: true,
			newchapters:[],
			selectedItem:{},
			setCompletionLevelTest:1
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
				token: JSON.parse(token)
			})
            this.getChapters(data,JSON.parse(token))
			
        }else{
            
        }
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
  getPreviousTest(data,token){
	///user-test/chapters/${subject_id}
    //alert("hi")
	var url = baseUrl+"/user-test/chapters/"+this.props.data.reference_id
	console.log("newvalue",url)
   fetch(url ,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			}
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
				//console.log("subjects",json)
				const data = json.data;
				if(data){
				  if(data){
					  console.log("previous tests",data.length)
					  this.setState
					  ({
						  spinner:false,
						  newchapters: data
					  },()=>this.getNewList())
				  }else{
				   this.setState
				   ({
					  spinner: false,
					  newchapters: []
				   }) 
				  }
				   //  AsyncStorage.setItem('@access-token', data.access_token)
				   //  Actions.push('dashboard')
				}else{
					alert(JSON.stringify(json.message))
					this.setState
					({
					   spinner: false,
					   newchapters: []
					})
				}
			}
			 
			)
			.catch((error) => console.error(error))
  }
  getChapters(user,token){
	var url = baseUrl+"/student/practiceChapters/"+user.grade_id+"/"+this.props.data.reference_id
	console.log("value",url)
   fetch(url ,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': token
			}
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
				//console.log("subjects",json)
				const data = json.data;
				if(data){
				  if(data.chapters){
					  console.log("subjects",data.subject)
					  this.setState
					  ({
						 // spinner: false,
						 subject: data.subject,
						  
					  },()=>this.setState({chaptersData: data.chapters},()=>this.getPreviousTest()))
				  }else{
				   this.setState
				   ({
					 // spinner: false,
					  chaptersData: []
				   }) 
				  }
				   //  AsyncStorage.setItem('@access-token', data.access_token)
				   //  Actions.push('dashboard')
				}else{
					alert(JSON.stringify(json.message))
					this.setState
					({
					   spinner: false,
					   chaptersData: []
					})
				}
			}
			 
			)
			.catch((error) => console.error(error))
  }
  getNewList(){
	if (this.state.newchapters.length > 0) {

		// var dummy1 = { 'reference_id': 'dummy', 'name': 'dummy',tests:[{reference_id:"-2"}] };
		// var dummy2 = { 'reference_id': '-1', 'name': 'SubjectQuiz', };
		// var newArray = [];
		// let level = 1
		// this.state.newchapters.map((pc, i) => {
		//   if (pc.tests.length) {
		// 	level = i + 1
		//   }
		// })
		// this.setState({
		// 	setCompletionLevelTest: level+1
		// })
		// //setCompletionLevelTest(level + 1)
		// newArray = [...newArray, dummy1];
		// for (let i = 0; i < this.state.newchapters.length; i++) {
		// 	if(i===1){
		// 		if(this.state.newchapters[i-1].tests.length > 0){
		// 			this.state.newchapters[i].locked = false;
		// 		}else{
		// 			this.state.newchapters[i].locked = true;
		// 		}
				
		// 	}
			
		// 	newArray = [...newArray, this.state.newchapters[i]];
		// }
		// newArray = [...newArray, dummy2];.
		let newArray = this.state.newchapters.slice(0, 9)
		newArray.unshift({ name: 'Start' ,tests:[{"name":"test1"}]})
		newArray.push({name:this.state.subject.name,reference_id:this.state.subject.reference_id,tests:[],type:"Subject"})
      //  newArray.push(this.state.subject)
		console.log("newArray",newArray)
		this.setState({
			chaptersDataNew: newArray,
			spinner: false
		},()=>
			{
				console.log("nearra",this.state.chaptersDataNew.length)
			//for (let i = 0; i < this.state.chaptersDataNew.length; i++) {
		// 	if(this.state.chaptersDataNew[i-1]){
		// 		console.log(this.state.chaptersDataNew[i-1].tests)
		// 		if(this.state.chaptersDataNew[i-1].tests.length > 0){
		// 			this.state.chaptersDataNew[i].locked = false;
		// 		}else{
		// 			this.state.chaptersDataNew[i].locked = true;
		// 		}
		// 	}
				
				
			
			})
		

	
	} else {
		this.setState({
			spinner: false,
			chaptersDataNew:[]
		});
	}
  }
	onItem(item,index){
		item['color'] = this.props.data.color
		console.log("itemmm,item", item.name,  this.props.data)
		if(this.state.subject.name === item.name){
			Actions.push('practiceassesment',{data: item,subjectData: this.state.data,type:item.type})
		}else{
			this.setState({
				selectedItem: item
			})
		   if(item.tests.length > 0){
			this.setState({
				selectedItem: item
			},()=>{
				this.setState({
					newmodal: true
				})
			})
		
		   }else{
			   Actions.push('practiceassesment',{data: item,subjectData: this.state.data,type:"Chapter"})
		   }
		}
	}
	onCancel(){
		this.setState({
			isvisible:false
		})
	}
	onOk(){
		// this.setState({
		// 	isvisible:false,
		// 	newmodal:false,
		// },()=>Actions.push('practiceassesment',{data: this.state.selectedItem}))

	}
	onStarttext(){
		this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('practiceassesment',{data: this.state.selectedItem,subjectData:this.state.data}))

	}
	onReview(){
       this.setState({
			isvisible:false,
			newmodal:false,
		},()=>Actions.push('practicereview',{data: this.state.selectedItem,subjectData:this.state.data}))
	}
	renderItem({item,index}){
  	console.log("slknkldsf",this.state.chaptersDataNew[index-1])
	 
	  var newindex
	  if(this.state.chaptersDataNew[index-1]){
		  newindex = this.state.chaptersDataNew[index-1].tests.length
	  }
		var color;
		if(item.locked){
			color=colors.Themecolor
		}else{
			color=colors.Themecolor
		}
		var chapterItem = item
		return(
			<View style={{ transform: [{ scaleY: -1 }] }}>
            <View>
                {
                    (index != 0)
                        ?
                        (index % 2 == 0)
                            ?
							

                             
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={{ flex: 1 }}
                                            activeOpacity={0.6}>
                                            <View style={{ flex: 1 }}>
                                                <Text numberOfLines={2} 
												 style={{ width: '100%', color: 'black',textAlign: 'right', paddingEnd: 10, alignSelf: 'center' }}>{chapterItem.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                      
										{newindex <= 0 ?  
										<View
										activeOpacity={0.6}
										style={{width:30,height:30,borderRadius:20,borderWidth:2,borderColor:colors.Themecolor,alignItems:"center",justifyContent:"center"}}
										>
											<Image
											style={{ height: 20, width: 20, alignSelf:"center"}}
											source={require('../../assets/images/practicelock.png')} />
											</View>
											:
											<TouchableOpacity
                                            activeOpacity={0.6}
											style={{width:30,height:30,borderRadius:20,borderWidth:2,borderColor:colors.Themecolor,alignItems:"center",justifyContent:"center"}}
                                            onPress={() => this.onItem(item,index,'Chapter')}>
                                            <Image
                                                style={{ height: 20, width: 20, alignSelf:"center"}}
                                                source={require('../../assets/images/practiceplay.png')} />
												 </TouchableOpacity>
											}
                                       
                                    </View>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ width: '100%', height: 15 }} />
                                        <Image
                                            style={{ height: 80, width: 80, alignSelf: 'flex-start',tintColor:colors.Themecolor }}
                                            source={require('../../assets/images/img_curve2.png')} />
                                    </View>
                                </View>
                            </View>
                            :
							

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.5 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ width: '100%', height: 15 }} />
                                        <Image
                                            style={{ height: 80, width: 80, alignSelf: 'flex-end',tintColor:colors.Themecolor  }}
                                            source={require('../../assets/images/img_curve1.png')} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        
                                           {newindex <= 0 ?  
										   <View
										   activeOpacity={0.6}
										   style={{width:30,height:30,borderRadius:20,borderWidth:2,borderColor:colors.Themecolor,alignItems:"center",justifyContent:"center"}}
										   >
											<Image
											style={{ height: 20, width: 20, alignSelf:"center"}}
											source={require('../../assets/images/practicelock.png')} /></View>
											:
											<TouchableOpacity
										 onPress={() => this.onItem(item,index,'Chapter')}
										 style={{width:30,height:30,borderRadius:20,borderWidth:2,borderColor:colors.Themecolor,alignItems:"center",justifyContent:"center"}}
                                            activeOpacity={0.6}>
                                            <Image
                                                style={{ height: 20, width: 20, alignSelf:"center"}}
                                                source={require('../../assets/images/practiceplay.png')} />
												 </TouchableOpacity>
											}
                                       
                                        <TouchableOpacity
                                            style={{ flex: 1 }}
                                            activeOpacity={0.6}>
                                            <View style={{ flex: 1 }}>
                                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ width: '100%', color: "black", textAlign: 'left', paddingEnd: 5, paddingStart: 5, alignSelf: 'center' }}>{chapterItem.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        :
                        <Image
                            style={{ height: 60, width: 60, bottom: 10, alignSelf: 'center' }}
                            source={require('../../assets/images/img_start.png')} />
                }
            </View>
        </View>
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
  closeControlPanel = () => {
    this._drawer.close()
    };
    openControlPanel = () => {
    this._drawer.open()
    };
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
			<ImageBackground source={require('../../assets/images/dashboard/new/learningbg.png')}
			   style={{width:"100%",height:288}}>
				   <View style={{flexDirection:"row",marginTop:20,marginLeft:10,alignItems:"center"}}>
				   <TouchableOpacity onPress={this.onBack.bind(this)}>
                        <Image source={require("../../assets/images/left-arrow.png")}
                            style={{width:30,height:30,tintColor:"white"}} />
                    </TouchableOpacity>
					<Text style={{color:"white",marginLeft:20,fontSize:20}}>{this.state.subject.name}</Text>
				   </View>
				 
			   </ImageBackground>
			   <View style={{height:windowHeight/1.3,width:windowWidth,backgroundColor:"white",alignSelf:"center",
			   position:"absolute",bottom:0,borderTopRightRadius:30,borderTopLeftRadius:30}}>
					{this.state.spinner  ? 

				<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
					<Text>Loading...</Text>
				</View>:
				<View style={{flex:1,paddingTop:20}}>
					
				<FlatList data={this.state.chaptersDataNew}
			  style={{ transform: [{ scaleY: -1 }] }}
					renderItem={this.renderItem.bind(this)}
					 />
			</View>
				

				}
			   </View>
            {/* {this.state.spinner ? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Loading...</Text></View>:
			<View style={{flex:1,}}>
				<View style={{flex:0.2,flexDirection:"row",justifyContent:"space-between",}}>
							<View style={{marginTop: 20,marginLeft:20}}>
						<TouchableOpacity onPress={this.onBack.bind(this)}>
						<Image source={require('../../assets/images/left-arrow.png')} style={{width:30,height:30,tintColor:colors.Themecolor}}/>
						</TouchableOpacity>
						<Text style={{marginTop: 20,fontSize:15}}>{this.state.subject.name}</Text>
						</View>
						<Image source={require('../../assets/images/practiceabs.png')} style={{width:339/2,height:242/2}}/>
				 </View>
				<View style={{flex:0.8,paddingVertical:10}}>
					
				<FlatList data={this.state.chaptersDataNew}
			  style={{ transform: [{ scaleY: -1 }] }}
					renderItem={this.renderItem.bind(this)}
					 />
				</View>
			</View>} */}
			</View>
			 <View style={styles.footerview}>

		   <Footer openControlPanel={this.openControlPanel}/>
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
                 <Image source={require("../../assets/images/icon_1.png")} style={{width:20,height:20,}}/>
                  <Text style={{marginLeft:15,fontSize:15}}>Review Previous Test</Text>
                  </TouchableOpacity>
                   <TouchableOpacity onPress={this.onStarttext.bind(this)} style={{flexDirection: 'row',marginLeft:20,marginTop:10}}>
                     <Image source={require("../../assets/images/icon_2.png")} style={{width:20,height:20}}/>
                      <Text style={{marginLeft:15,fontSize:15}}>Start New Test</Text>
                      </TouchableOpacity>
                  </View>
                </View>
             </Modal>
			 </View>
      </Drawer>
			)
	}
}
export default PracticeChapter
