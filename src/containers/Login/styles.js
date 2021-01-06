import {
  Dimensions, StyleSheet,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
const styles = StyleSheet.create({


  body: {
    backgroundColor: "white",
    //height:"100%",
    margin: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "transparent",
    overflow: "hidden",

  },
  containter: {
    width: "100%",//Dimensions.get("window").width, //for full screen
    height: "100%",// Dimensions.get("window").height, //for full screen
    zIndex: -1,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  scrollview: {
    backgroundColor: 'transparent',
    overflow: "hidden"
  },
  logo: { margin: 30, width: 539 / 3, height: 158 / 3, alignSelf: "center" },
  backbanner: {
    width: "100%", height: windowHeight / 3, overflow: "hidden", justifyContent: "center"
  },
  computer: {
    width: 581 / 2.5, height: 519 / 2.5, alignSelf: "center"
  },
  labelstyle: {
    color: '#2e2e2e', fontSize: 15
  },
  input: {
    borderWidth: 0, color: "#606060",
  },
  textinput: {
    borderBottomWidth: 1, borderColor: "#959595",
    margin: 10,
    borderColor: '#2e2e2e'
  },
  subview: {
    margin: 15, flexDirection: "row", justifyContent: "space-between",
  },
  bottomview: {
    margin: 10, flex: 0.3, justifyContent: 'space-around'
  },
  helptext: {
    fontSize: 13, alignSelf: "center", color: "#595858"
  },
  socialiconview: {
    marginTop: 10, justifyContent: "space-around", flexDirection: "row"
  },
  socialicon: {
    width: 48, height: 48
  },
  logintext: {
    textAlign: "center", color: "white", fontSize: 15
  },
  createtext: {
    textAlign: "center", color: colors.Themecolor, fontSize: 15
  },
  createview: {
    width: 367 / 3, height: 90 / 3, borderRadius: 20, borderWidth: 1.5, borderColor: colors.Themecolor,
    justifyContent: "center"
  },
  submiticon: {
    width: 367 / 3, height: 90 / 3, borderRadius: 20, overflow: "hidden", justifyContent: "center"
  },
  forgottext: {
    color: colors.Themecolor, fontSize: 15
  },
  remembertext: {
    color: "#959595", fontSize: 15, marginLeft: 5
  },
  checkbox: {
    width: 17, height: 17, alignSelf: "center", tintColor: "#959595"
  },
  checkboxview: {
    flexDirection: "row"
  }
});

export default styles;
