import React, { Component } from 'react';
import  { StyleSheet,  View,  Text,  Slider, Image,  StatusBar, TouchableOpacity,  Button,  Dimensions, } from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Modal from 'react-native-modal';
import getVideoId from 'get-video-id';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoQuestionModal from '../VideoQuestionModal'
import Orientation from 'react-native-orientation-locker';
var initial = 0
import styles from './styles'
import { color } from 'react-native-reanimated';
import { colors } from '../../constants';
const question1={
  questionid:1,
  question:"The digit immediate to the right of the ten lakhs shows____place.",
  correctanswer: 2,
  options:[
    {
      answerId:1,
      answer:"Answer 1"
    },
    {
      answerId:2,
      answer:"Answer 2"
    },
    {
      answerId:3,
      answer:"Answer 3"
    },
    {
      answerId:4,
      answer:"Answer 4"
    },
  ]
}
const question2 = {
  questionid:2,
  question:"The digit immediate to the right of the ten lakhs shows____place.",
  correctanswer: 3,
  options:[
    {
      answerId:1,
      answer:"Answer 1"
    },
    {
      answerId:2,
      answer:"Answer 2"
    },
    {
      answerId:3,
      answer:"Answer 3"
    },
    {
      answerId:4,
      answer:"Answer 4"
    },
  ]
}
var timesarray =[]
export default class VideoViewComponent extends Component {

 
 constructor(props){
    super(props);
    this.state={
      spinner: true,
      isvisible:false,
      youtubedata : this.props.data,
      questionsArray: this.props.questionsArray,
      videoid:'',
      index: 0,
      isPlaying: true,
      questionsarray:[],
      newarr:[],
      pausedtime:null,
      show: null,
      questiondisplay:null,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      playerWidth: Dimensions.get('window').width,
      elapsed: 0 ,
      time:0,
      singleSliderValues: [],
      value:0,
      loading: false,
      data:[]
     };
     this._youTubeRef = React.createRef();
    }
    


