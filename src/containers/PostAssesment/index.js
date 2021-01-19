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
    FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
{
    questionno:1,
    question:"Hormones in Human being were secreted by which system?",
    correctanswer: 'A',
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
    questionno:2,
    question:"JEansssssss in Human being were secreted by which system?",
    correctanswer: "B",
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
},
{
    questionno:4,
    question:"hellooooooo in Human being were secreted by which system?",
    correctanswer: "C",
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
},
{
    questionno:5,
    question:"byeeeeeee in Human being were secreted by which system?",
    correctanswer: "C",
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
class PostAssesment extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedItem:data[0],
            previousItem:null,
            isvisible:false,
            finalarray: [],
            answerobj:{}
        }
    }
    renderItem({item}){
        let viewstyle;
        let textstyle;
        if(this.state.selectedItem === item){
            viewstyle=styles.circlefilled;
            textstyle=styles.circletext
        }else{
            viewstyle=styles.borderfilled;
            textstyle=styles.bordertext
        }
       return(
         <TouchableOpacity onPress={this.onItem.bind(this,item)} 
         style={viewstyle}>
         <Text style={textstyle} >{item.questionno}</Text>
         </TouchableOpacity>
        )
    }
    onItem(item){
        this.setState({
            selectedItem:item,
        })
    }
    onNext(){
        var answerobj = this.state.answerobj
        var item = this.state.selectedItem;
        var questionno = item.questionno;
        var nextnumber = questionno
        var nextItem = data[nextnumber];
        this.state.finalarray.map((res,i)=>{
            if(res.questionno === answerobj.questionno)
            {
                this.state.finalarray.splice(i,1)
            }
        })
        this.state.finalarray.push(answerobj)
        this.setState({
            selectedItem : nextItem,
           
        },()=>console.log("arraya",this.state.finalarray))
    }
    onPrevious(){
        var item = this.state.selectedItem;
        var questionno = item.questionno;
        //alert(questionno)
        var prenumber = questionno-1
        var preItem = data[prenumber-1];
        this.setState({
            selectedItem : preItem
        })
    }

    onSubmit(){
        var answerobj = this.state.answerobj
        var item = this.state.selectedItem;
        var questionno = item.questionno;
        var nextnumber = questionno
        var nextItem = data[nextnumber];
       // alert(nextnumber-1)
        this.state.finalarray.map((res,i)=>{
            if(res.questionno === answerobj.questionno)
            {
                this.state.finalarray.splice(i,1)
            }
        })
        this.state.finalarray.push(answerobj)
        console.log("finalarr",this.state.finalarray)
        this.setState({
            isvisible: true
        })
        
    }
    onCancel(){
        this.setState({
            isvisible:false
        })
    }
    onsubmitmodal(){
        this.setState({
            isvisible:false
        },()=>{
            Actions.push('postsummary')
            console.log("final",this.state.finalarray)})
    }
    onAnswer(res){
        var question = this.state.selectedItem;
        var answer = res;
        
        var answerid = res.answerid
        var questionno = this.state.selectedItem.questionno;
        var question = this.state.selectedItem.question;
        var correctanswer = this.state.selectedItem.correctanswer;
        var result;
        if(answerid === correctanswer){
            result = true;
        }else{
            result = false
        }
        var obj = {
            
            questionno,
            question,
            answerid,
            correctanswer,
            result
        }
        this.setState({
            answerobj : obj
        },()=>console.log("dddd",this.state.answerobj))
        //finalarray.push(obj);
    }

    render(){
        return(
                <View style={styles.mainview}>
            <View style={styles.topview}>
            <Text style={styles.toptext}>Post Assesment</Text>
            </View>
            <View style={styles.mainbottomview}>
            <View style={styles.mainshadowview}>
            <View style={styles.headerview}>
            <View style={styles.headerleftview}>
            <Text style={styles.headtext}>Introduction</Text>
            </View>
            <View style={styles.headrightview}>
             <ImageBackground source={require('../../assets/images/timerview.png')} style={{flexDirection:"row",justifyContent:"center",width:187/2,height:82/2}}>
            <Image source={require('../../assets/images/timer.png')} style={{width:25,height:25,alignSelf:"center",marginRight:10}}/>
            <Text style={styles.timertext}>5:00</Text>
           
            </ImageBackground>
            </View>
            </View>
            <View style={styles.listview}>
            <View style={styles.circlesview}>
           <FlatList data={data}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} />
            </View>
            <View style={styles.questionsview}>
            <View style={styles.questioninnerview}>
            <Text style={styles.questionnum}>{this.state.selectedItem.questionno}. </Text>
            <Text style={styles.questiontext}>{this.state.selectedItem.question}</Text>
            </View>
            {this.state.selectedItem.answers.map((res,i)=>
            <View style={styles.answermain}>
            <View style={styles.answersub}>
            <Text style={styles.answernum}>{res.answerid}. </Text>
            <TouchableOpacity onPress={this.onAnswer.bind(this,res)} 
            style={[styles.answertextview,{borderColor:this.state.answerobj.answerid === res.answerid ?  "red":"lightgrey",}]}>
            <Text style={styles.answertext}>{res.title}</Text>
            </TouchableOpacity>
            </View>
            </View>
                )}
         
            </View>
            </View>
            </View>
            </View>
            <View style={styles.bottomview}>
            <View style={styles.bottomleftview}>

                {this.state.selectedItem.questionno === 1  ? null : 
                <TouchableOpacity onPress={this.onPrevious.bind(this)}>
                <Text style={{fontSize:20}}>Previous</Text>
                </TouchableOpacity>
                }
            </View>
            <View style={styles.bottomrightview}>
             {this.state.selectedItem.questionno === data.length  ? 
                    <TouchableOpacity onPress={this.onSubmit.bind(this)}>
                <Text style={{fontSize:20}}>Submit</Text>
                </TouchableOpacity>
              : 
                 <TouchableOpacity onPress={this.onNext.bind(this)}>
                <Text style={{fontSize:20}}>Next</Text>
                </TouchableOpacity> }
            </View>
            </View>
            <Modal isVisible={this.state.isvisible}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15}}>
         <Image source={require("../../assets/images/finger.png")} style={{width:96/1.5,height:96/1.5,alignSelf: 'center'}}/>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop:10}}>Are you sure you want to submit assesment?</Text>
         <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:20 }}>
           <TouchableOpacity onPress={this.onsubmitmodal.bind(this)} >
           <LinearGradient colors={['#239816', '#32e625']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text style={{color:"white"}}>SUBMIT</Text>
           </LinearGradient>
           </TouchableOpacity>
             <TouchableOpacity onPress={this.onCancel.bind(this)}>
           <LinearGradient colors={['#f14d65', '#fc8798']}   style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text style={{color:"white"}}>CANCEL</Text>
           </LinearGradient>
           </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
            </View>
            )
    }
}

export default PostAssesment;