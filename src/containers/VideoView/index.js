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
    TouchableOpacity,
    Platform
} from 'react-native';
import styles from "./styles"
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import VideoViewComponent from '../../components/VideoViewComponent'
import VideoQuestionModal from '../../components/VideoQuestionModal';

import { baseUrl,imageUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';

class VideoView extends  Component{
    constructor(props){
        super(props);
        this.state={
            spinner:true,
            isvisible:false,
            newmodal:false,
            data:{},
            youtubedata:null,
            questionsArray:null,
            analyticsData:{},
            token:"",
            showfullscreen:false
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
            this.getVideoquestions(JSON.parse(token))
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
        page:"MyCourse_YouTube",
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
    updateAnalytics(data,duration){
      var body = {
        activity_status : 0,
        video_played: data,
        pdf_page: 0,
        video_duration: parseInt(this.refs.ve.state.duration) !== 0 ? this.refs.ve.state.duration : duration
      }
      console.log("bodyyy",body,"    ", baseUrl+'/analytics/'+this.state.analyticsData.reference_id)
      var url = baseUrl+'/analytics/'+this.state.analyticsData.reference_id
      fetch(url ,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': this.state.token
        },
        body: JSON.stringify(body)
        }).then((response) =>
        
         response.json())
        .then((json) =>{
          
          if(json.data){
            const data = json.data;
             console.log(JSON.stringify(json));
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
    onNext1(){
      // this.refs.ve.state.isPlaying =false
      // this.setState({
      //   newmodal : false

      // },()=>{
       // this.updateAnalytics()
        var newarray = this.props.smartres;
        var newobj = newarray[this.props.index+1]
        var index= this.props.index
        //alert(JSON.stringify(newobj))
        if(newobj){
          if(newobj.type === 'YOUTUBE'){
            Actions.videoview({type:"reset",index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==='VIDEO'){
            Actions.normalvideoview({type:"reset",type:"reset",index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type === "PRE" || newobj.type==='OBJ' || newobj.type === 'POST' || newobj.type === 'SUB'){
            Actions.preassesment({type:"reset",index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="PDF"){
            Actions.pdfview({type:"reset",index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="WEB"){
            Actions.weblinkview({type:"reset",index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }else if(newobj.type ==="GAMES"){
            Actions.push('games',{index:index+1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
          }
         }else{
          Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
       }

    }
    onPrevious2(){
      //this.updateAnalytics()
        var newarray = this.props.smartres;
        var newobj = newarray[this.props.index-1]
        var index= this.props.index
       //alert(JSON.stringify(newobj))
       if(newobj){
        if(newobj.type === 'YOUTUBE'){
          Actions.videoview({type:"reset",index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
        }else if(newobj.type ==='VIDEO'){
          Actions.normalvideoview({type:"reset",index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
        }else if(newobj.type==='OBJ' || newobj.type === 'POST' || newobj.type === 'SUB'){
          Actions.preassesment({type:"reset",index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
        }else if(newobj.type ==="PDF"){
          Actions.pdfview({type:"reset",index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
        }else if(newobj.type ==="WEB"){
          Actions.weblinkview({type:"reset",index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
        }else if(newobj.type === 'PRE'){
          Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
        }else if(newobj.type ==="GAMES"){
          Actions.push('games',{index:index-1,smartres:this.props.smartres,data:newobj,topicData: this.props.topicData,subjectData:this.props.subjectData,topicindata: this.props.topicindata,from :this.props.from})
        }
       }else{
        Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
     }
      
    }

    getVideoquestions(data1,token){
      const body ={
        test_type: "Video",
        assignedactivityId: this.props.data.reference_id,

     }
      const url = baseUrl+"/user-test"
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': this.state.token
        },
        body: JSON.stringify(body)
      }).then((response) => response.json())
        .then((json) => {
  
          //const data = json.data;
          // alert(JSON.stringify(data))
         
          if (json.data) {
            const data = json.data;
            console.log("youtubeeeevideeoeooo", data)
            this.setState({
              questionsArray : data.questions
            },()=>  this.getActivityInfo())
          
            
          } else {
            Toast.show(json.message, Toast.LONG);
            this.setState({questionsArray:[]},()=>  this.getActivityInfo())
           // alert("stepup"+JSON.stringify(json.message))
  
          }
        }
  
        )
        .catch((error) => console.error(error))
    }
    getActivityInfo(token) {
      const { data } = this.props
      const url = baseUrl+"/activities/forStudent/"+data.reference_id//baseUrl+"/activities/info/" + data.reference_id
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': this.state.token
        }
      }).then((response) => response.json())
        .then((json) => {
  
          const data = json.data;
           console.log("ddddd",data)
         
          if (data) {
           this.setState({youtubedata: data})
          } else {
            alert(JSON.stringify(json.message))
  
          }
        }
  
        )
        .catch((error) => console.error(error))
  
    }
    onBackNew(data,duration){
        console.log("fffff",data,"vvv",duration)
        if(data){
          this.updateAnalytics(data,duration)
        }else{
          this.updateAnalytics(0)
        }
         Actions.topicmainview({type:"reset",data:this.props.topicindata,topicsdata:this.props.topicData,screen:"summary",subjectData:this.props.subjectData,from :this.props.from})
        
    }
    onActivityNext(data,duration){
      console.log("11111111",data,"vvv",duration)
      if(data){
        this.updateAnalytics(data,duration)
      }else{
        this.updateAnalytics(0)
      }
      this.onNext1()
    }
    onActivityPrevious(data,duration){
      console.log("fffff",data,"vvv",duration)
      if(data){
        this.updateAnalytics(data,duration)
      }else{
        this.updateAnalytics(0)
      }
      this.onPrevious2()
    }
    onBack(){
      this.refs.ve.getcurrentTime();
      //this.updateAnalytics()
      
    }
    onNext(){
      this.refs.ve.onNext();
    }
    onPrevious(){
      this.refs.ve.onPrevious();
    }
    onOk(){
        this.setState({
            isvisible:false
        },()=>Actions.push('postassesment'))
    }
    onCancel(){
        this.setState({
            isvisible:false
        })
    }
    onPlayvideo()
    {
        Actions.push('video')
    }
    onPause(data){
      this.setState({
        data:data,
       

      },()=>this.setState({ newmodal : true}))
    }
    onquestionSubmit(value){
      this.setState({
        newmodal : false

      },()=>this.refs.ve.onquestionSubmit(value))

    }
    onRewatch(){
      this.setState({
        newmodal : false

      },()=>this.refs.ve.onRewatch(this.state.data))
    }
    onfullscreen(value){
      if(this.refs.ve){
      
      //alert(this.refs.ve)
            this.setState({
              showfullscreen: !this.state.showfullscreen
            },()=>this.refs.ve.handlescreenfull(this.state.showfullscreen))
    }

    }
	render(){
    const { topicindata} = this.props
    var stylefull;
    var width;
    var height;
    if(this.state.showfullscreen){
      stylefull = { height:this.state.showfullscreen ? "100%" :"80%",alignSelf:"center",
      backgroundColor:"white",
      borderRadius:20,width:"95%"}
      width = windowHeight;
      height=windowWidth
    }else{
      stylefull = {
        flex:0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"
      }
      width = windowWidth;
      height= windowHeight
    }
		return(
      // <>
			//     <View style={{flex:1,backgroundColor:topicindata.color,}} opacity={0.5}/>
      //     <View style={{width:windowWidth,height:windowHeight,position:"absolute"}}>
      //       <View style={{flex:1,}}>
      //         {this.state.showfullscreen ? null :
      //           <TouchableOpacity onPress={this.onBack.bind(this)} style={{elevation:10}}>
      //           <Image source={require("../../assets/images/left-arrow.png")}
      //               style={{ width:30,height:30,marginVertical:15,tintColor:topicindata.color,marginLeft:20}} />
      //               </TouchableOpacity>}
      //               <View style={[styles.mainsubview,{ height:this.state.showfullscreen ? "100%" :"80%",}]}>
      //           	<View style={{flex:1}}>
      //            {this.state.youtubedata ? 
      //            <VideoViewComponent ref = {"ve"}
      //            onActivityNext={this.onActivityNext.bind(this)}
      //            onBackNew={this.onBackNew.bind(this)}
      //            onActivityPrevious={this.onActivityPrevious.bind(this)}
      //            onfullscreen={this.onfullscreen.bind(this)} onPause={this.onPause.bind(this)} data={this.state.youtubedata} questionsArray={this.state.questionsArray}/>: 
      //            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      //            <Text>Loading...</Text></View>}
      //           	</View>
      //           </View>
      //           {this.state.showfullscreen ? null :
      //            <View style={styles.nextactivityview}>
      //            <TouchableOpacity style={{ height:40,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,marginTop:10,justifyContent:"center"}} onPress={this.onPrevious.bind(this)}>
           
      //               <Text style={{textAlign:"center",fontSize:15,color:"white"}}>Previous Activity</Text>
      //               </TouchableOpacity>
      //               <TouchableOpacity style={{ height:40,borderRadius:20,backgroundColor:topicindata.color,paddingHorizontal:10,marginTop:10,justifyContent:"center"}} onPress={this.onNext.bind(this)}>
           
      //               <Text style={{ textAlign:"center",fontSize:15,color:topicindata.color}}>Next Activity</Text>
      //               </TouchableOpacity>

      //           </View>}
      //           {this.state.showfullscreen ? null :
      //            <View style={{ height: 40,
      //             paddingHorizontal:10,
      //             backgroundColor:topicindata.color,
      //             position: 'absolute',
      //             justifyContent: "center",
      //             alignItems:"center",
      //             borderRadius:35,
      //             overflow: 'hidden',
      //             top: 40,
      //             alignSelf:"center",
      //             shadowColor:'black',
      //             shadowOffset: { width: 0, height: 5 },
      //             shadowOpacity: 1,
      //             shadowRadius: 5,
      //             elevation: 10}}>
      //           <Text style={{color:"white",fontSize:20}}>{this.props.data.activity}</Text>
      //           </View>}
      //           <Modal isVisible={this.state.newmodal}>
      //   <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        
      //   <VideoQuestionModal data={this.state.data} onquestionSubmit={this.onquestionSubmit.bind(this,20)} onRewatch={this.onRewatch.bind(this)}/>
      //   </View>
      // </Modal>
      //       </View>
      //       </View>    
      //       </>
    

      <>
      
      <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
      style={{width:"100%",height:"100%",backgroundColor:topicindata.color}} opacity={0.5}>
        <View style={{flex:1}}>
        {this.state.showfullscreen ? null : 
           <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity>
             
                <Text style={{ color: "white", fontSize: 18     ,marginLeft:10}}>{this.props.data.activity}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View> } 
          <View style={stylefull}>
          {this.state.youtubedata ? 
                 <VideoViewComponent ref = {"ve"}
                  onActivityNext={this.onActivityNext.bind(this)}
                  onBackNew={this.onBackNew.bind(this)}
                 onActivityPrevious={this.onActivityPrevious.bind(this)}
                 onfullscreen={this.onfullscreen.bind(this)} onPause={this.onPause.bind(this)} data={this.state.youtubedata} questionsArray={this.state.questionsArray}/>: 
                  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <Text>Loading...</Text></View>}
          </View>
          {this.state.showfullscreen ? null :
          <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
          
          <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
        justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
             <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Previous Activity</Text>
                 </TouchableOpacity>
       
                 <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
        justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
             <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Next Activity</Text>
                 </TouchableOpacity>

          </View> }
        </View>
      </ImageBackground> 
      {/* {this.state.showfullscreen ? null :
    <View style={{position:"absolute",height:44,backgroundColor:topicindata.color,paddingHorizontal:20,alignSelf:"center",
    borderRadius:20,top: Platform.OS === 'android' ? 90 : 100,justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white",fontSize:17}}>{this.props.data.activity}</Text>
        </View>} */}
        <Modal isVisible={this.state.newmodal}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        
         <VideoQuestionModal data={this.state.data} onquestionSubmit={this.onquestionSubmit.bind(this,20)} onRewatch={this.onRewatch.bind(this)}/>
       </View>
       </Modal>
</>
    
			)
	}
}

export default VideoView;
