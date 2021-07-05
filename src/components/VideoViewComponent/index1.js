import React, { Component } from 'react';
import  { StyleSheet,  View,  Text,  Slider, Image,  Platform, TouchableOpacity,  Button,  Dimensions, } from 'react-native';
import YouTube from 'react-native-youtube';
import Modal from 'react-native-modal';
import getVideoId from 'get-video-id';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoQuestionModal from '../VideoQuestionModal'
import Orientation from 'react-native-orientation';
import FastImage from 'react-native-fast-image'

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
      isPlaying: false,
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
   // console.log("dddddddddd",this.props.data)
  if(this.props.data){
    var videoid = getVideoId(this.props.data.url);
  }
    

    //alert(JSON.stringify( this.props.questionsArray[0]))
    if(this.props.questionsArray.length >0){
        console.log("/this.props.questionsArray",this.props.questionsArray)
      let orders = this.props.questionsArray
      orders.sort(function(a, b){
        let dateA = parseInt(a.question.timeinsec);
        let dateB =parseInt(b.question.timeinsec);
        if (dateA < dateB) 
        {
          return -1;
        }    
        else if (dateA > dateB)
        {
          return 1;
        }   
        return 0;
      });

      console.log("ordersordersorders",orders)
      this.setState({
        questionsarray : orders
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
    //  console.log("ssdsd",videoid)
      this.setState({
        videoid: videoid.id,
       
      },()=>this.setState({ spinner: false}))
    }
 }
 handleOrientation(orientation) {
  // console.log("orintatin",orientation)
  // orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
  //   ? (this.setState({fullscreen: true}), StatusBar.setHidden(true))
  //   : (this.setState({ fullscreen: false}),
  //     StatusBar.setHidden(false));
}
handleReady = (data) => { 
  
   this._youTubeRef.getDuration().then(

        getDuration => {
            console.log("dsjreadyklkld",getDuration)
            this.setState({duration:parseInt(getDuration)})
        })
         if(this.state.youtubedata.video_played){
          this._youTubeRef?.seekTo(this.state.youtubedata.video_played,true);
          if(Platform.os === 'ios'){
            this._youTubeRef.reloadIframe(); 
        
          }
         }
    }


onquestionSubmit(time){
    this.setState({
      
      isVisible: false,
      index: this.state.index+1
    },()=>this.setState({isPlaying: true},()=>
    {
    const interval = setInterval(async () => {
    var count = null
     var compare = false
     var elapsed_sec
     if(this._youTubeRef){
      
      elapsed_sec = await  this._youTubeRef?.getCurrentTime();
     
      
     }
     this.setState({currentTime: elapsed_sec},()=>{
        let result = this.state.newarr.filter(o1 => parseInt(o1) === parseInt(elapsed_sec));
        console.log("oiffff",Math.floor(elapsed_sec), result,this.state.pausedtime)
        if(parseInt(elapsed_sec) === result[0]){
            if(parseInt(elapsed_sec)  === this.state.pausedtime){

            }else{
              //  ismodal = true
                var newdata = this.state.questionsarray.filter(o1 => parseInt(o1.question.timeinsec) === result[0]);
              this.setState({ isPlaying: false,data:newdata[0],show: true,pausedtime: result[0]},()=>this.props.onPause(this.state.data));
              clearInterval(interval);
              this.setState({
               time: elapsed_sec,
               elapsed: elapsed_sec,
        
             })
            }
    //         if(this.state.show == true){
    //             //console.log("ifff")
    //           }else{
                
    // }
  
     }
     })
     
       // console.log("elaps",parseInt(elapsed_sec))
       
  }, 50);
  
  }
     ))
//   else{

//     this.setState({
//      //stiondisplay: null,
//       show:false,
//       isVisible: false
//     },()=>this.setState({isPlaying: true},()=>
//     {
//       const interval = setInterval(async () => {
//         var count = null
//          var compare = false
//          var elapsed_sec 
//          if(this._youTubeRef){
//            elapsed_sec = await  this._youTubeRef?.getCurrentTime();
          
//         }
//         this.setState({currentTime: elapsed_sec},()=>{
//          let result = this.state.newarr.filter(o1 => parseInt(o1) === parseInt(elapsed_sec));
//          console.log("0show",parseInt(elapsed_sec), result,this.state.show)
//          if(parseInt(elapsed_sec) === result[0]){
//             if(this.state.show == true){
//                 //console.log("ifff")
//               }else{
//             var newdata = this.state.questionsarray.filter(o1 => parseInt(o1.question.timeinsec) === result[0]);

//           this.setState({ isPlaying: false,data:newdata[0],show: true,pausedtime: result[0]},()=>this.props.onPause(this.state.data));
//           clearInterval(interval);
//           this.setState({
//            time: elapsed_sec,
//            elapsed: elapsed_sec,
    
//          })
//         }
      
//          }
//         })
//       }, 50);
      
//       // console.log("dfndnflkdnfkl",this.state.isVisible)
//     }))
//    }

  }


onnext(){
  this.setState({
    isPlaying: false
  })
}

onStateChange (e){
  if(this. _youTubeRef){
  
    //console.log("eee",e.state,"playing")

    if(initial === 0) {
       // console.log("eee",e.state,"playing")
      if(e.state === 'playing'){
        // console.log("eee",e)
        // this._youTubeRef.getDuration().then(

        //   getDuration => {
        //       console.log("dsjklkld",getDuration)
        //       this.setState({duration:parseInt(getDuration)})
        //   })
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
     const elapsed_sec = await this._youTubeRef?.getCurrentTime();
     this.setState({
         currentTime: elapsed_sec
     },()=>{
        let result = this.state.newarr.filter(o1 => parseInt(o1) === parseInt(elapsed_sec));
        console.log("0show",elapsed_sec, result)
        if(parseInt(elapsed_sec) === result[0]){
            //this.setState({show: true})
            //console.log("0show",parseInt(elapsed_sec), this.state.pausedtime)
          if(this.state.show == true){
            //console.log("ifff")
          }else{
    
            var newdata = this.state.questionsarray.filter(o1 => parseInt(o1.question.timeinsec) === result[0]);
            this.setState({ isPlaying: false},()=>{
                this.setState({
                data:newdata[0], pausedtime: result[0]},
              ()=>this.props.onPause(this.state.data));
           clearInterval(interval);
           this.setState({
            time: elapsed_sec,
            elapsed: elapsed_sec,
    
          })
          })
        }
    }
     })
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
    console.log("onerrewarch",this.state.pausedtime)
    var value = this.state.newarr.indexOf(this.state.pausedtime);
    var newwatch = this.state.newarr[value-1]
    console.log("onqustionnn",newwatch)
    var newvalue = this.state.newarr.indexOf(newwatch);

    if(newvalue === -1){
      this._youTubeRef?.seekTo(0,true);
     this.setState({
        isPlaying: true,
        show:false,
       
      })
    }else{
      this._youTubeRef.seekTo(this.state.newarr[newvalue]+1,true);//(this.state.newarr[value]);
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
  },()=>console.log("roetate",this.state.fullscreen))
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
    let elapsed_sec = await  this._youTubeRef?.getCurrentTime();
    let duration = await this._youTubeRef.getDuration()
    this.props.onBackNew(elapsed_sec,duration)
  }
 
}
async onNext(){
  if(this._youTubeRef){
    let elapsed_sec = await  this._youTubeRef?.getCurrentTime();
    let duration = await this._youTubeRef.getDuration()
    this.props.onActivityNext(elapsed_sec,duration)
  }
 
}
async onPrevious(){
  if(this._youTubeRef){
    let elapsed_sec = await  this._youTubeRef?.getCurrentTime();
    let duration = await this._youTubeRef.getDuration()
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
               <FastImage
              style={{width:10,height:10}}
                source={require('../../assets/images/videos/point.png')}
                //resizeMode={FastImage.resizeMode.contain}
            />
          </View>
      ));
  }
}handleMainButtonTouch(){
  this.setState( state =>{
      return{
          isPlaying : !state.isPlaying
      }
  })
}

 toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
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
          timesarray.push(
            <Image source={require('../../assets/images/videos/point.png')}
               style={{width:10,height:10}} />
               
          )
        }
        else{
          timesarray.push( <Text style={{color: "transparent",fontSize:13}} >?</Text>)
        }
       }
    )
    
  )}
 return (
  this.state.loading ? <Text>Loading...</Text> :
 
 <View style={styles.mainView}>
  <View style={{width:"100%",height:this.state.fullscreen ? "100%" : "100%",backgroundColor:"black"}}>
    <View style={{flex:1}}>
      <View style={{flex:1}}>
          <View style={{flex:1,justifyContent:"center"}}>
           {/* <YoutubePlayer
     height ={this.state.fullscreen ? "100%" : "50%"}
        ref={this._youTubeRef}
         play={this.state.isPlaying}
         controls={0}
        // fullscreen={true}
        style={{flex:1}}
        videoId={this.state.videoid}
      //   onReady={event => {
      //     this.setInteractiveAxis(event)
      // }}
        //onReady={this.ongetReady.bind(this)}
        onChangeState={this.onStateChange.bind(this)}
      />  */}
 
      <YouTube
       ref={component => {
        this._youTubeRef = component;
      }}
      apiKey= {"AIzaSyB1DjYP6DVdeu2l8i33gZ6PdMfA9piDHsY"}
      controls={0}
      videoId={this.state.videoid}
      play={this.state.isPlaying} // control playback of video with true/false
            onReady={this.handleReady.bind(this)}
            onChangeState={this.onStateChange.bind(this)} 
            
            style={{ height  : this.state.fullscreen ? "100%" : "50%"}}
            /> 
          </View>
    
    {/* {this.state.showpausebutton ? 
    <View style={{position:"absolute",top:this.state.fullscreen ? windowWidth/2 :windowHeigh/2.7,alignSelf:"center"}}>
    <TouchableOpacity onPress={this.handleMainButtonTouch.bind(this)}>
                             {!this.state.isPlaying ? 
                             <Image source={require('../../assets/images/pause.png')}
                             style={{width:20,height:20}} /> : 
                             <Image source={require('../../assets/images/play.png')}
                             style={{width:20,height:20,tintColor:"black"}} /> 
                            }
                         </TouchableOpacity>
    </View> : null} */}
   
      <TouchableOpacity onPress={this.onfullscreen.bind(this)}
        style={{top:this.state.fullscreen ? 50 :50,elevation:20,position:"absolute",padding:10,backgroundColor:"transparent",right:10}}>
        {this.state.fullscreen ? 
          <Image source={require("../../assets/images/halfscreen.png")}
          style={{width:20,height:20,tintColor:"white"}}/>:
       <Image source={require("../../assets/images/fullscreen.png")}
       style={{width:20,height:20,tintColor:"white"}}/>}
       </TouchableOpacity>
        {/* <View style={[styles.absview,{bottom:25}]}>
      <View style={styles.subview}>
        <View style={styles.subleftview}/>
        <View style={styles.submiddleview}>
        <View style={styles.subright}>
          {timesarray}
          
          </View>
        </View>
        <View style={styles.sublastright}/>
      </View>
    </View> */}
    <View style={[styles.absview,{bottom:this.state.fullscreen ? 40 :40,height:40,borderRadius:10}]}>
      <View style={{flex:1,flexDirection:"row"}}>
        <View style={{ flex:0.2,justifyContent:"center",alignItems:"center"}}>
        </View>
        <View style={{flex: 0.65,}}>
        <View style={[styles.subright,{marginLeft:5,}]}>
        {timesarray}
          </View>
        </View>
        <View style={{flex:0.15,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        </View>
      </View>
    </View> 
       <View style={[styles.absview,{bottom:this.state.fullscreen ? 30 :30,height:30,borderRadius:20,backgroundColor:"rgba(211,211,211,0.3)"}]}>
      <View style={{flex:1,flexDirection:"row"}}>
        <View style={{ flex:0.2,justifyContent:"space-evenly",alignItems:"center",flexDirection:"row"}}>
        <TouchableOpacity onPress={this.handleMainButtonTouch.bind(this)}>
                             {this.state.isPlaying ? 
                             <Image source={require('../../assets/images/pause.png')}
                             style={{width:15,height:15,tintColor:"white"}} /> : 
                             <Image source={require('../../assets/images/play.png')}
                             style={{width:15,height:15,tintColor:"white"}} /> 
                            }
                         </TouchableOpacity>
                                 <Text style={{color:"white",fontSize:12}}>{this.toHHMMSS(this.state.currentTime)}</Text>

        </View>
        <View style={{flex: 0.65,}}>
        <View style={styles.subright}>
          {this.state.duration > 0 ? 
        
        <Slider
        style={{width: "100%", height: 20}}
        minimumValue={0}
        maximumValue={this.state.duration}
        minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
        thumbImage={require('../../assets/images/thumb1.png')}
        
        value={this.state.currentTime} // Which is updated by videoRef.onProgress listener
        onSlidingStart={(value)=>{
          console.log("slidingstarte",value, currentTime)
        }}
           onValueChange={value => {
            console.log("prsl",value,""    ,this.state.currentTime)
             if(parseInt(value) > parseInt(this.state.currentTime)){
              console.log("prigressvl",value,""    ) 

             }else{
              this.setState({currentTime : parseInt(value)})
              this._youTubeRef?.seekTo(value,true)

            }} 

             }
      />
           : null}
          </View>
        </View>
        <View style={{flex:0.15,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white",fontSize:12}}>{this.toHHMMSS(this.state.duration)}</Text>
        </View>
      </View>
    </View> 

      </View>
    </View>
  
     
       
  </View>
 
  
     
    </View>
   )
 }
}
