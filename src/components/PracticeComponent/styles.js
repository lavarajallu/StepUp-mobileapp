import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

 mainView:{
    flex:1,
 },
 backimage:{
    width:30,height:30,marginVertical:30,tintColor:colors.Themecolor,marginLeft:20
 },
 mainsubview:{
    //marginTop:50,
    height:"100%",width:"100%",backgroundColor:"#f6f7fb",borderTopLeftRadius:50,borderTopRightRadius:50
 },
 subjectinner:{
    width: 944 / 6,
    height: 912 / 6,
    justifyContent: "center",
    alignItems:"center",
    marginTop:5,
     position: 'absolute',
    justifyContent: "center",
    alignItems:"center",
    borderRadius:30,
    top: 20,
    left: windowWidth/3.5, 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
 },
 subjectouter:{
    width: 944 / 7,
    height: 912 / 7,
    backgroundColor:"white",
    position: 'absolute',
    justifyContent: "center",
    alignItems:"center",
    borderRadius:30,
    top: 50,
    left: windowWidth/3, shadowColor:'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10
 },
 mainmiddleview:{
  flex:1
},
listview:{
  flex:0.7
},
 middleview:{
   flex:0.2,justifyContent: 'center',alignItems:  'center',
 },
 textmain:{
  color:colors.Themecolor,textAlign: 'center',marginTop: 50, fontSize:20
 },
 rectview:{
    width: windowWidth/2.3,height:1340/9,justifyContent:"center",
        backgroundColor: 'white',borderRadius: 20,margin:10,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        },
        subview:{
          flex:1
        },
        topsubview:{
          flex:0.3
        },
        bottomsubview:{
          flex:0.7,justifyContent:"space-around"
        },
        subjectname:{
          color:"#4b4b4b",fontSize:15,textAlign: 'center'
        },
        progressview:{
          marginHorizontal: 10
        },
        progresstextview:{
          flexDirection:"row",justifyContent:"space-between"
        },
        progresstext:{
          color:"#4b4b4b",fontSize: 15
        },
        countview:{
          flexDirection:"row",justifyContent:"space-between",marginHorizontal: 10
        },
        innercountview:{
          flexDirection:"row",alignItems:"center"
        },
        iconview:{
          width:17,height:17,
        },
        icontext:{
          marginLeft:5
        },
        relativeview:{
          position:"relative"
        }
 
})
export default styles;

