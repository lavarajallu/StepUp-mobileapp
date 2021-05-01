import React, { Component } from 'react';
import  { StyleSheet,  View,  Text,  Slider, Image,  PixelRatio, Platform,  Button,  Dimensions, } from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
const data = [];
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoQuestionModal from './src/components/VideoQuestionModal'
var initial = 0
export default class Video extends Component {
state = {
  isReady: false,
  status: null,
  quality: null,
  error: null,
  isPlaying: true,
  isLooping: true,
  duration: 0,
  currentTime: 0,
  fullscreen: false,
  playerWidth: Dimensions.get('window').width,
  elapsed: 0 ,
  time:0,
  singleSliderValues: [],
  value:0,
  isvisible:false
 };
 constructor(props){
    super(props);
 }
 _youTubeRef = React.createRef();
onquestionSubmit(time){

  this.setState({
    isVisible: false
  },()=>this.setState({isPlaying: true},()=>
  {
     console.log("dfndnflkdnfkl",this.state.isVisible)

  const interval = setInterval(async () => {
  var count = null
var compare = false
    const elapsed_sec = await  this. _youTubeRef.current.getCurrentTime();
      console.log("elaps",elapsed_sec)

  //  console.log(",,,",elapsed_sec,"mm",count)

  // calculations
  // const elapsed_ms = Math.floor(elapsed_sec * 1000);
  // const ms = elapsed_ms % 1000;
  // const min = Math.floor(elapsed_ms / 60000);
  // const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

  // var newelapsed =
  //   min.toString().padStart(2, '0') +':' +seconds.toString().padStart(2, '0')
   if(parseInt(elapsed_sec) === 10 ){
     console.log("naflafklalkfjkl")

      this.setState({ isPlaying: false},()=>this.setState({isVisible: true}));
       clearInterval(interval);


   }
  this.setState({
    time: elapsed_sec,
    elapsed: elapsed_sec,

  })
}, 600);

}
   ))
}



onStateChange (e){
  if(initial === 0) {
    if(e === 'playing'){
      this.onReady(5,false)
    }
  }

}
 onReady(e,close){
   initial =1;
   if(e === 5){
    this. _youTubeRef.current?.getDuration().then(
      getDuration => this.setState({duration:parseInt(getDuration)})
    );
   }
   console.log("lkadflkjdfkljdfklj")

    //     this.setState({ isReady: true });
      const interval = setInterval(async () => {
       const elapsed_sec = await  this. _youTubeRef.current.getCurrentTime();

        // this is a promise. dont forget to await
       //console.log("djdsd",parseInt(elapsed_sec))
      // calculations
      // const elapsed_ms = Math.floor(elapsed_sec * 1000);
      // const ms = elapsed_ms % 1000;
      // const min = Math.floor(elapsed_ms / 60000);
      // const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

      // var newelapsed =
      //   min.toString().padStart(2, '0') +':' +seconds.toString().padStart(2, '0')
       if(parseInt(elapsed_sec) === e){
        this.setState({ isPlaying: false},()=>this.setState({isVisible: true}));
         clearInterval(interval);
       }
      this.setState({
        time: elapsed_sec,
        elapsed: elapsed_sec,

      })
    }, 100);
 }

render(){
  const data=[]
  for(var i = 0 ; i< this.state.duration;i++){
    data.push({"value":i})
  }
  const YOUR_API_KEY = "paste yout api key here";

 return (<View style={{flex:1,justifyContent:"center",position:"relative"}}>
     <YoutubePlayer
        height={250}
        ref={this. _youTubeRef}
         play={this.state.isPlaying}

        videoId={'FUiu-cdu6mA'}
        //onReady={()=>this.onReady()}
        onChangeState={this.onStateChange.bind(this)}
      />
<View style={{width:10,height:10,position:"absolute",width:"100%",backgroundColor:"transparent",top:Dimensions.get('window').height/1.75}}>
      <View style={{flex:1,flexDirection:"row"}}>
        <View style={{flex:0.06,}}/>
        <View style={{flex:0.84,}}>
        <View style={{justifyContent:'space-evenly',flexDirection:"row",flex:1,alignItems:"center",}}>
          {data.map((res,i)=>


          <Text style={{color:res.value === 5 ? "white":
          res.value===10 ? "white" :
          "transparent",fontSize:13}} >?</Text>
          )}
          </View>
        </View>
        <View style={{flex:0.1,}}/>
      </View>
    </View>
    {this.state.isVisible ?
      <View style={{width:"100%",height:"100%",position:"absolute",backgroundColor:"rgba(52, 52, 52, 0.6)",justifyContent:"center",}}>
    <View style={{width:"90%",height:"85%",alignSelf:"center",borderRadius:15,overflow:"hidden"}}>

             <VideoQuestionModal onquestionSubmit={this.onquestionSubmit.bind(this,20)}/>
        </View>
        </View> : null}
    </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white',
 },
welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
},
buttonGroup: {
flexDirection: 'row',
alignSelf: 'center',
paddingBottom: 5,
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
 },
player: {
  alignSelf: 'stretch',
  marginVertical: 10,
 },
});
