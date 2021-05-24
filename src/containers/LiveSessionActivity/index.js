import React, { Component } from 'react'
import { View, Text, Alert, Image, TouchableOpacity, StatusBar, PermissionsAndroid, ActivityIndicator, AppState, BackHandler } from 'react-native'
// import COLORS from '../styles/color';
// import { STRING, url } from '../values/string';
// import GLOBALSTYLE from '../values/style';
// import AsyncStorage from '@react-native-community/async-storage';
// import MathJax from 'react-native-mathjax';
import WebView from 'react-native-webview';
// import MESSAGE from '../values/message';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
var videoBaseURL, i = 0;



class LiveSessionActivity extends Component {

    constructor(props) {
        super(props);
        i = 0;

        this.state = {
            isLoading: false,
            // isFromDetailActivity: this.props.navigation.getParam("isFromDetailActivity", true),
            // isForReview: this.props.navigation.getParam("isForReview", true),
            languageId: '',
            topicId: '',
            topicName: '',
            videoURL: '',
            noteData: '',
            htmlURL: this.props.meetingUrl,
            // htmlURL: 'http://newcleusit.com/b/dhr-rj3-tzu',
            isHTMLAvailable: false,
            isNoteAvailable: false
        }
    }

    componentDidMount() {
        requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then(
            (statuses) => {
                console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
                console.log('Audio', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
            },
        );
        this.getScriptHTMLAPI();
    }

    componentDidMount() {
        if (!this.state.isForReview) {
            this.backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                this.backAction
            );
        }
    }

    componentWillUnmount() {
        if (!this.state.isForReview) {
            this.backHandler.remove();
        }
    }


    backAction = () => {
        Alert.alert(
            '',
            'Are you sure want to leave the current session?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'YES', onPress: () => { this.goNavBack() } },
            ],
            { cancelable: false }
        )
        return true;
    };

    goNavBack() {
        console.log('Clicked');
        this.props.navigation.goBack(null);
    }

    getScriptHTMLAPI() {
        this.setState({
            isLoading: false,
            isNoteAvailable: false,
            isHTMLAvailable: true,
        });
    }

    _onNavigationStateChange(webViewState) {
        console.log(webViewState.url);
        if ((webViewState.url.indexOf('/logout') > -1 ||
            webViewState.title.indexOf('StepUp - ') > -1) && i == 0) {
            i++;
            Actions.pop({type:"reset"})
           // this.props.navigation.goBack(null);
        }
    }

    handleMessage(message) {
        console.log(message);
    }

    render() {
      //  console.log("ttt",this.props.data.meetingUrl)
        return (
            <View style={{ backgroundColor: "green", height: '100%', width: '100%' }}>
                <StatusBar hidden={true} />
                {/* <PermissionWebview
                    style={{ height: '100%', width: '100%', backgroundColor: COLORS.white }}
                    source={{ uri: this.state.htmlURL }}
                    sourceUri={this.state.htmlURL}
                /> */}
                 <WebView
                    style={{ height: '100%', width: '100%', backgroundColor: "white" }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsFullscreenVideo={true}
                    source={{ uri: this.state.htmlURL }}
                    onMessage={this.handleMessage.bind(this)}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
                /> 
            </View>
        )
    }
}

export default LiveSessionActivity