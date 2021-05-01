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
    TouchableOpacity
} from 'react-native';
import { colors } from "../../constants"
import { Actions } from 'react-native-router-flux';
//import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var FloatingLabel = require('react-native-floating-labels');
import TabNavigator from 'react-native-tab-navigator';
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import Dashboard from '../Dashboard';
import Notifications from '../Notifications';
import { Validations } from '../../helpers'
import Drawer from 'react-native-drawer'

class Main extends Component{
	constructor(props){
		super(props)
    this.state={
      selectedTab:"home"
    }
	}
	 closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  onmenu(){
    this.setState({
      selectedTab:"home"
    })
    this.openControlPanel()
  }
	render(){
		return(
      <Drawer
      type="overlay"
        ref={(ref) => this._drawer = ref}
         tapToClose={true}
         openDrawerOffset={100} 
          content={ <SideMenu

          closeControlPanel={this.closeControlPanel}/>}
        >
      <TabNavigator  
      tabBarStyle={{backgroundColor:'white', borderTopLeftRadius:25,borderTopRightRadius:25,borderWidth:0.5,
      borderColor:"lightgrey",
      shadowColor:'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,
   // elevation: 10
  }
  }
  sceneStyle={{ paddingBottom: 0 ,backgroundColor:"white",}}>
      <TabNavigator.Item
      tabStyle={{backgroundColor: this.state.selectedTab === 'menu' ? "lightgrey":"transparent",}}
        selected={this.state.selectedTab === 'menu'}
        renderIcon={() => <Image source={require("../../assets/images/menu.png")} style={{width:25,height:25,tintColor:colors.Themecolor}} />}
        renderSelectedIcon={() =><Image source={require("../../assets/images/menu.png")} 
        style={{width:25,height:25,tintColor:colors.Themecolor}}/>}
        onPress={this.onmenu.bind(this)}>
      { <Dashboard/>}
      </TabNavigator.Item>
      <TabNavigator.Item
      tabStyle={{backgroundColor: this.state.selectedTab === 'bell' ? "lightgrey":"transparent"}}
        selected={this.state.selectedTab === 'bell'}
        renderIcon={() => <Image  source={require("../../assets/images/bell.png")} style={{width:25,height:25,tintColor:colors.Themecolor}} />}
        renderSelectedIcon={() =><Image  source={require("../../assets/images/bell.png")}
        style={{width:25,height:25,tintColor:colors.Themecolor}}/>}
        onPress={() => this.setState({ selectedTab: 'bell' })}>
        { <View style={{backgroundColor:"white",flex:1}}/>}
      </TabNavigator.Item>
      <TabNavigator.Item
      tabStyle={{backgroundColor: this.state.selectedTab === 'home' ? "lightgrey":"transparent"}}
        selected={this.state.selectedTab === 'home'}
        renderIcon={() => <Image source={require("../../assets/images/home.png")} style={{width:25,height:25,tintColor:colors.Themecolor}} />}
        renderSelectedIcon={() =><Image source={require("../../assets/images/home.png")} 
        style={{width:25,height:25,tintColor:colors.Themecolor}}/>}
        onPress={() => this.setState({ selectedTab: 'home' })}>
        { <Dashboard/>}
      </TabNavigator.Item>
      <TabNavigator.Item
      tabStyle={{backgroundColor: this.state.selectedTab === 'notification' ? "lightgrey":"transparent"}}
        selected={this.state.selectedTab === 'notification'}
        renderIcon={() => <Image source={require("../../assets/images/notification.png")} style={{width:25,height:25,tintColor:colors.Themecolor}} />}
        renderSelectedIcon={() =><Image source={require("../../assets/images/notification.png")}
        style={{width:25,height:25,tintColor:colors.Themecolor}}/>}
        badgeText="1"
        onPress={() => this.setState({ selectedTab: 'notification' })}>
        { <Notifications title="tabs"/>}
      </TabNavigator.Item>
      <TabNavigator.Item
      tabStyle={{backgroundColor: this.state.selectedTab === 'calender' ? "lightgrey":"transparent"}}
        selected={this.state.selectedTab === 'calender'}
        renderIcon={() => <Image source={require("../../assets/images/calander.png")} style={{width:25,height:25,tintColor:colors.Themecolor}} />}
        renderSelectedIcon={() =><Image source={require("../../assets/images/calander.png")} 
        style={{width:25,height:25,tintColor:colors.Themecolor}}/>}
        onPress={() => this.setState({ selectedTab: 'calender' })}>
        { <View style={{backgroundColor:"white",flex:1}}/>}
      </TabNavigator.Item>
    </TabNavigator>
    </Drawer>
			)
	}
}
export default Main