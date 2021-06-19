import React, { Component } from 'react';
import  { StatusBar,  View,  Text,  TouchableOpacity, Image,  PixelRatio, Platform,  Button,  Dimensions, } from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Modal from 'react-native-modal';
import getVideoId from 'get-video-id';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoQuestionModal from '../VideoQuestionModal'
import Video from 'react-native-video';
var initial = 0
import styles from './styles'
import { LineChart } from 'react-native-chart-kit';
import { parse } from 'react-native-svg';
import Orientation from 'react-native-orientation';

import { colors, imageUrl } from '../../constants';
// import AWS from 'aws-sdk/dist/aws-sdk-react-native';

// const credentials = new AWS.Crendentials({ accessKeyId: 'AKIAZR3HR6PZJ3FGC25V', secretAccessKey: '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'})
// const s3 = new AWS.S3({ credentials, signatureVersion: 'v1', region: 'ap-south-1'});
const questionsarray=[{
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
},
{
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
}]
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
var currentTime;
export default class NormalVideoViewComponent extends Component {
  state = {
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
    isvisible:false,
   
   };
 constructor(props){
    super(props);
    this.state={
      spinner: true,
      normaldata : this.props.data,
      visisted: false,
      videoid:'',
      array:["10","20"],
      pausedtime:null,
      data:null,
      show: null,
      questiondisplay:null,
      fullscreen: false,
      isPlaying: false,
      index: 0,
      questionsarray:[],
      loading: true,
      videourl:'',
      newarr:[],
      
    }
    this.onProgress=this.onProgress.bind(this);
    this.onLoad= this.onLoad.bind(this)
    this.onRewatch = this.onRewatch.bind(this)
    this.onPause = this.onPause.bind(this)
    this.handlescreenfull = this.handlescreenfull.bind(this)
 }
 _youTubeRef = React.createRef();
 componentDidMount(){
   //alert("hi"+JSON.stringify(this.props.questionsArray))
   Orientation.addOrientationListener(this.handleOrientation.bind(this));
  
 //  console.log("legthh",this.props.questionsArray.length)
  //  if(this.props.data){
  //   var videoid = getVideoId(this.props.data[0].url);
  // }


 
 
   if(this.props.questionsArray.length >0){
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
           console.log("fff",newarr)
         })
        })
      })
    
  
   }else{
     this.setState({
       loading: false
     })
   }
  
  

 }
 static getDerivedStateFromProps(nextProps, prevState) {
  // if(prevState.normaldata === nextProps.data){
  //           return{

  //           }
  //       }else {
          if(nextProps.data){
            if(prevState.visisted){

            }else{
              // console.log("111",prevState.normaldata)
              // const url = s3.getSignedUrl('getObject', { Bucket: 'iconed', Key: nextProps.data.url})

              return{
                normaldata: nextProps.data,
                loading: false,
                visisted: true
              }
            }
           
              }
        //}
 
  
}
onquestionSubmit(time){
   console.log("ddddd",this.state.questionsarray[this.state.index+1])

   if(this.state.questionsarray[this.state.index+1]){
this.setState({
    pausedtime :   parseInt(this.state.questionsarray[this.state.index+1].question.timeinsec),
    questiondisplay: this.state.questionsarray[this.state.index+1],
    show:false,
    isVisible: false,
    index: this.state.index+1
  },()=>
  {
    setTimeout(()=>{
      this.setState({
        isPlaying: false,
       
      })
    },500)
    
    // console.log("dfndnflkdnfkl",this.state.isVisible)
  })

   }else{
    this.setState({
      pausedtime :  null,
      questiondisplay: null,
      show:false,
      isVisible: false
    },()=>
    {
      setTimeout(()=>{
        this.setState({
          isPlaying: false,
         
        })
      },500)
      
      // console.log("dfndnflkdnfkl",this.state.isVisible)
    })
   }
  
  }

//   const interval = setInterval(async () => {
//   var count = null
// var compare = false
//     const elapsed_sec = await  this. _youTubeRef.current.getCurrentTime();
//       console.log("elaps",elapsed_sec)

//   //  console.log(",,,",elapsed_sec,"mm",count)

//   // calculations
//   // const elapsed_ms = Math.floor(elapsed_sec * 1000);
//   // const ms = elapsed_ms % 1000;
//   // const min = Math.floor(elapsed_ms / 60000);
//   // const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

//   // var newelapsed =
//   //   min.toString().padStart(2, '0') +':' +seconds.toString().padStart(2, '0')
//    if(parseInt(elapsed_sec) === 10 ){
//      console.log("naflafklalkfjkl")

//      this.setState({ isPlaying: false,questiondata: question2},()=>this.props.onPause(this.state.questiondata));
//       clearInterval(interval);


//    }
//   this.setState({
//     time: elapsed_sec,
//     elapsed: elapsed_sec,

//   })
// }, 600);

// }
//    ))
// }

