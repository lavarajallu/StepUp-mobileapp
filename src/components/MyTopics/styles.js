import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headertext:{
    fontSize: 20,color:"#5f5d5b",marginLeft:20,marginBottom:15,marginTop:15
  },
  itemview:{
   paddingVertical: 10,alignItems:"center"
  },
  rectview:{
    width: windowWidth/1.1,height:windowHeight/8,justifyContent:"center",
        backgroundColor: 'white',borderRadius: 10,flexDirection:"row",
          shadowOffset: { width: 0, height: 5 },//marginBottom:20,
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        },
       innerrect:{
        flex:0.3,overflow:"hidden",justifyContent:'center',alignItems:"center"
      },
      inerImage:{
        width:170/2,height:170/2
      },
      leftinnerview:{
        flex:0.7,justifyContent: 'space-around'
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