import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	mainview:{
		marginHorizontal:10,borderRadius: 10,
	},
	headtext:{
		marginVertical:10,textAlign:"left",fontSize:20
	},
	chartview:{
		paddingVertical:20,
		width: windowWidth/1.15,backgroundColor: 'white',
		shadowColor:'black',justifyContent:"center",alignSelf:"center",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,borderRadius: 10
	},
	
})
export default styles;