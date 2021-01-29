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
   backimage:{
    width:30,height:30,tintColor:colors.Themecolor
  },
   topview:{
    flex:0.1,justifyContent:'space-between',flexDirection:"row",alignItems:"center",marginHorizontal: 20
  },
  toptext:{
    color:colors.Themecolor,
    fontSize: 20
  },
  middleview:{
    flex:0.9,
  },
  footerview:{
    flex:0.1,justifyContent:"flex-end"
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

