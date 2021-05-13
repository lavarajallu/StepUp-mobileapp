import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    FlatList,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import Drawer from 'react-native-drawer'
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import EventCalendar from 'react-native-events-calendar'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
let { width } = Dimensions.get('window')
import moment from 'moment'
const events = [
    { start: '2021-05-10 09:30:00', end: '2021-05-10 10:30:00', title: 'Physics Live Class', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-05-10 11:30:00', end: '2021-05-10 12:30:00', title: 'Maths Live Class', summary: '3412 Piedmont Rd NE, GA 3032' },
    
]
class CalendarNew extends Component {
    constructor(props) {
        super(props)
        this.state={
            basicview: true
        }
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

      _eventTapped(event) {
        alert(JSON.stringify(event));
      }
      basicview(){
          this.setState({
            basicview: true
          })
      }

      renderItem({item}){
         return(
             <View style={{padding:20,backgroundColor:"red",margin:10,}}>
                 <View style={{flex:1,flexDirection:"row"}}>
                     <View style={{flex:0.2,justifyContent:"center",}}>
                         <View style={{height:50,width:50,borderRadius:20,backgroundColor:"lightpink",justifyContent:"center",alignItems:"center"}}>
                             <Text>{"SUN"}</Text>
                             <Text>11</Text>
                         </View>
                     </View>
                     <View style={{flex:0.8,justifyContent:"center",}}>
                         <Text>{item.title}</Text>
                         <Text>{item.summary}</Text>
                     </View>
                 </View>
             </View>
         )
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
                                    {this.props.title === 'menu' ? 
                                <TouchableOpacity onPress={this.onBack.bind(this)}>
                            <Image source={require('../../assets/images/refer/back.png')} style={{
                                width:20,height:20,tintColor:"black"
                            }} />
                            </TouchableOpacity>: null}
                                </View>
                                <View style={styles.topmiddleview}>
                                <Text style={styles.topHead}>Calendar</Text>
                                </View>
                                <View style={styles.toprightview}>
                                 <TouchableOpacity onPress={this.basicview.bind(this)}>
                                     <Text>Basic View</Text>
                                 </TouchableOpacity>
                                </View>
                            </View>
                    </View>
                </View>
               
                <View style={{flex:0.92,}}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.92}}>
                            {this.state.basicview ?
                            <View style={{flex:1}}>
                               
                            {/* <Calendar
                            // Collection of dates that have to be marked. Default = {}
                            
                            markedDates={{
                              '2021-05-10': {selected: true, marked: true, selectedColor: 'blue'},
                              '2021-05-11': {selected: true, marked: true, selectedColor: 'blue'}
                            }}
                          /> */}
                          <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2021-05-10': [{name: 'item 1 - any js object'}],
    '2021-05-11': [{name: 'item 2 - any js object', height: 80}],
    
  }}/>
                         
                          {/* <View style={{flex:1,}}>
                              <Text>Events List</Text>
                              <FlatList renderItem={this.renderItem.bind(this)} data={events}/>
                              </View> */}
                              </View>
                            : 
                        <EventCalendar
                        eventTapped={this._eventTapped.bind(this)}
                        events={events}
                        width={width}
                        //initDate={'2017-09-08'}
                        initDate={moment(new Date()).format("YYYY-MM-DD")}
                        /> } 
                        </View>
                        <View style={{flex:0.08}}>
                        <Footer openControlPanel={this.openControlPanel} value="calendar"/>
                        </View>
                    </View>
                 
                 </View>
                
            </View>
            </Drawer>

        )
    }
}
export default CalendarNew