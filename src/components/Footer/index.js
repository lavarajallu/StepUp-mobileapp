import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"
import { colors } from "../../constants"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:'dashboard',
            notification_count: null
        };
    }
    onMenu(){
       this.props.openControlPanel()

    }
    componentDidMount(){
        if(this.props.value){
            this.setState({
                selected:this.props.value
            })
        }
        if(this.props.notification_count){
        //    alert(this.props.notification_count)
            if(this.props.notification_count > 0){
                this.setState({
                    notification_count:this.props.notification_count
                })
            }
           
        }
    }
    onPressIcon(value){
        this.setState({selected:value},()=>{
         //   alert(value)
            if(value==="notifications"){
          
                Actions.push('notifications',{title:"tabs"})
            }else if(value==='dashboard'){
                Actions.push('dashboard')
            }else if ( value === 'bell'){
                Actions.push('announcements',{title:"tabs"})
            }else if(value === 'calendar'){
                Actions.push('calendar',{title:"tabs"})
            }
        })

        
    }

    render() {
        var { title } = this.props;
        return (
            <>
            <View style={styles.footerinnerview}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:0.25,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onMenu.bind(this)}>
			 <Image  source={require("../../assets/images/newmenu.png")} style={[styles.footericon,{tintColor:this.state.selected === 'menu'?colors.Themecolor:"#BABABA",}]}/>
             </TouchableOpacity>
                    </View>
                    <View style={{flex:0.25,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onPressIcon.bind(this,'bell')}>
                    <Image  source={require("../../assets/images/newbell.png")} style={[styles.footericon,{tintColor:this.state.selected === 'bell'?colors.Themecolor:"#BABABA",}]}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flex:0.25,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onPressIcon.bind(this,'dashboard')}>
             <Image  source={require("../../assets/images/newhome.png")} style={[styles.footericon,{tintColor:this.state.selected === 'dashboard'?colors.Themecolor:"#BABABA",}]}/>
             </TouchableOpacity>
                    </View>
                    <View style={{flex:0.25,alignItems:"center",justifyContent:"center"}}>
                            <TouchableOpacity onPress={this.onPressIcon.bind(this,'notifications')}>
                    <Image  source={require("../../assets/images/newnoti.png")} style={[styles.footericon,{tintColor:this.state.selected === 'notifications'?colors.Themecolor:"#BABABA",}]}/>
                    </TouchableOpacity>
                    {this.state.notification_count  ? 
                    <View style={{width:10,height:10,borderRadius:5,backgroundColor:"red",position:"absolute",alignSelf:"flex-end",top:10,right:30}}/> : null}
                    </View>
                    <View style={{flex:0.25,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onPressIcon.bind(this,'calendar')}>
                    <Image  source={require("../../assets/images/newcal.png")} style={[styles.footericon,{tintColor:this.state.selected === 'calendar'?colors.Themecolor:"#BABABA"}]}/>
                    </TouchableOpacity>
                    </View>
                </View>
          
             
             
          
             
			</View>
             
            </>
        );
    }
}
export default Footer;