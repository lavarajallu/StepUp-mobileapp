import React, { useEffect , useState, useCallback, Fragment } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
  Image,
  Keyboard,
  ProgressBarAndroid,
  Platform,
  TouchableHighlight,
  FlatList
} from 'react-native';
import Drawer from 'react-native-drawer'
import { Actions } from 'react-native-router-flux';
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { baseUrl } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubject, getChapters } from '../../store/boards/slice'
import SideMenu from "../../components/SideMenu"
import { selectBoards } from '../../store/boards/selectors'
export default function Chapters(props) {
    const [spinner, setSpinner] = useState(true)
  const { chapters } = useSelector(selectBoards)
  console.log("chaptersss22222",chapters)
  const dispatch = useDispatch()
   useEffect(() => {
    getData()
    
    
  });
   const getData = useCallback(async() => {
    try {
      const value = await AsyncStorage.getItem('@user')
    
      if(value !== null) {
        var data = JSON.parse(value)
        const user_id = data.reference_id;
        const grade_id = data.grade_id;
        const subject_id= props.dara.reference_id;
        const school_id = data.school_id;
        const section_id = data.section_id;
        //const token = await AsyncStorage.getItem('@access_token')
     
     
          dispatch(getChapters({grade_id,subject_id,school_id,section_id}))
    
       
      }else{
       console.log("errorr")
      }
    } catch(e) {
       return null;
    }
  }, [dispatch])
  useEffect(()=>{
    if(chapters?.chapters && chapters?.chapters.length > 0){
      console.log("subjectsinsideeee",chapters,chapters)
      setSpinner(false);
    }else if(chapters?.chapters && chapters?.chapters.length === 0){
        setSpinner(false);
    }
  })
  return (
   
   	<View style={styles.mainview}>
				
                <View style={styles.topview}>

      {spinner ? 
                           <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                           <ActivityIndicator color={"black"}/>
                           </View>  : 
              chapters?.chapters && chapters?.chapters.length > 0 ?
              <ChapterComponent onBack={()=>Actions.pop()} userData={props.data} chapters={chapters.chapters} />:   
             <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text>No Data</Text>
                             </View> 
                              


                              }

      </View>
      </View>
  )
}
