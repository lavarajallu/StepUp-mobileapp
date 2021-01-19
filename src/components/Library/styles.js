import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	mainview:{
		flex:1,
	},
	topview:{
		flex:0.3,backgroundColor: '#000000',borderColor:"transparent",
		marginHorizontal:20,marginTop:20,borderWidth:1,borderRadius:10,overflow:"hidden"
	},
	topimage:{
		backgroundColor: '#fde7da',alignSelf:"center",width:"100%",height:"100%"//height:278/2.5,width:997/2.5
	},
	toptext:{
		fontSize:35,textAlign:"center",color:colors.themecolor,paddingTop:20
	},bottomtext:{
		fontSize:20,textAlign:"center",paddingBottom:20
	},line:{
		height:1,marginHorizontal: 20,backgroundColor: '#f77c4d',marginVertical: 30,opacity:0.8
	},
	subview:{
		flex:1
	}
})
export default styles;