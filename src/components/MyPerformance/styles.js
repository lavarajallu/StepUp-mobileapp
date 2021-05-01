import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	mainview:{
		marginHorizontal:0,borderRadius: 10,marginTop:10
	},
	headtext:{
		marginVertical:10,textAlign:"left",fontSize:15,color:colors.Themecolor,marginLeft:10
	},
	chartview:{
		paddingVertical:20,
		width: windowWidth/1.1,backgroundColor: 'white',
		shadowColor:'black',justifyContent:"center",alignSelf:"center",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,borderRadius: 10
	},
	
})
export default styles;