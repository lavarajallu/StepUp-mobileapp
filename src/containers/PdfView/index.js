import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import styles from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
//import PDFView from 'react-native-view-pdf';
import Pdf from 'react-native-pdf';

import { Actions } from 'react-native-router-flux';
import { baseUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
//import { PdfView } from 'react-native-pdf-light';
const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
}
import {Dirs, FileSystem} from 'react-native-file-access';
var cachePath;
class PdfViewNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      pdfdata: '',
      padfpages: null,
      pdfpagesarray: [],
      page: null,
      inital: 0,
      analyticsData: {},
      token: "",
      isvisible: false,
      selectedPage:0,
      visibleItem:{}
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
          this.getanalytics(data, JSON.parse(token))
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
  getanalytics(user, token) {
    console.log("activityydddddd",this.props.data)
    var body = {
      user_id: user.reference_id,
      board_id: user.grade ? user.grade.board_id : null,
      grade_id: user.grade ? user.grade.reference_id : null,
      section_id: user.section ? user.section.reference_id : null,
      school_id: user.school ? user.school.reference_id : null,
      branch_id: user.grade ? user.grade.branch_id : null,
      page: "MyCourse_Documents",
      type: "mobile",
      subject_id: this.props.subjectData.reference_id,
      chapter_id: this.props.topicData.reference_id,
      topic_id: this.props.topicindata.reference_id,
      activity_id: this.props.data.reference_id,
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
          console.log(JSON.stringify(json));
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
  getActivityInfo(token) {
    const { data } = this.props
    const url = "http://65.1.123.182:3000/activities/info/" + data.reference_id
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then((response) => response.json())
      .then(async(json) => {

        const data = json.data;
        // alert(JSON.stringify(data))
        console.log("dkfldf", data[0])
        if (data) {
          var string = data[0].pdfpages
          var newarr = string.split(',');
          // console.log("newarr", newarr)
          // const url =  "https://smarttesting.s3.ap-south-1.amazonaws.com"+ data[0].url,
          // cachePath = await FileSystem.fetch(url, {path:  Dirs.CacheDir + '/name.pdf'});
          // console.log("dddd",cachePath)
          this.setState({
            pdfdata: data[0].url,
           
            pdfpagesarray: newarr,
            spinner: false,
            page: 3
          },()=>{
          
          })

        } else {
          alert(JSON.stringify(json.message))

        }
      }

      )
      .catch((error) => console.error(error))

  }
  onPageChanged() {

  }
  updateAnalytics() {
  //  alert("ddddt"+this.state.analyticsData.reference_id)
  var body = {
    activity_status : 1,
    video_played: 0,
    pdf_page: this.state.visibleItem.item,
    video_duration: 0
  }
  console.log("boddyy",body)
    var url = baseUrl + '/analytics/' + this.state.analyticsData.reference_id
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      },
      body: JSON.stringify(body)

    }).then((response) =>

      response.json())
      .then((json) => {

        if (json.data) {
          const data = json.data;
           console.log(JSON.stringify(json));
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
  onNext() {
    this.updateAnalytics()
    var newarray = this.props.smartres;
    var newobj = newarray[this.props.index + 1]
    var index = this.props.index
    //  alert(JSON.stringify(newobj))
    if (newobj) {
      if (newobj.type === 'YOUTUBE') {
        Actions.push('videoview', { index: index + 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata,from :this.props.from })
      } else if (newobj.type === 'VIDEO') {
        Actions.push('normalvideoview', { index: index + 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata,from :this.props.from })
      } else if (newobj.type === "PRE" || newobj.type === 'OBJ' || newobj.type === 'POST' || newobj.type === 'SUB') {
        Actions.push('preassesment', { index: index + 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      } else if (newobj.type === "PDF") {
        Actions.push('pdfview', { index: index + 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      } else if (newobj.type === "WEB") {
        Actions.push('weblinkview', { index: index + 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      } else if (newobj.type === "GAMES") {
        Actions.push('games', { index: index + 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      }
    } else {
      Actions.topicmainview({ data: this.props.topicindata, topicsdata: this.props.topicData, screen: "summary", subjectData: this.props.subjectData,from :this.props.from })
    }
  }
  onPrevious() {
    this.updateAnalytics()
    var newarray = this.props.smartres;
    var newobj = newarray[this.props.index - 1]
    var index = this.props.index
    // alert(JSON.stringify(newobj))
    if (newobj) {
      if (newobj.type === 'YOUTUBE') {
        Actions.push('videoview', { index: index - 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      } else if (newobj.type === 'VIDEO') {
        Actions.push('normalvideoview', { index: index - 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata,from :this.props.from })
      } else if (newobj.type === 'OBJ' || newobj.type === 'POST' || newobj.type === 'SUB') {
        Actions.push('preassesment', { index: index - 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata,from :this.props.from })
      } else if (newobj.type === "PDF") {
        Actions.push('pdfview', { index: index - 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata,from :this.props.from })
      } else if (newobj.type === "WEB") {
        Actions.push('weblinkview', { index: index - 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      } else if (newobj.type === 'PRE') {
        Actions.topicmainview({ data: this.props.topicindata, topicsdata: this.props.topicData, screen: "summary", subjectData: this.props.subjectData,from :this.props.from })
      } else if (newobj.type === "GAMES") {
        Actions.push('games', { index: index - 1, smartres: this.props.smartres, data: newobj, topicData: this.props.topicData, subjectData: this.props.subjectData, topicindata: this.props.topicindata ,from :this.props.from})
      }
    } else {
      Actions.topicmainview({ data: this.props.topicindata, topicsdata: this.props.topicData, screen: "summary", subjectData: this.props.subjectData ,from :this.props.from})
    }

  }

  onBack() {
    this.updateAnalytics()
    Actions.topicmainview({ type: "reset", data: this.props.topicindata, topicsdata: this.props.topicData, screen: "summary", subjectData: this.props.subjectData,from :this.props.from })
  }
  onPDFVIew(item){
    this.setState({
      selectedPage : item
    },()=>{
      this.setState({
        isvisible: true
       })
    })
  
  }
  renderItem({ item }) {

    console.log("0000000",item)
    const source = { uri: "https://smarttesting.s3.ap-south-1.amazonaws.com" + this.state.pdfdata , cache: true};
    
    return (
      <Pdf
      ref={(pdf) => { this.pdf = pdf; }}

      page={parseInt(item)}
      source={{ uri: "https://smarttesting.s3.ap-south-1.amazonaws.com" + this.state.pdfdata , cache: true}}
      //resourceType={resourceType}
      singlePage={true}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`number of pages: ${numberOfPages}`);
      }}
      onPageChanged={this.onPageChanged.bind(this)}
      onError={(error) => {
        console.log("ffffe",error);
      }}
      onPressLink={(uri) => {
        console.log(`Link presse: ${uri}`)
      }}
     spacing={5}
      style={{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.3,

      }} />

    )



  }
 
   onViewableItemsChanged = ({ viewableItems, changed }) => {

    this.setState({
      visibleItem: viewableItems[0]
    })
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  }
  render() {

    return (
      <>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={this.onBack.bind(this)}>
          <Image source={require("../../assets/images/left-arrow.png")}
            style={styles.backimage} /></TouchableOpacity>
        <View style={styles.mainsubview}>
          {this.state.spinner ? 
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

          <Text>Loading.....</Text></View>:
          <View style={{ flex: 1 }}>
            <FlatList data={this.state.pdfpagesarray} 
			renderItem={this.renderItem.bind(this)}
      onViewableItemsChanged={this.onViewableItemsChanged }
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50
      }}
			
			 showsHorizontalScrollIndicator={false}/>
       {/* <ScrollView>
       {this.state.pdfpagesarray.map((item,i)=>

            // <PdfView 
            // resizeMode={"contain"}
            // source={cachePath}
            // page={parseInt(item)} 
            // onError={(error)=>console.log("ffff",error)}/>
          
       
       
       )}
       </ScrollView> */}
      







          </View>}
        </View>
        <View style={styles.nextactivityview}>
          <TouchableOpacity onPress={this.onPrevious.bind(this)} style={styles.nextinner}>
            <Text style={styles.activitytext}>Previous Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
            <Text style={styles.activitytext}>Next Activity</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.subjectouter}>
          <Text style={{ color: "white", fontSize: 15, paddingHorizontal: 10 }}>{this.props.data.activity}</Text>
        </View>

       

      </View>
     {this.state.isvisible ?
     <View style={{position:"absolute",width:windowWidth,height:windowHeight,backgroundColor:"red",elevation:10}}>
          {/* <Pdf
          ref={(pdf) => { this.pdf = pdf; }}

          page={parseInt(this.state.selectedPage)}
          source={{uri: "https://smarttesting.s3.ap-south-1.amazonaws.com" + this.state.pdfdata , cache: true}}
          //resourceType={resourceType}
          singlePage={true}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={this.onPageChanged.bind(this)}
          onError={(error) => {
            console.log("ffffe",error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`)
          }}
          spacing={5}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

          }} /> */}
     </View>
     : null}
       </>
    )
  }
}

export default PdfViewNew;
