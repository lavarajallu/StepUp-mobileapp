import React, { Component } from 'react';
import {
  SafeAreaView,
  Platform,
  ImageBackground,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
  FlatList,
  Alert,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import styles from "./styles"
import Drawer from 'react-native-drawer'
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SideMenu from "../../components/SideMenu"
import { colors } from "../../constants"
import Footer from '../../components/Footer'
import { baseUrl,imageUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-simple-toast';


const data = [
  {
    name: "Rational Numbers",
    image: require('../../assets/images/dashboard/new/recomtopic1.png'),
    insideimg: require('../../assets/images/math.png'),
    progress: 0.5,
    test: 6, read: 40
  },
  {
    name: "Rational Numbers",
    image: require('../../assets/images/dashboard/new/recomtopic2.png'),
    insideimg: require('../../assets/images/math.png'),
    progress: 0.5,
    test: 6, read: 40
  },
]
class TopicMainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isvisible: false,
      newmodal: false,
      topicData: this.props.data,
      smartres: [],
      teacherres: [],
      iconspinner: true,
      teacherspinner: true,
      useDetails: null,
      analyticsData: {},
      token: ''
    }
  }
  componentDidMount() {
    //alert(JSON.stringify(this.props.data))
    this.getData()
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
     //  alert(JSON.stringify(value))
      if (value !== null) {
        var data = JSON.parse(value)
        this.setState({
          useDetails: data
        })
        const token = await AsyncStorage.getItem('@access_token')
        if (token && data) {
          this.setState({
            token: JSON.parse(token)
          })
          
          this.getResources(data, JSON.parse(token))
          this.getanalytics(data, JSON.parse(token))
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
  getanalytics(user, token) {
    //alert("analyticsss"+ this.props.subjectData)
    var body = {
      user_id: user.reference_id,
      board_id: user.grade ? user.grade.board_id : null,
      grade_id: user.grade ? user.grade.reference_id : null,
      section_id: user.section ? user.section.reference_id : null,
      school_id: user.school ? user.school.reference_id : null,
      branch_id: user.grade ? user.grade.branch_id : null,
      page: "MyCourse_Resource",
      type: "mobile",
      subject_id: this.props.subjectData.reference_id,
      chapter_id: this.props.topicsdata.reference_id,
      topic_id: this.props.data.reference_id,
      activity_id: null,
    }

   
    var url = baseUrl + '/analytics'
    console.log("value", url)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(body)
    }).then((response) =>

      response.json())
      .then((json) => {

        if (json.data) {
          const data = json.data;
          //alert(JSON.stringify(json));
          this.setState({
            analyticsData: data
          })
          //  Snackbar.show({
          // text: json.message,
          // duration: Snackbar.LENGTH_SHORT,
          // });
        } else {
          console.log(JSON.stringify(json.message))
        }
      }

      )
      .catch((error) => console.error(error))
  }
  getResources(user, token) {
   // alert(JSON.stringify(this.state.topicData))
    console.log(" this.state.topicData", this.state.topicData);

    var url;
    if (user.user_role === 'Student') {
      url = baseUrl + "/student/resource/" + user.grade_id + "/" + this.state.topicData.reference_id + "?school_id=" + user.school_id + "&section_id=" + user.section_id
    } else if (user.user_role === 'General Student') {
      url = baseUrl + "/student/resource/" + user.grade_id + "/" + this.state.topicData.reference_id + "?school_id=''&section_id=''"
    }


    //var url=baseUrl+"/student/resource/8283c5c7-0369-4bb0-8da0-acf1179833b2/24a1fc78-19aa-454b-a88a-128b8ced80a1?school_id=''&section_id=''"
    console.log("dhfjdf", url)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then((response) => response.json())
      .then((json) => {

        const data = json.data;
        console.log("teacherreeee",data)
        if (data) {
          if (data.smart) {

            this.setState
              ({
                iconspinner: false,
                smartres: data.smart
              })
          } else {
            this.setState
              ({
                iconspinner: false,
                smartres: []
              })
          }
          if (data.resource) {

            this.setState
              ({
                teacherspinner: false,
                teacherres: data.resource
              })
          } else {
            this.setState
              ({
                teacherspinner: false,
                teacherres: []
              })
          }

        } else {
          alert(JSON.stringify(json.message))
          this.setState
            ({
              teacherspinner: false,
              iconspinner: false,
              topicsArray: []
            })
        }
      }

      )
      .catch((error) => console.error(error))
  }
  renderItem({ item }) {

    var progress = 0 + (0.4 * Math.random())
    var percent = (item.progress) * 100;
    var color;
    if (percent > 50) {
      color = "green"
    } else if (color < 50) {
      color = "red"
    } else {
      color = "orange"
    }
    return (
      <TouchableHighlight style={{ paddingVertical: 20 }} underlayColor="transparent" activeOpacity={0.9}>
      

    
              <View style={{
                width: windowWidth/2.5,
                height: 150,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: 'red',
                overflow:"hidden",
                margin:10,

                //left: -240,
              }}><Image source={item.image} style={{width:"100%",height:"100%",resizeMode:"cover" }} />
                 <View style={{position:"absolute",backgroundColor:"rgba(42,42,55,0.7)",width:"100%",height:40,bottom:0,justifyContent:"center",alignItems:"center"}}>
                       <Text style={{ textAlign: "center", fontSize: 10,color:"white"}}>{item.name}</Text>
                      </View>
              </View>
            {/* <View style={styles.bottomsubview}>
              <Text style={styles.subjectname}>{item.name}</Text>
              <View style={{ paddingVertical: 10, width: "100%", borderRadius: 3, }}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 12 }}>Progress</Text>
                  <Text style={{ color: "black", fontSize: 12 }}>{item.progress * 100}%</Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Progress.Bar progress={item.progress} width={1724 / 11} height={5} color={'lightgreen'} />
                </View>


              </View>

              <View style={styles.countview}>
              </View>
            </View> */}
          
      </TouchableHighlight>
    )
  }


  onBack() {
    this.updateAnalytics();
    if(this.props.from === "dashboard"){
        Actions.dashboard({type:"reset"})
    }else if(this.props.from === 'progresstopics'){
      Actions.progresstopics({type:"reset"})
    }
    
    else{
      Actions.topics({ type: "reset", data: this.props.topicsdata, subjectData: this.props.subjectData })
    }


  }
  onPreasses() {
    this.setState({
      isvisible: true
    })
  }
  onstarttest() {
    this.setState({
      isvisible: false
    }, () =>
      this.setState({
        newmodal: true
      })
    )
  }
  onOk() {
    this.setState({
      newmodal: false
    }, () => Actions.push('postassesment'))
  }
  onCancel() {
    this.setState({
      newmodal: false
    })
  }
  onReview() {
    this.setState({
      isvisible: false
    }, () =>
      Actions.push('reviewpostsummary')
    )

  }
  onBackdrop() {
    this.setState({
      newmodal: false,
    })
  }
  onObjectass() {
    Actions.push('objectassesment')
  }
  onYoutube() {
    Actions.push('video')
  }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  updateAnalytics() {
    //alert(this.state.analyticsData.reference_id)
    var url = baseUrl + '/analytics/' + this.state.analyticsData.reference_id
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      },
    }).then((response) =>

      response.json())
      .then((json) => {

        if (json.data) {
          const data = json.data;
          //   alert(JSON.stringify(json));
          this.setState({
            analyticsData: data
          })
          //    Snackbar.show({
          // 	text: "Analytics Updated succesfully",
          // 	duration: Snackbar.LENGTH_SHORT,
          //   });
        } else {
          console.log(JSON.stringify(json.message))
        }
      }

      )
      .catch((error) => console.error(error))

  }
  oniconActivity(item, index, type) {
    this.updateAnalytics()
    console.log("Activity", item)
    let newarray = []
   // alert(this.state.smartres[index-1].status)
    if (type === 'teacher') {
      newarray = this.state.teacherres
    } else if (type === 'icon') {
      newarray = this.state.smartres
    }

    if (this.state.smartres[index - 1]) {
       //alert(this.state.smartres[index-1].status)
      var status = this.state.smartres[index - 1].status
      if (status === 0 ) {
        Toast.show('Please complete the previous activity to open this.', Toast.LONG);
      } else if (status === 1|| status === 2) {
        if (item.type === 'WEB') {
          Actions.push('weblinkview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
        } else if (item.type === "PDF") {
          Actions.push('pdfview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
        }
        else if (item.type === 'VIDEO') {
          Actions.push('normalvideoview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
        } else if (item.type === "YOUTUBE") {
          Actions.push('videoview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })

        } else if (item.type === "PRE" || item.type === 'OBJ' || item.type === 'POST' || item.type === 'SUB') {

          //  this.onAssesment(item)
          Actions.push('preassesment', { index: index, smartres: this.state.smartres, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })

        } else if (item.type === 'GAMES') {
          Actions.push('games', { index: index, smartres: this.state.smartres, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
        } else {
          alert("coming soon" + item.type)
        }
      }
    } else {
      if (item.type === 'WEB') {
        Actions.push('weblinkview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
      } else if (item.type === "PDF") {
        Actions.push('pdfview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
      }
      else if (item.type === 'VIDEO') {
        Actions.push('normalvideoview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
      } else if (item.type === "YOUTUBE") {
        Actions.push('videoview', { index: index, smartres: newarray, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })

      } else if (item.type === "PRE" || item.type === 'OBJ' || item.type === 'POST' || item.type === 'SUB') {

        //  this.onAssesment(item)
        Actions.push('preassesment', { index: index, smartres: this.state.smartres, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })

      } else if (item.type === 'GAMES') {
        Actions.push('games', { index: index, smartres: this.state.smartres, data: item, topicData: this.props.topicsdata, subjectData: this.props.subjectData, topicindata: this.props.data,from :this.props.from })
      } else {
        alert("coming soon" + item.type)
      }
    }

    //   if(item.type === 'WEB'){
    //   Actions.push('weblinkview',{index:index,smartres:newarray,data:item,topicData: this.props.topicsdata,subjectData:this.props.subjectData,topicindata: this.props.data})
    //   }else if(item.type ==="PDF"){
    //    Actions.push('pdfview',{index:index,smartres:newarray,data:item,topicData: this.props.topicsdata,subjectData:this.props.subjectData,topicindata: this.props.data})
    //   }
    //   else if(item.type=== 'VIDEO'){
    //     Actions.push('normalvideoview',{index:index,smartres:newarray,data:item,topicData: this.props.topicsdata,subjectData:this.props.subjectData,topicindata: this.props.data})
    //   }else if(item.type === "YOUTUBE"){
    //  Actions.push('videoview',{index:index,smartres:newarray,data:item,topicData: this.props.topicsdata,subjectData:this.props.subjectData,topicindata: this.props.data})

    //   }else if(item.type === "PRE" || item.type==='OBJ' || item.type === 'POST' || item.type === 'SUB'){

    //    //  this.onAssesment(item)
    //    Actions.push('preassesment',{index:index,smartres:this.state.smartres,data:item,topicData: this.props.topicsdata,subjectData:this.props.subjectData,topicindata: this.props.data})

    //      }else if(item.type === 'GAMES'){
    //       Actions.push('games',{index:index,smartres:this.state.smartres,data:item,topicData: this.props.topicsdata,subjectData:this.props.subjectData,topicindata: this.props.data})
    //      }else{
    //     alert("coming soon"+item.type)
    //   }

  }
  onAssesment(item) {
    var url = baseUrl + "/user-test/assigned-activity/" + item.reference_id

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((response) => response.json())
      .then((json) => {


        if (json.data) {
          const data = json.data;
          //  alert("dff"+JSON.stringify(data))

          if (json.data.total_count > 0) {
            Alert.alert(
              "Step Up",
              "Sorry you have reached your maximum number of attempts in this assesment",
              [
                {
                  text: "OK", onPress: () => {
                    // Actions.push('presummary',{testid: this.state.testid,index:this.props.index,smartres:this.props.smartres,topicData: this.props.topicData,topicindata:this.props.topicindata,subjectData:this.props.subjectData})
                  }
                }
              ]
            );
          } else {

          }

        } else {
          alert(JSON.stringify(json.message))

        }
      }

      )
      .catch((error) => console.error(error))
  }
  renderIconResource({ item, index }) {
    let color = '#E32346';
    if (item.status === 0 || item.sttaus === 2) {
      color = '#E32346'
    } else if (item.status === 1) {
      color = "green"
    }
    
    return (
      <TouchableHighlight onPress={this.oniconActivity.bind(this, item, index, 'icon')} underlayColor="transparent" activeOpacity={0.9}>
        <View style={{ flex: 1, }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", alignItems: "center",marginTop:10,}}>
            <View style={{ width: 100,alignItems:"center"}}>
              <View style={{width:35,height:35,backgroundColor:color,justifyContent:"center",alignItems:"center"}}>
              <Image source={{ uri: imageUrl + item.faIcon }}
                style={{ width: 20, height: 20, alignSelf: "center",tintColor:"white" }} />
              </View>
             
              <Text style={{ fontSize: 10, textAlign: "center", marginTop: 5 }}>{item.activity}</Text>
            </View>
            {index === this.state.smartres.length - 1 ? null :
              <Image source={require('../../assets/images/right-arrow.png')}
                style={{ width: 15, height: 15, alignSelf: "center", marginHorizontal: 5, tintColor: color }} />
            }
          </View>


        </View>


      </TouchableHighlight>

    )
  }

  renderTeacherResource = ({ item, index }) => {
    let color = '#E32346';
    if (item.status === 0 || item.sttaus === 2) {
      color = '#E32346'
    } else if (item.status === 1) {
      color = "green"
    }
   
    console.log("ddddd", index, this.state.teacherres.length - 1)
    return (
      <TouchableHighlight onPress={this.oniconActivity.bind(this, item, index, 'teacher')}
        underlayColor="transparent" activeOpacity={0.9}>

<View style={{ flex: 1, }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", alignItems: "center",marginTop:10,}}>
            <View style={{ width: 100,alignItems:"center"}}>
              <View style={{width:35,height:35,backgroundColor:color,justifyContent:"center",alignItems:"center"}}>
              <Image source={{ uri: imageUrl + item.faIcon }}
                style={{ width: 20, height: 20, alignSelf: "center",tintColor:"white" }} />
              </View>
             
              <Text style={{ fontSize: 10, textAlign: "center", marginTop: 5 }}>{item.activity}</Text>
            </View>
            {index === this.state.teacherres.length - 1 ? null :
              <Image source={require('../../assets/images/right-arrow.png')}
                style={{ width: 15, height: 15, alignSelf: "center", marginHorizontal: 5, tintColor: color }} />
            }
          </View>


        </View>


      </TouchableHighlight>
    )

  }



  render() {
    return (
      <>
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          tapToClose={true}
          openDrawerOffset={0.25}
          content={<SideMenu closeControlPanel={this.closeControlPanel} />}
        >
          <View style={{flex:1}}>

            <View style={{flex:0.92}}>
            <ImageBackground source={require('../../assets/images/dashboard/new/chapters_bg.png')}
                style={{ width: "100%", height: 288, backgroundColor: this.props.data.color, }} opacity={0.5}>
                <View style={{
                  flexDirection: "row", marginLeft: 20, alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    <View style={{flex:1,flexDirection:"row",alignItems:"center",marginTop:5}}>
						<View style={{flex:0.7,flexDirection:"row",alignItems:"center"}}>
						<TouchableOpacity onPress={this.onBack.bind(this)}>
                    <Image source={require('../../assets/images/refer/back.png')} style={{width:21,height:15,tintColor:"white"}} />
                  </TouchableOpacity>
                    <Text style={{ color: "white", marginHorizontal: 10, fontSize: 18 }}>{this.props.data.name}</Text>
						</View>
                      <View style={{flex:0.3,justifyContent:"center",alignItems:"center"}}>
					  {this.props.data.image !== "null" ?
                    <Image source={{ uri: imageUrl + this.props.data.image }} style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />

                    : <Image source={require('../../assets/images/noimage.png')}
                      style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
					  </View>
                    </View>
                  </View>
                 
                  
                </View>
                </View>
              

              </ImageBackground>
              <View style={{height:Platform.OS === 'android' ? windowHeight/1.3:windowHeight/1.35,width:windowWidth,backgroundColor:"white",alignSelf:"center",
             position:"absolute",bottom:0,borderTopRightRadius:30,borderTopLeftRadius:30}}>
               <ScrollView>
               <View style={{ flex: 1 }}>
                   <View style={{ width: windowWidth/1.2 , height: windowHeight / 4,margin:20,
                       backgroundColor: '#EE5B7B', alignSelf: "center",}}>
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image
                          source={{ uri: imageUrl + this.state.topicData.image }}
                          style={{ width: "100%", height: "100%", alignSelf: "center", }} />
                      <View style={{position:"absolute",backgroundColor:"rgba(42,42,55,0.7)",width:"100%",bottom:0,justifyContent:"center",alignItems:"center"}}>
                       <Text style={{ textAlign: "center", fontSize: 15,color:"white"}}>{this.state.topicData.name}</Text>
                      </View>
                      </View>
                    </View>

                  {this.state.iconspinner ? <ActivityIndicator color="black" /> :

                this.state.smartres.length > 0 ?
                  <View style={{
                    padding: 5, margin: 15, backgroundColor: 'white', 
                    shadowOffset: { width: 0, height: 5 },//marginBottom:20,
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    borderRadius: 10,
                    elevation: 10, shadowColor: "grey"
                  }}>

                    <Text style={{ alignSelf: "center" }}>Icon Resource</Text>

                    <View style={{  alignItems: "center", justifyContent: "center" }}>
                      <FlatList
                        data={this.state.smartres}
                        renderItem={this.renderIconResource.bind(this)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} />

                    </View>



                  </View>

                  : null}
            {this.state.teacherspinner ? null :

                this.state.teacherres.length > 0 ?
                <View style={{
                  padding: 5, marginHorizontal: 15,marginVertical:5, backgroundColor: 'white', 
                  shadowOffset: { width: 0, height: 5 },//marginBottom:20,
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  borderRadius: 10,
                  elevation: 10, shadowColor: "grey"
                }}>

                  <Text style={{ alignSelf: "center" }}>Teacher Resource</Text>

                  <View style={{  alignItems: "center", justifyContent: "center" }}>
                    <FlatList
                      data={this.state.teacherres}
                      renderItem={this.renderTeacherResource.bind(this)}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false} />

                  </View>



                </View>

                  : null}
                     <View style={{
                      padding: 5, margin: 10, backgroundColor: 'white', shadowOffset: { width: 0, height: 5 },//marginBottom:20,
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      borderRadius: 10,
                      elevation: 10, shadowColor: "grey"
                    }}>
                      <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 15 }}>Recommended Topics</Text>
                      <FlatList data={data}
                        renderItem={this.renderItem.bind(this)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} />
                    </View>

                    </View>
               </ScrollView>
            </View>
               
                

            </View>
                  <View style={{flex:0.08}}>

                    <Footer openControlPanel={this.openControlPanel} />
                  </View>
          </View>
        </Drawer>
      </>
     
    )
  }
}
export default TopicMainView;
