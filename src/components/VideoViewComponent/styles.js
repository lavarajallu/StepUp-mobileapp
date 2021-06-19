import {
    Dimensions,StyleSheet,Platform
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

mainView:{
    flex:1,justifyContent:"center",

},
absview:{
    width:10,height:10,position:"absolute",width:"100%",backgroundColor:"transparent",
},
subview:{
    flex:1,flexDirection:"row"
},
subleftview:{
    flex:Platform.OS === 'android' ? 0.06 : 0.25,
},
submiddleview:{
    flex:Platform.OS === 'android' ? 0.84 : 0.4,
},
subright:{
    justifyContent:'space-evenly',flexDirection:"row",flex:1,alignItems:"center",backgroundColor:"transparent"
},
sublastright:{
    flex:Platform.OS === 'android' ? 0.1 : 0.2,
}

})
export default styles;

