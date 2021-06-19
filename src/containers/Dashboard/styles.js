import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
   mainview:{
    flex:1,
    backgroundColor: 'white'
   },
   topview:{
    flex:0.1,justifyContent:'space-between',flexDirection:"row",alignItems:"center",marginHorizontal: 20
  },
  toptext:{
    color:colors.Themecolor,
    fontSize: 20
  },
  middleview:{
    flex:1,
  },
  footerview:{
    flex:0.08,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"
  },
  footerinnerview:{
      flexDirection: 'row',
        justifyContent:"space-around",
        alignItems:"center",
        height:80,
        width:windowWidth,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
  },
  footericon:{
    width:32,height:32
  }
})
export default styles;

