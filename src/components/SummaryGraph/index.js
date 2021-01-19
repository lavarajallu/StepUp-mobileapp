import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    FlatList,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
///import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
   { questionno:"1",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       percent:40,
       result:"correct"},
 { questionno:"2",
       question:"dkfjkdfk;",
       correctans:"B",
       percent:30,
       answers:[],
       result:"wrong"},

  { questionno:"3",
       question:"dkfjkdfk;",
       correctans:"B",
       answers:[],
       percent:80,
       result:"correct"},
    { questionno:"4",
       question:"dkfjkdfk;",
       correctans:"B",
       percent:100,
       answers:[],
       result:"wrong"},

  { questionno:"5",
       question:"dkfjkdfk;",
       correctans:"B",
       percent:40,
       answers:[],
       result:"correct"}

]
class SummaryGraph extends Component {
  render(){

    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <View style={{padding:5,flexDirection:"row",justifyContent:"center"}}>
                    <View style={{height:220,width:20,marginRight:5,justifyContent:"space-around",}}>
                    
                     <View style={{width:40,height:20,justifyContent:  'center'  }}>
                      <Text>100</Text>
                      </View>
                      <View style={{width:40,height:20,justifyContent:  'center'  }}>
                      <Text>80</Text>
                      </View>
                      <View style={{width:40,height:20,justifyContent:  'center'  }}>
                      <Text>60</Text>
                      </View>
                      <View style={{width:40,height:20,justifyContent:  'center'  }}>
                      <Text>40</Text>
                      </View>
                      <View style={{width:40,height:20,justifyContent:  'center'  }}>
                      <Text>20</Text>
                      </View>
                    </View>
                    <View style={{width:windowWidth/1.5,height:220,borderWidth: 1,borderColor:"black",borderRadius: 10,backgroundColor: 'white',justifyContent:"space-around",flexDirection:"row",alignItems: 'flex-end' }}>
                    {data.map((res,i)=>
                      res.result === "correct" ? 
                      <LinearGradient colors={['#239816', '#32e625']}  style={{width:20,borderTopLeftRadius: 10,borderTopRightRadius: 10,height: res.percent*2}}/>
                       :
                       <LinearGradient colors={['#f14d65', '#fc8798']}  style={{width:20,borderTopLeftRadius: 10,borderTopRightRadius: 10,height: res.percent*2}}/>
                      )}
                     
                     
                    </View>
                    
                    </View>
                     <View style={{width:windowWidth/1.5,height:20,marginLeft: 30,justifyContent:"space-around",flexDirection:"row"}}>
                    
                      {data.map((res,i)=>
                      <View style={{width:20,height:20,justifyContent:"center",}}>
                      <Text style={{textAlign:"center"}}>{res.questionno}</Text>
                      </View>
                      )}
                     
                     
                    </View>
                    </View>
      )
    }
}
export default SummaryGraph;