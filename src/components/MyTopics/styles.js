import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headertext:{
    fontSize: 20,marginLeft:10,marginBottom:10,marginTop:0,
  },
  itemview:{
   paddingVertical: 10,alignItems:"center"
  },
  rectview:{
    width: windowWidth/1.1,height:windowHeight/10,justifyContent:"center",
        backgroundColor: 'white',borderRadius: 10,flexDirection:"row",
          shadowOffset: { width: 0, height: 10 },//marginBottom:20,
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 5,
        },
       innerrect:{
        flex:0.25,overflow:"hidden",justifyContent:'center',alignItems:"center"
      },
      inerImage:{
        width:170/3,height:170/3
      },
      leftinnerview:{
        flex:0.75,justifyContent: 'space-around'
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
        }
})
export default styles;