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
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles"
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../../constants"
import * as Progress from 'react-native-progress';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
  } from "react-native-chart-kit"

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

let sampleData = [
    {
      seriesName: 'Pre Assesment',
      data: [
        {x: '0', y: 20},
        {x: 'Physics', y: 30},
        {x: 'Chemistry', y: 50},
        {x: 'Biollogy', y: 70},
        {x:'Mathematics', y :90}
      ],
      color: 'orange'
    },
    {
      seriesName: 'Post Assesment',
      data: [
        {x: '0', y: 5},
        {x: 'Physics', y: 20},
        {x: 'Chemistry', y: 40},
        {x: 'Biology', y: 60},
        {x:'Mathematics', y :80}
      ],
      color: 'green'
    }
  ]

class PracticeReview extends Component{
	constructor(props){
		super(props)
		this.state={
			isvisible: false,
			testdata: [],
			spinner: true,
			token:'',
			subjectData: this.props.subjectData,
			newlabels:[],
			newdataarray:[]
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
	var url = baseUrl+"/user-test/chapters/"+this.state.subjectData.reference_id
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
					if (data && data.length > 0) {
						let newdata = data.filter(obj => obj.reference_id == this.props.data.reference_id)
						console.log("subjects", newdata)
						this.setState({
							testdata : newdata?.[0].tests || [],
							//spinner:false
						})
					     var newarraynew = [];
						 var newdataarray = []
						 if(newdata?.[0].tests.length > 8){
							newdata?.[0].tests.map((res,i)=>{
						
								if(i%5 === 0){
								   newarraynew.push("Test"+i)
								   newdataarray.push(res.score)
								}
							   
							})
						 }else{
							newdata?.[0].tests.map((res,i)=>{
						
								   newarraynew.push("Test"+i)
								   newdataarray.push(res.score)
							
							   
							})
						 }
					

						 this.setState({
							 newlabels: newarraynew,spinner: false,newdataarray:newdataarray
						 })

						
						
					  }
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
		Actions.practicechapter({type:"reset",data: this.props.subjectData})
	}

	onTest(item){
		Actions.push('practicesummary',{testid:item.reference_id,data: this.state.selectedItem,subjectData:this.props.subjectData})
	}

	renderItem({item,index}){
		console.log("fff",item)
		return(
			<TouchableOpacity  onPress={this.onTest.bind(this)} style={styles.scoreview}>
			<Text>Test {index} </Text>
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
	
		return(
			<View style={styles.mainView}>
				<View style={styles.topview}>
					<View style={styles.topleftview}>
					<TouchableOpacity onPress={this.onBack.bind(this)}>
					<Image source={require("../../assets/images/left-arrow.png")} style={styles.backarrow}/>
					</TouchableOpacity>
					</View>
					<View style={styles.topmiddleview}>
					<Text style={styles.topmiddletext}>Review Summary</Text>
					</View>
					<View style={styles.toprightview}></View>
				</View>
				<View style={styles.middleview}>
				<View style={styles.subview}>
		          <Text style={styles.headtext}>Score</Text>
		          <View style={styles.lineview}/>
				  {this.state.spinner ? <Text>Loading.....</Text> :

					this.state.testdata.length > 0 ? 
					
                   <ScrollView>
					   <View style={{width:windowWidth,height:350,backgroundColor:"red",justifyContent:"center"}}>
					   <LineChart
			bezier
			withHorizontalLabels={true}
			withVerticalLabels={true}
			data={{
				labels:this.state.newlabels,
				datasets: [
					{
						data: this.state.newdataarray,
						strokeWidth: 2,
						color: (opacity = 1) => `rgba(106,81,119,${opacity})`, // optional
					},
				],
			}}
			bezier
			width={Dimensions.get('window').width}
			fromZero={true}
			height={300}
			chartConfig={{
				backgroundColor: '#1cc910',
				backgroundGradientFrom: '#eff3ff',
				backgroundGradientTo: '#efefef',
				decimalPlaces: 2,
				color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				style: {
					borderRadius: 16,
				},
			}}
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
					   </View>
					   
                       {this.state.testdata.map((item,i) =>
					   {
						   var color;
						   var progcolor
						   if(item.score < 2){
							   color = "rgba(255,0,0,0.3)"
							   progcolor = "red"
						   }else if(item.score >4){
							   color ="rgba(0,128,0,0.2)"
							   progcolor = "green"
						   }else{
							   color ="rgba(255,165,0,0.2)"
							   progcolor = "orange"
						   }
					   
					   return(
                         <TouchableOpacity  onPress={this.onTest.bind(this,item)} style={styles.scoreview}>
						<Text style={{marginLeft:20}}>Test {i}  <Text style={{marginLeft:5}}>({item.score} / {item.marks})</Text></Text>
					   
					   <View style={styles.progressview}>
						   <View style={{flexDirection:'row',height:50,width:"100%",justifyContent:"center",alignItems:"center"}}>
                             {/* {analysis.map((res,j)=>
							 <View>
							 <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
								 <View style={{width:30,height:30,borderRadius:15,
								 backgroundColor: item.analysis === res.name ? res.color : "grey"}}/>
								  {analysis.length ===  j+1 ? 
								<View style={{width:60,height:1,backgroundColor:"transparent"}}/> :
								 <View style={{width:60,height:1,backgroundColor:"black"}}/>}
							 </View>
							 <Text style={{textAlign:"left"}}>{res.name}</Text>
							 </View>
							 )} */}
							 <View style={{width:windowWidth/1.17,height:20,borderRadius:20,backgroundColor:color,justifyContent:"center",alignItems:"center"}}>
							 <Progress.Bar progress={item.score/item.marks} width={windowWidth/1.2} height={5}
							 color={progcolor}/>

							 </View>
						   </View>
						   
					   </View>
					 </TouchableOpacity>
					   )}
						)}
				   </ScrollView>
				   : null}
          </View>
				</View>
	
			</View>	
			)
	}
}
export default PracticeReview