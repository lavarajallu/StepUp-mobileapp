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
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as Progress from 'react-native-progress';

import { Validations } from '../../helpers'
import { weekdaysMin } from 'moment';
import { baseUrl,imageUrl } from "../../constants"
var imagesarray=[
	require('../../assets/images/dashboard/new/mathbg.png'),
	require('../../assets/images/dashboard/new/physicsbg.png'),
	require('../../assets/images/dashboard/new/chemistrybg.png'),
	require('../../assets/images/dashboard/new/biologybg.png')
]
const data = [
{
    name:"Number Systems",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
    bg: require('../../assets/images/dashboard/math_bg.png'),
},{
    name:"Algebra",
    reads:30,
    progress: 0.1,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
    bg: require('../../assets/images/dashboard/physics_bg.png'),
},{
    name:"Number Systems",
    reads:30,
    progress: 0.6,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
    bg: require('../../assets/images/dashboard/chemistry_bg.png'),
},{
    name:"Algebra",
    reads:30,
    progress: 0.2,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
    bg: require('../../assets/images/dashboard/math_bg.png'),
},{
    name:"Number Systems",
    reads:30,
    progress: 0.5,
    image: require('../../assets/images/yellowround.png'),
    insideimg: require('../../assets/images/math.png'),
    bg: require('../../assets/images/dashboard/Biology.png'),
},]
class ChapterComponent extends Component {
    constructor(props) {
        super(props)
    }
    onItem(item){
        this.props.onFront()
        Actions.push("topics",{data: item, subjectData: this.props.userData,screen:"chapters"})
    }
    onBack(){
        this.props.onBack()
    }
    renderItem({item,index}){
        console.log("ff",item)
        var colorsarray = imagesarray// ["#FFB13D","#5AC3FB","#E488FB","#88C400"];
	 var randomItem = colorsarray[Math.floor(Math.random()*colorsarray.length)];
		 var bgimage = randomItem
        // var bgimage = colorsarray[Math.floor(Math.random()*colorsarray.length)];
		// var newitem = colorsarray.splice(bgimage,1);
		// colorsarray.push(newitem);
        var percent = item.percent
        var percent = (item.percent)
		var color;
		if(percent > 80 ){
			color = "green"
		}else if (color< 50) {
			color = "red"
		}else{
			color = "orange"
		}
        item["color"] = this.props.userData.color
    return(
        //   <TouchableHighlight  underlayColor="transparent" activeOpacity={0.9}
        //   onPress={this.onItem.bind(this,item)} style={{marginTop:20}}>
          
        //   <ImageBackground source={bgimage}
		// 			 style={[styles.rectview]}>
        //             <View style={styles.subview}>
        //                 <View style={styles.topsubview}>
        //                 {item.image ? 
        //                     <Image source={{uri:url}} style={{alignSelf: "center",width:128/3,height:128/3,resizeMode:"cover"}}/>
                        
        //                 :<Image source={require('../../assets/images/noimage.png')}
        //                 style={{width:60,height:60,resizeMode:"contain"}}/>
        //                 }<Text style={styles.subjectname}>{item.name}</Text>
        //                 </View>
        //                 <View style={styles.bottomsubview}>
                            
        //                         <View style={styles.progressview}>
        //                             <View style={styles.progresstextview}>
        //                                 <Text style={styles.progresstext}>Progress</Text>
        //                                 <Text style={styles.progresstext}>{percent}%</Text></View>
        //                                 <View style={{marginTop:3}}>
        //                                  <Progress.Bar progress={percent/100} width={windowWidth/2.6} height={2} color={"lightgreen"}/>
        //                                  </View>
                
        //                                 </View> 

        //                     <View style={styles.countview}>
        //                         <View style={styles.innercountview}>
        //                             <Image source={require('../../assets/images/1.png')} style={[styles.iconview,{tintColor:"white"}]} />
        //                             <Text style={styles.icontext}>{item.topicsCount}</Text>
        //                         </View>
        //                          <View style={styles.innercountview}>
        //                             <Image source={require('../../assets/images/magnifier.png')} style={[styles.iconview,{tintColor:"white"}]} />
        //                             <Text style={styles.icontext}></Text>
        //                         </View>
        //                         </View>
        //                 </View>
        //             </View>
        //         </ImageBackground>
        //         </TouchableHighlight>

        <TouchableOpacity onPress={this.onItem.bind(this,item)} style={{borderWidth: 0, borderColor: "lightgrey",height:80,width:windowWidth/1.15,alignSelf:"center",
                backgroundColor: 'white', shadowColor: 'black',
            shadowOffset: { width: 0, height: 5 },
            marginVertical: 10,
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 10,}}>
           <View style={{flex:1,flexDirection:"row"}}>
               <View style={{flex:0.2,backgroundColor:this.props.userData.color,justifyContent:"center",alignItems:"center"}}>
               {/* {item.image !== "null" ? 
                 <Image source={{uri:imageUrl+item.image}} style={{width:"100%",height:"100%",resizeMode:"cover"}}/>
                        
                :<Image source={require('../../assets/images/noimage.png')}
                style={{width:60,height:60,resizeMode:"cover",alignSelf:"center"}}/>} */}
               </View>
               <View style={{flex:0.8,justifyContent:"center",paddingLeft:20}}>
                   <Text style={{color:"#2E2E2E",fontSize:10}}>CHAPTER {index+1}</Text>
                   <Text style={{color:"#2E2E2E",fontWeight:"600",fontSize:15}}>{item.name}</Text>
               </View>
           </View>
           <Progress.Bar progress={percent/100} width={windowWidth/1.15} height={5} color={color}
           unfilledColor={"lightgrey"} borderColor={"transparent"}/>
       </TouchableOpacity>

        )
}
    render() {
        const {userData,chapters} = this.props;
        const url = imageUrl+userData.image
        return (
            chapters.length > 0 ? 
            <View style={{flex:1,padding:20}}>
                   <FlatList data={chapters} 
                                renderItem={this.renderItem.bind(this)}
                                keyExtractor={(item)=>item.reference_id}
                                //numColumns={2} 
                                // showVerticalScrollIndicator={false}
                                />
                        
            </View> : 
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>No Chapters</Text>
            </View>
        )
    }
}
export default ChapterComponent