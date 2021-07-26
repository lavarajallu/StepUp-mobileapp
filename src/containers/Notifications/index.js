import React, { Component } from 'react';
import {
    SafeAreaView,
    BackHandler,
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
import NotifyComponent from '../../components/NotifyComponent'

class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state={
            notifications:[],
        }
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
      componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			this.backAction
		);
      }
      backAction = ()=>{
        Actions.dashboard({type:"reset"})
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
                                <Text style={styles.topHead}>Notifications</Text>
                                </View>
                                <View style={styles.toprightview}>
                                <Text style={styles.counttext}>{this.state.notifications.notification_count}</Text>
                            <Text style={styles.inboxText}>Inbox</Text>
                            <Image source={require("../../assets/images/refer/delete.png")}
                            style={styles.deleteButton}/>
                                </View>
                            </View>
                    </View>
                </View>
                {this.state.notifications.length === 0 ?
                <View style={{flex:0.92,}}>
                <View style={{flex:1}}>
                    <View style={{flex:0.92}}>
                    <ImageBackground source={require("../../assets/images/refer/notilogo.png")}
                        style={styles.referlogo}>
                            <Image source={require('../../assets/images/refer/notify.png')} style={styles.logoicon}/>
                        </ImageBackground>
                      <Text style={styles.headText}>Can’t find notifications</Text>
                      <Text style={styles.subtext}>Let’s explore more content around you.</Text>
                      <TouchableOpacity onPress={()=> Actions.dashboard({type:"reset"})}>
                       <LinearGradient colors={["#A28FB0","#543361","#543361"]}
                style={styles.gradientstyles}>
                   <Text style={styles.buttonText}>Back to Feed</Text>
                   </LinearGradient>
                   </TouchableOpacity>
                    </View>
                    <View style={{flex:0.08}}>
                    <Footer openControlPanel={this.openControlPanel} value="notifications" notification_count={this.state.notifications.notification_count}/>
                    </View>
                </View>
             
             </View>
                 :
                <View style={{flex:0.92,}}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.92}}>
                        <NotifyComponent  data={this.state.notifications.notificcation_data}/>
                        </View>
                        <View style={{flex:0.08}}>
                        <Footer openControlPanel={this.openControlPanel} value="notifications" notification_count={this.state.notifications.notification_count}/>
                        </View>
                    </View>
                 
                 </View>
                }
            </View>
            </Drawer>

        )
    }
}
export default Notifications