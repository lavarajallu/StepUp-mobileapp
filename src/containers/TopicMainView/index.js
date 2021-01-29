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
    FlatList,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {ProgressView} from "@react-native-community/progress-view";
import {ProgressBar} from '@react-native-community/progress-bar-android';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { colors } from "../../constants"
import Footer from '../../components/Footer'
const data = [
    {
        name: "Rational Numbers",
        image: require('../../assets/images/algebra.png'),
        insideimg: require('../../assets/images/math.png'),
        progress: 0.5,
        test: 6, read: 40
    },
     {
        name: "Rational Numbers",
        image: require('../../assets/images/algebra.png'),
        insideimg: require('../../assets/images/math.png'),
        progress: 0.5,
        test: 6, read: 40
    },
    ]
class TopicMainView extends Component {
    constructor(props){
        super(props)
            this.state={
                isvisible: false,
                newmodal:false
        }
    }
        renderItem({ item }) {
       
        var progress = 0+ (0.4 * Math.random())
    var percent = (item.progress) * 100;
    var color;
    if(percent > 50 ){
      color = "green"
    }else if (color< 50) {
      color = "red"
    }else{
      color = "orange"
    }
        return (
            <TouchableOpacity style={{ paddingVertical: 20 }}>
      <View  style={styles.rectview}>
        
          <View style={styles.subview}>
            <View style={styles.topsubview}>
          <View  style={{
            width: 944 /12,
            height: 912 / 12,
            justifyContent: 'center',
            alignItems:"center",
            backgroundColor: 'white',
            marginTop:10,
            marginLeft:10,
            borderRadius: 20
            //left: -240,
          }}><Image source={item.image} style={{width:96/1.5,height:96/1.5}} />
          </View>
            </View>
            <View style={styles.bottomsubview}>
              <Text style={styles.subjectname}>{item.name}</Text>
              {Platform.OS === 'android' ?
                <View style={styles.progressview}>
                  <View style={styles.progresstextview}>
                    <Text style={styles.progresstext}>Progress</Text>
                    <Text style={styles.progresstext}>{percent}%</Text></View>
                    {Platform.OS === 'android' ? 
                     <ProgressBar
                          color={color}
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={0.5}
                          />
                     :
                  <ProgressView
                            progressTintColor="orange"
                            trackTintColor="blue"
                            progress={0.7}
                  />}</View> : null}

              <View style={styles.countview}>
               </View>
            </View>
          </View>
        </View>
        </TouchableOpacity>
        )
    }
    onBack(){
        if(this.props.from === 'topics'){
           Actions.topics();
        }else{
           Actions.dashboard();
        }
       
    }
    onPreasses(){
      this.setState({
        isvisible:true
      })
    }
    onstarttest(){
         this.setState({
        isvisible:false
      },()=>
      this.setState({
        newmodal:true
      })
      )
    }
    onOk(){
        this.setState({
            newmodal:false
        },()=>Actions.push('postassesment'))
    }
     onCancel(){
        this.setState({
            newmodal:false
        })
    }
    onReview(){
         this.setState({
        isvisible:false
      },()=>
      Actions.push('reviewpostsummary')
      )
       
    }
    onBackdrop(){
    this.setState({
      newmodal:false,
    })
  }
  onObjectass(){
    Actions.push('objectassesment')
  }
   render(){
    return(
        <View style={styles.mainview}>
            <View style={styles.topview}>
            <TouchableOpacity onPress={this.onBack.bind(this)}>
            <Image source={require("../../assets/images/left-arrow.png")} style={{width:32,height:32,tintColor:colors.Themecolor}}/>
           </TouchableOpacity>
            </View>
            <View style={styles.middleview}>
             
             <ScrollView>
             <View style={{flex:1}}>
             <View style={{width:windowWidth/2.5,height:windowHeight/6,backgroundColor: '#EE5B7B',alignSelf:"center",borderRadius: 15,}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <Image source={require('../../assets/images/sample.png')} style={{width:350/3.5,height:379/3.5,alignSelf:"center"}}/>
              
             </View>
             </View>
             <Text style={{textAlign:"center",fontSize:20,marginVertical: 10}}>Introduction</Text>

             <View style={{padding:5,margin:10,backgroundColor: 'white' , shadowOffset: { width: 0, height: 5 },//marginBottom:20,
          shadowOpacity: 1,
          shadowRadius: 5,
          borderRadius: 10,
          elevation: 10,shadowColor:"grey"}}>

             <Text style={{alignSelf:"center"}}>Icon Resource</Text>
              <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor: 'white',marginTop:10}}>
                <View style={{justifyContent:"space-between"}}>
                     <Image source={require("../../assets/images/preicon.png")} style={{width:104/4,height:135/4,alignSelf:"center"}}/>
                     <Text style={{fontSize:10,textAlign:"center"}}>Pre{"\n"}Assesment</Text>
                </View>
                 <Image source={require("../../assets/images/left-arrow.png")} 
                 style={styles.forwardarr}/>
                <View  style={{justifyContent:"space-around"}}>

                 <Image source={require("../../assets/images/notesicon.png")} style={{width:114/4,height:135/4,alignSelf:"center"}}/>
                  <Text style={{fontSize:10,textAlign:"center" }}>Notes</Text>
             </View>
              <Image source={require("../../assets/images/left-arrow.png")} 
              style={styles.forwardarr}/>
             <View style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/videoicon.png")} style={{width:152/4.5,height:134/4.5,alignSelf:"center"}}/>
              <Text style={{fontSize:10,textAlign: 'center' }}>Videos</Text>
             </View>
              <Image source={require("../../assets/images/left-arrow.png")} 
              style={styles.forwardarr}/>
             <View style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/yticon.png")} style={{width:127/3.5,height:91/3.5,alignSelf:"center"}}/>
             <Text style={{fontSize:10,textAlign: 'center' }}>Youtube{"\n"}Videos</Text>
             </View>
              <Image source={require("../../assets/images/left-arrow.png")} 
              style={styles.forwardarr}/>
              <TouchableOpacity onPress={this.onPreasses.bind(this)}   style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/posticon.png")} style={{width:104/4,height:135/4,alignSelf:"center"}}/>
 <Text style={{fontSize:10,textAlign: 'center' }}>Post{"\n"}Assesment</Text>
             </TouchableOpacity>
              </View>
             </View>


              <View style={{padding:5,margin:10,backgroundColor: 'white' , shadowOffset: { width: 0, height: 5 },//marginBottom:20,
          shadowOpacity: 1,
          shadowRadius: 5,
          borderRadius: 10,
          elevation: 10,shadowColor:"grey"}}>

             <Text style={{alignSelf:"center"}}>Teacher Resource</Text>
              <View style={{flexDirection:"row",justifyContent:"center",backgroundColor: 'white',marginTop:10}}>
             <View style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/videoicon.png")} style={{width:152/4.5,height:134/4.5,alignSelf:"center"}}/>
              <Text style={{fontSize:10,textAlign: 'center' }}>Videos</Text>
             </View>
              <Image source={require("../../assets/images/left-arrow.png")} 
              style={styles.teacheforwardarr}/>
             <View style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/ppticon.png")} style={{width:125/3.5,height:147/3.5,alignSelf:"center"}}/>
             <Text style={{fontSize:10,textAlign: 'center' }}>ppt</Text>
             </View>
              <Image source={require("../../assets/images/left-arrow.png")} 
              style={styles.teacheforwardarr}/>
              <View style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/pdficon.png")} style={{width:120/4,height:156/4,alignSelf:"center"}}/>
 <Text style={{fontSize:10,textAlign: 'center' }}>pdf</Text>
             </View>
             <Image source={require("../../assets/images/left-arrow.png")} 
             style={styles.teacheforwardarr}/>
              <TouchableOpacity  onPress={this.onObjectass.bind(this)} style={{justifyContent:"space-around"}}>
             <Image source={require("../../assets/images/objicon.png")} style={{width:160/4,height:151/4,alignSelf:"center"}}/>
 <Text style={{fontSize:10,textAlign: 'center' }}>Object{"\n"}Assesment</Text>
             </TouchableOpacity>
              </View>
             </View>
              <View style={{padding:5,margin:10,backgroundColor: 'white' , shadowOffset: { width: 0, height: 5 },//marginBottom:20,
          shadowOpacity: 1,
          shadowRadius: 5,
          borderRadius: 10,
          elevation: 10,shadowColor:"grey"}}>
          <Text style={{marginLeft:20,marginTop:10,fontSize: 15}}>Recommended Topics</Text>
          <FlatList data={data}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} />
          </View>
            