 componentDidMount(){
  Orientation.addOrientationListener(this.handleOrientation.bind(this));
    console.log("dddddddddd",this.props.data)
  if(this.props.data){
    var videoid = getVideoId(this.props.data.url);
  }
    

    //alert(JSON.stringify( this.props.questionsArray[0]))
    if(this.props.questionsArray.length >0){
      this.setState({
        questionsarray : this.props.questionsArray
      },()=>{
      
       this.setState({
        
           questiondisplay:  this.state.questionsarray[0],
           pausedtime : parseInt(this.state.questionsarray[0].question.timeinsec)
         })
         var newarr = [];
         this.state.questionsarray.map((res,i)=>{
         
          
           var time  = parseInt(res.question.timeinsec)
           newarr.push(time)
          console.log("vvvvv",newarr)
           this.setState({
            newarr:newarr
           },()=>{
            
           })
          })
        })
     
   
    }else{
      this.setState({loading: false})
    }

    if(videoid){
      console.log("ssdsd",videoid)
      this.setState({
        videoid: videoid.id,
       
      },()=>this.setState({ spinner: false}))
    }
 }
 handleOrientation(orientation) {
  console.log("orintatin",orientation)
  orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
    ? (this.setState({fullscreen: true}), StatusBar.setHidden(true))
    : (this.setState({ fullscreen: false}),
      StatusBar.setHidden(false));
}
onquestionSubmit(time){
  //alert("lklkd"+this.state.questionsarray[this.state.index+1])
  if(this.state.questionsarray[this.state.index+1]){
    this.setState({
      pausedtime :   parseInt(this.state.questionsarray[this.state.index+1].question.timeinsec),
      questiondisplay: this.state.questionsarray[this.state.index+1],
      show:false,
      isVisible: false,
      index: this.state.index+1
    },()=>this.setState({isPlaying: true},()=>
    {
    const interval = setInterval(async () => {
    var count = null
     var compare = false
     var elapsed_sec
     if(this._youTubeRef){
      
      elapsed_sec = await  this._youTubeRef.current.getCurrentTime();
     
      
     }
     
        console.log("elaps",parseInt(elapsed_sec))
        let result = this.state.newarr.filter(o1 => parseInt(o1) === parseInt(elapsed_sec));
        if(parseInt(elapsed_sec) === result[0]){
          var newdata = this.state.questionsarray.filter(o1 => parseInt(o1.question.timeinsec) === result[0]);
      this.setState({ isPlaying: false,data:newdata[0],show: true},()=>this.props.onPause(this.state.data));
      clearInterval(interval);
      this.setState({
       time: elapsed_sec,
       elapsed: elapsed_sec,

     })
  
     }
  }, 100);
  
  }
     ))
  }else{

    this.setState({
      pausedtime :  null,
      questiondisplay: null,
      show:false,
      isVisible: false
    },()=>this.setState({isPlaying: true},()=>
    {
      const interval = setInterval(async () => {
        var count = null
         var compare = false
         var elapsed_sec 
         if(this._youTubeRef){
           elapsed_sec = await  this._youTubeRef.current.getCurrentTime();
          
        }
            console.log("elaps",elapsed_sec)
         if(parseInt(elapsed_sec) === this.state.pausedtime ){
          this.setState({ isPlaying: false,data:this.state.questiondisplay,show: true},()=>this.props.onPause(this.state.data));
          clearInterval(interval);
          this.setState({
           time: elapsed_sec,
           elapsed: elapsed_sec,
    
         })
      
         }
      }, 100);
      
      // console.log("dfndnflkdnfkl",this.state.isVisible)
    }))
   }

  }


onnext(){
  this.setState({
    isPlaying: false
  })
}

onStateChange (e){
  if(this. _youTubeRef){
    console.log("ddddddd",this.state.youtubedata)
  
    console.log("eee",e)
    if(initial === 0) {
    
      if(e === 'playing'){
        this. _youTubeRef.current?.getDuration().then(
          getDuration => this.setState({duration:parseInt(getDuration)})
        );
        this.onReady()
        }
    }
  }
  

}
 onReady(){
   if(this._youTubeRef){
    // if(this.state.youtubedata.video_played){
    //   this._youTubeRef.current?.seekTo(this.state.youtubedata.video_played,true);
    // }
    initial =1;
    const interval = setInterval(async () => {
     const elapsed_sec = await this._youTubeRef.current.getCurrentTime();
     console.log("secondsss",parseInt(elapsed_sec))
    let result = this.state.newarr.filter(o1 => parseInt(o1) === parseInt(elapsed_sec));
    if(parseInt(elapsed_sec) === result[0]){
        console.log("0show",parseInt(elapsed_sec),result[0])
      if(this.state.show == true){
        //console.log("ifff")
      }else{

        var newdata = this.state.questionsarray.filter(o1 => parseInt(o1.question.timeinsec) === result[0]);
        this.setState({ isPlaying: false,data:newdata[0],show: true},
          ()=>this.props.onPause(this.state.data));
       clearInterval(interval);
       this.setState({
        time: elapsed_sec,
        elapsed: elapsed_sec,

      })
      }

    }
   
  }, 100);
   }
  
 }
 onRewatch(id){
   initial=0
  // console.log("rewatch",id)
  // if(id.questionid === 1){
  //   this._youTubeRef.current?.seekTo(0,true);
  // }
  // if(id.questionid=== 2){
  //   this._youTubeRef.current?.seekTo(6,true);
  // }
  
  // this.setState({
  //   isPlaying: true
  // })
  if ( this._youTubeRef) {
    //this._youTubeRef.current?.seekTo(0,true);
   // alert(this.state.newarr.indexOf(this.state.pausedtime)-1)
    var value = this.state.newarr.indexOf(this.state.pausedtime)-1
    if(value === -1){
      this._youTubeRef.current?.seekTo(0,true);
     this.setState({
        isPlaying: true,
        show:false,
       
      })
    }else{
    this.playerRef.seek(this.state.newarr[value]);
          this.setState({
              isPlaying: true,
              show:false,
            
      })
    }
    // this.playerRef.seek(this.state.pausedtime);
    //  this.setState({
    //   show:false,
    //     isPlaying: false,
       
    //   })
  
}
 }
 handlescreenfull(val){
  console.log("fulll",val)
  this.setState({
    fullscreen: val
  },()=>{
    console.log(this.state.fullscreen)
    this.state.fullscreen
  ? Orientation.lockToLandscapeLeft()
  : Orientation.lockToPortrait();
  })
  
}
onfullscreen(value) {
   //alert('hii'+value.isFullscreen)
   this.setState({
    fullscreen: !this.state.fullscreen
  })
  this.props.onfullscreen()
 
 //   Orientation.lockToLandscapeLeft();
}
setInteractiveAxis(event) {
  console.lof("eeeeee")
  let setX = [];
  for (let i = 0; i < this.state.newarr.length; i++) {
      let x1 = 50;
      let x2 = this.state.getViewX - 50;
      let temp = (this.state.newarr * 100) / event.duration

      setX[i] = ((x1 + ((x2 - x1) * temp) / 100) - 5);
      console.log('setX: ', setX[i]);
  }

  this.setState({
      videoDuration: event.duration,
      setX: setX
  }, () => {
      this.visibleInteractivePoints();
  });
}
async getcurrentTime(){
  if(this._youTubeRef){
    let elapsed_sec = await  this._youTubeRef.current.getCurrentTime();
    let duration = await this. _youTubeRef.current.getDuration()
    this.props.onBackNew(elapsed_sec,duration)
  }
 
}
async onNext(){
  if(this._youTubeRef){
    let elapsed_sec = await  this._youTubeRef.current.getCurrentTime();
    let duration = await this. _youTubeRef.current.getDuration()
    this.props.onActivityNext(elapsed_sec,duration)
  }
 
}
async onPrevious(){
  if(this._youTubeRef){
    let elapsed_sec = await  this._youTubeRef.current.getCurrentTime();
    let duration = await this. _youTubeRef.current.getDuration()
    this.props.onActivityPrevious(elapsed_sec,duration)
  }
 
}
displayOptions() {
  if (this.state.shouldHideInteractivePoints || this.state.isLoading || this.state.setX.length <= 0) {
      return null
  } else {
      console.log('FINAL: ', this.state.setX);
      return this.state.setX.map(data => (
          <View
              style={{ position: 'absolute', left: data, top: this.state.getViewY - 40 }}>
              <Image
                  style={{ width: 25, height: 25, }}
                  source={require('../../assets/images/videos/point.png')}
              />
          </View>
      ));
  }
}
render(){
  const data=[]
  for(var i = 0 ; i< this.state.duration;i++){
    data.push({"value":i})
  }
  const YOUR_API_KEY = "paste yout api key here";
  var timesarray =[]
  var count = 0
  {data.map((res,i)=>
   
    this.state.newarr.map((newrews,j)=>
      { 
       
        if(res.value === parseInt(newrews)){
          timesarray.push( <Image source={require('../../assets/images/videos/point.png')}
               style={{width:10,height:10}} />
               )
          
        }
        else{
          timesarray.push( <Text style={{color: "transparent",fontSize:13}} >?</Text>)
        }
       }
    )
    
  )}
  var heightfull;
  if(this.state.fullscreen){
    heightfull =Dimensions.get('window').height/2.5
  }else{
    heightfull =Dimensions.get('window').width/2.5
  }
 return (
  this.state.spinner ? <Text>Loading....</Text> : 
 <View style={styles.mainView}>
   {/* <YouTube
   apiKey={"AIzaSyAZqgHAgDoOgwmH-xQ96qxtlOD54rauJrc"}
  videoId={this.state.videoid}
  play={this.state.isPlaying}
  showFullscreenButton ={false}
  onChangeState={this.onStateChange.bind(this)}
  onReady={e => this.setState({ isReady: true })}
  style={{  height: this.state.fullscreen ? "100%" : "50%" }}
/> */}
     <YoutubePlayer
     height ={this.state.fullscreen ? "100%" : "50%"}
        ref={this._youTubeRef}
         play={this.state.isPlaying}
         fullscreen={true}
        // style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}
        videoId={this.state.videoid}
      //   onReady={event => {
      //     this.setInteractiveAxis(event)
      // }}
        //onReady={this.ongetReady.bind(this)}
        onChangeState={this.onStateChange.bind(this)}
      />
        <TouchableOpacity onPress={this.onfullscreen.bind(this)}
        style={{ top:50,right:0,position:"absolute",padding:10,backgroundColor:"transparent",right:10}}>
          {this.state.fullscreen ? 
          <Image source={require("../../assets/images/halfscreen.png")}
          style={{width:20,height:20,tintColor:colors.Themecolor}}/>:
       <Image source={require("../../assets/images/fullscreen.png")}
       style={{width:20,height:20,tintColor:colors.Themecolor}}/>}
       </TouchableOpacity> 
       <View style={[styles.absview,
        {top:this.state.fullscreen ? 360 : 320}]}>
      <View style={styles.subview}>
        <View style={styles.subleftview}/>
        <View style={styles.submiddleview}>
        <View style={styles.subright}>
        {timesarray}
          </View>
        </View>
        <View style={styles.sublastright}/>
      </View>
    </View>

    </View> 
   );
 }
}
