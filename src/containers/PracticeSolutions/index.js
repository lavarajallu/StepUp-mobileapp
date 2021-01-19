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
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
            answerobj:{}
        }
    }
    renderItem({item}){
        let viewstyle;
        let textstyle;
        if(item.correctanswer === item.attempted){
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
        // this.state.finalarray.map((res,i)=>{
        //     if(res.questionno === answerobj.questionno)
        //     {
        //         this.state.finalarray.splice(i,1)
        //     }
        // })
       // this.state.finalarray.push(answerobj)
        this.setState({
            selectedItem : nextItem,
           
        })
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
       // // alert(nextnumber-1)
       //  this.state.finalarray.map((res,i)=>{
       //      if(res.questionno === answerobj.questionno)
       //      {
       //          this.state.finalarray.splice(i,1)
       //      }
       //  })
       //  this.state.finalarray.push(answerobj)
       //  console.log("finalarr",this.state.finalarray)
        // this.setState({
        //     isvisible: true
        // })
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

    render(){
        var color = "grey"
        for(var i = 0 ; i <this.state.selectedItem.answers.length ; i++){
                // Set the path to filled stars
        
             if(this.state.selectedItem.answers[i].attempted === this.state.selectedItem.answers[i].correctanswer){
                color="green"
             }else if (this.state.selectedItem.answers[i].attempted !=  this.state.selectedItem.answers[i].answerid){
                color="pink"
             }else{
                color = "grey"
             }
            // Push the Image tag in the stars array
            //stars.push((<Image style={{width:157/3.5,height:77/3.5,}} source={path} />));
        }
        return(
                <View style={styles.mainview}>
            <View style={styles.topview}>
            <View style={{flex:0.1,justifyContent:"center"}}>
            <TouchableOpacity onPress={this.onBack.bind(this)}>
            <Image source={require("../../assets/images/left-arrow.png")} style={styles.backimage}/>
            </TouchableOpacity>
            </View>
            <View style={{flex:0.2,justifyContent:"flex-start"}}>
            <Text style={styles.toptext}>Practice</Text>
            </View>
            </View>
            <View style={styles.mainbottomview}>
            
            <View style={styles.mainshadowview}>
            <View style={styles.headerview}>
            <Text style={{color:"orange"}}>Chapter-1</Text>
            </View>
            <View style={styles.listview}>
            <View style={styles.circlesview}>
           <FlatList data={data}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} />
            </View>
            <View style={styles.questionsview}>
            <ScrollView>
            <View style={styles.questioninnerview}>
            <Text style={styles.questionnum}>{this.state.selectedItem.questionno}. </Text>
            <Text style={styles.questiontext}>{this.state.selectedItem.question}</Text>
            </View>
            {this.state.selectedItem.answers.map((res,i)=>
            <View style={styles.answermain}>
            <View style={styles.answersub}>
            <Text style={styles.answernum}>{res.answerid}. </Text>
            <TouchableOpacity onPress={this.onAnswer.bind(this,res)} 
            style={[styles.answertextview,
                {borderColor: this.state.selectedItem.result && res.answerid === this.state.selectedItem.correctanswer ? "green" : 
                    res.answerid === this.state.selectedItem.correctanswer ?  "green":
                    res.answerid === this.state.selectedItem.attempted ?
                    "red" : "lightgrey"}]}>
            <Text style={styles.answertext}>{res.title}</Text>
            </TouchableOpacity>
            </View>
            </View>
                )}
           <View style={{marginTop:20,marginLeft:10}}>
             <Text style={{fontSize:15,marginBottom:10}}>Solution :</Text>
             <View style={[styles.answertextview,{borderColor:"grey"}]}>
             <Text>hello Enndrocrne system is one of the main communication systems.</Text>
             </View>
             </View>
              </ScrollView>
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
                <Text style={{fontSize:20}}>Close</Text>
                </TouchableOpacity>
              : 
                 <TouchableOpacity onPress={this.onNext.bind(this)}>
                <Text style={{fontSize:20}}>Next</Text>
                </TouchableOpacity> }
            </View>
            </View>
            </View>
            )
    }
}

export default PracticeSolutions;