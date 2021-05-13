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
import { baseUrl, imageUrl } from "../../constants"


class Announcements extends Component {
    constructor(props) {
        super(props)
        this.state={
            token:"",
            announcementsData: null,
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
            console.log('val',value)
           this.setState({token: JSON.parse(value)},()=>this.getAnnouncements())
        }
    }
    getAnnouncements()
{
        console.log(baseUrl+'/announcements/student/logs')
        console.log(this.state.token)
        fetch(baseUrl+'/announcements/student/logs', {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'token': this.state.token
                 }
                 }).then((response) =>
                 
                  response.json())
                 .then((json) =>{
                  //  console.log("announcemnets....",json)
                     
                     if(json.data){
                         console.log("announcemnets",json.data)
                        
                         var obj;
                         var newdata=[]
                         var finalarray =[]
                          {json.data.map((res,i)=>{
                              if(finalarray.length === 0){
                                console.log("if")
                                  var newobjarray = [];
                                  newobjarray.push(res)
                                  var obj = {title: res.from_date,data: newobjarray}
                                  finalarray.push(obj)
                              }else{
                                 
                                var count = 0
                                finalarray.map((newrews, j) => {
                                  
                                  if (newrews.title === res.from_date) {
                                   
                                    newrews.data.push(res);
                                  } else {
                                    count =  1
                                  }
                                });
                                if(count !== 0){
                                  console.log("fila,", res);
                                  var newobjarray = [];
                                  newobjarray.push(res);
                                  var obj = { title: res.from_date, data: newobjarray };
                                  finalarray.push(obj);
                                }
                               
                              }
                          })}
                          console.log("finalarray",finalarray)

                         var newarray = [{
                             title:"Today",
                             data:json.data

                         }]
                         this.setState({
                            announcementsData:finalarray,loading: false,datacount:json.data.length
                        })
                       console.log("newrr",newarray)
                     }else{
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
        Actions.pop()
    }
    closeControlPanel = () => {
        this._drawer.close()
      };
      openControlPanel = () => {
        this._drawer.open()
      };

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
                                <Text style={styles.topHead}>Notifications</Text>
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
                    <ImageBackground source={require("../../assets/images/refer/notilogo.png")}
                        style={styles.referlogo}>
                            <Image source={require('../../assets/images/refer/notify.png')} style={styles.logoicon}/>
                        </ImageBackground>
                      <Text style={styles.headText}>Can’t find notifications</Text>
                      <Text style={styles.subtext}>Let’s explore more content around you.</Text>
                       <LinearGradient colors={["#A28FB0","#543361","#543361"]}
                style={styles.gradientstyles}>
                   <Text style={styles.buttonText}>Back to Feed</Text>
                   </LinearGradient>
                </View> :
                <View style={{flex:0.92,}}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.92}}>
                        <AnnounceComponent  data={this.state.notifications.notificcation_data} newdata={this.state.announcementsData} />
                        </View>
                        <View style={{flex:0.08}}>
                        <Footer openControlPanel={this.openControlPanel} value="bell"/>
                        </View>
                    </View>
                 
                 </View>
                }
            </View>
            </Drawer>

        )
    }
}
export default Announcements