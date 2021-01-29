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


class Loader extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
            <View style={{flex: 1,justifyContent: 'center',alignItems:"center",backgroundColor: 'white' }}>
			<Image source={require('../../assets/images/step-up2.gif')} style={{width:300,height:280}}/>
            </View>
			)
	}
}
export default Loader