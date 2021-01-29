import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    FlatList,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ProgressCircle from 'react-native-progress-circle'
//import { BarChart } from 'react-native-charts'
import SummaryGraph from "../../components/SummaryGraph"
import { Validations } from '../../helpers'
import { colors } from "../../constants"
const data = [
   { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       result:"correct"},
 { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       result:"wrong"},
        { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       result:"correct"}

]
class PreSummary extends Component {
    constructor(props) {
        super(props);
        this.state={
            numberofques: 5,
            correctanswer:3,
            wronganswer:2
        }
    }
    onBack(){
        Actions.pop()
    }
    onNext(){
        Actions.push('topicindetails')
    }
    render() {
        let stars = [];
		// Loop 5 times
		for (var i = 1; i <= 5; i++) {
			// Set the path to filled stars
			let path = require('../../assets/images/arrow.png');
            let style={width:157/3.5,height:77/3.5,tintColor: colors.Themecolor}
			// If ratings is lower, set the path to unfilled stars
			if (i > this.state.correctanswer) {
				path = require('../../assets/images/arrow_gray.png');
                style={width:157/3.5,height:77/3.5}
			}
			// Push the Image tag in the stars array
			stars.push((<Image style={style} source={path} />));
            var percent = (this.state.correctanswer / this.state.numberofques)*100
		}
        return (
            <View style={styles.mainView}>
                <TouchableOpacity>
                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                    </TouchableOpacity>
                <View style={styles.mainsubview}>
                    <View 
                    style={{flex:0.4,
                         shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            elevation: 10,
                            shadowColor: 'lightgrey',
                        marginTop:40,borderRadius: 10,
                        backgroundColor: 'white',justifyContent:'space-around',marginHorizontal: 20, }}>
                    <View style={{padding:5,marginHorizontal:30,}}>
                        <View style={{padding:10,flexDirection:"row",justifyContent:"space-between"}}>
                        { stars }
                        </View>
                    </View>
                    <View style={{justifyContent: 'center',alignItems:"center" }}>
                    <ProgressCircle
                        percent={percent}
                        radius={30}
                        borderWidth={5}
                        color={colors.Themecolor}
                        shadowColor="#999"
                        bgColor="white"
                    >
                    <Text style={{ fontSize: 18 }}>{this.state.correctanswer+'/'+this.state.numberofques }</Text>
                </ProgressCircle>
                </View>
                <View style={{flexDirection:"row",marginHorizontal:30,justifyContent:"space-around"}}>
                 <View style={{flexDirection:"row",justifyContent:"center"}}>
                 <Image source={require("../../assets/images/right.png")} style={{width:79/3,height:79/3,marginRight:10}}/>
                 <Text style={{fontSize:15,alignSelf:"center"}}>{this.state.correctanswer} Correct</Text></View>
                 <View style={{flexDirection:"row",justifyContent:"center"}}>
                 <Image source={require("../../assets/images/wrong.png")} style={{width:79/3,height:79/3,marginRight:10}}/>
                 <Text style={{fontSize:15,alignSelf:"center"}}>{this.state.wronganswer} Wrong</Text></View>
                </View>
                 </View>
                    <View style={{flex:0.55,shadowOpacity: 1,
                            shadowRadius: 5,
                            elevation: 10,
                            shadowColor: 'lightgrey',marginHorizontal: 20,
                            borderRadius:10,marginTop:20,backgroundColor: 'white'}}>
                       <SummaryGraph/>
                    
                    </View>
                </View>
                <View style={styles.nextactivityview}>
                    <TouchableOpacity onPress={this.onNext.bind(this)} style={styles.nextinner}>
                    <Text style={styles.activitytext}>Next Activity</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:18}}>Summary</Text>
                </View>
            </View>
        )
    }
}
export default PreSummary