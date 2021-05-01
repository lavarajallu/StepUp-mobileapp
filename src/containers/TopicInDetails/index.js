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
import styles from "./styles"
import { Actions } from 'react-native-router-flux';
const data={
	text:"The collections of all rational numbers and irrational numbers together from collection eal numbers.This collection is donated by R.Every real number is either a rational number or an irrational number. thus, a real number which is not rational is a irrational number.Look at the diagram to know the various numbers"
}
class TopicInDetails extends  Component{
    onNext(){
        Actions.push('videoview')
    }
	render(){
		return(
			    <View style={styles.mainView}>

                {/*<Image source={require("../../assets/images/left-arrow.png")}
                                    style={styles.backimage} />*/}
                <View style={styles.mainsubview}>
                	<View style={{flex:1}}>
                	<ScrollView>
                	 <Text style={{fontSize: 20,margin: 30}}>{data.text}</Text>
                  <View
                  style={{padding:10,shadowColor:'black',
					    shadowOffset: { width: 0, height: 5 },
					    marginHorizontal: 20,
					    shadowOpacity: 1,
					    shadowRadius: 5,
					    elevation: 10,backgroundColor: 'white',borderRadius: 10,justifyContent:"center",alignItems:"center"}}>
                  <Image source={require("../../assets/images/sample.png")} style={{width:350/2,height:376/2}}/></View>
                 <Text style={{fontSize: 20,margin: 30}}>{data.text}</Text>
                	</ScrollView>
                	</View>
                </View>
                 <View style={styles.nextactivityview}>
                    <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
                    <Text style={styles.activitytext}>Next Activity</Text>
                    </TouchableOpacity>

                </View>
                 <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:18}}>Introduction</Text>
                </View>
            </View>
			)
	}
}

export default TopicInDetails;
