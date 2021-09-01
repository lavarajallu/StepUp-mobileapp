import React from 'react'
import {View , Text,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProgressItem({ name, score, performedTests }) {
  console.log("score...",score);
  let statusText = score >= 80 ? '#016313' : score > 60 && score < 80 ? '#a3ba6d' : score >= 40 && score <= 60 ? '#d88414' : '#c44921'
  console.log("statusText...",statusText);
  const prgStatusStyle = {
    width:windowWidth/2.3,
    height: 80,
    flexWrap:"wrap",
    color: `${statusText === '#F94D48' ? "#fff" : statusText === '#D88212' ? "#000" : "#fff"}`,
    backgroundColor : performedTests > 0 ? statusText : 'grey',
    margin: 5,
  }

  return (
    <>
    
    <View style={{
        width:windowWidth/2.15,
        height: 80,
        color: `${statusText === '#F94D48' ? "#fff" : statusText === '#D88212' ? "#000" : "#fff"}`,
        backgroundColor : performedTests > 0 ? statusText : 'grey',
        alignItems:"center",
        margin: 5,
        justifyContent:"center",
    }}>
          <Text style={{color:prgStatusStyle.color,textAlign:"center"}}>{name}</Text>
      </View>
    
     
    </>
  )
}
