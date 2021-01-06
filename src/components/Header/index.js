import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image
} from 'react-native';
import styles from "./styles"


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var {title} = this.props;
        return (
            <>
                <ImageBackground source={require("../../assets/images/Banner_back.png")} style={styles.backbanner}>
                {title==="forgot"|| title === 'otp'? 
                <Image source={require("../../assets/images/left-arrow.png")} style={styles.back} />
                :null}
                <Image source={require("../../assets/images/computer.png")} style={styles.computer} />
                </ImageBackground>
                
            </>
        );
    }
}
export default Header;