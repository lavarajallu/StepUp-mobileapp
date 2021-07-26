import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    Platform,
    Image,
    FlatList,
	BackHandler,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl , imageUrl} from "../../constants"
import StringsOfLanguages from '../../StringsOfLanguages';

var analysis =[
	{
		name:"Poor",
		color:"red"
	},
	{
		name: "Average",
		color:"orange"
	},
	{
		name:"Good",
		color:"blue"
	},
	{name:"Excellent",color:"green"}
]

class ReviewPostSummary extends Component{
	constructor(props){
		super(props)
		this.state={
			isvisible: false,
			testdata: [],
			spinner: true,
			token:'',
			activityid: this.props.activityid,
		}
	}
	componentDidMount(){
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);

		this.getData()
}
backAction = () => {
	Actions.topicmainview({from:this.props.from,type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData})
}
componentWillUnmount() {
		this.backHandler.remove();
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
            this.gettestsdata(data,JSON.parse(token))
			
        }else{
            
        }
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
  gettestsdata(data,token){
	///user-test/chapters/${subject_id}
    //alert("hi")
	var url = baseUrl+"/user-test/assigned-activity/"+this.props.activityid
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
				
				if(json.data){
					const data = json.data;
				  if(data){
					
					  this.setState
					  ({
						  spinner:false,
						  testdata: data.tests
					  },()=>  console.log("previous tests",data))
				  }else{
				   this.setState
				   ({
					  spinner: false,
					  testdata: []
				   }) 
				  }
				   //  AsyncStorage.setItem('@access-token', data.access_token)
				   //  Actions.push('dashboard')
				}else{
					//alert(JSON.stringify(json.message))
					this.setState
					({
					   spinner: false,
					   testdata: []
					})
				}
			}
			 
			)
			.catch((error) => console.error(error))
  }
	onBack(){
		Actions.topicmainview({from:this.props.from,type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData})
	}

	onTest(item){
		Actions.push('presummary', {from:this.props.from,testtype:this.props.testtype, testid: item.reference_id, index: this.props.index, smartres: this.props.smartres, topicData: this.props.topicData, topicindata: this.props.topicindata, subjectData: this.props.subjectData , review: true})
	}

	renderItem({item,index}){
		console.log("fff",item)
		return(
			<TouchableOpacity  onPress={this.onTest.bind(this)} style={styles.scoreview}>
			<Text>{StringsOfLanguages.test} {index} </Text>
		   <View style={styles.progressview}>
           <View style={{flexDirection:"row"}}>
			   <View style={{width : 50,height:50,backgroundColor:"red"}}></View>
			   <View style={{width : 100,height:5,backgroundColor:"red"}}></View>
		   </View>
		   <Text style={{marginLeft:5}}>{item.score} / {item.marks}</Text>
		   </View>
   </TouchableOpacity>
		)
	}
	
	render(){
	  const {topicindata}= this.props;
		return(

	<>
	<ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
	
	style={{width:"100%",height:"100%",backgroundColor:topicindata.color}} opacity={0.5}>
	  <View style={{flex:1}}>
	  <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity>
             
                <Text style={{ color: "white", fontSize: 18,marginLeft:10}}>{StringsOfLanguages.review}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View>
		<View style={{flex:0.9,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
		 			<View style={styles.middleview}>
				<View style={styles.subview}>
	 	          <Text style={styles.headtext}>{StringsOfLanguages.score}</Text>
	 	          <View style={styles.lineview}/>
	 			  {this.state.spinner ?
				   <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
				    <Text>{StringsOfLanguages.loading}</Text></View> :

					this.state.testdata.length > 0 ? 
					

					this.state.testdata.map((item,i) => 
						<TouchableOpacity  onPress={this.onTest.bind(this,item)} style={styles.scoreview}>
						<Text style={{marginLeft:0}}>{StringsOfLanguages.test} {i}  <Text style={{marginLeft:5}}>({item.score} / {item.marks})</Text></Text>
					   <View style={styles.progressview}>
						   <View style={{marginLeft:20,flexDirection:'row',height:70,width:"100%",justifyContent:"center",alignItems:"center"}}>
                             {/* {analysis.map((res,j)=> */}
							 <View>
							 <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
								 <View style={{width:30,height:30,borderRadius:15,
								 backgroundColor: item.analysis ===  "Poor" ? "#c54721" : "grey"}}/>
								 <View style={{width:60,height:1,backgroundColor:"black"}}/>
							 </View>
							 <Text style={{textAlign:"left"}}>{"Poor"}</Text>
							 </View>
							 {/* )} */}
						   </View>
						   <View style={{marginLeft:20,flexDirection:'row',height:70,width:"100%",justifyContent:"center",alignItems:"center"}}>
                             {/* {analysis.map((res,j)=> */}
							 <View>
							 <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
								 <View style={{width:30,height:30,borderRadius:15,
								 backgroundColor: item.analysis ===  "Average" ? "#d88414" : "grey"}}/>
								 <View style={{width:60,height:1,backgroundColor:"black"}}/>
							 </View>
							 <Text style={{textAlign:"left"}}>{"Average"}</Text>
							 </View>
							 {/* )} */}
						   </View>
						   <View style={{marginLeft:20,flexDirection:'row',height:70,width:"100%",justifyContent:"center",alignItems:"center"}}>
                             {/* {analysis.map((res,j)=> */}
							 <View>
							 <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
								 <View style={{width:30,height:30,borderRadius:15,
								 backgroundColor: item.analysis ===  "Fair" ? "#267093" : "grey"}}/>
								 <View style={{width:60,height:1,backgroundColor:"black"}}/>
							 </View>
							 <Text style={{textAlign:"left"}}>{"Good"}</Text>
							 </View>
							 {/* )} */}
						   </View>
						   <View style={{marginLeft:20,flexDirection:'row',height:70,width:"100%",justifyContent:"center",alignItems:"center"}}>
                             {/* {analysis.map((res,j)=> */}
							 <View>
							 <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
								 <View style={{width:30,height:30,borderRadius:15,
								 backgroundColor: item.analysis ===  "Good" ? "#a4b96e" : "grey"}}/>
								 <View style={{width:60,height:1,backgroundColor:"transparent"}}/>
							 </View>
							 <Text style={{textAlign:"left"}}>{"Excellent"}</Text>
							 </View>
							 {/* )} */}
						   </View>
					   </View>
					  
					 
			               </TouchableOpacity>)
						
					
					
					: null
					

	}
		         
          </View>
		  </View>
		</View>
	  </View>
	</ImageBackground>
</>
			)
	}
}
export default ReviewPostSummary