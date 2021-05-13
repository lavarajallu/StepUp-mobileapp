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
    Alert,
    Image,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Actions } from 'react-native-router-flux';
import { baseUrl, imageUrl } from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class Grades extends Component {
    constructor(props) {
        super(props);
        this.state={
            gradesData:null,
            spinner: true,
            token:"",
            loading: false,
            userData: null
        }
     
}
async componentDidMount(){
    console.log("pros",this.props.data)
    const value = await AsyncStorage.getItem('@access_token')
    if(value !== null) {
        console.log('val',value)
        this.setState({
            token: JSON.parse(value)
        },()=>
        {
            this.getData();
            this.getGrades(JSON.parse(value),this.props.data)
        })
        
    }
}
renderItem({item}){
    //alert(item.image)
    const url = imageUrl +item.image
	return(
        <TouchableOpacity onPress={this.onItem.bind(this,item)} style={styles.listsubview}>
		<View style={{  flex:1,justifyContent:"space-evenly",alignItems:"center",backgroundColor: 'white'}}>
	      <Image source={{uri: url}} style={styles.gradeimg1}/>
          <Text style={styles.gradetext}>{item.name}</Text>
        </View>
	    </TouchableOpacity>
		)
}
getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
    //  alert(JSON.stringify(value))
      if(value !== null) {
        var data = JSON.parse(value)
		console.log("dataaa",data)
        this.setState({userData: data})
       
      }else{
        //Actions.push('login')
      }
    } catch(e) {
       return null;
    }
  }
onItem(item){

    //Actions.push('dashboard')
    const board = this.props.data;
    const grade = item;
    const userData =  this.state.userData
    console.log("dfd",userData)
    const body ={
        name:userData.name,
       first_name: userData.first_name,
       last_name: userData.last_name,
       email: userData.email,
       password:userData.password,
       mobile_number:userData.mobile_number,
       state: userData.state,
       provision: userData.provision,
       pincode: userData.pincode,
       gender: userData.gender,
       profile_pic: userData.profile_pic,
       user_role: "General Student",
       board_id: board.reference_id,
       grade_id: grade.reference_id,
     }
     console.log("sdsd",body, this.state.token)
     console.log(userData.reference_id)
     this.setState({
        loading: true
     })
     fetch(baseUrl+'/user/'+userData.reference_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': this.state.token
        },
        body: JSON.stringify(body)
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
        .catch((error) => console.error(error))
}

getGrades(value,item)
{
    //grade?offset=0&limit=10&order_by=name&sort_order=DESC&board=1a060a8b-2e02-4bdf-8b70-041070f3747c&branch=-1
         var url = baseUrl+'/grade?offset=0&limit=10&board='+item.reference_id+'&branch=-1'
         console.log("value",url)
        fetch(url ,{
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'token': value
                 }
                 }).then((response) =>
                 
                  response.json())
                 .then((json) =>{
                     const data = json.data;
                     console.log("sss",data)
                     if(data){
                       if(data.grades){
                        console.log("boards",json.data.grades)
                           this.setState
                           ({
                               spinner: false,
                               gradesData: data.grades
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
                      {this.state.spinner ? 
                           <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                           <ActivityIndicator color={"black"}/>
                           </View>  : 
                              this.state.gradesData &&
                             this.state.gradesData.length > 0 ?
							<FlatList data={this.state.gradesData} 
							renderItem={this.renderItem.bind(this)}
							 
							 numColumns={2} 
							 /> :     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text>No Data</Text>
                             </View> 
                              


                              }
                      </View>
                    </View>
                    </ImageBackground>
                    {this.state.loading ?  
                    <View style={{position:'absolute',backgroundColor:"rgba(255,255,255,0.3)",justifyContent:"center",height:"100%",width:"100%"}}>
                    <ActivityIndicator color={"black"}/>
                     </View> 
                    : null}
            </>
        );
    }
}
export default Grades;
