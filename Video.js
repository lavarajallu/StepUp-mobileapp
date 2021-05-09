import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Dimensions, Slider } from 'react-native'
// import COLORS from '../styles/color';
// import { STRING, url } from '../values/string';
//import GLOBALSTYLE from '../values/style';
import Video from 'react-native-video';
// import AsyncStorage from '@react-native-community/async-storage';
// import KeepAwake from 'react-native-keep-awake';

var db, videoURL, videoBaseURL, counter = 0;
import * as Progress from 'react-native-progress';
import { NativeModules } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { log } from 'react-native-reanimated';
// import DBMigrationHelper from '../dbhelper/DBMigrationHelper';
// var ServiceModule = NativeModules.ServiceModule;
import Icon from 'react-native-vector-icons/FontAwesome'
class VideoActivity extends Component {

    constructor(props) {
        super(props);
        // counter = 0;
        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        // this.stopTouch = this.visibleInteractivePoints.bind(this);
        // db = DBMigrationHelper.getInstance();

        this.state = {
            isLoading: false,
        
            topicName: '',
            videoURL:  'https://smarttesting.s3.ap-south-1.amazonaws.com/media/TW123/Time_And_Work-1617271400907.mp4',
            fileName: '',
            isNoteAvailable: false,
            iconName: require('./src/assets/images/fullscreen.png'),
            getViewX: 0,
            getViewY: 0,
            shouldHideInteractivePoints: false,
            interactiveData: [],
            interactiveQuestionData: [],
            videoDuration: 0,
            setX: [],
            isPaused: false,
            progress:0,
            userID: '',
            // typeId: this.props.navigation.getParam("typeId", -1),
            // teacherResourceId: this.props.navigation.getParam("teacherResourceId", -1),
        }
    }

    componentDidMount() {
        //KeepAwake.activate();
        this.setStates();

        // this.props.navigation.addListener(
        //     'didFocus',
        //     payload => {
        //         console.log(payload);
        //         this.setState({
        //             isPaused: false,
        //         })
        //     }
        // );
        this.timer = setInterval(this.tick, 1000);

        //this.getUserData();
    }

