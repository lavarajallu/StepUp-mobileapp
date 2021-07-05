import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({
	mainview:{
		flex:1,backgroundColor: colors.Themecolor
	},
	bg:{
		width:"100%",
		height:"100%"
	},
	bgtop:{
		flex: 0.1,backgroundColor:"transparent",justifyContent:"center",marginLeft:10
	},
	bglast:{
		flex: 0.1, alignItems: "flex-end" 
	},
	bgmiddle:{
		flex: 0.8, justifyContent: "center"
	},
	middleTop:{
		flex: 0.25, justifyContent: "flex-start", alignItems: "center" 
	},
	middleBottom:{
		flex: 0.75
	},
	profileicon:{
		width: 50, height: 50, borderRadius: 25
	},
	profilename:{
		color: "white", marginTop: 5 
	},
	gradeview:{
		justifyContent: "center", marginTop: 5, alignItems: "center", padding:10, height: 25, borderRadius: 20, borderWidth: 1, borderColor: "white"
	},
	graderText:{
		color: "white"
	},
	logoutview:{
		height: 40,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		backgroundColor: "white", width: "30%", justifyContent: "center", alignItems: "center"
	},
	rowView:{
		height: 40, flexDirection: "row", width: "80%", marginVertical: 10, marginHorizontal: 20
	},
	rowLeft:{
		flex: 0.2, justifyContent: "center"
	},
	rowMiddle:{ flex: 0.7, justifyContent: "center" },
	rowLast:{
		flex: 0.1, justifyContent: "center"
	},
	rowIcon:{
		width: 20, height: 24 , tintColor:"white"
	},
	rowNext:{
		width: 10, height: 10, tintColor:"white" 
	},
	rowText:{
		color: "white" 
	}
})
export default styles;