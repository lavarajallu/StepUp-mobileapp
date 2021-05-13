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
    ActivityIndicator
} from 'react-native';
import styles from "./styles"
import { baseUrl } from "../../constants"
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
      const url = baseUrl+"/activities/info/" + data.reference_id
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
               weblinkdata: data[0]
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
          }else if(newobj.type ==="PDF"){
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
      }else if(newobj.type ==="PDF"){
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
	render(){
		return(
			    <View style={styles.mainView}>
               <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                    </TouchableOpacity>
                <View style={styles.mainsubview}>
                	<View style={{flex:1,marginTop:5}}>
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
                </View>
                 <View style={styles.nextactivityview}>
                 <TouchableOpacity style={styles.nextinner} onPress={this.onPrevious.bind(this)}>
                    <Text style={styles.activitytext}>Previous Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
                    <Text style={styles.activitytext}>Next Activity</Text>
                    </TouchableOpacity>

                </View>
                 <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:18}}>{this.props.data.activity}</Text>
                </View>
                 <Modal isVisible={this.state.isvisible}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15}}>
          <Text style={{color:"black",fontSize: 20,textAlign: 'center',marginTop:10}}>Your are about to begin your Post Assesment</Text>
          <Text style={{fontSize: 15,marginHorizontal:30,textAlign: 'center',marginTop:10}}>Once you begin you have 5 minutes to finish the test</Text>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop:10}}>Are you ready to begin?</Text>
         <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:20 }}>
           <TouchableOpacity onPress={this.onOk.bind(this)}>
           <LinearGradient colors={['#239816', '#32e625']}  style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text>OK</Text>
            </LinearGradient>
           </TouchableOpacity>
             <TouchableOpacity onPress={this.onCancel.bind(this)}>
           <LinearGradient colors={['#f14d65', '#fc8798']}   style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text>CANCEL</Text>
            </LinearGradient>
           </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
            </View>
			)
	}
}

export default WebLinkView;
