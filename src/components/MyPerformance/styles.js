import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	mainview:{
		margin:15,borderRadius: 10,borderWidth:1,borderColor:"lightgrey",
	},
	headtext:{
		margin:20,textAlign:"center",fontSize:25
	},
	chartview:{
		height:windowHeight/3,width: windowWidth/1.1
	},
	
})
export default styles;