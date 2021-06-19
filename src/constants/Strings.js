'use strict';
import React, { useState, useEffect } from 'react';

export const Strings = {
  error: {
    email: 'Please enter a valid email address.',
    phoneNumber: 'Please enter a valid phone number.',
    pageNotFound: 'Page Not Found',
    '404': '404',
    error: 'Error',
    noRecFound: 'No Record Found!',
  },
  newdata : [
{
    questionno:1,
    question:"Hormones in Human being were secreted by which system?",
    correctanswer: 'A',
  
    time:2
},{
    questionno:2,
    question:"JEansssssss in Human being were secreted by which system?",
    correctanswer: "B",
    
     time:3
},{
    questionno:3,
    question:"dksfjkldsjfkldjfkl in Human being were secreted by which system?",
    correctanswer: "C",
 
     time:3
},
{
    questionno:4,
    question:"hellooooooo in Human being were secreted by which system?",
    correctanswer: "C",
  
     time:4
},
{
    questionno:5,
    question:"byeeeeeee in Human being were secreted by which system?",
    correctanswer: "C",
   
     time:5
}],

 data : [
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
    }],
    time:2
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
    }],
     time:3
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
    }],
     time:3
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
    }],
     time:4
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
    }],
     time:5
},{
    questionno:6,
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
    }],
     time:0
},{
    questionno:7,
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
    }],
     time:7
},{
    questionno:8,
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
    }],
     time:0
},
{
    questionno:9,
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
    }],
     time:3
},
{
    questionno:10,
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
    }],
     time:2
}]


};
