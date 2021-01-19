import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headertext:{
    fontSize: 20,color:"#5f5d5b",marginLeft:20,marginBottom:10
  },
  itemview:{
    paddingTop: 30
  },
  rectview:{
    width: 1724/8,height:1340/5.5,justifyContent:"center",
        backgroundColor: 'transparent',borderRadius: 20,marginHorizontal:20,overflow:"hidden",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        },
        subview:{
          flex:1
        },
        topsubview:{
          flex:0.4,
        },
        bottomsubview:{
          flex:0.6,justifyContent:"space-around"
        },
        subjectname:{
          fontSize:20,textAlign: 'center',color:"white",marginTop:10
        },
        progressview:{
          marginHorizontal: 20
        },
        progresstextview:{
          flexDirection:"row",justifyContent:"space-between"
        },
        progresstext:{
          color:"white",fontSize: 15
        },
        countview:{
          flexDirection:"row",justifyContent:"space-between",marginHorizontal: 20
        },
        innercountview:{
          flexDirection:"row",alignItems:"center"
        },
        iconview:{
          width:17,height:17,tintColor: 'white'
        },
        icontext:{
          marginLeft:5,color:"white"
        },
        relativeview:{
          position:"relative"
        }
})
export default styles;