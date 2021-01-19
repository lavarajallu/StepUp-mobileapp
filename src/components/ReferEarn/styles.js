import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	imagestyles:{
        width:973/2.7,height:266/2.7,alignSelf:"center",justifyContent:"center"
    },
    textStyles:{
        color:"#595757",fontSize:25,textAlign:"center",marginLeft:30
    }
})
export default styles;