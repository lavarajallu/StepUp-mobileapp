import React, { Component } from 'react';
import {
    SafeAreaView,
    Alert,
    Platform,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
//import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import NotifyComponent from '../../components/NotifyComponent'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { createNativeWrapper } from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { baseUrl, imageUrl } from '../../constants';
var radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilepic: null,
            name: "",
            dob: "",
            mobile_number: "",
            email: "",
            state: "",
            boardvalue: "",
            grade: "",
            profile_pic: "",
            genderval: null,
            boardsData: [],
            gradesData:[],
            picture:"",
            token:'',
            userID:""
        }
    }
    async componentDidMount() {
        const value = await AsyncStorage.getItem('@access_token')
        if (value !== null) {
            console.log('val', value)
            this.setState({token:JSON.parse(value) })
            this.getBoards(JSON.parse(value))
        }
        
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user')
            //  alert(JSON.stringify(value))
            if (value !== null) {
                var data = JSON.parse(value)
                this.setState({
                    userID: data.reference_id
                })
                console.log("c", data)
                if (data.gender) {
                    if (data.gender === 'Female') {
                        this.setState({
                            genderval: 1
                        })
                    } else if (data.gender === 'Male') {
                        this.setState({
                            genderval: 0
                        })
                    }
                }


                this.seData(data)
               


            } else {
                //Actions.push('login')
            }
        } catch (e) {
            return null;
        }
    }
    seData(data){
       console.log("ddddd",data)
        this.setState({
            name: data.name,
            dob: data.dob,
            mobile_number: data.mobile_number,
            email: data.email,
            state: data.state,
            boardvalue: data.grade ?.board_id,
            grade: data.grade.name,
            profilepic: data.profile_pic ? imageUrl +data.profile_pic: null,
            gradeselect: data.grade.reference_id
        },()=>console.log("JSasfdf"))

    }
    getBoards(value) {
        console.log(value)
        fetch(baseUrl+'/board', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': value
            }
        }).then((response) =>

            response.json())
            .then((json) => {
                const data = json.data;

                if (data) {
                    if (data.boards) {
                        console.log("boards", json.data.boards)
                        var boardarray =[]
                        {data.boards.map((res,i)=>{
                            var obj={"label":res.name,"value":res.reference_id}
                            boardarray.push(obj)
                        })}
                        this.setState
                            ({
                                spinner: false,
                                boardsData: boardarray
                            })
                    } else {
                        this.setState
                            ({
                                spinner: false,
                                boardsData: []
                            })
                    }
                    this.getData()
                    //  AsyncStorage.setItem('@access-token', data.access_token)
                    //  Actions.push('dashboard')
                } else {
                    this.setState
                        ({
                            spinner: false,
                            boardsData: []
                        })
                    alert(JSON.stringify(json))
                }
            }

            )
            .catch((error) => console.error(error))
        //Actions.push('boards')
    }
    onBack() {
        Actions.pop()
    }
    selectPhotoTapped = () => {
        Alert.alert(
            "Choose Option",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Open Camera",
                    onPress: () => this.openCamera(),
                },
                { text: "Choose from Gallery", onPress: () => this.openPicker() }
            ],
            { cancelable: false }
        );


    }
    openCamera = () => {
        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        //     includeBase64: true,
        //     compressImageQuality: 0.8,
        // }).then(image => {
        //     // console.log('imagefrom', image.data);
        //     let source = { uri: image.path };
        //     // setProfilePic(image.path)
        //     // setPath(image.data)
        //     // onSubmit(image.data)
        //     this.setState({ profilepic: image.path, encodedImage: image.data, picture :  image.path });
        //     // onSubmit(image.data)
        // });
        launchCamera(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              console.log("imageee",response)
              let source = { uri: response.uri };
              this.setState({ profilepic: response.uri, picture:  response });
            },
          )
    }
    openPicker = () => {
        // ImagePicker.openPicker({
        //     width: 400,
        //     height: 400,
        //     cropping: true,
        //     includeBase64: true,
        //     compressImageQuality: 0.8,
        // }).then(image => {
        //      console.log('imagefrom', image);
        //     let source = { uri: image.path };
        //     let imageview = {
        //         // `uri` can also be a file system path (i.e. file://)
        //         uri: image.path,
        //         name: 'profilepic.jpeg',
        //         type: 'image',
        //       }
        //     // setProfilePic(image.path)
        //     // setPath(image.data)
        //     // onSubmit(image.data)
        //     this.setState({ profilepic: source, encodedImage: image.data, picture:  image.path });
        //     // this.showPicker(false)
        // });
        launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              console.log("imageee",response)
              let source = { uri: response.uri };
              this.setState({ profilepic: response.uri, picture:  response });
            },
          )
    }

    onBoardsPress = (value)=>{
        this.setState({
            boardvalue: value
        },()=>this.getGrades(this.state.token,value))
    }
    getGrades(token,value)
    {
        //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
             var url = baseUrl+'/grade?offset=0&limit=10&board='+value+'&branch=-1'
             console.log("value",url)
            fetch(url ,{
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                         'token': token
                     }
                     }).then((response) =>
                     
                      response.json())
                     .then((json) =>{
                         const data = json.data;
                         console.log("sss",data)
                         if(data){
                           if(data.grades){
                            console.log("boards",json.data.grades)
                            var gradesarray = []
                            {data.grades.map((res,i)=>{
                                var obj={"label":res.name,"value":res.reference_id}
                                gradesarray.push(obj)
                            })}
                               this.setState
                               ({
                                   spinner: false,
                                   gradesData: gradesarray
                               })
                           }else{
                            this.setState
                            ({
                               spinner: false,
                                gradesData: []
                            }) 
                           }
                            //  AsyncStorage.setItem('@access-token', data.access_token)
                            //  Actions.push('dashboard')
                         }else{
                             alert(JSON.stringify(json))
                             this.setState
                             ({
                                spinner: false,
                                 gradesData: []
                             })
                         }
                     }
                      
                     )
                     .catch((error) => console.error(error))
                 //Actions.push('boards')
    }
     createFormData = (photo, body) => {
        const data = new FormData();
        if(photo){
            data.append('image', {
                name: photo.fileName,
                type: photo.type,
                uri:
                  Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
              });
        }
        
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
      
        return data;
      };
    update(){
        //alert("JI")
        var name=this.state.name;
        var email = this.state.email;
        var mobile_number = this.state.mobile_number;
        var state = this.state.state;
        var dob = this.state.dob;
        var gender
        if(this.state.genderval === 0){
            gender ='Male'
        }else if(this.state.genderval === 1){
            gender= 'Female'
        }
        var profilepic = this.state.picture;
        var board_id = this.state.boardvalue;
       var grade_id = this.state.gradeselect
       console.log("dcc",grade_id)
       var normladata ={
        name,
      //  email,
        mobile_number,
        state,
        dob,
        gender,
       // board_id,
       // grade_id
       }
        console.log("sdsdsds",normladata)
    //    let formdata = new FormData();
    //    formdata.append("name", name);
    //    formdata.append("email", email);
    //    formdata.append('mobile_number', mobile_number)
    //    formdata.append("state", state);
    //    formdata.append("gender", gender);
    //    formdata.append("image", this.state.picture);
    //    formdata.append('grade_id', grade_id)
    //    formdata.append("board_id", board_id);
    //     console.log("submit",formdata)
        fetch(baseUrl+'/user/student/'+this.state.userID, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
                'token': this.state.token
            },
            body: this.createFormData(this.state.picture, normladata)
            }).then((response) => response.json())
            .then((json) =>{
                console.log("jsonjson",json)
                const data = json.data;
                if( json.data){
                    this.setState({
                        loading: false
                     })
                     console.log("updateeeee",data)
                    AsyncStorage.setItem('@user', JSON.stringify(data))
                    Alert.alert(
                        "Step Up",
                         json.message,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {
                           Actions.dashboard();
                          }}
                        ]
                      );
                }else{
                    this.setState({
                        loading: false
                     })
                    alert(JSON.stringify(json))
                }
            }
             
            )
            .catch((error) => console.log(error))
     
    }
    render() {
        const selectedItem = {
            title: 'Selected item title',
            description: 'Secondary long descriptive text ...',
        };
        return (

            <View style={styles.mainView}>
                <View style={styles.topView}>
                    <View
                        style={styles.topShadow}>
                        <View style={styles.topsubview}>
                            <View style={styles.topleftview}>
                                <TouchableOpacity onPress={this.onBack.bind(this)}>

                                    <Image source={require('../../assets/images/refer/back.png')} style={styles.backIcon} />

                                </TouchableOpacity>
                            </View>
                            <View style={styles.topmiddleview}>
                                <Text style={styles.topHead}>Edit Profile</Text>
                            </View>
                            <View style={styles.toprightview}>

                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <View style={{ flex: 1, }}>

                        <View style={{ flex: 0.2, justifyContent: "center" }}>

                            <TouchableOpacity onPress={this.selectPhotoTapped}>
                                {this.state.profilepic
                                 ?
                                    <Image source={{uri:this.state.profilepic}} style={{ width: 100, height: 100, borderRadius: 100 / 2, alignSelf: 'center' }} /> :
                                    <Image source={{ uri: 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png' }}
                                        style={{ width: 100, height: 100, borderRadius: 100 / 2, alignSelf: 'center' }} />}
                            </TouchableOpacity>







                        </View>
                        <View style={{ flex: 0.8, }}>



                            <ScrollView
                                contentInsetAdjustmentBehavior="automatic"
                                keyboardShouldPersistTaps={'handled'}
                                style={{
                                    backgroundColor: 'transparent',
                                    overflow: "hidden",
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/profileicon.png')}
                                        style={{ width: 23, height: 46 }} />
                                    <TextInput
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({ name: text })}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20, }} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 20 }}>
                                    <Image
                                        source={require('../../assets/images/refer/gendericon.png')}
                                        style={{ width: 23, height: 25 }} />
                                    <View style={{ paddingLeft: 20 }}>
                                        <RadioForm
                                            formHorizontal={true}
                                            animation={true}
                                        >
                                            {/* To create radio buttons, loop through your array of options */}
                                            {
                                                radio_props.map((obj, i) => (
                                                    <RadioButton labelHorizontal={true} key={i} >
                                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                        <RadioButtonInput
                                                            obj={obj}
                                                            index={i}
                                                            isSelected={this.state.genderval === i}
                                                            onPress={(value) => {
                                                              //  alert(value)
                                                                this.setState({ genderval: value })
                                                            }}
                                                            borderWidth={1}
                                                            buttonInnerColor={'#695077'}
                                                            buttonOuterColor={'#695077'}
                                                            buttonSize={10}
                                                            buttonOuterSize={20}
                                                            buttonStyle={{}}
                                                            buttonWrapStyle={{ marginLeft: 10 }}
                                                        />
                                                        <RadioButtonLabel
                                                            obj={obj}
                                                            index={i}
                                                            labelHorizontal={true}
                                                            onPress={(value) => this.setState({ genderval: value })}
                                                            labelStyle={{ fontSize: 15, color: '#695077' }}
                                                            labelWrapStyle={{}}
                                                        />
                                                    </RadioButton>
                                                ))
                                            }
                                        </RadioForm>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/dobicon.png')}
                                        style={{ width: 23, height: 23 }} />
                                    <TextInput
                                        placeholder="dob"
                                        value={this.state.dob}
                                        onChangeText={(text) => this.setState({ dob: text })}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20 }} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/phoneicon.png')}
                                        style={{ width: 23, height: 22 }} />
                                    <TextInput
                                        placeholder="phone number"
                                        value={this.state.mobile_number}
                                        onChangeText={(text) => this.setState({ mobile_number: text })}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20 }} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/emailicon.png')}
                                        style={{ width: 23, height: 28 }} />
                                    <TextInput
                                        placeholder="email"
                                        editable={false}
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20 }} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/placeicon.png')}
                                        style={{ width: 23, height: 23 }} />
                                    <TextInput
                                        placeholder="place"
                                        value={this.state.state}
                                        onChangeText={(text) => this.setState({ state: text })}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20 }} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/boardicon.png')}
                                        style={{ width: 23, height: 23 }} />
                                         <TextInput
                                          editable={false}
                                        placeholder="Board"
                                        value={this.state.boardvalue}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20 }} />
                                    {/* <View

                                        style={{
                                            height: 40, width: windowWidth / 1.3,
                                            borderColor: "#695077",
                                            borderBottomWidth: 1, marginLeft: 20, justifyContent: "center",
                                        }}>
                                        <RNPickerSelect
                                            value={this.state.boardvalue}
                                            onValueChange={this.onBoardsPress.bind(this)}
                                            style={pickerSelectStyles}
                                            items={this.state.boardsData}
                                        />

                                    </View> */}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                                    <Image
                                        source={require('../../assets/images/refer/gradeicon.png')}
                                        style={{ width: 23, height: 23 }} />
                                         <TextInput
                                         editable={false}
                                        placeholder="Grade"
                                        value={this.state.grade}
                                        style={{ color: '#695077', height: 40, width: windowWidth / 1.3, borderColor: "#695077", borderBottomWidth: 1, marginLeft: 20 }} />
                                   {/* <View

style={{
    height: 40, width: windowWidth / 1.3,
    borderColor: "#695077",
    borderBottomWidth: 1, marginLeft: 20, justifyContent: "center",
}}>
<RNPickerSelect
    value={this.state.gradeselect}
    onValueChange={(val)=>this.setState({gradeselect: val})}
    style={pickerSelectStyles}
    items={this.state.gradesData}
/>

</View> */}
                                </View>

                                <TouchableOpacity
                                onPress={this.update.bind(this)}
                                    style={{
                                        height: 41,
                                        width: "80%",
                                        borderRadius: 10,
                                        alignSelf: "center",
                                        backgroundColor: "#695077",
                                        alignItems: "center",
                                        marginVertical: 30,
                                        justifyContent: "center"
                                    }}>
                                    <Text style={{ color: "white", fontSize: 16 }}>UPDATE PROFILE</Text>
                                </TouchableOpacity>
                            </ScrollView>



                        </View>
                    </View>
                </View>
            </View>

        )
    }
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderWidth: 1,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: '#695077',
        // marginBottom:10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
export default EditProfile