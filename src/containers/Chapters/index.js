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
  TouchableOpacity
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import ChapterComponent from '../../components/ChapterComponent';
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'
import { baseUrl,imageUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

class Chapters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: this.props.data,
      spinner: true,
      chaptersData: [],
      analyticsData: {},
      token:""
    }
  }
  onBack() {
    this.updateAnalytics()
    Actions.dashboard({ type: "reset" })
  }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  componentDidMount() {
    // alert(JSON.stringify(this.props.data))
    console.log("ddd",this.state.userData)
    this.getData()
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
      //  alert(JSON.stringify(value))
      if (value !== null) {
        var data = JSON.parse(value)
        console.log("subjectass", data)
        const token = await AsyncStorage.getItem('@access_token')
        if (token) {
          this.setState({
            token: JSON.parse(token)
          })
          this.getChapter(data, JSON.parse(token))
          this.getanalytics(data, JSON.parse(token))
        } else {

        }

      } else {
        console.log("errorrr")
      }
    } catch (e) {
      return null;
    }
  }
  onFront(){
    this.updateAnalytics()
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
          //  Snackbar.show({
          // text: "Analytics Updated succesfully",
          // duration: Snackbar.LENGTH_SHORT,
          // });
        }else{
          console.log(JSON.stringify(json.message))
        }
      }
       
      )
      .catch((error) => console.error(error))
      
  }
  getanalytics(user, token) {
    var body = {
      user_id: user.reference_id,
      board_id: user.grade ? user.grade.board_id : null,
      grade_id: user.grade ? user.grade.reference_id : null,
      section_id: user.section ? user.section.reference_id : null,
      school_id: user.school ? user.school.reference_id : null,
      branch_id: user.grade ? user.grade.branch_id : null,
      page: "MyCourse_Chapters",
      type: "mobile",
      subject_id: this.props.data.reference_id,
      chapter_id: null,
      topic_id: null,
      activity_id: null,
    }

    console.log("analyticsss", body)
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
          //   alert(JSON.stringify(json));
          this.setState({
            analyticsData: data
          })
          // Snackbar.show({
          //   text: json.message,
          //   duration: Snackbar.LENGTH_SHORT,
          // });
        } else {
          console.log(JSON.stringify(json.message))
        }
      }

      )
      .catch((error) => console.error(error))
  }
  getChapter(user, toekn) {
    var url;
    if (user.user_role === 'Student') {
      url = baseUrl + "/student/chapters/" + user.grade_id + "/" + this.state.userData.reference_id + "?school_id=" + user.school_id + "&section_id=" + user.section_id+"&order_by=index&sort_order=ASC"
    } else if (user.user_role === 'General Student') {
      url = baseUrl + "/student/chapters/" + user.grade_id + "/" + this.state.userData.reference_id + "?school_id=''&section_id=''&order_by=index&sort_order=ASC"
    }

    //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1

    console.log("value", url)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': toekn
      }
    }).then((response) =>

      response.json())
      .then((json) => {
        const data = json.data;
        console.log("sss", data)
        if (data) {
          if (data.chapters) {
            console.log("chaptersssss", json.data.chapters)
            this.setState
              ({
                spinner: false,
                chaptersData: data.chapters
              })
          } else {
            this.setState
              ({
                spinner: false,
                chaptersData: []
              })
          }
          //  AsyncStorage.setItem('@access-token', data.access_token)
          //  Actions.push('dashboard')
        } else {
          alert(JSON.stringify(json.message))
          this.setState
            ({
              spinner: false,
              chaptersData: []
            })
        }
      }

      )
      .catch((error) => console.error(error))
    //Actions.push('boards')
  }
  render() {
    return (

      <Drawer
      type="overlay"
      ref={(ref) => this._drawer = ref}
      tapToClose={true}
      openDrawerOffset={0.25}
      content={<SideMenu closeControlPanel={this.closeControlPanel} />}
    >
      <View style={styles.mainview}>

        <View style={styles.topview}>
        <ImageBackground source={require('../../assets/images/dashboard/new/chapters_bg.png')}
                style={{ width: "100%", height: 288, backgroundColor: this.props.data.color, }} opacity={0.5}>
                <View style={{
                  flexDirection: "row", marginLeft: 10, alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",marginTop:10,}}>
                    <View style={{flex:0.7,marginLeft:10}}>

                      <View style={{flex:1,flexDirection:"row",marginTop:10}}>
                        <View style={{flex:0.1,marginTop:10}}>
                        <TouchableOpacity onPress={this.onBack.bind(this)}>
                        <Image source={require('../../assets/images/refer/back.png')} style={{width:21,height:15,tintColor:"white"}} />
                      </TouchableOpacity>
                        </View>
                        <View style={{flex:0.9,justifyContent:"flex-start"}}>
                        <Text style={{ color: "white", fontSize: 18,marginLeft:15 }}>{this.props.data.name}</Text>
                        <Text style={{color:"white",marginLeft:15,marginTop:5}}>{this.props.data.chaptersCount} Chapters | {this.props.data.topicsCount} Topics</Text>
                        </View>
                      </View>

                    </View>
                    <View style={{flex:0.3,justifyContent:"center",}}>
                    {this.props.data.image !== "null" ?
<Image source={{ uri: imageUrl + this.props.data.image }} style={{ width: 70, height: 70, resizeMode: "contain", marginRight: 10, }} />

: <Image source={require('../../assets/images/noimage.png')}
style={{ width: 70, height: 70, resizeMode: "contain", marginRight: 10, }} />}
                    </View>
                  </View>
                </View>
              

              </ImageBackground>
       <View style={{height:Platform.OS === 'android' ? windowHeight/1.3:windowHeight/1.35,width:windowWidth,backgroundColor:"white",alignSelf:"center",
       position:"absolute",bottom:0,borderTopRightRadius:30,borderTopLeftRadius:30}}>
        {this.state.spinner ? 
         <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
           <Text>Loading...</Text>
        </View> 
        :
        <ChapterComponent onBack={this.onBack.bind(this)} onFront={this.onFront.bind(this)} userData={this.state.userData} chapters={this.state.chaptersData} />}
      
       </View>
        </View>
        <View style={styles.footerview}>

          <Footer openControlPanel={this.openControlPanel} />
        </View>
      </View>
    </Drawer>
    )
  }
}
export default Chapters