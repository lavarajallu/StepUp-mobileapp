import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	mainview:{
		flex:1
	},
	itemview:{
		padding:15,backgroundColor: 'white',margin:10,borderWidth:1,borderRadius: 10,borderColor:"transparent",
			    shadowOffset: { width: 0, height: 5 },
			    shadowOpacity: 1,
			    shadowColor:"black",
			    shadowRadius: 5,elevation:10
			},
			itemsubview:{
				flex:1
			},
			itemsubtopview:{
				flex:0.8
			},
			itemsubbottomview:{
				flex:0.2,flexDirection:"row",justifyContent:"space-between",marginVertical: 20
			},
			itemtopmainview:{
				flex:1,flexDirection:"row"
			},
			itemtopleftview:{
				flex:0.4,justifyContent:"center",alignItems:"center"
			},
			itemtoprightview:{
				flex:0.6,marginLeft:20
			},
			testname:{
				fontSize:20,
				color:colors.Themecolor
			},
			descriptionview:{
				flexDirection:"row",marginTop:10
			},
			descriptionicon:{
				width:18,height:18,alignSelf:"center"
			},
			descriptiontext:{
				fontSize:20,marginLeft:10
			},
			itesmbottomsubview:{
				flexDirection:"row",marginTop:10,alignItems:"center"
			},
			iconview:{
				width:20,height:20,alignSelf:"center"
			},
			icontext:{
				fontSize:18,marginLeft:10
			}
})
export default styles;