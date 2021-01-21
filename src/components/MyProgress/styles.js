import {
    Dimensions,StyleSheet,
  } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	mainview:{
		margin:15,borderRadius: 10,
	},
	headtext:{
		marginVertical:10,textAlign:"left",fontSize:20
	},
	bottomview:{
		flexDirection:'row',flexWrap:"wrap",justifyContent:"center"
	},
	innerview:{
		flexDirection:"row",margin:10,justifyContent:'center',alignItems:"center",flexWrap:"wrap"
	},
	subjectview:{
		width:20,height:20
	},
	subjecttext:{
		fontSize:15,marginLeft:10
	}
})
export default styles;