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
import {colors } from '../../constants'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Drawer from 'react-native-drawer'
import styles from './styles'
import Footer from '../../components/Footer'
import SideMenu from "../../components/SideMenu"
import HeatMapComponent from '../../components/HeatMapComponent'

class HeatMap extends Component {
    constructor(props) {
        super(props)
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
                                <Text style={styles.topHead}>Knowledge Map</Text>
                                </View>
                                <View style={styles.toprightview}>
                                
                                </View>
                            </View>
                    </View>
                </View>
                
                <View style={{flex:0.92,}}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.92}}>
                        <HeatMapComponent/>
                        </View>
                        <View style={{flex:0.08}}>
                        <Footer openControlPanel={this.openControlPanel} value="heatmap"/>
                        </View>
                    </View>
                 
                 </View>
               
            </View>
            </Drawer>
        )
    }
}
export default HeatMap