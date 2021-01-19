import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        var { title } = this.props;
        return (
            <>
            <View style={styles.footerinnerview}>
			 <Image  source={require("../../assets/images/menu.png")} style={styles.footericon}/>
             <Image  source={require("../../assets/images/search.png")} style={styles.footericon}/>
              <Image  source={require("../../assets/images/notification.png")} style={styles.footericon}/>
               <Image  source={require("../../assets/images/calander.png")} style={styles.footericon}/>
			</View>

            </>
        );
    }
}
export default Footer;