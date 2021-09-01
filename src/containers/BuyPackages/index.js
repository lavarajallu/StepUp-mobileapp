import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, TextInput, ImageBackground } from 'react-native'
import { CheckBox } from 'react-native-elements'
// import COLORS from '../styles/color';
// import MESSAGE from '../values/message';
// import DBMigrationHelper from '../dbhelper/DBMigrationHelper';
import LinearGradient from 'react-native-linear-gradient';
import SimpleToast from 'react-native-simple-toast';
import RazorpayCheckout from 'react-native-razorpay';
import { baseUrl, colors } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var db, selectedItems = [], gst = '0', resourceBaseURL;
var interval;
class BuyPackages extends Component {

    constructor(props) {
        super(props);

        // db = DBMigrationHelper.getInstance();
        this.state = {
            seconds:120,
            timeup: false,
            token: "",
            userDetails: "",
            subjects: [],
            spinner: true,
            finalarray: [],
            total: 0,
            sgst: 0,
            cgst: 0,
            finaltotal: 0,
            promocode: "",
            activationcode: "",
            grouppackage: [],
            discount_amount: 0,
            discount_coupon: '',
            orderID: "",
            error: "",
            promostatus: false,
            promostatusref: '',
            // countdown:2,
            setMinutes: 0,
            setSeconds: 0,
        };
    }

