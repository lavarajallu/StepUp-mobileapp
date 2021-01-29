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
    marginTop:40,
    height:"85%",width:windowWidth/1.08,
    alignSelf:"center",
    backgroundColor:"white",
    borderRadius:20,
    shadowColor:'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
   // marginRight: 30
    
 },

 subjectouter:{
    width: 140,
    height: 40,
    backgroundColor:colors.Themecolor,
    position: 'absolute',
    justifyContent: "center",
    alignItems:"center",
    borderRadius:35,
    top: 20,
    left: windowWidth/3.2, 
    shadowColor:'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10
 },

     nextactivityview:{
            height:"10%",justifyContent:"flex-start",alignItems:"flex-end",marginRight:20
        },
        nextinner:{
            height:40,borderRadius:20,backgroundColor:colors.Themecolor,paddingHorizontal:10,marginTop:10,width:150,
            justifyContent:"center",alignItems:"center"
        },
        activitytext:{
            textAlign:"center",fontSize:15,color:"white"
        },

      
        relativeview:{
          position:"relative"
        },
        
 
})
export default styles;