    getUserData() {
        db.getUserDetails(user => {
            console.log('user', user);
            if (user == null) {
                SimpleToast.show(MESSAGE.wentWrong);
            } else {
                this.setState({
                    userID: user.id,
                });
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
        counter++;
    }



    async setStates() {
        // videoBaseURL = await url(STRING.videoBaseURL);

        // this.setState({
        //     topicId: await AsyncStorage.getItem(STRING.TOPICID),
        //     topicName: await AsyncStorage.getItem(STRING.TOPICNAME),
        //     languageId: await AsyncStorage.getItem(STRING.LANGUAGEID),
        //     fileName: await AsyncStorage.getItem(STRING.VIDEOURL),
        // })

        // if (this.state.isEncrypted) {
        //     ServiceModule.getDynamicPort((err) => {
        //     }, (PORT) => {
        //         videoURL = STRING.servieBaseURL + PORT + "/" + videoBaseURL + this.state.fileName;

        //         console.log(videoBaseURL + this.state.fileName);
        //         this.setState({
        //             videoURL: videoURL,
        //         });
        //     });
        // } else {
        //     // this.setState({
        //     //     videoURL: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4',
        //     // });
        // }

        // this.getInteractivePointsAPI();
    }

    goBack() {
        // db.insertProgressData(code => {
        //     Orientation.lockToPortrait();
        //     this.props.navigation.goBack(null)
        // }, this.state.userID, this.state.topicId, this.state.typeId, this.state.teacherResourceId, counter);
    }

    handleBackButtonClick() {
        // this.goBack();
        // return true;
    }

    doFullScreen() {
        // Orientation.getOrientation((err, orientation) => {
        //     if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscape();
                this.setState({
                    iconName: require('./src/assets/images/halfscreen.png'),
                   // interactiveData: this.state.interactiveData,
                });
            // } else {
            //     Orientation.lockToPortrait();
            //     this.setState({
            //         iconName: require('./src/assets/images/fullscreen.png'),
            //         //interactiveData: this.state.interactiveData,
            //     });
            // }
        //})
    }

    async getInteractivePointsAPI() {
        // this.setState({
        //     isLoading: true,
        // });

        // console.log(await url(STRING.liveClassBaseUrl) + STRING.topicInteractive + this.state.topicId + "&language=" + this.state.languageId);
        // return fetch(await url(STRING.liveClassBaseUrl) + STRING.topicInteractive + this.state.topicId + "&language=" + this.state.languageId, {
        //     // return fetch('http://3.6.66.252:5001/api/InteractiveVideo/TopicInteractive?id=PH12041&language=ENG-101', {
        //     method: 'GET',
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response => {
        //         const statusCode = response.status;
        //         const data = response.json();
        //         return Promise.all([statusCode, data]);
        //     })
        //     .then(([statusCode, responseJson]) => {
        //         if (statusCode == 200) {
        //             this.setState({
        //                 interactiveData: responseJson.quizDetailsList,
        //                 interactiveQuestionData: responseJson.quizDetailsList,
        //                 isLoading: false,
        //             }, () => {
        //                 console.log(this.state.duration);
        //             });
        //         } else {
        //             this.setState({
        //                 isLiveClassAvailable: false,
        //                 isLoading: false,
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             isLoading: false
        //         });
        //     });
    }

    displayOptions() {
        if (this.state.shouldHideInteractivePoints || this.state.isLoading || this.state.setX.length <= 0) {
            return null
        } else {
            console.log('FINAL: ', this.state.setX);
            return this.state.setX.map(data => (
                <View
                    style={{ position: 'absolute', left: data, top: this.state.getViewY - 40 }}>
                    
                </View>
            ));
        }
    }

    visibleInteractivePoints() {
        clearInterval(this.interval);
        this.interval = setInterval(() =>
            this.setState({
                shouldHideInteractivePoints: true,
            }, () => {
                clearInterval(this.interval);
            })
            , 4900);
        this.setState({
            shouldHideInteractivePoints: false,
        })
    }

    setInteractiveAxis(event) {
        // let setX = [];
        // for (let i = 0; i < this.state.interactiveData.length; i++) {
        //     let x1 = 50;
        //     let x2 = this.state.getViewX - 50;
        //     let temp = (this.state.interactiveData[i].duration * 100) / event.duration

        //     setX[i] = ((x1 + ((x2 - x1) * temp) / 100) - 5);
        //     console.log('setX: ', setX[i]);
        // }

        // this.setState({
        //     videoDuration: event.duration,
        //     setX: setX
        // }, () => {
        //     this.visibleInteractivePoints();
        // });
    }

    checkForPoints(seekPos) {
        // this.state.interactiveQuestionData.forEach(element => {
        //     if (element.duration < seekPos) {
        //         this.setState({
        //             isPaused: true,
        //             interactiveQuestionData: this.state.interactiveQuestionData.splice(1, this.state.interactiveQuestionData.length - 1),
        //         }, () => {
        //             this.props.navigation.navigate('quizInteractiveActivity', { 'data': element });
        //         });
        //         return true;
        //     }
        // });
    }
    handleMainButtonTouch(){
        this.setState( state =>{
            return{
                isPaused : !state.isPaused
            }
        })
    }
    handleOnEnd(){this.setState({isPaused:true})}
    handleProgress  = (data) => {
        this.setState({
            progress : data.currentTime / this.state.videoDuration
        })
    }
    handleLoad(meta){

        this.setState({
            videoDuration: meta.duration
        })

    }
    handleProgressBarTouch (e) {
        
        const position = e.nativeEvent.locationX;
        const progress = (position / 250)  * this.state.videoDuration
      
        if(progress/ this.state.videoDuration < this.state.progress){
            this.player.seek(progress)
           console.log(progress/ this.state.videoDuration +  " "+ this.state.progress)
        }
      

    }
    secondsToTime(time){
          return ~~(time/60)+":"+(time%60 < 10 ? "0" : "")+time%60;
    }
    render() {
        const width = Dimensions.get('window');
        const height = width*.5625
        return (
            // <View
            //     style={{ backgroundColor: 'green', flex:1}}>
            //     <StatusBar hidden={true} />
               
            //         <Video source={{ uri: this.state.videoURL }}   // Can be a URL or a local file.
            //             onBuffer={this.onBuffer}                // Callback when remote video is buffering
            //             onError={this.videoError}               // Callback when video cannot be loaded
            //             style={{ position: 'absolute',
            //             top: 0,
            //             left: 0,
            //             bottom: 0,
            //             right: 0,}}
            //             controls={true}
            //             resizeMode = {"contain"}
            //             paused={this.state.isPaused}
            //             onLoad={event => {
            //                 this.setInteractiveAxis(event)
            //             }}
            //             onProgress={event => {
            //              //   this.checkForPoints(Number(event.currentTime))
            //             }}
            //             onLayout={event => {
            //                 const layout = event.nativeEvent.layout;
            //                 this.setState({
            //                     getViewX: layout.width,
            //                     getViewY: layout.height,
            //                 });
            //             }}
            //             {...this._panResponder.panHandlers} />
            //         {/* {this.displayOptions()} */}
            //      <TouchableOpacity
            //         activeOpacity={0.7}
            //         style={{ justifyContent: 'center', alignSelf: 'flex-end', position: 'absolute', padding: 8, marginEnd: 10, marginTop: 10, borderRadius: 8, }}
            //         onPress={() => this.doFullScreen()}>
            //         <Image
            //             style={{ height: 25, width: 25, alignSelf: 'flex-start' }}
            //             source={this.state.iconName} />
            //     </TouchableOpacity>
            //     <TouchableOpacity
            //         activeOpacity={0.7}
            //         style={{ justifyContent: 'center', flex: 0.33, position: 'absolute', padding: 8, marginStart: 10, marginTop: 10, borderRadius: 8, }}
            //         onPress={() => this.goBack()}>
            //         <Image
            //             style={{ height: 20, width: 20, alignSelf: 'flex-start',tintColor:"white" }}
            //             source={require('./src/assets/images/left-arrow.png')} />
            //     </TouchableOpacity>


            //     {/* <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: COLORS.white, borderTopStartRadius: 25, borderTopEndRadius: 25, borderColor: COLORS.darkGrey, borderWidth: 0.5 }}>
            //         <TouchableOpacity
            //             onPress={() => { this.state.isFromDetailActivity ? this.props.navigation.goBack(null) : this.props.navigation.replace('quizActivity', { 'isPreAssessment': false }) }}
            //             style={{ textAlign: 'center', bottom: 0, padding: 10, color: COLORS.blue, fontWeight: 'bold' }}>
            //             <Text style={GLOBALSTYLE.nextPrevBtn}>{this.state.isFromDetailActivity ? 'Close' : 'Next'}</Text>
            //         </TouchableOpacity>
            //     </View> */}
            // </View >

            <View style={{flex:1,backgroundColor:"red",justifyContent:"center"}}>
              <View>
                  <Video
                    paused={this.state.isPaused}
                    source={{ uri: this.state.videoURL }}
                    style={{width:"100%",height:"100%"}}
                    resizeMode={"contain"}
                    onLoad = {this.handleLoad.bind(this)}
                     onProgress={this.handleProgress.bind(this)}
                     onEnd={this.handleOnEnd.bind(this)}
                     ref={ref=>this.player = ref}
                     />

                     <View style={{
                         backgroundColor:"rgba(0,0,0,0.5)",
                         height:48,
                         left:0,
                         right:0,
                         bottom:0,
                         position:"absolute",
                         flexDirection:"row",
                         alignItems:"center",
                         justifyContent:"space-around",
                         paddingHorizontal:10
                     }}>
                         <TouchableOpacity onPress={this.handleMainButtonTouch.bind(this)}>
                             {!this.state.isPaused ? 
                             <Image source={require('./src/assets/images/pause.png')}
                             style={{width:30,height:30,tintColor:"white"}} /> : 
                             <Image source={require('./src/assets/images/play.png')}
                             style={{width:30,height:30,tintColor:"white"}} /> 
                            }
                         </TouchableOpacity>
                         {/* <TouchableWithoutFeedback onPress={this.handleProgressBarTouch.bind(this)}>
                         <Progress.Bar progress={this.state.progress} width={250} height={20} color={"#FFF"}/>
                        
                         </TouchableWithoutFeedback> */}
                         <Slider
                         width={250}
                        value={this.state.progress} // Which is updated by videoRef.onProgress listener
                        minimumValue={0}
                        maximumValue={this.state.videoDuration}
                        onValueChange={value => {
                            this.setState({
                                progress : value / this.state.videoDuration
                            })
                            this.player.seek(value)}} 
                    />
                        <Text style={{marginLeft:15}}>
                            {this.secondsToTime(Math.floor(this.state.progress * this.state.videoDuration))}
                        </Text>

                     </View>
                            </View>
            </View>
        )
    }
}

export default VideoActivity

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        
    },
});