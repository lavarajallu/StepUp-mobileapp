import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  footerinnerview:{
      flexDirection: 'row',
        justifyContent:"space-around",
        alignItems:"center",
        height:"100%",
        width:windowWidth,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
  },
  footericon:{
    width:30,height:30
  }
})
export default styles;

