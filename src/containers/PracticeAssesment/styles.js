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
		  flex:0.05,
		  justifyContent:"center"
	  },
	  toptext:{
		  textAlign:"center",
		  fontSize:15
	  },
	  mainbottomview:{
		  flex:1},
	  timerview:{
		  flexDirection:"row",justifyContent:"center",width:187/2,height:82/2,backgroundColor: colors.Themecolor,
			  borderTopLeftRadius :15,borderBottomLeftRadius: 15
		  },
	  mainshadowview:{
		  flex:1,backgroundColor: 'white',shadowColor:'black',
		  // shadowOffset: { width: 0, height: 5 },
		  // shadowOpacity: 1,
		  // shadowRadius: 5,
		  //  elevation: 10
	  },
	  headerview:{
		  flex:0.15,flexDirection:"row",justifyContent:"space-between"
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
	  timertext:{
		  textAlign:"center",
		  alignSelf:"center",
		  color:"white",
		  fontSize:15
	  },
	  listview:{
		  flex:0.9,overflow:"hidden"
	  },
	  circlesview:{
		  flex:0.15,justifyContent:"center",alignItems:"center"
	  },
	  questionsview:{
		  flex:0.85,margin:20,
	  },
	  questioninnerview:{
		  flexDirection:"row"
	  },
	  questionnum:{
		  fontSize: 20,textAlign:"left"
	  },
	  questiontext:{
		  fontSize:15,textAlign:"left",marginLeft:15,marginRight:15
	  },
	  answermain:{
		  marginTop:20,
	  },
	  answersub:{
		  flexDirection:"row",alignItems:"center"
	  },
	  answernum:{
		  fontSize:15,textAlign:"center"
	  },
	  answertextview:{
		  marginLeft:15,paddingLeft:15,width:windowWidth/1.2,borderWidth:1,borderRadius:20,paddingVertical:5,justifyContent:"center",paddingVertical:10
	  },
	  answertext:{
		  fontSize:15,
	  },
	  circlefilled:{
		   height:40,width:40,borderRadius: 20,borderColor: colors.Themecolor,backgroundColor:colors.Themecolor,borderWidth: 2,marginHorizontal:10,justifyContent:"center"
	  },
	  circletext:{
		  textAlign: 'center',color:"white",fontSize:15
	  },
	  borderfilled:{
		   height:40,width:40,borderRadius: 20,borderColor: colors.Themecolor,borderWidth: 2,marginHorizontal:10,justifyContent:"center"
	  },
	  bordertext:{
		   textAlign: 'center',color:colors.Themecolor,fontSize:15
	  },
	  bottomview:{
		  flex:0.1,flexDirection:"row",
	  },
	  bottomleftview:{
		  flex:0.5,justifyContent: 'center',alignItems:"flex-start",marginLeft:20
	  },
	  bottomrightview:{
		  flex:0.5,justifyContent: 'center',alignItems:"flex-end",marginRight:20
	  }
  
  })
  export default styles