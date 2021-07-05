import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import styles from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
//import PDFView from 'react-native-view-pdf';
import Pdf from 'react-native-pdf';
import { PdfView } from 'react-native-pdf-light';
import { Actions } from 'react-native-router-flux';
import { baseUrl, imageUrl } from "../../constants"
import Snackbar from 'react-native-snackbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { WebView } from 'react-native-webview';

import Modal from 'react-native-modal';
const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
}
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
      visibleItem:{},
      error: false,
      notesdata:"",
      ispdf: false,
      ishtml: false,
      typedata:""
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

    console.log("analyticsss........", body)
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
          console.log("analyticsserror",JSON.stringify(json.message))
        }
      }

      )
      .catch((error) => console.error(error))
  }
  getActivityInfo(token) {
    var url;
    const { data } = this.props
    if(this.props.data.type === 'HTML5'){
      url = baseUrl+"/activities/info/" + data.reference_id
    }else{
     url = baseUrl+"/activities/forStudent/"+data.reference_id//baseUrl+"/activities/info/" + data.reference_id
    }
    console.log("urllll",url)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then((response) => response.json())
      .then(async(json) => {

       
         console.log("dataaa.....a",json)
        if (json.data) {
          const data = json.data;
          var url;
          if(this.props.data.type === 'HTML5'){
            url = data[0].url;
          }else{
            url = data.url;
          }
          
          console.log("urlurl",url)
          var newdata = url.split(".")
       //  alert(JSON.stringify(newdata[newdata.length-1]))
          if(newdata[newdata.length-1] === 'pdf'){
            var string = data.pdfpages
             var newarr = string.split(',');
         
              this.setState({
                pdfdata: data.url,
                  ispdf: true,
                pdfpagesarray: newarr,
                spinner: false,
                page: 3,
                typedata: newdata[newdata.length-1],
                index: 0
              },()=>{
                    console.log("newrrrr",newarr)
              })
          }else if (newdata[newdata.length-1] === 'html'){
            this.setState({
              notesdata: data[0].url,
              ishtml: true,
              spinner: false,
              typedata: newdata[newdata.length-1],
            })
          }else{
            this.setState({
              
              spinner: false
            })
          }
          // var string = data.pdfpages
          // var newarr = string.split(',');
         
          // this.setState({
          //   pdfdata: data.url,
           
          //   pdfpagesarray: newarr,
          //   spinner: false,
          //   page: 3,
          //   index: 0
          // },()=>{
          //       console.log("newrrrr",newarr)
          // })

        } else {
          console.log("errorororrrdata",json.message)
         // alert(JSON.stringify(json.message))

        }
      }

      )
      .catch((error) => console.error(error))

  }
  onPageChanged() {

  }
  updateAnalytics() {
   console.log("update....."+this.state.pdfpagesarray[this.state.index], "fffff    ",this.state.index,"b    ",  this.state.pdfpagesarray)
  var body = {
    activity_status : 1,
    video_played: 0,
    pdf_page: this.state.pdfpagesarray[this.state.index],
    video_duration: 0
  }
  if(this.state.type === 'pdf'){

  
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
  }else{
   // alert(this.state.typedata)
    var url = baseUrl + '/analytics/' + this.state.analyticsData.reference_id
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }

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
  console.log("boddyy",body) 
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
      } else if (newobj.type === "PDF" || newobj.type === "HTML5") {
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
      } else if (newobj.type === "PDF" || newobj.type === "HTML5") {
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
  
   onViewableItemsChanged = ({ viewableItems, changed }) => {

    this.setState({
      visibleItem: viewableItems[0]
    })
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  }
  onPrevIndex(){
    var newindex = this.state.index-1
    this.setState({
      index : newindex
    },()=>console.log("preee",this.state.index))
  }
  onNextIndex(){
    var newindex = this.state.index+1
    this.setState({
      index : newindex
    },()=>console.log("nexttt",this.state.index))
  }
  render() {
    console.log("vv",imageUrl + this.state.pdfdata)
    const { topicindata} = this.props
    return (
      <>
      <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}

      style={{width:"100%",height:"100%",backgroundColor:topicindata.color}} opacity={0.5}>
        <View style={{flex:1}}>
          <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity>
             
                <Text style={{ color: "white", fontSize: 18     ,marginLeft:10}}>{"Notes"}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View>
          <View style={{flex:0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
          {this.state.spinner ? 
           <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

           <Text>Loading.....</Text></View>:

           this.state.ispdf ? 
           <View style={{ flex: 1 }}>
         
<View style={{flex:0.95}}>
 <Pdf
      ref={(pdf) => { this.pdf = pdf; }}

      page={parseInt(this.state.pdfpagesarray[this.state.index])}
      source={{ uri: imageUrl + this.state.pdfdata}}
      //resourceType={resourceType}
      singlePage={true}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`number of pages: ${numberOfPages}`);
      }}
      onPageChanged={this.onPageChanged.bind(this)}
      onError={(error) => {
        console.log("ffffe",error);
        this.setState({
          error: true
        })
      }}
      onPressLink={(uri) => {
        console.log(`Link presse: ${uri}`)
      }}
     //spacing={5}
      style={{
        flex: 1,
        width:"100%",
        height: "100%",
        

      }} /> 
      </View>
      <View style={{flex:0.05,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
      {this.state.index === 0  ? <View style={{flex:0.5}}/> :
         <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-start"}}>
      <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
        justifyContent:"center",alignItems:"center"}} onPress={this.onPrevIndex.bind(this)}>
             <Text style={{ textAlign:"center",fontSize:13,color:topicindata.color}}>Previous</Text>
                 </TouchableOpacity>
                 </View>
  }
  <Text style={{color:topicindata.color,fontSize:15}}>Page {this.state.index+1} of {this.state.pdfpagesarray.length}</Text>
  {this.state.index + 1 === this.state.pdfpagesarray.length ?  <View style={{flex:0.5}}/>  :
   <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-end"}}>
                 <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
        justifyContent:"center",alignItems:"center"}} onPress={this.onNextIndex.bind(this)}>
             <Text style={{ textAlign:"center",fontSize:13,color:topicindata.color}}>Next</Text>
                 </TouchableOpacity></View>}
      </View> 

      </View>:
      this.state.ishtml ? 
      
      <WebView
                                        style={{}}
                                        source={{ uri: imageUrl+this.state.notesdata }}
                                        mixedContentMode="always"
                                        allowsInlineMediaPlayback='true'
                                        userAgent="Mozilla/5.0 (Linux; Android 9; Redmi Note 8 Build/PKQ1.190616.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Mobile Safari/537.36"
                                    />
