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
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles from './styles'
import { Actions } from 'react-native-router-flux';
import { baseUrl, imageUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        this.state={
            boardsData:null,
            spinner: true
        }
     
}
async componentDidMount(){
    const value = await AsyncStorage.getItem('@access_token')
    if(value !== null) {
        console.log('val',value)
       this.getBoards(JSON.parse(value))
    }
}
getBoards(value)
{
         console.log(value)
        fetch(baseUrl+'/board?offset=0&limit=10', {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'token': value
                 }
                 }).then((response) =>
                 
                  response.json())
                 .then((json) =>{
                     const data = json.data;
                     
                     if(data){
                       if(data.boards){
                        console.log("boards",json.data.boards)
                           this.setState
                           ({
                            spinner:false,
                               boardsData: data.boards
                           })
                       }else{
                        this.setState
                        ({
                           spinner: false,
                            boardsData: []
                        }) 
                       }
                        //  AsyncStorage.setItem('@access-token', data.access_token)
                        //  Actions.push('dashboard')
                     }else{
                        this.setState
                        ({
                         spinner:false,
                            boardsData: []
                        })
                         alert(JSON.stringify(json))
                     }
                 }
                  
                 )
                 .catch((error) => console.error(error))
             //Actions.push('boards')
}

renderItem({item}){
   
	return(
		<TouchableOpacity onPress={()=>this.onItem(item)} 
		style={styles.listsubview}>
		 <Image source={{uri: imageUrl +item.image}} resizeMode={"cover"} 
		 style={styles.boardimg}/>
		 <Text style={styles.boardtext}>{item.name}</Text>
		
		</TouchableOpacity>
		)
}
onItem(item){
    //alert(JSON.stringify(item))
    Actions.push('grades',{data:item,userData: this.props.userData})
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

                           {this.state.spinner ? 
                           <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                           <ActivityIndicator color={"black"}/>
                           </View>  : 
                              this.state.boardsData &&
                             this.state.boardsData.length > 0 ?
							<FlatList data={this.state.boardsData} 
							renderItem={this.renderItem.bind(this)}
							 
							 numColumns={2} 
							 /> :     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text>No Data</Text>
                             </View> 
                              


                              }
                      </View>
                    </View>
                    </ImageBackground>
            </>
        );
    }
}
export default Boards;
