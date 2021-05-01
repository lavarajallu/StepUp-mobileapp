import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

 mainView:{
    flex:1,
    //backgroundColor: '#F9C6B7'
 },
 backimage:{
    width:30,height:30,marginVertical:15,tintColor:colors.Themecolor,marginLeft:20
 },
 mainsubview:{
  width:"100%",
  backgroundColor:"white",
  borderRadius:20,
  shadowColor:'black',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 10,

 },

 subjectouter:{
   //width: 140,
   height: 40,
   paddingHorizontal:10,
   backgroundColor:colors.Themecolor,
   position: 'absolute',
   justifyContent: "center",
   alignItems:"center",
   borderRadius:35,
   overflow: 'hidden',
   top: 40,
   alignSelf:"center",
   shadowColor:'black',
   shadowOffset: { width: 0, height: 5 },
   shadowOpacity: 1,
   shadowRadius: 5,
   elevation: 10
 },

     nextactivityview:{
            height:"20%",justifyContent:"space-between",alignItems:"flex-start",marginHorizontal:10,flexDirection:"row"
        },
        nextinner:{
            height:40,borderRadius:20,backgroundColor:colors.Themecolor,paddingHorizontal:10,marginTop:10,justifyContent:"center"
        },
        activitytext:{
            textAlign:"center",fontSize:15,color:"white"
        },


        relativeview:{
          position:"relative"
        },


})
export default styles;
