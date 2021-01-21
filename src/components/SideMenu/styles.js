import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	mainview:{
		flex:1,backgroundColor: colors.Themecolor
	},
	topview:{
		flex:0.1,justifyContent:"center",alignItems:"flex-end"
	},
	closeicon:{
		width:144/4,height:144/4,marginRight:30
	}
})
export default styles;