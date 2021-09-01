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
	BackHandler
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, colors } from "../../constants"
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

class PrePaperReview extends Component{
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
		this.backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			this.backAction
		);
		this.getData()
}
backAction = () => {
	this.onBack()
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
	var url = baseUrl+"/user-previous-test"
	console.log("newvalue",url)
   fetch(url ,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': token
			}
			}).then((response) =>
			
			 response.json())
			.then((json) =>{
				console.log("newddatata",json)
				
				if(json.data){
					const data = json.data;
					
				  if(data){
					if (data.tests && data.tests.length > 0) {
						console.log("this.props.data.reference_id", this.props.data.reference_id)
						console.log("fff",data.tests)

						let newdata = data.tests.filter(obj => obj.previous_question_paper_id == this.props.data.reference_id)
						console.log("newdatanewdata", newdata.length)
						this.setState({
							testdata : newdata || [],
							//spinner:false
						})
						console.log("testtssssss", newdata)
					     var newarraynew = [];
						 var newdataarray = []
						 if(newdata.length > 8){
							newdata.map((res,i)=>{
						
								newarraynew.push("Test"+(i+1))
								if(res.score){
								 newdataarray.push(res.score)
								}else{
								 newdataarray.push(0)
								}
							  //  newdataarray.push(res.score)
						 
							
						 })
						 }else{
							newdata.map((res,i)=>{
						
								   newarraynew.push("Test"+(i+1))
								   if(res.score){
									newdataarray.push(res.score)
								   }else{
									newdataarray.push(0)
								   }
								 //  newdataarray.push(res.score)
							
							   
							})
						 }
					

						 this.setState({
							 newlabels: newarraynew,spinner: false,newdataarray:newdataarray
						 })

						
						
					  }else{
						this.setState
						({
						   spinner: false,
						   testdata: []
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
	  	Actions.prequestionpapers({type:"reset",item: this.props.item})
	}

	onTest(item){
		Actions.push('prepapersummary',{"item":this.props.item,testid:item.reference_id,testdata: item,from:"reviewscreen",selectedata: this.props.data})
	}

	renderItem({item,index}){
		console.log("fff",item)
		return(
			<TouchableOpacity  onPress={this.onTest.bind(this)} style={styles.scoreview}>
			<Text>Test {index+1} </Text>
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
	    const { data } = this.props;
		//const topicindata = data
		return(
		<>
	<ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
	
	style={{width:"100%",height:"100%",backgroundColor:colors.Themecolor}} opacity={0.5}>
	  <View style={{flex:1}}>
	  <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity>
             
                <Text style={{ color: "white", fontSize: 18,marginLeft:10}}>{"Review"}</Text>
               
              </View>

              </View>
          </View>
		<View style={{flex:0.9,marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
		 			<View style={styles.middleview}>
				<View style={styles.subview}>
	 	          <Text style={styles.headtext}>Score</Text>
	 	          <View style={styles.lineview}/>
	 			  {this.state.spinner ?
				   <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
				    <Text>Loading.....</Text></View> :

					this.state.testdata.length > 0 ? 
					

					<ScrollView>
						<ScrollView horizontal={true}>
							   <View style={{height:350,justifyContent:"center"}}>
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
						width={this.state.newdataarray.length > 5 ? this.state.newdataarray.length*50 : windowWidth}
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
								   </ScrollView>
								   
					               {this.state.testdata.map((item,i) =>
								   {
									   console.log("testdataaa",item.score/item.marks)
									   var color;
									   var progcolor
									   if(parseInt(item.score/item.marks) <0.5){
										   color = "rgba(255,0,0,0.3)"
										   progcolor = "red"
									   }else if(parseInt(item.score/item.marks) > 0.8){
										   color ="rgba(0,128,0,0.2)"
										   progcolor = "green"
									   }else{
										   color ="rgba(255,165,0,0.2)"
										   progcolor = "orange"
									   }
								   
								   return(
					                 <TouchableOpacity  onPress={this.onTest.bind(this,item)} style={styles.scoreview}>
									<Text style={{marginLeft:20}}>Test {i+1}  <Text style={{marginLeft:5}}>({item.score} / {item.marks})</Text></Text>
								   
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
					
					
					: <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
						<Text>No Data</Text>
						</View>
					

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
export default PrePaperReview