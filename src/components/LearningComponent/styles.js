import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	maintext:{
fontSize: 20,color:"#5f5d5b",marginLeft:20
	},
	itemview:{
		width: 1724/10,height:1340/10,justifyContent:"center",
				alignItems:"center",backgroundColor: 'white',borderRadius: 10,margin:20,
			 shadowColor:'black',
			    shadowOffset: { width: 0, height: 5 },
			    shadowOpacity: 1,
			    shadowRadius: 5,
			    elevation: 10,
			},
			image:{
				width:96/2,height:96/2,alignSelf:"center"
			},subtext:{
				fontSize: 15,color:"#555656",marginTop:5
			}
})
export default styles;