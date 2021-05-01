import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

  footerinnerview:{
        //alignItems:"center",
        height:"100%",
        overflow:"hidden",
        width:windowWidth,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
  },
  footericon:{
    width:25,height:25,tintColor:colors.Themecolor
  }
})
export default styles;

