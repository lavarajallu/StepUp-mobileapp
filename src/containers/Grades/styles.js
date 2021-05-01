import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
   backimg:{
   	width:"100%",height:"100%"
   },
   mainView:{
   	flex:1,backgroundColor: 'white',margin:15,borderRadius: 15
   },
   logoview:{
   	flex:0.2,justifyContent:'center' 
   },
   logo:{
   	width:"100%",height:"100%",alignSelf: "center"
   },
   subview:{
   	flex:0.8,
   },
   listsubview:{
			  padding:20,backgroundColor:"white",margin:20,
           flex:1,
        	 shadowColor:'#fde7da',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 10,
            borderRadius:5,
        },
        gradeimg1:{
        	width:windowWidth/3,height:windowHeight/8,resizeMode:'contain'
        },
        gradetext:{
        	color:"#2e2e2e",fontSize: 18,textAlign:'center',marginTop: 10
        }

})
export default styles;