: null }
      
      
    
          </View>
          <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
          
          <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
        justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
             <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Previous Activity</Text>
                 </TouchableOpacity>
       
                 <TouchableOpacity style={{ height:30,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
        justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
             <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Next Activity</Text>
                 </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>

    {/* <View style={{position:"absolute",height:44,backgroundColor:topicindata.color,paddingHorizontal:20,alignSelf:"center",
    borderRadius:20,top: Platform.OS === 'android' ? 60 : 100 ,justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white",fontSize:17}}>{this.props.data.activity}</Text>
        </View> */}
</>
    //   <>
    //   <View style={styles.mainView}>
    //     <TouchableOpacity onPress={this.onBack.bind(this)}>
    //       <Image source={require("../../assets/images/left-arrow.png")}
    //         style={styles.backimage} /></TouchableOpacity>
    //     <View style={styles.mainsubview}>
    //       {this.state.spinner ? 
    //       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

    //       <Text>Loading.....</Text></View>:
    //       <View style={{ flex: 1 }}>
    //         <FlatList data={this.state.pdfpagesarray} 
		// 	renderItem={this.renderItem.bind(this)}
    //   onViewableItemsChanged={this.onViewableItemsChanged }
    //   viewabilityConfig={{
    //     itemVisiblePercentThreshold: 50
    //   }}
			
		// 	 showsHorizontalScrollIndicator={false}/>
    //    {/* <ScrollView>
    //    {this.state.pdfpagesarray.map((item,i)=>

    //         // <PdfView 
    //         // resizeMode={"contain"}
    //         // source={cachePath}
    //         // page={parseInt(item)} 
    //         // onError={(error)=>console.log("ffff",error)}/>
          
       
       
    //    )}
    //    </ScrollView> */}
      







    //       </View>}
    //     </View>
    //     <View style={styles.nextactivityview}>
    //       <TouchableOpacity onPress={this.onPrevious.bind(this)} style={styles.nextinner}>
    //         <Text style={styles.activitytext}>Previous Activity</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
    //         <Text style={styles.activitytext}>Next Activity</Text>
    //       </TouchableOpacity>

    //     </View>
    //     <View style={styles.subjectouter}>
    //       <Text style={{ color: "white", fontSize: 15, paddingHorizontal: 10 }}>{this.props.data.activity}</Text>
    //     </View>

       

    //   </View>
    //  {this.state.isvisible ?
    //  <View style={{position:"absolute",width:windowWidth,height:windowHeight,backgroundColor:"red",elevation:10}}>
    //       {/* <Pdf
    //       ref={(pdf) => { this.pdf = pdf; }}

    //       page={parseInt(this.state.selectedPage)}
    //       source={{uri: imageUrl + this.state.pdfdata , cache: true}}
    //       //resourceType={resourceType}
    //       singlePage={true}
    //       onLoadComplete={(numberOfPages, filePath) => {
    //         console.log(`number of pages: ${numberOfPages}`);
    //       }}
    //       onPageChanged={this.onPageChanged.bind(this)}
    //       onError={(error) => {
    //         console.log("ffffe",error);
    //       }}
    //       onPressLink={(uri) => {
    //         console.log(`Link presse: ${uri}`)
    //       }}
    //       spacing={5}
    //       style={{
    //         flex: 1,
    //         width: Dimensions.get('window').width,
    //         height: Dimensions.get('window').height,

    //       }} /> */}
    //  </View>
    //  : null}
    //    </>
    )
  }
}

export default PdfViewNew;