             </View>
             </ScrollView>

            </View>
            <View style={styles.footerview}>

            <Footer/>
            </View>
               <Modal isVisible={this.state.isvisible} onBackdropPress={this.onBackdrop.bind(this)} style={{justifyContent:"center",margin:0}}>
                <View style={{ flex: 1,justifyContent:"flex-end" }}>
                <View style={{padding:20,backgroundColor: 'white',borderTopLeftRadius: 15,borderTopRightRadius: 15}}>
                 <Text style={{marginLeft:10,fontSize: 20}}>Go With..</Text>
                 <TouchableOpacity onPress={this.onReview.bind(this)} style={{flexDirection: 'row',marginLeft:20,marginTop:10}}>
                 <Image source={require("../../assets/images/icon_1.png")} style={{width:28,height:28,}}/>
                  <Text style={{marginLeft:15,fontSize:20}}>Review Previous Test</Text>
                  </TouchableOpacity>
                   <TouchableOpacity onPress={this.onstarttest.bind(this)} style={{flexDirection: 'row',marginLeft:20,marginTop:10}}>
                     <Image source={require("../../assets/images/icon_2.png")} style={{width:28,height:28}}/>
                      <Text style={{marginLeft:15,fontSize:20}}>Start New Test</Text>
                      </TouchableOpacity>
                  </View>
                </View>
             </Modal>
             <Modal isVisible={this.state.newmodal}>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
        <View style={{padding:10,backgroundColor: 'white',borderRadius: 15,marginVertical: 15}}>
          <Text style={{color:"black",fontSize: 20,textAlign: 'center',marginTop:10}}>Your are finished with your Post Assesment</Text>
          <Text style={{fontSize: 15,marginHorizontal:30,textAlign: 'center',marginTop:10}}>Your score is: 1/5</Text>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop:10}}>Do you want to try again?</Text>
         <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:20 }}>
           <TouchableOpacity onPress={this.onOk.bind(this)}>
           <LinearGradient colors={['#239816', '#32e625']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
           <Text>OK</Text>
           </LinearGradient>
           </TouchableOpacity>
             <TouchableOpacity onPress={this.onCancel.bind(this)}>
              <LinearGradient colors={['#f14d65', '#fc8798']} style={{paddingHorizontal: 30,paddingVertical: 10,borderRadius: 20}}>
              <Text>CANCEL</Text>
               </LinearGradient>
           </TouchableOpacity>
           </View>
           <Text style={{fontSize: 15,textAlign: 'center',marginTop:10}}>You can take the test again</Text>
           <Text style={{fontSize: 15,textAlign: 'center',marginTop:5}}>We Will keep the heighest score</Text>
          </View>
        </View>
      </Modal>
            </View> 
        )
   }
}
export default TopicMainView;