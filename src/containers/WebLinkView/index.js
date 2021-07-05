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
    Platform,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from "./styles"
import { baseUrl,imageUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
class WebLinkView extends  Component{
    constructor(props){
        super(props);
        this.state={
            spinner:true,
            isvisible:false,
            weblinkdata:null,
            token:"",
            analyticsData:{},
        }
    }
    componentDidMount() {
     this.getData()
    }
    
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@user')
        //  alert(JSON.stringify(value))
        if (value !== null) {
          var data = JSON.parse(value)
  
          const token = await AsyncStorage.getItem('@access_token')
          if (token && data) {
            this.setState({
              token: JSON.parse(token)
            })
            this.getanalytics(data,JSON.parse(token))
            this.getActivityInfo(JSON.parse(token))
          } else {
            console.log("hihii")
          }
  
        } else {
          alert("errorrr")
        }
      } catch (e) {
        return null;
      }
    }
    getanalytics(user,token){
    
      var body={
        user_id: user.reference_id,
        board_id: user.grade ? user.grade.board_id : null,
        grade_id:   user.grade ? user.grade.reference_id : null,
        section_id: user.section? user.section.reference_id : null,
        school_id: user.school ? user.school.reference_id :null,
        branch_id : user.grade ? user.grade.branch_id : null,
        page:"MyCourse_WebLink",
        type:"mobile",
        subject_id:this.props.subjectData.reference_id,
        chapter_id:this.props.topicData.reference_id,
        topic_id:this.props.topicindata.reference_id,
        activity_id:this.props.data.reference_id,
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
              //  Snackbar.show({
              // text: json.message,
              // duration: Snackbar.LENGTH_SHORT,
              // });
            }else{
              console.log(JSON.stringify(json.message))
            }
          }
           
          )
          .catch((error) => console.error(error))
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
    getActivityInfo(token) {
      const { data } = this.props
      const url = baseUrl+"/activities/forStudent/"+data.reference_id
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      }).then((response) => response.json())
        .then((json) => {
  
          const data = json.data;
          // alert(JSON.stringify(data))
          console.log("dkfldf", data)
          if (data) {
             console.log("ljdfkldfd",data)
             this.setState({
               weblinkdata: data
             }) 
  
          } else {
            alert(JSON.stringify(json.message))
  
          }
        }
  
        )
        .catch((error) => console.error(error))
  
    }
    onBack(){
      this.updateAnalytics()
      Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
      //Actions.pop()
    }
    onNext(){
      this.updateAnalytics()
          var newarray = this.props.smartres;
          var newobj = newarray[this.props.index+1]
          var index= this.props.index
        //  alert(JSON.stringify(newobj))
        if(newobj){
          if(newobj.type === 'YOUTUBE'){
            Actions.push('videoview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==='VIDEO'){
            Actions.push('normalvideoview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type === "PRE" || newobj.type==='OBJ' || newobj.type === 'POST' ||newobj.type === 'SUB'){
            Actions.push('preassesment',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="PDF" | newobj.type === "HTML5"){
            Actions.push('pdfview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="WEB"){
            Actions.push('weblinkview',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="GAMES"){
            Actions.push('games',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }
         }else{
          Actions.topicmainview({data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
       }
    }
    onPrevious(){
      this.updateAnalytics()
      var newarray = this.props.smartres;
      var newobj = newarray[this.props.index-1]
      var index= this.props.index
     // alert(JSON.stringify(newobj))
     if(newobj){
      if(newobj.type === 'YOUTUBE'){
        Actions.push('videoview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type ==='VIDEO'){
        Actions.push('normalvideoview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type==='OBJ' || newobj.type === 'POST' || newobj.type === 'SUB'){
        Actions.push('preassesment',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type ==="PDF" | newobj.type === "HTML5"){
        Actions.push('pdfview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type ==="WEB"){
        Actions.push('weblinkview',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }else if(newobj.type === 'PRE'){
        Actions.topicmainview({data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
      }else if(newobj.type ==="GAMES"){
        Actions.push('games',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
      }
     }else{
      Actions.topicmainview({data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
   }
      
    }
  
	render(){
    const { topicindata} = this.props
		return(
			    // <View style={styles.mainView}>
          //      <TouchableOpacity onPress={this.onBack.bind(this)}>
          //       <Image source={require("../../assets/images/left-arrow.png")}
          //           style={styles.backimage} />
          //           </TouchableOpacity>
          //       <View style={styles.mainsubview}>
          //       	<View style={{flex:1,marginTop:5}}>
          //           {this.state.weblinkdata ? 
          //       	 <WebView
          //                   source={{
          //                     uri: this.state.weblinkdata.url
          //                   }}
          //                   style={{ marginTop: 20,overfloe:"hidden" }}/>
          //                   :<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          //                     <Text>Loading.</Text></View>
          //                 }

          //       	</View>
          //       </View>
          //        <View style={styles.nextactivityview}>
          //        <TouchableOpacity style={styles.nextinner} onPress={this.onPrevious.bind(this)}>
          //           <Text style={styles.activitytext}>Previous Activity</Text>
          //           </TouchableOpacity>
          //           <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
          //           <Text style={styles.activitytext}>Next Activity</Text>
          //           </TouchableOpacity>

          //       </View>
          //        <View style={styles.subjectouter}>
          //       <Text style={{color:"white",fontSize:18}}>{this.props.data.activity}</Text>
          //       </View>
          
          //   </View>
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
             
                <Text style={{ color: "white", fontSize: 18,marginLeft:10}}>{this.props.data.activity}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View>
              <View style={{flex:0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
              {this.state.weblinkdata ? 
                 	 <WebView
                            source={{
                              uri: this.state.weblinkdata.url
                            }}
                            style={{ marginTop: 20,overfloe:"hidden" }}/>
                            :<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                              <Text>Loading.</Text></View>
                          }
              </View>
              <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,
              alignItems:"center",}}>
              
              <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
            justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
                 <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Previous Activity</Text>
                     </TouchableOpacity>
           
                     <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
            justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
                 <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Next Activity</Text>
                     </TouchableOpacity>

              </View>
            </View>
          </ImageBackground>

        {/* <View style={{position:"absolute",height:44,backgroundColor:topicindata.color,paddingHorizontal:20,alignSelf:"center",
        borderRadius:20,top: Platform.OS === 'android' ? 90 : 100,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"white",fontSize:17}}>{this.props.data.activity}</Text>
            </View> */}
    </>
			)
	}
}

export default WebLinkView;
