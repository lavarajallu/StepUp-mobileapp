import {
  Dimensions, StyleSheet,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({

    mainview:{
        flex:1
    },
    topview:{
        flex:0.1,
        justifyContent:"center",
        alignItems:"flex-start"
    },backimg:{
        width:30,
        height:30,
        marginLeft:20,
        tintColor:colors.Themecolor
    },
    toptext:{
        textAlign:"center",
        fontSize:15
    },
    mainbottomview:{
        flex:0.9
    },
    mainshadowview:{
        flex:1,backgroundColor: 'white',borderRadius: 15,shadowColor:'black',borderWidth:1,borderColor:"lightgrey",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
       //  elevation: 10
    },
    headerview:{
        flex:0.15,flexDirection:"row",justifyContent:"space-between",marginTop:25
    },
    headerleftview:{
        flex:0.7,justifyContent:"center"
    },
    headtext:{
        fontSize:20,marginLeft:20,color:colors.Themecolor
    },
    headrightview:{
        flex:0.3,justifyContent:"center",alignItems:"flex-end"
    },
    timerview:{
       flexDirection:"row",justifyContent:"center",width:187/2,height:82/2,backgroundColor: colors.Themecolor,
            justifyContent:"center",borderTopLeftRadius:20,borderBottomLeftRadius: 20
    },
    timertext:{
        textAlign:"center",
        color:"white",
        alignSelf:"center",
        fontSize:15
    },
    listview:{
        flex:0.85
    },
    circlesview:{
        flex:0.15,justifyContent:"center",alignItems:"flex-end",marginRight:20
    },
    questionsview:{
        flex:0.85,margin:20
    },
    questioninnerview:{
        //flexDirection:"row"
    },
    questionnum:{
        fontSize: 15,textAlign:"left"
    },
    questiontext:{
        fontSize:15,textAlign:"left"
    },
    answermain:{
        marginTop:20
    },
    answersub:{
        //alignItems:"center"
    },
    answernum:{
        fontSize:15,textAlign:"left"
    },
    answertextview:{
        marginLeft:15,paddingLeft:15,width:windowWidth/1.2,borderWidth:1,borderRadius:20,paddingVertical:15
    },
    answertext:{
        fontSize:15
    },
    circlefilled:{
         height:30,width:30,borderRadius: 15,borderColor: colors.Themecolor,backgroundColor:colors.Themecolor,borderWidth: 2,marginHorizontal:10,justifyContent:"center"
    },
    circletext:{
        textAlign: 'center',color:"white",fontSize:15
    },
    borderfilled:{
         height:30,width:30,borderRadius: 15,borderColor: colors.Themecolor,borderWidth: 2,marginHorizontal:10,justifyContent:"center"
    },
    bordertext:{
         textAlign: 'center',color:colors.Themecolor,fontSize:15
    },
    bottomview:{
        flex:0.1,flexDirection:"row"
    },
    bottomleftview:{
        flex:0.5,justifyContent: 'center',alignItems:"flex-start",marginLeft:20
    },
    bottomrightview:{
        flex:0.5,justifyContent: 'center',alignItems:"flex-end",marginRight:20
    }

})
export default styles