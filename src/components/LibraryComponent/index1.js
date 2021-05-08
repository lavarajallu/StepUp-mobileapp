import React, { Component } from 'react';
import {
	ActivityIndicator,
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
	Platform,
	TouchableHighlight,
	FlatList
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import { Actions } from 'react-native-router-flux';
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { baseUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import StringsOfLanguages from './../../StringsOfLanguages';

var imagesarray=[
	require('../../assets/images/dashboard/new/bluebg_new.png'),
	require('../../assets/images/dashboard/new/orangebg_new.png'),
	require('../../assets/images/dashboard/new/purplebg_new.png'),
	require('../../assets/images/dashboard/new/greenbg_new.png')
]
class LibraryComponent extends Component {
	constructor(props) {
		super(props)
		this.state={
			subjectsData:null,
			spinner: true,
			analyticsData:{},
			token:""
		}
	}
	onChapter(item){
		this.updateAnalytics()
		Actions.push('chapters',{data:item})
	}
	componentDidMount(){
		this.getData()
}
updateAnalytics(){
	//alert(this.state.analyticsData.reference_id)
	var url = baseUrl+'/analytics/'+this.state.analyticsData.reference_id
	fetch(url ,{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'token': this.state.token
		},
		}).then((response) =>
		
		 response.json())
		.then((json) =>{
			
			if(json.data){
				const data = json.data;
			//   alert(JSON.stringify(json));
			   this.setState({
				   analyticsData: data
			   })
			//    Snackbar.show({
			// 	text: "Analytics Updated succesfully",
			// 	duration: Snackbar.LENGTH_SHORT,
			//   });
			}else{
				console.log(JSON.stringify(json.message))
			}
		}
		 
		)
		.catch((error) => console.error(error))
		
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
            this.getSubjects(data,JSON.parse(token))
			this.getanalytics(data,JSON.parse(token))
        }else{
            
        }
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
  getSubjects(user,toekn)
{
    //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
         var url = baseUrl+'/student/subjects/'+user.reference_id+"?offset=0&limit=4&order_by=name&sort_order=DESC"
         console.log("value",url)
        fetch(url ,{
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'token': toekn
                 }
                 }).then((response) =>
                 
                  response.json())
                 .then((json) =>{
                     const data = json.data;
                     if(data){
                       if(data.subjects){
                           this.setState
                           ({
                               spinner: false,
                               subjectsData: data.subjects
                           })
                       }else{
                        this.setState
                        ({
                           spinner: false,
						   subjectsData: []
                        }) 
                       }
                        //  AsyncStorage.setItem('@access-token', data.access_token)
                        //  Actions.push('dashboard')
                     }else{
                         alert(JSON.stringify(json.message))
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
getanalytics(user,token){
	var body={
		user_id: user.reference_id,
		board_id: user.grade ? user.grade.board_id : null,
		grade_id:   user.grade ? user.grade.reference_id : null,
		section_id: user.section? user.section.reference_id : null,
		school_id: user.school ? user.school.reference_id :null,
		branch_id : user.grade ? user.grade.branch_id : null,
		page:"MyCourse_Subjects",
		type:"mobile",
		subject_id:null,
		chapter_id:null,
		topic_id:null,
		activity_id:null,
	}
    
	console.log("analyticsss",body)
	var url = baseUrl+'/analytics'
	console.log("value",url)
   fetch(url ,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'token': token
			},
			body:JSON.stringify(body)
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
				
				if(json.data){
					const data = json.data;
				//   alert(JSON.stringify(json));
				   this.setState({
					   analyticsData: data
				   })
				//    Snackbar.show({
				// 	text: json.message,
				// 	duration: Snackbar.LENGTH_SHORT,
				//   });
				}else{
					console.log(JSON.stringify(json.message))
				}
			}
			 
			)
			.catch((error) => console.error(error))
}
	renderItem({ item,index }) {
		var colorsarray = imagesarray//["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var randomItem = colorsarray[Math.floor(Math.random()*colorsarray.length)];
		 var bgimage = randomItem;
		// var unique = true;
		// bgimage = colorsarray[Math.floor(Math.random()*colorsarray.length)];
		// var newitem = colorsarray.splice(bgimage,1);
		// colorsarray.push(newitem);
		const url = "https://smarttesting.s3.ap-south-1.amazonaws.com"+item.image
		var progress = 0+ (0.4 * Math.random())
		var percent = (item.percent) * 100;
		var color;
		if(percent > 50 ){
			color = "green"
		}else if (color< 50) {
			color = "red"
		}else{
			color = "orange"
		}
		console.log("urlll",url)
		var newarray = ["#6a5177","#d88212","#277292","#a3ba6d","#deb026","#c44921"];
		var newitem = newarray[index] //newarray[Math.floor(Math.random()*newarray.length)];
		item["color"] = newitem
		return (
		   <TouchableHighlight onPress={this.onChapter.bind(this,item)}  underlayColor="transparent" 
		   activeOpacity={0.9} style={{padding:8}}>
					
					<ImageBackground source={require('../../assets/images/dashboard/new/chapters_bg.png')} style={[styles.rectview, { backgroundColor: newitem }]} opacity={0.5} >
					<View style={{flex:1,}}>
						<View style={{flex:0.75,justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
							
						{item.image ? 
							 <Image source={{uri: url}}
							 style={{width:60,height:60,resizeMode:"cover"}} />
							 :
							  <Image source={require('../../assets/images/noimage.png')}
							  style={{width:60,height:60,resizeMode:"cover"}}/>}
							  <Text style={{fontSize:12,color:"white"}}>{item.name}</Text>
							  </View>
						<View style={{flex:0.25,marginHorizontal:10}}>
						<View style={styles.countview}>
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/1.png')} style={styles.iconview} />
									 <Text style={styles.icontext}>{item.chaptersCount}</Text>
								 </View>
							
								 <View style={styles.innercountview}>
									 <Image source={require('../../assets/images/2.png')} style={styles.iconview} />
									 <Text style={styles.icontext}>{item.topicsCount}</Text>
								 </View></View>
						</View>
					</View>
					</ImageBackground>
					
					</TouchableHighlight>
		
	// 	<View style={{width:110,marginVertical:5,marginHorizontal:10,alignItems:"center"}}>
	// 		<View style={{width:80,height:80,backgroundColor:newitem,borderRadius:40,justifyContent:"center",alignItems:"center", shadowColor: newitem,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.9,
    // shadowRadius: 3,
    // elevation: 10,}}>
	// 		{item.image ? 
	// 									<Image source={{uri: url}} style={{width: 50,height:50,borderRadius:25,}} />
	// 									:
	// 									<Image source={require('../../assets/images/noimage.png')}
	// 									style={{width:60,height:60,resizeMode:"contain"}}/>}
	// 		</View>
	// 		<Text style={{textAlign:"center",fontSize:10,marginTop:10}}>{item.name}</Text>
	// 				</View>
		

		)
	}
	onSeeaLL(){
		Actions.push('subjects')
	}
	render() {
		return (

			<View>
				<View style={{flexDirection: 'row',justifyContent: 'space-between'  }}>
			 <Text style={styles.headText}>{StringsOfLanguages.mylibrary}</Text>
			 <TouchableOpacity onPress={this.onSeeaLL.bind(this)}>
			 <Text style={styles.seelalltext}>{StringsOfLanguages.seeall}</Text> 
			 </TouchableOpacity>
			
			</View>

			{this.state.spinner ? 
                           <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                           <ActivityIndicator color={"black"}/>
                           </View>  : 
                              this.state.subjectsData &&
                             this.state.subjectsData.length > 0 ?
							 <View style={{flex:1,marginHorizontal:10,justifyContent:"center",}}>
							<FlatList data={this.state.subjectsData} 
							renderItem={this.renderItem.bind(this)}
							 numColumns={2}
							//horizontal={true}
							
							showsHorizontalScrollIndicator={false}
							 /></View> :   
						 <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text>No Data</Text>
                             </View> 
                              


                              }

			</View>
		)
	}
}
export default LibraryComponent