    componentDidMount() {
        this.getData();

        // this.props.navigation.addListener(
        //     'didFocus',
        //     payload => {
        //         console.log("didFocus");
        //         this.getUserData();
        //     }
        // );
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user')
            //  alert(JSON.stringify(value))
            if (value !== null) {
                var data = JSON.parse(value)
                console.log("buyspackage", data)
                const token = await AsyncStorage.getItem('@access_token')
                if (token) {
                    this.setState({
                        token: JSON.parse(token),
                        userDetails: data
                    })
                    this.getsubjects()
                    // this.getanalytics(data, JSON.parse(token))
                } else {

                }

            } else {
                console.log("errorrr")
            }
        } catch (e) {
            return null;
        }
    }

    getsubjects() {
        var url = baseUrl + '/package/grade/' + this.state.userDetails.grade_id
        console.log("value", url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        }).then((response) =>

            response.json())
            .then((json) => {
                // alert(JSON.stringify(json))
                const data = json.data;
                if (data) {
                    console.log("dkcnkldnk", data)
                    if (data.subjectPackages) {
                        this.setState
                            ({
                                spinner: false,
                                subjects: data.subjectPackages,
                                grouppackage: data.groupPackage
                            })
                    } else {
                        this.setState
                            ({
                                spinner: false,
                                subjects: []
                            })
                    }
                    //  AsyncStorage.setItem('@access-token', data.access_token)
                    //  Actions.push('dashboard')
                } else {
                    // alert(JSON.stringify(json.message))
                    this.setState
                        ({
                            spinner: false,
                            subjects: []
                        })
                }
            }

            )
            .catch((error) => console.error(error))
        //Actions.push('boards')
    }

    onCheckBoxClick(item, index) {
        let gradeObj = this.state.grades;
        if (item.isSelected) {
            gradeObj[index].isSelected = false;
            selectedItems.splice(selectedItems.indexOf(item.gradeId), 1);

            let amt;
            if (this.state.discountOnGrade == null || this.state.discountOnGrade == 'null' || this.state.discountOnGrade == '') {
                amt = this.state.discountedAmount;
            } else if (selectedItems.includes(this.state.discountOnGrade)) {
                amt = this.state.discountedAmount;
            } else {
                amt = 0;
            }

            // let a = (selectedItems.includes(this.state.discountOnGrade)) ? this.state.discountedAmount : 0;
            let a = amt;
            let b = this.state.grandTotal - Number(item.actualAmount);

            this.setState({
                grades: gradeObj,
                discountedTotalAmount: a,
                grandTotal: b,
                amount: b - a,
                amountWithGST: 0,
            }, () => {
                this.calculateGST();
            })
        } else {
            // gradeObj[index].isSelected = true;
            // selectedItems[selectedItems.length] = item.gradeId;

            // let amt;
            // if (this.state.discountOnGrade == null || this.state.discountOnGrade == 'null' || this.state.discountOnGrade == '') {
            //     amt = this.state.discountedAmount;
            // } else if (selectedItems.includes(this.state.discountOnGrade)) {
            //     amt = this.state.discountedAmount;
            // } else {
            //     amt = 0;
            // }

            // // let a = (selectedItems.includes(this.state.discountOnGrade)) ? this.state.discountedAmount : 0;
            // let a = amt;
            // let b = this.state.grandTotal + Number(item.actualAmount);

            // this.setState({
            //     grades: gradeObj,
            //     discountedTotalAmount: a,
            //     grandTotal: b,
            //     amount: b - a,
            //     amountWithGST: 0,
            // }, () => {
            //     this.calculateGST();
            // })
        }
    }

    calculateGST() {
        let gstCharge = 0;
        if (gst == null) {
            gstCharge = (this.state.amount * 18) / 100;
            this.setState({
                gstText: "GST 18%: " + gstCharge,
                amountWithGST: this.state.amount + gstCharge,
            }, () => {
                this.setButtonText();
            })
        } else if (gst == '0') {
            this.setState({
                gstText: '',
                amountWithGST: this.state.amount + gstCharge,
            }, () => {
                this.setButtonText();
            })
        } else if (gst.length > 0) {
            gstCharge = (this.state.amount * Number(gst)) / 100;
            this.setState({
                gstText: "GST " + gst + "%: " + gstCharge,
                amountWithGST: this.state.amount + gstCharge,
            }, () => {
                this.setButtonText();
            })
        }
    }

    setButtonText() {
        if (this.state.isScratchCardApplied) {
            this.setState({
                proceedText: 'PROCEED'
            })
        } else {
            if (this.state.amountWithGST > 0) {
                this.setState({
                    proceedText: "PROCEED TO PAY " + this.state.amountWithGST + " INR"
                })
            } else {
                this.setState({
                    proceedText: 'PROCEED'
                })
            }
        }
    }

    async orderIDAPI() {
        //{ package_id: subject.package_id, package_name: subject.package_name, isGrade: false }
        console.log("kdmkdmf", this.state.grouppackage, "vvv", this.state.finalarray)
        var newobj;
        if (this.state.finalarray.length === this.state.subjects.length) {
            newobj = {
                "package_id": this.state.grouppackage[0].reference_id,
                "package_name": this.state.grouppackage[0].package_name,
                "isGrade": true,
                subjects: this.state.finalarray,
            }
        } else {
            newobj = {
                "package_id": this.state.finalarray[0].package_id,
                "package_name": this.state.finalarray[0].package_name,
                "isGrade": false,
                subjects: this.state.finalarray,
            }
        }

        let totalPackage = newobj
        console.log("ggggg", totalPackage)

        let data = {
            package: JSON.stringify(totalPackage),
            package_price: this.state.total,
            discount_amount: this.state.discount_amount,
            cgst: this.state.cgst,
            sgst: this.state.sgst,
            discount_coupon: this.state.discount_coupon,
            total_price: this.state.finaltotal,
            payment_type: 'PaymentGateWay'
        }

        console.log("Selecteditemsss", data)
        // //  if (selectedItems.length > 0) {
        this.setState({
            isProcessing: true
        })
        var url = baseUrl + "/payment/order"
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    isProcessing: false
                });
                console.log("resultresultresult", result)
                if (!result) {
                    alert('Server error. Are you online?');

                } else {
                    //    const { amount,  order_id, currency } = result.data;

                    console.log("donneeeeeee")
                    this.setState({
                        orderID: result.id,
                    }, () => {
                        this.initiatePayment(result);
                    });

                }
            })
    }

    async promoCodeAPI() {
        this.setState({
            isProcessing: true
        });
        var url = baseUrl + "/promoCode/validate/" + this.state.promocode
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("promocodeeedaa", result)
                if (result.statusCode === 200) {
                    console.log(result.data)
                    if (result.data.discount_type === 'Money') {
                        this.setState({
                            discount_amount: result.data.discount
                        })
                        // setDiscountAmount(result.data.data.max_discount)
                    }
                    else if (result.data.discount_type === 'Percentage') {
                        let percentage = (package_price * result.data.discount) / 100
                        // if (percentage <= result.data.data.max_discount) {
                        this.setState({
                            discount_amount: Math.round(percentage)
                        })
                        //   setDiscountAmount(Math.round(percentage))
                        // } else {
                        // setDiscountAmount(result.data.data.max_discount)
                        // }
                    }

                    // setError('')
                    this.setState({
                        error: "",
                        promostatus: true,
                        promostatusref: result.data.reference_id,
                        discount_coupon: this.state.promocode,
                        isProcessing: false

                    },()=>this.starttimer())
                    
                    // setPromoStatus(true)
                    // setPromoStatusRef(result.data.data.reference_id)
                    // setDiscountCoupon(values.promo)
                    // countdown(2)
                }
                else {
                    this.setState({
                        error: result.message,
                        promostatus: false,
                        promostatusref: '',
                        isProcessing:false,
                        discount_coupon: '',
                        //countdown:2
                    })
                    // console.log(result.data)
                    // setError(result.data.message)
                    // setPromoStatus(false)
                    // setPromoStatusRef('')
                    // setDiscountCoupon('')
                }

            })
           
                // this.setState({
                //     discount_amount: 100,
                //     error: "",
                //     promostatus: true,
                //     promostatusref: "dsdsdsd",
                //     discount_coupon: this.state.promocode,
                // },()=>this.starttimer())
           
    }
    starttimer() {
        var interval = setInterval(() => {
           if(this.state.seconds === 0){
            clearInterval(interval);
            this.setState({
                   timeup:true
               },()=>{
                   this.setState({
                       promostatus: false,
                       promocode:"",
                       seconds:121,
                       discount_amount:0,

                   })
               })
           }
               this.setState({ seconds: this.state.seconds - 1 })
           }, 1000)
       }



    initiatePayment(data) {
        var options = {
            description: 'Test Transaction',
            image: require('../../assets/images/logo_icon1.png'),
            currency: data.currency,
            key: 'rzp_test_2TAQIETR3fIP95',
            amount: data.amount.toString(),
            name: "Smartgen Corp",
            order_id: data.id,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
                name: this.state.userDetails.first_name + ' ' + this.state.userDetails.last_name,
                email: this.state.userDetails.email,
                contact: this.state.userDetails.mobile_number,
            },

            notes: {
                address: '',
            },
            theme: {
                color: '#61dafb',
            },

        }
        RazorpayCheckout.open(options).then((response) => {
           console.log("dfhjdhfkd",response)

//            { razorpay_signature: 'f16c45674273ea12ea49fc0a5646e6a08d972cd3191d17a3a31175ace9929699',
//   razorpay_order_id: 'order_Hnk5Ef54dlEyKW',
//   checkout_logo: 'https://cdn.razorpay.com/logo.png',
//   razorpay_payment_id: 'pay_Hnk5MRK8IYYNAT',
//   custom_branding: false,
//   org_name: 'Razorpay Software Private Ltd',
//   org_logo: '' }
            const newdata = {
                orderCreationId: data.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                reference_id:  data.id
            };

            var url = baseUrl + "/payment/success"
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify(newdata),
                headers: {
                    'Content-Type': 'application/json',
                    'token': this.state.token
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("razorradattaaaaaaa", result)
                    if (result.statusCode === 200) {
                        Actions.dashboard({ type: "reset" })
                    }

                })
        }).catch((error) => {
            SimpleToast.show(error.description);
        });
    }


    buttonPressed = () => {
        this.props.navigation.goBack(null)
    };
    onBack() {
Actions.dashboard({type:"reset"})
    }

    onCheck(item, value) {
        console.log("this.state.groupPackage", this.state.grouppackage)
        var newarray = [];
        var count = 0
        //   item.checked = value;
        if (this.state.finalarray.length > 0) {

            this.state.finalarray.map((res, i) => {
                if (res.reference_id === item.reference_id) {
                    this.state.finalarray.splice(i, 1)
                    count = 0
                } else {
                    count = count + 1
                }
            })
            if (count > 0) {
                item.checked = value;
                item.is_grade = false
                newarray.push(item)
                this.state.finalarray.push(item);
            } else {
                item.checked = value;
                item.is_grade = false
            }
        } else {
            item.checked = value;
            item.is_grade = false
            newarray.push(item)
            this.state.finalarray.push(item);

        }
        var totalval = 0
        var totalgst = 0
        this.state.finalarray.map((res, i) => {
            totalval = totalval + parseInt(res.package_cost);

        })

        totalgst = Math.round((totalval * 9) / 100, 2)
        if (this.state.finalarray.length === this.state.subjects.length) {
            console.log("finallllllllll....", parseInt(this.state.grouppackage[0].package_cost))
            totalval = parseInt(this.state.grouppackage[0].package_cost)
            totalgst = Math.round((this.state.grouppackage[0].package_cost * 9) / 100, 2)
        }
        this.setState({
            newarray: this.state.finalarray,
            total: totalval,
            sgst: totalgst,//this.state.finalarray.length*45,
            cgst: totalgst,//this.state.finalarray.length*45,
            finaltotal: parseInt(totalval + totalgst + totalgst)
        })
        // var finaltotal = this.state.total + this.state.sgst + this.state.cgst;
        // this.setState({
        //     finaltotal: finaltotal
        // })
        console.log("finall", this.state.finalarray)

    }
    renderItem({ item, index }) {
        return (
            <View style={{ flexDirection: "row", padding: 10, margin: 10, alignItems: 'center', width: windowWidth / 2.5 }}>
                {item.checked ?
                    <TouchableOpacity onPress={this.onCheck.bind(this, item, false)}>
                        <Image source={require("../../assets/images/check.png")} style={{
                            width: 17, height: 17, alignSelf: "center", tintColor: "#959595"
                        }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.onCheck.bind(this, item, true)}>
                        <Image source={require("../../assets/images/uncheck.png")} style={{
                            width: 17, height: 17, alignSelf: "center", tintColor: "#959595"
                        }} />
                    </TouchableOpacity>
                }

                <Text style={{ fontSize: 18, marginLeft: 10 }}>{item.subject_Name}</Text>
            </View>
        )
    }

    onPay() {
        this.orderIDAPI()
    }
    onactivationapply(){
        console.log("kdmkdmf", this.state.grouppackage, "vvv", this.state.finalarray)
        var newobj;
        if (this.state.finalarray.length === this.state.subjects.length) {
            newobj = {
                "package_id": this.state.grouppackage[0].reference_id,
                "package_name": this.state.grouppackage[0].package_name,
                "isGrade": true,
                subjects: this.state.finalarray,
            }
        } else {
            newobj = {
                "package_id": this.state.finalarray[0].package_id,
                "package_name": this.state.finalarray[0].package_name,
                "isGrade": false,
                subjects: this.state.finalarray,
            }
        }

        let totalPackage = newobj
        console.log("ggggg", totalPackage)

        let data = {
            package: JSON.stringify(totalPackage),
            package_price: this.state.total,
            discount_amount: this.state.discount_amount,
            cgst: this.state.cgst,
            sgst: this.state.sgst,
            discount_coupon: "",
            total_price: this.state.finaltotal,
            payment_type: 'ScratchCard',
            scratch_card: this.state.activationcode
        }

        console.log("Selecteditemsss", data)
        // //  if (selectedItems.length > 0) {
        this.setState({
            isProcessing: true
        })
        var url = baseUrl + "/payment/scratchOrder"
         fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            }
          })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    isProcessing: false
                });
                console.log("resultresultresult", result)
                
            })
            Actions.dashboard({type:"reset"})
        
    }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../assets/images/Mobile_bg_1.png')}>
                    <View style={{ flex: 0.15, flexDirection: "row" }}>
                        <View style={{ flex: 0.4, justifyContent: "space-evenly", paddingLeft: 20 }}>
                            <TouchableOpacity onPress={this.onBack.bind(this)}>
                                <Image
                                    style={{ height: 18, width: 23 }}
                                    source={require('../../assets/images/refer/back.png')} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, color: colors.Themecolor, }} >Buy Packages</Text>

                        </View>
                        <View style={{ flex: 0.6 }}>
                            <Image
                                style={{ width: 150, height: 150, alignSelf: "flex-end", }}
                                source={require('../../assets/images/dash_image.png')}
                            />
                        </View>

                    </View>
                    
                    <View style={{ flex: 0.9, }}>
                    <ScrollView>
                        {this.state.spinner ? <Text>Loading...</Text> :
                        this.state.subjects.length > 0 ?
                            <View style={{ marginHorizontal: 20, justifyContent: "center", marginBottom: 20 }}>
                                <FlatList data={this.state.subjects}
                                    renderItem={this.renderItem.bind(this)}
                                    // horizontal
                                    numColumns={2}
                                />
                            </View> : 
                            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                <Text>No Data</Text>
                            </View>

                        }
                        {this.state.total > 0 ?
                            <>
                               <>
                                <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TextInput style={{
                                        borderColor: "lightgrey", borderBottomWidth: 1,
                                        height: 50, paddingStart: 10, width: windowWidth / 1.5, fontSize: 18
                                    }}
                                        placeholder="Having Promocode?"
                                        placeholderTextColor={"darkgrey"}
                                        onChangeText={
                                            promocode => this.setState({ promocode })
                                        }>
                                    </TextInput>
                                    {this.state.promocode === "" ? null :
                                    <TouchableOpacity
                                        onPress={this.promoCodeAPI.bind(this)}
                                        style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18 }}>Apply</Text>
                                    </TouchableOpacity>}
                                </View>
                                {this.state.promocode === "" ? null :
                                this.state.error !== "" ? <Text style={{color:"red",marginLeft:20}}>Invalid Coupon</Text>: null}
                                </>
                                <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TextInput style={{
                                        borderColor: "lightgrey", borderBottomWidth: 1,
                                        height: 50, paddingStart: 10, width: windowWidth / 1.5, fontSize: 18
                                    }}
                                        placeholder="Having Activationcode?"
                                        placeholderTextColor={"darkgrey"}
                                        onChangeText={
                                            activationcode => this.setState({ activationcode })
                                        }>
                                    </TextInput>
                                    {this.state.activationcode === "" ? null :
                                    <TouchableOpacity
                                    onPress={this.onactivationapply.bind(this)}
                                     style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18 }}>Apply</Text>
                                    </TouchableOpacity>}
                                </View>
                                <View style={{ margin: 10 }}>
                                    <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>Price</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>₹ {this.state.total}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>CGST (9%)</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>₹ {this.state.cgst}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>SGST (9%)</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>₹ {this.state.sgst}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>Discount (-)</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>₹ {this.state.discount_amount}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 15, justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>Total</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "400" }}>₹ {this.state.finaltotal - this.state.discount_amount}</Text>
                                    </View>
                                </View>
                                    <TouchableOpacity onPress={this.onPay.bind(this)}
                                        style={{ flexDirection: "row", height:50, backgroundColor: colors.Themecolor,
                                         width: windowWidth / 2.5, alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, color: "white" }}>Pay Now </Text>
                                        {this.state.seconds !== 120 ? 
                                        <Text style={{ fontSize: 15, color: "white" }}>({parseInt(this.state.seconds / 60, 10)}:{parseInt(this.state.seconds % 60, 10)})</Text>:
                                        null}
                                    </TouchableOpacity> 
                            </> : null}
                    </ScrollView></View>

                </ImageBackground>
                {this.state.isProcessing ?
                         <View style={{ width: "100%", height: "100%", backgroundColor: "transparent", position: "absolute", justifyContent: "center", alignItems: "center" }}>
                             <ActivityIndicator color="black" />
                         </View>
                         : null}
            </View>
        )
    }
}

export default BuyPackages

