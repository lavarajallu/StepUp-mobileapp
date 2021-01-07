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
import styles from './styles'
import { Actions } from 'react-native-router-flux';
const data =[
{name: 'CBSC',grades:[{name: 'Grade-1'},{name:"Grade-2"},{name:"Grade-3"},{name:"Grade-4"}]},
 {name: 'ICSE',grades:[{name: 'Grade-1'},{name:"Grade-2"},{name:"Grade-3"},{name:"Grade-4"}]},
 {name: 'AP BOARD',grades:[{name: 'Grade-1'},{name:"Grade-2"},{name:"Grade-3"},{name:"Grade-4"}]}, 
 {name: 'KARNATAKA BOARD',grades:[{name: 'Grade-1'},{name:"Grade-2"},{name:"Grade-3"},{name:"Grade-4"}]},
 {name: 'KARNATAKA BOARD',grades:[{name: 'Grade-1'},{name:"Grade-2"},{name:"Grade-3"},{name:"Grade-4"}]},
 {name: 'TS BOARD',grades:[{name: 'Grade-1'},{name:"Grade-2"},{name:"Grade-3"},{name:"Grade-4"}]}]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class Boards extends Component {
    constructor(props) {
        super(props);
        this.onItem = this.onItem.bind(this)
     
}

renderItem({item}){
	return(
		<TouchableOpacity onPress={()=>this.onItem(item)} 
		style={styles.listsubview}>
		 <Image source={require("../../assets/images/3.png")} 
		 style={styles.boardimg}/>
		 <Text style={styles.boardtext}>{item.name}</Text>
		
		</TouchableOpacity>
		)
}
onItem(item){
    //alert(JSON.stringify(item))
    Actions.push('grades',{data:item})
}

    render() {
        return (
            <>
                <ImageBackground
                    style={styles.backimg}
                    source={require("../../assets/images/backblue.png")}>
                    <View style={styles.mainView}>
                     <View style={styles.logoview}>
                      <Image source={require("../../assets/images/logo.png")}
                            style={styles.logo} />
                     </View>
                      <View style={styles.subview}>
							<FlatList data={data} 
							renderItem={this.renderItem.bind(this)}
							 
							 numColumns={2} 
							 />
                      </View>
                    </View>
                    </ImageBackground>
            </>
        );
    }
}
export default Boards;
