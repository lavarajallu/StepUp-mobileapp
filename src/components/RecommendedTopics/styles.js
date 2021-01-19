import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainview:{
    margin:15,borderRadius: 10,borderWidth:1,borderColor:"lightgrey",
  },
  headertext:{
    fontSize: 20,color:"#5f5d5b",marginLeft:20,marginBottom:15,marginTop:15
  },
  itemview:{
    marginVertical: 20
  },
  rectview:{
    width: windowWidth/1.23,height:windowHeight/16,
    alignSelf:"center",
        backgroundColor: 'white',borderRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        },
        outerview:{
            width: windowWidth/1.2,height:windowHeight/16,
            marginTop:25,borderRadius: 10,backgroundColor:"red",position:"absolute",alignSelf:"center"
        },
        subview:{
          flex:1,
          flexDirection: "row",
          justifyContent: 'flex-start',
          marginLeft: 10,
          alignItems: 'center'
        },
        subjectname:{
          color:"#4b4b4b",fontSize:20,textAlign: 'center',marginLeft:10
        },imagestyles:{
          width:170/5,height:170/5
        }
})
export default styles;