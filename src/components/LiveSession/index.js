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
const data=[
{
	name:"Helloooo",
	image: require('../../assets/images/algebra.png'),
	type:"join"
},{
	name:"Helloooo",
	image: require('../../assets/images/algebra.png'),
	type:"view"
},{
  name:"Helloooo",
  image: require('../../assets/images/algebra.png'),
  type:"join"
}]


class LiveSession extends Component{
	constructor(props){
		super(props)
	}
        renderItem({ item }) {
      
        return (
          <View style={styles.itemview}>
          <View style={styles.itemsubview}>
          <View style={styles.itemsubtopview}>
           <View style={styles.itemtopmainview}>
           <View style={styles.itemtopleftview}>
           <Image source={item.image} style={{width:170/2.5,height:170/2.5}}/>
           </View>
            <View style={styles.itemtoprightview}>
            <Text style={styles.testname}>Morning test</Text>
            <View style={styles.descriptionview}>
            <Image source={require('../../assets/images/dashboard/new/desliveicon.png')} style={styles.descriptionicon} />
            <Text style={styles.descriptiontext}>Description</Text>
            </View>
            
            </View>
           </View>
          </View>
           <View style={styles.itemsubbottomview}>
           <View style={styles.itesmbottomsubview}>
            <Image source={require('../../assets/images/dashboard/new/clockliveicon.png')} style={styles.iconview} />
            <Text style={styles.icontext}>8:35 AM</Text>
            </View>
            <View style={styles.itesmbottomsubview}>
            <Image source={require('../../assets/images/dashboard/new/calliveicon.png')} style={styles.iconview} />
            <Text style={styles.icontext}>1/3/21</Text>
            </View>
            {item.type === 'view' ? 
            <View style={{paddingVertical: 8,paddingHorizontal: 20,borderWidth:1,borderRadius:30,
            backgroundColor: this.props.topicData.color,borderWidth:0}}>
              <Text style={{color:"white",fontSize:12}}>VIEW</Text>
            </View>
            :
             <View style={{paddingVertical: 8,paddingHorizontal: 20,borderWidth:1,borderRadius:20,
             borderColor: 'transparent',backgroundColor: '#E32346'}}>
              <Text style={{color:"white",fontSize:12}}>JOIN</Text>
            </View>
           }
           </View>
          </View>
          </View>
        )
    }
	render(){
		return(
			
		<View style={styles.mainview}>
		 <FlatList data={data}
                    renderItem={this.renderItem.bind(this)}
                    showsHorizontalScrollIndicator={false} />
		</View>
			
			
			)
	}
}
export default LiveSession