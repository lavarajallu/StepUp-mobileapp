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
    width:30,height:30,marginVertical:10,tintColor:colors.Themecolor,marginLeft:20
 },
 mainsubview:{
    height:"100%",width:"100%",
    backgroundColor:"white",
    paddingBottom:60,
    borderRadius:20,
    shadowColor:'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    
 },
viewsolution:{
    height:40,borderRadius:20,backgroundColor:colors.Themecolor,paddingHorizontal:10,width:150,alignItems:"center",justifyContent:"center",alignSelf:"center"
},
viewsolutiontext:{
    color:"white"
},
activitytext:{
    textAlign:"center",fontSize:15,color:"white"
},

maininside:{
    flex:1,
    paddingBottom:50
},
boxview:{
    padding:10,margin:20,backgroundColor: 'white',marginTop:40,
    borderWidth:1,borderRadius: 10,  shadowColor:'black',borderColor:"transparent",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
},
absview:{
    padding:10,
    width:150,height:40,elevation: 11,
    backgroundColor: colors.Themecolor,borderRadius: 20,top:windowHeight/27,left:windowWidth/3.4,
    justifyContent:"center",alignItems:"center",position:"absolute"
},
absview2:{
     padding:10,
    width:150,height:40,elevation: 11,
    backgroundColor: colors.Themecolor,borderRadius: 20,top:windowHeight/2.2,left:windowWidth/3.4,
    justifyContent:"center",alignItems:"center",position:"absolute"
},
absview3:{
     padding:10,
    width:150,height:40,elevation: 11,
    backgroundColor: colors.Themecolor,borderRadius: 20,top:windowHeight/1.18,left:windowWidth/3.4,
    justifyContent:"center",alignItems:"center",position:"absolute"
}
 
})
export default styles;

