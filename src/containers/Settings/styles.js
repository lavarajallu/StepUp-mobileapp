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
        width:288/1.5,height:287/1.5,justifyContent:"center",alignItems:"center"
    },
    bottomtopvieW:{
        flex:0.3,
    },
    gradientview:{
        flex:1,alignItems:"center"
    },
    bottomsubView:{
        flex:0.7
    },

    bottomsubview:{
        flex:1,alignItems:"center",justifyContent:"center"
    },
    contentView:{
        width:"80%",height:50,flexDirection:"row",alignItems:"center"
    },
    circle:{
        width:30,height:30,justifyContent:"center",alignItems:"center"
    },
    phoneicon:{
        width:19/1.5,height:26/1.5
    },
    linkicon:{
        width:20/1.5,height:20/1.5
    },
    mailicon:{
        width:20/1.5,height:15/1.5
    },
    subtext:{
        fontSize: 14,lineHeight: 16,color: "#695077",textAlign:"center",marginLeft:10
    }
    
})
export default styles;