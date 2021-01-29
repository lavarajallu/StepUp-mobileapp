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
    Image,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles from "./styles"
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import PDFView from 'react-native-view-pdf';

import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';

const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
  }
class PdfView extends  Component{
    constructor(props){
        super(props);
        this.state={
            spinner:true,
            isvisible:false
        }
    }

	render(){
            const resourceType = 'url';

		return(
			    <View style={styles.mainView}>

                <Image source={require("../../assets/images/left-arrow.png")}
                    style={styles.backimage} />
                <View style={styles.mainsubview}>
                	<View style={{flex:1}}>
                    <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />

                	</View>
                </View>
                 <View style={styles.nextactivityview}>
                 <View style={styles.nextinner}>
                    <Text style={styles.activitytext}>Previous Activity</Text>
                    </View>
                    <TouchableOpacity style={styles.nextinner}>
                    <Text style={styles.activitytext}>Next Activity</Text>
                    </TouchableOpacity>

                </View>
                 <View style={styles.subjectouter}>
                <Text style={{color:"white",fontSize:20}}>Video</Text>
                </View>

            </View>
			)
	}
}

export default PdfView;