onnext(){
  this.setState({
    isPlaying: false
  })
}

 onLoad = (data) => {
  
     this.setState({duration:Math.round(data.duration)})
    
    
   
  }
  onLoadStart = (data) =>{
    console.log("xxxx",data)
    if(this.state.normaldata.video_played){
      console.log("dflkjlkdf",this.state.normaldata.video_played)
      // if(this.playerRef){
      // this.playerRef.seek(this.state.normaldata.video_played);
      // }
     }
  }
  onLoadEnd = (data)=>{
    console.log("enddddd")
  }
  async getcurrentTime(){
    if(this.playerRef){
     // let elapsed_sec = await  this.playerRef.current?.getCurrentTime();
     // let duration = await this.playerRef.current.getDuration()
      console.log("fff",currentTime)
      this.props.onBackNew(currentTime,this.state.duration)
    }
   
  }
  async onNext(){
    if(this.playerRef){
      // let elapsed_sec = await  this.playerRef.current?.getCurrentTime();
      // let duration = await this. playerRef.current.getDuration()
      this.props.onActivityNext(currentTime,this.state.duration)
    }
   
  }
  async onPrevious(){
    if(this.playerRef){
      // let elapsed_sec = await  this.playerRef.current?.getCurrentTime();
      // let duration = await this. playerRef.current.getDuration()
      this.props.onActivityPrevious(currentTime,this.state.duration)
    }
   
  }
onProgress(data){
  //alert("dmf;ldf")
        // this.setState({
        //   currentTime: data.currentTime
        // })
        currentTime = data.currentTime
        const elapsed_sec =parseInt(data.currentTime)
          
         
          //let result = this.state.newarr.filter(o1 => parseInt(o1) === elapsed_sec);
         console.log("progress",elapsed_sec, "   ", this.state.pausedtime)
        //  console.log("filterer",result)
          if(elapsed_sec ===  this.state.pausedtime){
          
            if(this.state.show){
                
            }else{
             // var newdata = this.state.questionsarray.filter(o1 => parseInt(o1.question.timeinsec) === result[0]);
              //parseInt(this.state.questionsarray[0].question.timeinsec) === 
              this.setState({ isPlaying: true,data:this.state.questiondisplay,show: true},()=>this.props.onPause(this.state.data));
            }

  }
}
onPause(){
  this.playerRef.paused  = true;
  this.setState({
    isPlaying: true,
  })
}
 
//  onReady(e,close,data){
//    initial =1;
//       const interval = setInterval(async () => {
//         const elapsed_sec =data.currentTime;

//         // this is a promise. dont forget to await
//        //console.log("djdsd",parseInt(elapsed_sec))
//       // calculations
//       // const elapsed_ms = Math.floor(elapsed_sec * 1000);
//       // const ms = elapsed_ms % 1000;
//       // const min = Math.floor(elapsed_ms / 60000);
//       // const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

//       // var newelapsed =
//       //   min.toString().padStart(2, '0') +':' +seconds.toString().padStart(2, '0')
//        if(parseInt(elapsed_sec) === e){
//         this.setState({ isPlaying: false,data:question1},()=>this.props.onPause(this.state.data));
//          clearInterval(interval);
//        }
//       this.setState({
//         time: elapsed_sec,
//         elapsed: elapsed_sec,

//       })
//     }, 100);
//  }
 onRewatch(data){
  //alert(JSON.stringify(data))
  // console.log("rewatch",id)

 // this.state.questionsArray
  if (this.playerRef) {
      //this._youTubeRef.current?.seekTo(0,true);
     // alert(this.state.newarr.indexOf(this.state.pausedtime)-1)
      var value = this.state.newarr.indexOf(this.state.pausedtime)-1
      if(value === -1){
 this.playerRef.seek(0);
       this.setState({
        show:false,
          isPlaying: false,
         
        })
      }else{
      this.playerRef.seek(this.state.newarr[value]);
            this.setState({
              show:false,
                isPlaying: false,
              
        })
      }
      // this.playerRef.seek(this.state.pausedtime);
      //  this.setState({
      //   show:false,
      //     isPlaying: false,
         
      //   })
    
  }
  
  
 
 }
handleOrientation(orientation) {
  console.log("orintatin",orientation)
  // orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
  //   ? (this.setState({fullscreen: true}), StatusBar.setHidden(true))
  //   : (this.setState({ fullscreen: false}),
   //   StatusBar.setHidden(false);
}

 onfullscreen() {
   // alert('hii')
   this.props.onfullscreen()
  
  //   Orientation.lockToLandscapeLeft();
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
 return (
  this.state.loading ? <Text>Loading...</Text> :
 <View style={styles.mainView}>
  <View style={{width:"100%",height:this.state.fullscreen ? "100%" : "100%"}}>
    <View style={{flex:1}}>
      <View style={{flex:1}}>
      <Video source={{uri: imageUrl+this.state.normaldata.url,
       headers: {
        'Referer': 'https://login.smartstepup.com/'
        }}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.playerRef = ref
       }}    
       paused={this.state.isPlaying ? true : false}    
       controls={true} 
      // fullscreen={true}                          // Store referenc              // Callback when video cannot be loaded
       style={{   position: 'absolute',
       top: 0,
       left: 0,
       bottom: 0,
       right:0,
       elevation:10,}}
       onLoadStart={this.onLoadStart.bind(this)}
       onLoad={this.onLoad}
       onError={(err)=>console.log("errorrr",err)}
       resizeMode={this.state.fullscreen ? "cover":"contain"}
       onProgress ={this.onProgress} />
      <TouchableOpacity onPress={this.onfullscreen.bind(this)}
        style={{top:this.state.fullscreen ? 50 :50,elevation:20,position:"absolute",padding:10,backgroundColor:"transparent",right:10}}>
        {this.state.fullscreen ? 
          <Image source={require("../../assets/images/halfscreen.png")}
          style={{width:20,height:20,tintColor:"white"}}/>:
       <Image source={require("../../assets/images/fullscreen.png")}
       style={{width:20,height:20,tintColor:colors.Themecolor}}/>}
       </TouchableOpacity>
        <View style={[styles.absview,{bottom:25}]}>
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
    </View>
  
     
       
  </View>
 
  
     
    </View> 
   )
 }
}
