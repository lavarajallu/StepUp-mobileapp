import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

mainView:{
    flex:1,backgroundColor:"transparent",justifyContent:"center"
},
absview:{
    width:10,height:10,position:"absolute",width:"100%",backgroundColor:"transparent",
},
subview:{
    flex:1,flexDirection:"row"
},
subleftview:{
    flex:0.06,
},
submiddleview:{
    flex:0.84,
},
subright:{
    justifyContent:'space-evenly',flexDirection:"row",flex:1,alignItems:"center",backgroundColor:"transparent"
},
sublastright:{
    flex:0.1
}

})
export default styles;

