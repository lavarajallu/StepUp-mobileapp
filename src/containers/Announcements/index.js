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
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import Drawer from 'react-native-drawer'
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import AnnounceComponent from '../../components/AnnounceComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, colors, imageUrl } from "../../constants"
import Modal from 'react-native-modal';
import { G } from 'react-native-svg';
import moment from 'moment'

class Announcements extends Component {
    constructor(props) {
        super(props)
        this.state={
            token:"",
            announcementsData: null,
            isvisible: false,
            selectedItem:{},
            datacount:0,
            loading: true,
            notifications:{
                notification_count: 5,
                
                notificcation_data:[
                    {
                        title: "Today",
                        data: [{
                            "name": "You have Live class at 08:30 pm",
                            "description": "description",
                            "time": "10:30 am",
                            "new": true,
                        }, {
                            "name": "You have Live class at 02:30 pm",
                            "description": "description",
                            "time": "4:30 am",
                            "new": false,
                        }]
                    },
                    {
                        title: "Yesterday",
                        data: [{
                            "name": "You have Live class at 07:30 pm",
                            "description": "description",
                            "time": "10:30 am",
                            "new": true,
                        }, {
                            "name": "You have Live class at 02:30 pm",
                            "description": "description",
                            "time": "4:30 am",
                            "new": false,
                        }, {
                            "name": "You have Live class at 05:30 pm",
                            "description": "description",
                            "time": "5:30 am",
                            "new": false,
                        }]
                    },
                ]
            },
        }
    }
    async componentDidMount(){
        const value = await AsyncStorage.getItem('@access_token')
        if(value !== null) {
            console.log("vv",value)
           this.setState({token: JSON.parse(value)},()=>this.getAnnouncements())
        }
    }
    reducer = (acc, cur) => {
        const item = acc.find((x) => x.from_date === cur.from_date);
        console.log("acccc",item)
        if (item) {
          item.data.push(cur);
        } else {
          acc.push({
            from_Date: cur.from_date,
            data: [cur]
          });
        }
        
        return acc;
       
      };
    getAnnouncements()
{
        console.log("ggg",baseUrl+'/announcements/student/logs')
        fetch(baseUrl+'/announcements/student/logs', {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'token': this.state.token
                 }
                 }).then((response) =>
                 
                  response.json())
                 .then((json) =>{
                   console.log("announcemnets....",json)
                   // var json.data = json.data.data
                     if(json.data){
                         if(json.data.data){

                         if(json.data.data.length > 0){
                            console.log("announcemnets",json.data.data)
                        
                            var obj;
                            var newdata=[]
                            var finalarray =[]
                            //  {json.data.map((res,i)=>{
                            //      if(finalarray.length === 0){
                             
                            //          var newobjarray = [];
                            //          newobjarray.push(res)
                            //          var obj = {title: res.from_date,data: newobjarray}
                            //          finalarray.push(obj)
                            //      }else{
                            //        var count = 0
                                   
                            //        finalarray.map((newrews, j) => {
                                     
                            //          if (newrews.title === res.from_date) {
                            //            newrews.data.push(res);
                            //         //   count = 0
                            //          } else {
                            //            count =  1
                            //          }
                            //        });
                            //        if(count !== 0){
                            //          var newobjarray = [];
                            //          newobjarray.push(res);
                            //          var obj = { title: res.from_date, data: newobjarray };
                            //          finalarray.push(obj);
                            //        }
                                  
                            //      }
                            //  })}
                            //  console.log("finalarray",finalarray)
                            let localeData = json.data.data.map((item) => {
                                item.key = moment(item.from_date).format('YYYY-MM-DD')
                                return item
                              });
                              
                              // Sort data by datetime
                              localeData.sort((a,b) => {
                                return moment(b.from_date).unix() - moment(a.from_date).unix()
                              })
                              
                              // Reduce data for SectionList
                              const groupedData = localeData.reduce((accumulator, currentValue, currentIndex, array, key = currentValue.key) => {
                                  const keyObjectPosition = accumulator.findIndex((item) => item.key == key)
                                  if (keyObjectPosition >= 0) {
                                    accumulator[keyObjectPosition].data.push(currentValue)
                                    return accumulator    
                                  } else {
                                    return accumulator.concat({ data: [currentValue], key: key })
                                  }
                              }, [])
                              
                              console.log(",,,,,,",JSON.stringify(groupedData))

                            var newarray = [{
                                title:"Today",
                                data:json.data
   
                            }]
                            this.setState({
                               announcementsData:groupedData,loading: false,datacount:json.data.length
                           })
                          console.log("newrr",newarray)
                         }else{
                            this.setState({
                                announcementsData: [],loading: false
                            })
                         }
                        }
                        
                     }else{
                         console.log("ffff",json)
                        this.setState({
                            announcementsData: [],loading: false
                        })
                     }
                    }
                  
                 )
                 .catch((error) => console.error(error))
             //Actions.push('boards')
}

    onBack(){
        Actions.dashboard({type:"reset"})
    }
    closeControlPanel = () => {
        this._drawer.close()
      };
      openControlPanel = () => {
        this._drawer.open()
      };
      onBacktoFeed(){
          Actions.dashboard({type:"reset"})
      }
      onItemPress(item){
          //alert(JSON.stringify(item))
          this.setState({
              selectedItem: item
          },()=>{
             
               if(item.is_read){
                this.setState({
                    isvisible:true
           })
               }else{
                console.log("ggg",this.state.selectedItem)
                this.setState({
                    isvisible:true
           })
                var body = {
                  
                      "announcement_id" : item.reference_id,
                      "is_read" : true 
                  
                }
              fetch(baseUrl+'/announcements/student/logs', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'token': this.state.token
                  },
                  body:JSON.stringify(body)
                  }).then((response) =>
                  
                   response.json())
                  .then((json) =>{
                     console.log("isread....",json)
                      
                     
                          this.getAnnouncements()
                          this.setState({loading: true})
                     
                     }
                   
                  )
                  .catch((error) => console.error(error))
               }
               
                    
            //  }
            
         })
          
      }
    render() {
        return (
            <Drawer
			type="overlay"
                ref={(ref) => this._drawer = ref}
                 tapToClose={true}
                 openDrawerOffset={0.25} 
                content={ <SideMenu closeControlPanel={this.closeControlPanel}/>}
                >         
            <View style={styles.mainView}>
                <View style={styles.topView}>
                    <View
                        style={styles.topShadow}>
                            <View style={styles.topsubview}>
                                <View style={styles.topleftview}>
                                    
                                <TouchableOpacity onPress={this.onBack.bind(this)}>
                            <Image source={require('../../assets/images/refer/back.png')} style={styles.backIcon} />
                            </TouchableOpacity>
                                </View>
                                <View style={styles.topmiddleview}>
                                <Text style={styles.topHead}>Announcements</Text>
                                </View>
                                <View style={styles.toprightview}>
                                <Text style={styles.counttext}>{this.state.datacount}</Text>
                            <Text style={styles.inboxText}>Inbox</Text>
                            <Image source={require("../../assets/images/refer/delete.png")}
                            style={styles.deleteButton}/>
                                </View>
                            </View>
                    </View>
                </View>
                {this.state.loading ? 

                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Loading...</Text>
                </View>
             
                 : 

                this.state.announcementsData.length === 0 ?
                <View style={styles.bottomView}>
                     <View style={{flex:1}}>
                        <View style={{flex:0.92,alignItems:"center"}}>
                        <ImageBackground source={require("../../assets/images/refer/notilogo.png")}
                        style={styles.referlogo}>
                            <Image source={require('../../assets/images/refer/notify.png')} style={styles.logoicon}/>
                        </ImageBackground>
                      <Text style={styles.headText}>Can’t find notifications</Text>
                      <Text style={styles.subtext}>Let’s explore more content around you.</Text>
                      
                       <LinearGradient colors={["#A28FB0","#543361","#543361"]}
                style={styles.gradientstyles}>
                    <TouchableOpacity onPress={this.onBacktoFeed.bind(this)} >
                   <Text style={styles.buttonText}>Back to Feed</Text></TouchableOpacity>
                   </LinearGradient>
                        </View>
                        <View style={{flex:0.08}}>
                        <Footer openControlPanel={this.openControlPanel} value="bell"/>
                        </View>
                    </View>
                   
                </View> :
                <View style={{flex:0.92,}}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.92}}>
                        <AnnounceComponent onItemPress={this.onItemPress.bind(this)}  data={this.state.notifications.notificcation_data} newdata={this.state.announcementsData} />
                        </View>
                        <View style={{flex:0.08}}>
                        <Footer openControlPanel={this.openControlPanel} value="bell"/>
                        </View>
                    </View>
                 
                 </View>
                }
            </View>
            <Modal isVisible={this.state.isvisible}>
            <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15,width:windowWidth/1.2,height:"60%"}}>
            <View style={{flex:1,justifyContent:"space-around",alignItems:"center"}}>
              <Text style={{fontSize:20,color:colors.Themecolor}}>{this.state.selectedItem.title}</Text>
              <View style={{width:"100%",height:1,backgroundColor:colors.Themecolor}}/>
                <Text style={{fontSize:15,color:colors.Themecolor,marginHorizontal:20,paddingVertical:10}}>{this.state.selectedItem.description}</Text>
                <View>
                    <Text>From Date:  {this.state.selectedItem.from_date}</Text>
                    <Text style={{marginTop:10}}>To Date:   {this.state.selectedItem.to_date}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.setState({isvisible:false})} style={{paddingVertical:10,paddingHorizontal:30,backgroundColor:colors.Themecolor}}>
                    <Text style={{color:"white"}}>Close</Text>
                </TouchableOpacity>
            </View>
           
            </View>
      </Modal>
            </Drawer>

        )
    }
}
export default Announcements