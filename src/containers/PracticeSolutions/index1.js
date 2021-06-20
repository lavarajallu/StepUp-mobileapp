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
    FlatList,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import styles from "./styles"
import { colors } from "../../constants";
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl,imageUrl } from "../../constants"
var alphabetarray = ["A","B","c","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
import MathJax from 'react-native-mathjax';
const data = [
{
    questionno:1,
    question:"Hormones in Human being were secreted by which system?",
    correctanswer: 'A',
    attempted:"B",
    result:false,
    answers:[
    {
        title:"Circulatory System",
        answerid:"A",
    },{
        title:"Endocrine System",
        answerid:"B",

    },{
        title:"Respiratory System",
        answerid:"C"
    },{
        title:"Excretory System",
        answerid:"D"
    }]
},{
    questionno:2,
    question:"JEansssssss in Human being were secreted by which system?",
    correctanswer: "B",
    attempted:"B",
    result:true,
    answers:[
    {
        title:"Circulatory System",
        answerid:"A"
    },{
        title:"Endocrine System",
        answerid:"B"
    },{
        title:"Respiratory System",
        answerid:"C"
    },{
        title:"Excretory System",
        answerid:"D"
    }]
},{
    questionno:3,
    question:"dksfjkldsjfkldjfkl in Human being were secreted by which system?",
    correctanswer: "C",
    attempted:"C",
    result:true,
    answers:[
    {
        title:"Circulatory System",
        answerid:"A"
    },{
        title:"Endocrine System",
        answerid:"B"
    },{
        title:"Respiratory System",
        answerid:"C"
    },{
        title:"Excretory System ",
        answerid:"D"
    }]
},{
    questionno:4,
    question:"dksfjkldsjfkldjfkl in Human being were secreted by which system?",
    correctanswer: "C",
    attempted:"A",
    result:false,
    answers:[
    {
        title:"Circulatory System",
        answerid:"A"
    },{
        title:"Endocrine System",
        answerid:"B"
    },{
        title:"Respiratory System",
        answerid:"C"
    },{
        title:"Excretory System ",
        answerid:"D"
    }]
},{
    questionno:5,
    question:"dksfjkldsjfkldjfkl in Human being were secreted by which system?",
    correctanswer: "C",
    attempted:"C",
    result:false,
    answers:[
    {
        title:"Circulatory System",
        answerid:"A"
    },{
        title:"Endocrine System",
        answerid:"B"
    },{
        title:"Respiratory System",
        answerid:"C"
    },{
        title:"Excretory System ",
        answerid:"D"
    }]
}]
class PracticeSolutions extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedItem:data[0],
            previousItem:null,
            isvisible:false,
            finalarray: [],
            spinner: true,
            questionno: 0,
            questionsarray:[],
            answerobj:{}
        }
    }
    componentDidMount() {
        //alert(JSON.stringify(this.props.testid))
           this.getData()
         }
         getData = async () => {
           try {
             const value = await AsyncStorage.getItem('@user')
             //alert(JSON.stringify(value))
             if (value !== null) {
               var data = JSON.parse(value)
               this.setState({
                 useDetails: data
               })
               const token = await AsyncStorage.getItem('@access_token')
               if (token && data) {
               //    alert("hiii")
                   this.setState({token: JSON.parse(token)})
                     this.getDataquestions(data, JSON.parse(token))
               } else {
                 console.log("hihii")
               }
       
             } else {
               alert("errorrr")
             }
           } catch (e) {
             return null;
           }
       }
       getDataquestions(user,token){

        var url =baseUrl+"/user-test/"+this.props.testid

        console.log("urrlll",url)
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': token
            },
          }).then((response) =>
          
           response.json())
            .then((json) => {
            //  alert("jon"+JSON.stringify(json))
             /// const data = json.data;
            
              if (json.data) {
                  const data =  json.data
                   console.log("summary",json.data.questions[0])
                   this.setState({
                    // analysis: json.data.analysis,
                    // marks:json.data.marks,
                    questionsarray: json.data.questions,
                    testid: data.reference_id,
                        selectedItem: data.questions[0],
                        questionno: 0,
                        spinner: false
                   })
                  

              } else {
                this.setState({
                    questionsarray: [],
                    selectedItem: null,
                    questionno: 0,
                    spinner: false
                })
                alert(JSON.stringify(json.message))
                 
                alert(JSON.stringify(json.message))
               
              }
            }
      
            )
            .catch((error) =>  alert("stepup "+error))

       }

    renderItem({item,index}){
        console.log("itemmm",item)
        let viewstyle;
        let textstyle;
        if(item.is_correct){
            viewstyle=styles.circlefilled;
            textstyle=styles.circletext
        }else{
            viewstyle=styles.borderfilled;
            textstyle=styles.bordertext
        }
       return(
         <TouchableOpacity onPress={this.onItem.bind(this,item,index)} 
         style={viewstyle}>
         <Text style={textstyle}>{index+1}</Text>
         </TouchableOpacity>
        )
    }
    onItem(item,index){
        //alert(this.state.questionsarray.length)
        // if (index === this.state.questionsarray.length) {
        //     // this.setState({
        //     //     questionno: index+1
        //     // })
        // } else {
            this.setState({
                questionno: index
            }, () => {
                var nextItem = this.state.questionsarray[index];
                this.setState({
                    selectedItem: nextItem,

                }, () => console.log("arraya", this.state.selectedItem))
            })
      //  }
    }
    onNext(){
        this.scrollToIndex(this.state.questionno)
        if (this.state.questionno + 1 === this.state.questionsarray.length) {
           Alert.alert(
               'Step Up',
               'Are you sure you want to quit?',
               [
                {
                    text: "Cancel", onPress: () => {
                        //this.ongoback()
                    }
                },
                {
                    text: "Ok", onPress: () => {
                        Actions.pop()
                    }
                }

            ]
           )
        } else {
            this.setState({
                questionno: this.state.questionno + 1
            }, () => {
                var nextItem = this.state.questionsarray[this.state.questionno];
                this.setState({
                    selectedItem: nextItem,

                }, () => console.log("arraya", this.state.selectedItem))
            })
        }
    }
    
    onPrevious(){
        this.scrollToIndex(this.state.questionno)
        if (this.state.questionno - 1 === this.state.questionsarray.length) {
            alert("dfd")
            // this.setState({
            //     isvisible: true
            // })
            //this.onSubmit()
        } else {
            this.setState({
                questionno: this.state.questionno - 1
            }, () => {
                var nextItem = this.state.questionsarray[this.state.questionno];
                this.setState({
                    selectedItem: nextItem,

                }, () => console.log("arraya", this.state.selectedItem))
            })
        }
    }

    onSubmit(){
    //     var answerobj = this.state.answerobj
    //     var item = this.state.selectedItem;
    //     var questionno = item.questionno;
    //     var nextnumber = questionno
    //     var nextItem = data[nextnumber];
    //    // // alert(nextnumber-1)
    //    //  this.state.finalarray.map((res,i)=>{
    //    //      if(res.questionno === answerobj.questionno)
    //    //      {
    //    //          this.state.finalarray.splice(i,1)
    //    //      }
    //    //  })
    //    //  this.state.finalarray.push(answerobj)
    //    //  console.log("finalarr",this.state.finalarray)
    //     // this.setState({
    //     //     isvisible: true
    //     // })
    // Alert.alert(
    //     'Step Up',
    //     'Are you sure you want to quit?',
    //     [
    //      {
    //          text: "Cancel", onPress: () => {
    //              //this.ongoback()
    //          }
    //      },
    //      {
    //          text: "Ok", onPress: () => {
    //             Actions.pop()
    //          }
    //      }

    //  ]
    // )x
    Actions.pop()

        
    }
    onCancel(){
        this.setState({
            isvisible:false
        })
    }
    onsubmitmodal(){
        // this.setState({
        //     isvisible:false
        // },()=>{
        //    // console.log("final",this.state.finalarray)
        //     Actions.push('presummary')})
    }
    onBack(){
        Actions.pop()
    }
    onAnswer(res){
        // var question = this.state.selectedItem;
        // var answer = res;
        
        // var answerid = res.answerid
        // var questionno = this.state.selectedItem.questionno;
        // var question = this.state.selectedItem.question;
        // var correctanswer = this.state.selectedItem.correctanswer;
        // var result;
        // if(answerid === correctanswer){
        //     result = true;
        // }else{
        //     result = false
        // }
        // var obj = {
            
        //     questionno,
        //     question,
        //     answerid,
        //     correctanswer,
        //     result
        // }
        // this.setState({
        //     answerobj : obj
        // },()=>console.log("dddd",this.state.answerobj))
        // //finalarray.push(obj);
    }
     returnBoxColor = (option) => {
         const selectedItem =  this.state.selectedItem;
        let correct_answer = this.state.selectedItem?.correct_answer.split(',')
        console.log("correct_answer...",correct_answer,option.key);
        if ((selectedItem.is_correct && selectedItem.user_answer == option.key) || (!selectedItem.is_correct && correct_answer.includes(option.key))) {
          return 'green'
        } else if (!selectedItem.is_correct && selectedItem.user_answer && selectedItem.user_answer != option.key) {
          return 'lightgrey'
        }
        else if (!selectedItem.is_correct && selectedItem.user_answer == option.key) {
          return '#f14d65'
        }
        else {
          return 'lightgrey'
        }
      }

      rednerAnswerItem ({item,index}) {
       
       return(
        <TouchableOpacity style={{ flexDirection: 'row', marginTop:index > 0 ? 10: 0}} onPress={this.onAnswer.bind(this, item)}>
        <Text style={{ marginTop: 8, alignSelf: 'center' ,marginLeft:10}}>{alphabetarray[index]}. </Text>
        <View style={{width: '80%',
            borderWidth: 2,
            borderRadius:10,
            borderColor: this.returnBoxColor(item),
            marginLeft:10,
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
            // To set the font size change initial-scale=0.8 from MathJax class
            style={{ //backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
            width: '80%',
            // borderWidth: 2,
            // borderRadius:10,
            // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
            marginLeft:10,
            justifyContent:"center",
            alignSelf: 'flex-start',}} html={item.value} /></View>
    </TouchableOpacity>
    //     <TouchableOpacity style={{ flexDirection: 'row', marginTop:index > 0 ? 10: 0}}>
    //     <Text style={{ marginTop: 8, alignSelf: 'center' ,marginLeft:10}}>{alphabetarray[index]}. </Text>
    //     <MathJax
    //         // To set the font size change initial-scale=0.8 from MathJax class
    //         style={{
    //         width: '80%',
    //         borderWidth: 1,
    //         borderRadius:10,
    //         borderColor: this.returnBoxColor(item),
    //         marginLeft:10,
    //         justifyContent:"center",
    //         alignSelf: 'flex-start',}} html={item.value} />
    // </TouchableOpacity>
  
       )
    }
    getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
      )
    scrollToIndex = (index) => {
        let randomIndex = index;
        this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
      }

    render(){
      const { data } = this.props;
      const topicindata = data
        return(
    //         <View style={styles.mainview}>
        //     <View style={styles.topview}>
        //     <View style={{flex:1,justifyContent:"center",flexDirection:"row"}}>
        //         <View style={{flex:0.1,justifyContent:"center",alignItems:"center"}}>
        //         <TouchableOpacity onPress={this.onBack.bind(this)}>
        //     <Image source={require("../../assets/images/left-arrow.png")} style={styles.backimage}/>
           
        //     </TouchableOpacity>
        //         </View>
        //         <View style={{flex:0.8,justifyContent:"center",alignItems:"center"}}>
        //         <Text style={styles.toptext}>Review Solutions</Text>
        //         </View>
        //         <View style={{flex:0.1}}>
             
        //         </View>
            
          
        //     </View>
          
        //     </View>
        //     <View style={styles.mainbottomview}>
            
        //     <View style={styles.mainshadowview}>
         
        //     {this.state.questionsarray.length > 0 ?
        //     <View style={styles.listview}>
        //     <View style={styles.circlesview}>
        //    <FlatList data={this.state.questionsarray}
        //             renderItem={this.renderItem.bind(this)}
        //             horizontal={true}
        //             showsHorizontalScrollIndicator={false} />
        //     </View>
        //     <View style={styles.questionsview}>
        //     <ScrollView>
        //     <View style={styles.questioninnerview}>
        //     <Text style={styles.questionnum}>{this.state.questionno+1}.  </Text>
        //     <Text style={styles.questiontext}>{this.state.selectedItem.question.question.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        //     </View>
        //     {this.state.selectedItem.question.options.map((res,i)=>
        //     <View style={styles.answermain}>
        //     <View style={styles.answersub}>
        //     <Text style={styles.answernum}>{i+1}. </Text>
        //     <TouchableOpacity onPress={this.onAnswer.bind(this,res)} 
        //     style={[styles.answertextview,
        //         {borderColor: this.returnBoxColor(
        //             res,
        //           )}]}>
        //     <Text style={styles.answertext}>{res.value.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        //     </TouchableOpacity>
        //     </View>
        //     </View>
        //         )}
        //    <View style={{marginTop:20,marginLeft:10}}>
        //      <Text style={{fontSize:15,marginBottom:10}}>Solution :</Text>
        //      <View style={[styles.answertextview,{borderColor:"lightgrey"}]}>
        //      <Text>hello Enndrocrne system is one of the main communication systems.</Text>
        //      </View>
        //      </View>
        //       </ScrollView>
        //     </View>
            
        //     </View> : <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        //     <Text>Loading......</Text></View>}
        //     </View>
        //     </View>

        //     <View style={styles.bottomview}>
        //     <View style={styles.bottomleftview}>

        //         {this.state.questionno === 0  ? null : 
        //         <TouchableOpacity onPress={this.onPrevious.bind(this)}>
        //         <Text style={{fontSize:15}}>Previous</Text>
        //         </TouchableOpacity>
        //         }
        //     </View>
        //     <View style={styles.bottomrightview}>
        //      {this.state.questionno === this.state.questionsarray.length  ? 
        //             <TouchableOpacity onPress={this.onSubmit.bind(this)}>
        //         <Text style={{fontSize:15}}>Close</Text>
        //         </TouchableOpacity>
        //       : 
        //          <TouchableOpacity onPress={this.onNext.bind(this)}>
        //         <Text style={{fontSize:15}}>Next</Text>
        //         </TouchableOpacity> }
        //     </View>
        //     </View>
        //     </View> 
            <>
            <ImageBackground source={require('../../assets/images/dashboard/new/activitybg.jpg')}
          
            style={{width:"100%",height:"100%",backgroundColor:topicindata.color}} opacity={0.5}>
              <View style={{flex:1}}>
              <View style={{flex:0.08,flexDirection:"row"}}>
          <View style={{flex:1}}>

              <View style={{flex:1,marginLeft:20,flexDirection:"row",alignItems:"center"}}>
               
                <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Image source={require("../../assets/images/left-arrow.png")}
                  style={{ width: 25, height: 25, tintColor: "white",}} />
              </TouchableOpacity>
             
                <Text style={{ color: "white", fontSize: 18,marginLeft:10}}>{"Review Solutions"}</Text>
               
              </View>

              </View>
              {/* <View style={{flex:0.3,justifyContent:"center"}}>
              { topicindata.image !== "null" ?
              <Image source={{ uri: imageUrl + topicindata.image }} style={{ width: 100, height: 100, resizeMode: "contain", marginRight: 10, }} />

              : <Image source={require('../../assets/images/noimage.png')}
              style={{ width: 80, height: 80, resizeMode: "contain", marginRight: 10, }} />}
              </View> */}
          </View>
                <View style={{flex:0.84,backgroundColor:"white",marginLeft:10,marginRight:10,borderRadius:20,overflow:"hidden"}}>
                      {this.state.questionsarray.length > 0 ?
                        <View style={styles.listview}>
                        <View style={styles.circlesview}>
                    <FlatList data={this.state.questionsarray}
                     ref={(ref) => { this.flatListRef = ref; }}
                     initialScrollIndex={0}
                     getItemLayout={this.getItemLayout}
                        keyExtractor={(item, index) => String(index)}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} />
            </View>
            <View style={styles.questionsview}>
            <ScrollView>
            {/* <View style={styles.questioninnerview}>
            <Text style={styles.questionnum}>{this.state.questionno+1}.  </Text>
            <Text style={styles.questiontext}>{this.state.selectedItem.question.question.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            </View> */}
             <View style={{ flexDirection: 'row', paddingStart: 15, paddingEnd: 10 , marginTop:10}}>
                                            <Text style={{ fontSize: 13, marginTop: 10 }}>{this.state.questionno+1}.</Text>
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
                                                // To set the font size change initial-scale=0.8 from MathJax class
                                                style={{ borderRadius: 5,
                                                    width: '95%',
                                                    borderWidth: 0.5,
                                                    borderColor:"white",
                                                    alignSelf: 'center',}} html={this.state.selectedItem.question.question} />
                                        </View>
                                        <FlatList data={this.state.selectedItem.question.options}
                                              
                                                    keyExtractor={(item, index) => String(index)}
                                                    renderItem={this.rednerAnswerItem.bind(this)}
                                                    //horizontal={true}
                                                    showsHorizontalScrollIndicator={false} />
            {/* {this.state.selectedItem.question.options.map((item,i)=>
            // <View style={styles.answermain}>
            // <View style={styles.answersub}>
            // <Text style={styles.answernum}>{i+1}. </Text>
            // <TouchableOpacity onPress={this.onAnswer.bind(this,res)} 
            // style={[styles.answertextview,
            //     {borderColor: this.returnBoxColor(
            //         res,
            //       )}]}>
            // <Text style={styles.answertext}>{res.value.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            // </TouchableOpacity>
            // </View>
            // </View>
     
                )} */}
                {this.state.selectedItem.question.solution ? 
           <View style={{marginTop:20,marginLeft:10}}>
             <Text style={{fontSize:15,marginBottom:10}}>Solution :</Text>
             <View style={{width: '80%',
        borderWidth: 2,
        borderRadius:10,
        borderColor: "lightgrey",
        marginLeft:10,
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
        // To set the font size change initial-scale=0.8 from MathJax class
        style={{ //backgroundColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "transparent",
        width: '80%',
        // borderWidth: 2,
        // borderRadius:10,
        // borderColor: this.state.answerobj.user_answer === item.key ? topicindata.color : "lightgrey",
        marginLeft:10,
        justifyContent:"center",
        alignSelf: 'flex-start',}} html={this.state.selectedItem.question.solution} /></View>
             </View> : null}
              </ScrollView>
            </View>
            
            </View> : <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>Loading......</Text></View>}
                    </View> 
               
                <View style={{flex:0.08,flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,alignItems:"center"}}>
                    <View style={{flex:1,flexDirection:"row"}}>
                    {this.state.questionno === 0  ? <View style={{flex:0.5}}/> : 
                     <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-start"}}>

                 <TouchableOpacity style={{ height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
              justifyContent:"center",alignItems:"center"}} onPress={this.onPrevious.bind(this)}>
                   <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Previous</Text>
                       </TouchableOpacity></View> }
                       <View style={{flex:0.5,justifyContent:"flex-start",alignItems:"flex-end"}}>
                       {this.state.questionno + 1 === this.state.questionsarray.length ?
                         <TouchableOpacity style={{height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
                         justifyContent:"center",alignItems:"center"}} onPress={this.onSubmit.bind(this)}>
                  <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Done</Text>
                      </TouchableOpacity> :
                       <TouchableOpacity style={{height:30,width:100,borderRadius:20,backgroundColor:"white",paddingHorizontal:10,
                          justifyContent:"center",alignItems:"center"}} onPress={this.onNext.bind(this)}>
                   <Text style={{ textAlign:"center",fontSize:12,color:topicindata.color}}>Next</Text>
                       </TouchableOpacity>
                           }               
                           </View>
                    </View> 
           
  
                </View>
              </View>
            </ImageBackground>

      </>
      
            )
    }
}

export default PracticeSolutions;