import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./styles"

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
                    <View style={{flex:0.25,backgroundColor:this.state.selected === 'menu'?"lightgrey":"transparent",alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onMenu.bind(this)}>
			 <Image  source={require("../../assets/images/menu.png")} style={styles.footericon}/>
             </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.onPressIcon.bind(this,'bell')} style={{flex:0.25,backgroundColor:this.state.selected === 'bell'?"lightgrey":"transparent",alignItems:"center",justifyContent:"center"}}>
                    <Image  source={require("../../assets/images/bell.png")} style={styles.footericon}/>
                    </TouchableOpacity>
                    <View style={{flex:0.25,backgroundColor:this.state.selected === 'dashboard'?"lightgrey":"transparent",alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onPressIcon.bind(this,'dashboard')}>
             <Image  source={require("../../assets/images/home.png")} style={styles.footericon}/>
             </TouchableOpacity>
                    </View>
                    <View style={{flex:0.25,backgroundColor:this.state.selected === 'notifications'?"lightgrey":"transparent",alignItems:"center",justifyContent:"center"}}>
                            <TouchableOpacity onPress={this.onPressIcon.bind(this,'notifications')}>
                    <Image  source={require("../../assets/images/notification.png")} style={styles.footericon}/>
                    </TouchableOpacity>
                    {this.state.notification_count  ? 
                    <View style={{width:10,height:10,borderRadius:5,backgroundColor:"red",position:"absolute",alignSelf:"flex-end",top:10,right:30}}/> : null}
                    </View>
                    <View style={{flex:0.25,backgroundColor:this.state.selected === 'calendar'?"lightgrey":"transparent",alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity onPress={this.onPressIcon.bind(this,'calendar')}>
                    <Image  source={require("../../assets/images/calander.png")} style={styles.footericon}/>
                    </TouchableOpacity>
                    </View>
                </View>
          
             
             
          
             
			</View>
             
            </>
        );
    }
}
export default Footer;