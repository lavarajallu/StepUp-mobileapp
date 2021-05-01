import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

mainView:{
    flex:1,justifyContent:"center",alignItems:"center",position:"relative"
},
absview:{
    width:10,height:10,position:"absolute",width:"100%",backgroundColor:"transparent",
    
      
      elevation:20
},
subview:{
    flex:1,flexDirection:"row"
},
subleftview:{
    flex:0.15,
},
submiddleview:{
    flex:0.7,
},
subright:{
    justifyContent:'space-evenly',flexDirection:"row",flex:1,alignItems:"center",elevation:10
},
sublastright:{
    flex:0.15
}

})
export default styles;

