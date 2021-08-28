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
    TouchableHighlight,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { colors,baseUrl } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
//import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import MathJax from 'react-native-mathjax';


class VideoQuestionModal extends Component{
	constructor(props){
		super(props);
    this.state={
      questiondata:"",
      answerobj:{},
      showCorrectView: null,
      attempt:false,
      mewdata: this.props.data,
      loading: true
    }
	}
  componentDidMount(){
    
    if(this.props.data){
      console.log("didmount",this.props.data)
      this.setState({
        questiondata: this.props.data.question,
        loading: false
      },()=>console.log("didmount222",this.state.questiondata))
    }
    //alert("Dsfdfdfd"+JSON.stringify(this.props.data))
  }
 async  onAnswer(data){
  var obj = {
    question_id : this.props.data.reference_id,
    user_answer : data.key
  }
  
    const token = await AsyncStorage.getItem('@access_token')
  //  alert(JSON.stringify(data))
  var interval = setTimeout(()=>{
    if(token){
      
      const url = baseUrl+"/test-questions/validate-answer"

      console.log("ur,l",url)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': JSON.parse(token)
        },
        body: JSON.stringify(obj)
      }).then((response) => response.json())
        .then((json) => {
  
          const data = json.data;
       //   alert(JSON.stringify(data))
         
          if (data) {
          //  alert(JSON.stringify(data))
            if(data.is_correct){
              this.setState({
                 showCorrectView:true,
                 answerobj : obj,
               })
            }else{
              this.setState({
                showCorrectView:false,
               // answerobj : obj,
              })
            }
          } else {
            alert(JSON.stringify(json.message))
  
          }
        }
  
        )
        .catch((error) => console.error(error))
  
    }
  },200)
   
   


    // var question = this.state.questiondata;
    // var answer = data;
    // console.log(" question.correctanswe", question.correctanswer)
    // var answerid = data.answerId
    // var questionid = question.questionid
    // var question = question.question
    // var correct =this.state.questiondata.correctanswer
    // var result;
    // console.log("question",answerid,  " ", correct)
    // if(answerid === correct){
    //     result = true;
    // }else{
    //     result = false
    // }
    // var obj = {

    //     questionid,
    //     question,
    //     answerid,
    //     correct,
    //     result
    // }
    // this.setState({
    //     answerobj : obj
    // },()=>{
    //   var interval = setTimeout(()=>{
    //     if(this.state.answerobj.result){
    //       this.setState({
    //         showCorrectView:true
    //       })
    //     }else{
    //       this.setState({
    //         showCorrectView:false
    //       })
    //     }
    //   },200)
      
    // }
     
    // )
    // //finalarray.push(obj);
  }
  
  onTryfirst(){
    var newoptions = this.shuffle(this.state.questiondata.options);
    console.log("cc",newoptions)
    this.setState({
      attempt:true,
      answerobj:{},
      showCorrectView: null
    })
  }
  shuffle(array) {
    var newarray = array.sort(() => Math.random() - 0.5);
    return newarray;
  }
  onContinue(){
    this.setState({showCorrectView: null})
     this.props.onquestionSubmit()
  }

  onRewatch(){
    console.log("sdsd",this.state.questiondata)
    this.props.onRewatch(this.props.data)
  }

	render(){
      console.log("skdlksd",this.state.answerobj)
    		return(
          !this.state.loading ? 
          this.state.showCorrectView === null ?       
       <View style={styles.mainView}>
        <View style={styles.questionview}>
        <Text style={styles.questionhint}>Hi there, a quick question for you:</Text>
          {/* <Text style={styles.questiontext}>{this.state.questiondata.question}</Text> */}
          <View style={{width: '100%',
        borderWidth: 1,
        borderRadius:10,
        borderColor: "lightgrey",
        backgroundColor:"white",
        marginTop:10,
        overflow:"hidden",
        justifyContent:"center",
        alignSelf: 'flex-start',}}>
    <MathJax
      mathJaxOptions={{
        messageStyle: "none",
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
          processEscapes: true,
        },
        TeX: {
          extensions: [
            "AMSmath.js",
            "AMSsymbols.js",
            "noErrors.js",
            "noUndefined.js",
          ],
        },
      }}
        style={{ //backgrbackgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
        width: '100%',
        // borderWidth: 2,
        // borderRadius:10,
        marginLeft:10,
        // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
        justifyContent:"center",
        alignSelf: 'center',}} html={this.state.questiondata.question} /></View>
        </View>
        <View style={styles.answersview}>
         
          <View style={styles.answersubview}>
          <ScrollView style={{flex:1}}>
             {this.state.questiondata.options.map((res,i)=>
               	<TouchableHighlight onPress={this.onAnswer.bind(this,res)} underlayColor="transparent" activeOpacity={0.9}
                    style={styles.answeritem}>
                   <View style={[styles.answeritemsub,{backgroundColor:this.state.answerobj.key === res.key ? colors.Themecolor : "white"},]}>
                   {this.state.answerobj.key === res.key ?
                     <View style={styles.answeruncheck}>
                     <Image source={require('../../assets/images/videos/check-mark.png')} style={styles.answercheck}/>
                     </View>
                     :
                      <View style={styles.answergrey}/>
                   }

<View style={{width: '80%',
      //  borderWidth: 1,
        borderRadius:10,
        //borderColor: "lightgrey",
        backgroundColor:"white",
       // marginTop:10,
       marginLeft:10,
        overflow:"hidden",
        justifyContent:"center",
        alignSelf: 'center',}}>
    <MathJax
     mathJaxOptions={{
      messageStyle: "none",
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\[", "\\]"],
        ],
        processEscapes: true,
      },
      TeX: {
        extensions: [
          "AMSmath.js",
          "AMSsymbols.js",
          "noErrors.js",
          "noUndefined.js",
        ],
      },
    }}
        style={{ //backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
        width: '100%',
        marginTop:1,
        // borderWidth: 2,
        // borderRadius:10,
        // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
        justifyContent:"center",
        alignSelf: 'flex-start',}} html={res.value} /></View>
                   </View>
               </TouchableHighlight>
             )}

         
          </ScrollView>
          </View>
        </View>

      </View> 
      :
      this.state.showCorrectView ? 
      <View style={styles.mainView1}>
          <View style={styles.mainTop}>
            <ImageBackground source={require('../../assets/images/videos/Correct_answer.png')}
            style={styles.bgshape}>
              <View style={{flex:1,}}>
              <View style={{flex:0.6}}/>
              <View style={{flex:0.4}}>
              <View style={[styles.bottomview,{alignItems:"center"}]}>
            <Text style={styles.bottomheadtext}>Well Done !</Text>
            <Text style={{marginTop:10}}>You did a great job in the test !</Text>
            <TouchableHighlight  onPress={this.onContinue.bind(this)} underlayColor="transparent" activeOpacity={0.9} 
            style={styles.bottomcorrect}>
              <Text style={styles.buttontext}>Continue</Text>
            </TouchableHighlight>
          </View>
              </View>
              </View>
            </ImageBackground>
          </View>
       
        </View> : 
      <View style={styles.mainView1}>
          <View style={styles.mainTop}>
          <ImageBackground source={require('../../assets/images/videos/Wrong_answer.png')}
            style={styles.bgshape}>
              <View style={{flex:1,}}>
              <View style={{flex:0.6}}/>
              <View style={{flex:0.4,}}>
              {this.state.attempt ? 
           <View style={styles.bottomview}>
           <Text style={styles.bottomheadtext}>Whoops!</Text>
           <Text style={styles.bottommiddletext}>The next time you must be lucky</Text>
           <View style={styles.rewatchview}>
           <TouchableHighlight  onPress={this.onRewatch.bind(this)} underlayColor="transparent" activeOpacity={0.9} 
           style={styles.bottombutton}>
             <Text style={styles.buttontext}>Rewatch Video</Text>
           </TouchableHighlight>
           <TouchableHighlight  onPress={this.onTryfirst.bind(this)} underlayColor="transparent" activeOpacity={0.9} 
           style={styles.bottombutton}>
             <Text style={styles.buttontext}>Try Again</Text>
           </TouchableHighlight>
           </View>
         </View>
          :
          <View style={[styles.bottomview,{alignItems:"center"}]}>
            <Text style={styles.bottomheadtext}>Whoops!</Text>
            <Text style={{marginTop:20}}>The next time you must be lucky</Text>
            <TouchableHighlight  onPress={this.onTryfirst.bind(this)} underlayColor="transparent" activeOpacity={0.9} 
            style={styles.bottombutton}>
              <Text style={styles.buttontext}>Try Again</Text>
            </TouchableHighlight>
          </View>}
          </View>
              </View>
             
            </ImageBackground>
          
    </View>
      </View>  : null


			)
	}
}
export default VideoQuestionModal
