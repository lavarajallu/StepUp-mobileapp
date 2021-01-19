import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

 mainView:{
    flex:1,
    backgroundColor: '#F9C6B7'
 },
 backimage:{
    width:42,height:42,marginVertical:20,tintColor:"#f64068",marginLeft:20
 },
 mainsubview:{
    marginTop:30,height:"100%",width:"100%",backgroundColor:"#f6f7fb",borderTopLeftRadius:50,borderTopRightRadius:50
 },
 subjectinner:{
    width: 944 / 6,
    height: 912 / 6,
    justifyContent: "center",
    alignItems:"center",
    marginTop:5,
 },
 subjectouter:{
    width: 944 / 7,
    height: 912 / 7,
    backgroundColor:"white",
    position: 'absolute',
    justifyContent: "center",
    alignItems:"center",
    borderRadius:30,
    top: 60,
    left: windowWidth/3.1, shadowColor:'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10
 },
 mainmiddleview:{
  flex:1,
},
listview:{
  flex:0.6
},
 middleview:{
   flex:0.2,justifyContent: 'flex-end',alignItems:  'center' 
 },
 textmain:{
  color:colors.Themecolor,textAlign: 'center', fontSize:20
 }, itemview:{
   paddingVertical: 10,alignItems:"center"
  },
  rectview:{
   justifyContent:"center",
        backgroundColor: 'white',borderRadius: 10,flexDirection:"row",
          shadowOffset: { width: 0, height: 5 },//marginBottom:20,
          paddingVertical: 15,
          marginHorizontal: 10,
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        },
       innerrect:{
        flex:0.2,overflow:"hidden",justifyContent:'center',alignItems:"center"
      },
      inerImage:{
        width:170/3,height:170/3
      },
      leftinnerview:{
        flex:0.8,justifyContent: 'space-around'
      },
        subjectname:{
          color:"#4b4b4b",fontSize:20,textAlign: 'left',marginLeft:10
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
        relativeview:{
          position:"relative"
        },
        tabstyle:{
          height:50,backgroundColor:"transparent",borderBottomWidth: 2,borderColor:"lightgrey",borderTopWidth: 0,borderLeftWidth: 0,borderRightWidth: 0
        },
        activetab:{
          borderBottomWidth: 2,borderRightWidth:0,borderLeftWidth:0,borderColor: colors.Themecolor,backgroundColor: 'transparent'
        },
        activetabtext:{
          color:colors.Themecolor
        },
        tabtext:{
          fontSize: 20,color:"black"
        }
 
})
export default styles;

