import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    SectionList,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'


class AnnounceComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: this.props.data
        }
    }
    componentDidMount(){
       // alert(JSON.stringify(this.state.data))
    }
    Item = ({ item }) => (
        <View style={{width: "100%",
        paddingVertical: 10,backgroundColor: item.new ?  "rgba(105, 80, 119, 0.2)": "white",}}>
            <View style={styles.itemsubview}>
                <View style={styles.itemleftview}>
                    {item.new ? 
                     <Image source={require('../../assets/images/refer/notifyorange.png')}
                     style={styles.bellorange} />
                    :
                    <Image source={require('../../assets/images/refer/bellicon.png')}
                    style={styles.bellgrey} />
                     
                    }
                </View>
                <View style={styles.itemmiddleview}>
                    <Text style={styles.middleheadtext}>{item.name}</Text>
                    <Text style={styles.descriptiontext}>{item.description}</Text>
                    <Text style={styles.timetext}>{item.time}</Text>
                </View>
                <View style={styles.itemrightview}>
                {item.new ? 
                <Image source={require('../../assets/images/refer/orangecl.png')} style={styles.orangeeclipse} />:
                    <Image source={require('../../assets/images/refer/Vector.png')} style={styles.rigtarrow} />}
                </View>
            </View>
        </View>
    );
    seperator() {
        return (
            <View style={styles.seperator} />
        )
    }
    render() {
        return (
            <View style={styles.mainview}>
                <LinearGradient colors={[" rgba(105, 80, 119, 0.08)", "rgba(132, 115, 147, 0.064)"]}
                    style={styles.gradientView}>
                    <View style={styles.listview}>
                        <SectionList
                            sections={this.state.data}
                            keyExtractor={(item, index) => item + index}
                            renderItem={this.Item.bind(this)}
                            ItemSeparatorComponent={this.seperator.bind(this)}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={styles.sectiontext}>{title}</Text>
                            )}
                        />
                    </View>
                    <View style={styles.bottomView}>
                    <LinearGradient colors={["#A473E2","#EF929C"]}  start={{ x: 0, y: 0.5 }} style={styles.buttonview}>
                            <Text style={styles.buttontext}>VIEW ALL</Text>
                        </LinearGradient>
                    </View>

                </LinearGradient>

            </View>
        )
    }
}
export default AnnounceComponent;