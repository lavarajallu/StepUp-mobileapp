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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class Grades extends Component {
    constructor(props) {
        super(props);
     
}
renderItem({item}){
	return(
		<View 
		style={styles.listsubview}>
		 <Image source={require("../../assets/images/gradesam.png")} 
		 style={styles.gradeimg}/>
		 <Text style={styles.gradetext}>{item.name}</Text>
		
		</View>
		)
}

    render() {
        const {data} = this.props
        return (
            <>
                <ImageBackground
                    style={styles.backimg}
                    source={require("../../assets/images/backblue.png")}>
                    <View style={styles.mainView}>
                     <View style={styles.logoview}>
                      <Image source={require("../../assets/images/Grade_banner.png")} resizeMode='cover'
                             style={styles.logo} />
                     </View>
                      <View style={styles.subview}>
							<FlatList data={data.grades} 
							renderItem={this.renderItem}
							 
							 numColumns={2} 
							 />
                      </View>
                    </View>
                    </ImageBackground>
            </>
        );
    }
}
export default Grades;
