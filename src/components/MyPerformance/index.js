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
	Keyboard,
	ProgressBarAndroid,
	Platform,
	TouchableOpacity,
	FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PureChart from 'react-native-pure-chart';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Toast from 'react-native-simple-toast';
import { baseUrl,imageUrl } from "../../constants"
import LineChart from './LineChart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StringsOfLanguages from './../../StringsOfLanguages';
// import {
// 	LineChart,
// 	BarChart,
// 	PieChart,
// 	ProgressChart,
// 	ContributionGraph,
// 	StackedBarChart
//   } from "react-native-chart-kit"
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
class MyPerformance extends Component {
	constructor(props) {
		super(props)
		this.state={
			graphdata:[],
			spinner:true,
			prertestscore:[],
			posttestscore:[],
			newgraphdtaa:{}
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
			},()=>this.getTopics())
          
        }else{
            
        }
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }
  getTopics(){
    var url = baseUrl+'/analytics/student/PrePostAssessmentReport'
    console.log("value",url)
   fetch(url ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
            }).then((response) =>
            
             response.json())
            .then((json) =>{
             //  alert(JSON.stringify(json))
                if(json.data){
                    // this.setState({
                    //     graphdata: json.data,
                    //     spinner: false
                    // })
					var labels = [];
					var pretestscore= [];
					var posttestscore =[]
					json.data.map((res,i)=>{
						labels.push(res.name)
						pretestscore.push(res.superPreTestScore)
						posttestscore.push(res.superPostTestScore)
					})
					// var newarraypre=[];
					// var newarraypost=[]
                    // json.data.map((res,i)=>
					// {
					// 	var obj = {
					// 	x: res.name,y: res.superPreTestScore
					//     }
					//    // newarraypre.push({x: '0', y: 0},)
					// 	newarraypre.push(obj);
					
					// 	var objpost = {
					// 		x: res.name,y: res.superPostTestScore
					// 		}
					// 		//newarraypost.push({x: '0', y: 0},)
					// 		newarraypost.push(objpost)
					
			      	// }
					// )
					// newarraypre.unshift({
					// 	x:"0",y:0
					// })
					// newarraypost.unshift({
					// 	x:"0",y:0
					// })
					// let neewobj = {
					// 	seriesName: 'Pre Assesment',
					// 	  data: newarraypre,
					// 	  color: 'orange'
					// }
					// let newobjpost = {
					// 	seriesName: 'Post Assesment',
					// 	data: newarraypost,
					// 	color: 'green'
					// }
				
					// let sampleData=[];
					// sampleData.push(neewobj)
					// sampleData.push(newobjpost)
					this.setState({
						graphdata: labels,
						newgraphdtaa: json.data,
						prertestscore: pretestscore,
						posttestscore:posttestscore,
						spinner: false
					})
                }else{
                    //alert("ffff"+JSON.stringify(json.message))
                    Toast.show(json.message, Toast.LONG);
                    this.setState
                    ({
                        graphdata:[],
                       spinner: false,
                    })
                }
            }
             
            )
            .catch((error) => console.error(error))
        //Actions.push('boards')
  }
	render() {
		return (
			this.state.spinner ? null : 
	<View style={styles.mainview}>
				<Text style={{marginLeft:15,fontSize:16,color:"#656565",fontWeight:"600"}}>{StringsOfLanguages.myperformance}</Text>
				<View style={styles.chartview}>
   
		     <LineChart  studentPreVsPost= {this.state.newgraphdtaa} />
			 </View>
			</View>
		)
	}
}
export default MyPerformance