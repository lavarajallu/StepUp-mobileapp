import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	mainView:{
        flex: 1,
    },
    topView:{
        flex: 0.08, overflow: 'hidden', paddingBottom: 5 
    },
    topShadow:{
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    backIcon:{
        height: 16, width: 21, marginLeft: 20
    },
    topHead:{
        marginLeft: 20, color: "#695077",
    },
    bottomView:{
        flex: 0.92, 
    },
    submitbutton:{
        height:41,
        width:"80%",
        borderRadius:10,
        alignSelf:"center",
        backgroundColor:"#695077",
        alignItems:"center",
        marginTop:50,
        justifyContent:"center"
    },
    buttonText:{
        color:"white",fontSize:16
    },
    changelogo:{
        width:288/1.5,height:287/1.5
    },
    bottomtopvieW:{
        flex:0.3,
    },
    gradientview:{
        flex:1,alignItems:"center"
    },
    bottomsubView:{
        flex:0.7,alignItems:"center"
    },
    textInput:{
        width: "80%",
        height: 44,
        paddingLeft:8,
        backgroundColor: "#F6F5F7",
        borderRadius: 10,
        borderWidth:1,borderColor:colors.Themecolor,
        marginVertical:20,
        color:colors.Themecolor
    }
    
})
export default styles;