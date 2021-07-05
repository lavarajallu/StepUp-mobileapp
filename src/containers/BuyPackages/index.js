import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, TextInput } from 'react-native'
import { CheckBox } from 'react-native-elements'
// import COLORS from '../styles/color';
// import MESSAGE from '../values/message';
// import DBMigrationHelper from '../dbhelper/DBMigrationHelper';
import LinearGradient from 'react-native-linear-gradient';
import SimpleToast from 'react-native-simple-toast';
import { baseUrl, colors } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import RazorpayCheckout from 'react-native-razorpay';
// import { STRING, url } from '../values/string';
// import GLOBALSTYLE from '../values/style';
// import { log } from 'react-native-reanimated';

var db, selectedItems = [], gst = '0', resourceBaseURL;

class BuyPackages extends Component {

    constructor(props) {
        super(props);

       // db = DBMigrationHelper.getInstance();
        this.state = {
            grades: [],
            isGradesAvailable: false,
            isLoading: true,
            isProcessing: false,
            referralCode: '',
            promoCode: '',
            ispromocodeApplied: false,
            promoCodeAppliedText: '',
            discountOnGrade: '',
            scratchCard: '',
            isScratchCardApplied: false,
            scratchCardAppliedText: '',
            discountedTotalAmount: 0,
            grandTotal: 0,
            amount: 0,
            discountedAmount: 0,
            amountWithGST: 0,
            gstText: '',
            proceedText: 'PROCEED',
            userDetails: '',
            orderID: '',
            token:"",
            userDetails:""
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
              this.getGradeData()
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

    getGradeData() {
       console.log("mndmdndf",this.state.userDetails.grade)
       var gDetail = [];
       this.state.userDetails.grade["isSelected"] = false
       gDetail.push(this.state.userDetails.grade)
       this.setState({
        grades: gDetail,
        isLoading: false,
        isGradesAvailable: true
    }, () => {

    });
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
        console.log("Selecteditemsss",selectedItems)
      //  if (selectedItems.length > 0) {
            this.setState({
                isProcessing: true
            })
           var url = baseUrl + "/payment/order"
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({amount: 101}),
            })
                .then((response) => response.json())
                .then((result) => {
                    this.setState({
                        isProcessing: false
                    });
                    console.log("resultresultresult",result)
                    if (!result) {
                        alert('Server error. Are you online?');
                        
                      }else{
                        const {  order_id } = result.data;

                        this.setState({
                                    orderID: order_id,
                                }, () => {
                                   // this.initiatePayment(data.Amount);
                                });

                      }
                  
                  

                    // if (responseJson.id.length > 0) {
                    //     this.setState({
                    //         orderID: responseJson.id,
                    //     }, () => {
                    //         this.initiatePayment(data.Amount);
                    //     });
                    // } else {
                    //     SimpleToast.show(MESSAGE.orderNotGenerated);
                    // }
                })
                .catch((error) => {
                    console.log("dklnkdnfkdf",error)
                    this.setState({
                        isProcessing: false,
                    });
                });
        // } else {
        //     SimpleToast.show(MESSAGE.selectSems);
        // }
    }

    async promoCodeAPI() {
        this.setState({
            isProcessing: true
        });

        return fetch(await url(STRING.baseURL) + STRING.getPromoCodeDetails + this.state.promoCode, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, responseJson]) => {
                this.setState({
                    isProcessing: false
                });

                console.log(responseJson);
                if (statusCode == 400) {
                    SimpleToast.show(responseJson.message);
                } else {
                    let amt;
                    if (responseJson.gradeId == null || responseJson.gradeId == 'null' || responseJson.gradeId == '') {
                        amt = this.state.amount - responseJson.promoDiscount;
                    } else if (selectedItems.includes(responseJson.gradeId)) {
                        amt = this.state.amount - responseJson.promoDiscount;
                    } else {
                        amt = this.state.amount;
                    }

                    this.setState({
                        discountedAmount: responseJson.promoDiscount,
                        discountedTotalAmount: responseJson.promoDiscount,
                        discountOnGrade: responseJson.gradeId,
                        // amount: (selectedItems.includes(responseJson.gradeId)) ? (this.state.amount - responseJson.promoDiscount) : this.state.amount,
                        amount: amt,
                        amountWithGST: 0,
                        ispromocodeApplied: true,
                        // promoCodeAppliedText: 'Promo discount ' + responseJson.promoDiscount + ' INR on ' + responseJson.gradeName,
                        promoCodeAppliedText: 'Promo code applied!',
                    }, () => {
                        this.calculateGST();
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isProcessing: false,
                });
            });
    }

    async scratchCardAPI() {
        if (selectedItems.length == 0) {
            SimpleToast.show(MESSAGE.zeroeGrades);
            return;
        }

        if (selectedItems.length > 1) {
            SimpleToast.show(MESSAGE.noMultipleGrades);
            return;
        }

        this.setState({
            isProcessing: true
        });

        console.log(await url(STRING.baseURL) + STRING.getScratchCardDetails + this.state.scratchCard);
        return fetch(await url(STRING.baseURL) + STRING.getScratchCardDetails + this.state.scratchCard, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, responseJson]) => {
                this.setState({
                    isProcessing: false
                });

                if (statusCode == 400) {
                    SimpleToast.show(responseJson.message);
                } else {
                    // db.getOneGrade(grade => {
                    //     if (grade == null) {
                    //         SimpleToast.show(MESSAGE.gradeNotEnrolled + responseJson.gradeName);
                    //     } else {
                    //         if (grade.transactionId != null && grade.transactionId != '' && grade.transactionId != 'null') {
                    //             SimpleToast.show(MESSAGE.gradeAlreadyPurchased);
                    //         } else {
                                this.setState({
                                    isScratchCardApplied: true,
                                    scratchCardAppliedText: 'Scratchcard applied on ' + responseJson.gradeName,
                                }, () => {
                                    this.updateSemesterAPI(null, responseJson);
                                })
                    //         }
                    //     }
                    // }, responseJson.gradeId);
                }
            })
            .catch((error) => {
                this.setState({
                    isProcessing: false,
                });
            });
    }

    initiatePayment(amount) {
        var options = {
            description: 'StepUp App',
            image: 'https://stepupimages.s3.ap-south-1.amazonaws.com/img_stepup_round.png',
            currency: 'INR',
            key: 'rzp_live_e6NDJMBj35YklJ',
            // key: 'rzp_test_T3tuSIDZofAwuF',
            amount: amount,
            name: this.state.userDetails.name,
            order_id: this.state.orderID,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
                email: this.state.userDetails.email,
                contact: this.state.userDetails.phoneNumber,
                name: this.state.userDetails.name
            },
            theme: { color: "blue"}
        }

        RazorpayCheckout.open(options).then((data) => {
            this.updateSemesterAPI(data, null);
        }).catch((error) => {
            SimpleToast.show(error.description);
        });
    }

    async updateSemesterAPI(orderData, scratchCardData) {

        try {
            let jsonArray = [], jsonObject = {}, fullURL = '';
            if (orderData == null) {
                fullURL = await url(STRING.baseURL) + STRING.paymentCallback + 'true';
                this.state.grades.forEach(element => {
                    if (element.GradeId == scratchCardData.GradeId) {
                        jsonArray[0] = {
                            // GradeId: scratchCardData.gradeId,
                            GradeId: selectedItems[0],
                            LanguageId: scratchCardData.languageID,
                            ActualAmount: element.actualAmount,
                            PaidAmount: 0,
                        };
                    }
                })

                jsonObject = {
                    EmailId: this.state.userDetails.email,
                    TransactionId: '',
                    OrderId: '',
                    SignatureId: '',
                    PromoCode: '',
                    ReferalCode: '',
                    ScratchCard: this.state.scratchCard,
                    GradesDetail: jsonArray,
                };
            } else {
                fullURL = await url(STRING.baseURL) + STRING.paymentCallback + 'false';
                let count = 0;
                this.state.grades.forEach(element => {
                    let discount = 0;
                    if (element.gradeId == this.state.discountOnGrade) {
                        discount = this.state.discountedTotalAmount;
                    } else {
                        discount = 0;
                    }
                    let gstAmount = (Number(element.actualAmount) * gst) / 100;

                    if (selectedItems.includes(element.gradeId)) {
                        jsonArray[count] = {
                            GradeId: element.gradeId,
                            LanguageId: element.languageId,
                            ActualAmount: element.actualAmount,
                            PaidAmount: ((Number(element.actualAmount) - discount) + gstAmount).toFixed(0),
                        }
                        count++;
                    }
                });

                jsonObject = {
                    EmailId: this.state.userDetails.email,
                    TransactionId: orderData.razorpay_payment_id,
                    OrderId: this.state.orderID,
                    SignatureId: orderData.razorpay_signature,
                    PromoCode: this.state.promoCode,
                    ReferalCode: this.state.referralCode,
                    ScratchCard: '',
                    GradesDetail: jsonArray,
                };
            }

            this.setState({
                isProcessing: true
            });

            console.log(fullURL);
            console.log(jsonObject);

            return fetch(fullURL, {
                method: 'POST',
                body: JSON.stringify(jsonObject),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isProcessing: false
                    });

                    if (responseJson.length > 0) {
                        db.updateGrades(data => {
                            if (data == 400) {
                                SimpleToast.show(MESSAGE.wentWrong);
                            } else {
                                this.setState({
                                    proceedText: 'PROCEED',
                                    promoCodeAppliedText: '',
                                    ispromocodeApplied: false,
                                }, () => {
                                    this.getUserData();
                                    this.props.navigation.replace('gradeActivity');
                                });
                            }
                        }, responseJson);
                    } else {
                        SimpleToast.show(MESSAGE.wentWrong);
                    }
                })
                .catch((error) => {
                    this.setState({
                        isProcessing: false,
                    });
                });
        } catch (error) {
            console.log(error);
        }


    }

    buttonPressed = () => {
        this.props.navigation.goBack(null)
    };
    onBack(){

    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <StatusBar hidden={true} />
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../assets/images/Mobile_bg_1.png')}
                />
                <Image
                    style={{ width: 150, height: 150, alignSelf: "flex-end", position: 'absolute', }}
                    source={require('../../assets/images/dash_image.png')}
                />
                <TouchableOpacity style={{ justifyContent: 'center', flex: 0.33, position: 'absolute', padding: 12 }}
                    onPress={this.onBack.bind(this)}>
                    <Image
                        style={{  height: 18, width: 23, marginLeft: 20}}
                        source={require('../../assets/images/refer/back.png')} />
                </TouchableOpacity>
                <Text style={{ marginTop: 35, padding: 12, textAlign: 'left', fontSize: 18, color: colors.Themecolor, position: 'absolute' }} >Buy Packages</Text>

                <View style={{ alignSelf: 'center', marginTop: 150, position: 'absolute', width: '80%', height: '55%' }}>
                    {this.state.isLoading
                        ?
                        <View style={{ margin: 15 }}>
                            <ActivityIndicator size="small" />
                        </View>
                        :
                        this.state.isGradesAvailable ?
                            <FlatList
                                data={this.state.grades}
                                style={{ alignSelf: 'center', width: '100%' }}
                                renderItem={({ item, index }) => (
                                    <View style={{ backgroundColor: "white", elevation: 4, 
                                    borderColor:"white", borderRadius: 10, margin: 6, flexDirection:"row", }}>
                                        <CheckBox
                                            disabled={item.transactionId != null && item.transactionId != '' && item.transactionId != 'null' ? true : false}
                                            title={item.gradeName}
                                            checked={item.isSelected}
                                            checkedIcon={<Image source={require('../../assets/images/check.png')} />}
                                            uncheckedIcon={(item.transactionId != null && item.transactionId != '' && item.transactionId != 'null') ? <Image source={require('../../assets/images/uncheck.png')} /> : <Image source={require('../../assets/images/uncheck.png')} />}
                                            containerStyle={{ backgroundColor: "white", borderColor: "white", justifyContent:"center",borderRadius: 10, height: 70 }}
                                            textStyle={{ color: (item.transactionId != null && item.transactionId != '' && item.transactionId != 'null') ? '#9f9e9e' : "black" }}
                                            onPress={() => this.onCheckBoxClick(item, index)}
                                             />
                                         {item.transactionId != null && item.transactionId != '' && item.transactionId != 'null' ?
                                            <Text style={{ color:"grey", position: 'absolute', bottom: 10, right: 20 }} numberOfLines={1}>Expiry on {item.endDate.substring(0, item.endDate.indexOf("T"))}</Text>
                                            : 
                                            <View style={{flexDirection:"row",justifyContent:"space-evenly",flex:1,alignItems:"center"}}>
                                            <Text style={{textAlign:"center"}}>{item.name}</Text>
                                             <Text style={{ color: "black", }} numberOfLines={1}>Price: {'\u20B9'}{"100"}</Text>
                                           </View>
                                }
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <Text style={{ paddingTop: 15, paddingBottom: 5, textAlign: 'center', fontSize: 16, color: ":darkgrey" }} >{"No"}</Text>
                    }
                </View>

                <View style={{ width: '100%', flexDirection: 'column', alignSelf: "center", position: 'absolute', bottom: 0 }}>
                    {/* <TouchableOpacity style={{ justifyContent: 'center', flex: 0.25 }} onPress={() => this.props.navigation.navigate('')}> */}
                    <View>
                        {this.state.isScratchCardApplied ?
                            <Text style={{ backgroundColor: "lightgrey", textAlignVertical: 'center', height: 40, marginTop: 5, paddingStart: 10 }}>{this.state.scratchCardAppliedText}</Text>
                            :
                            <TextInput style={{ backgroundColor: "lightgrey", height: 40, marginTop: 5, paddingStart: 10 }} placeholder="Having scratchcard?"
                                placeholderTextColor={"darkgrey"}
                                onChangeText={
                                    scratchCard => this.setState({ scratchCard })
                                }>
                            </TextInput>
                        }
                        <TouchableOpacity
                            style={{ 
                                alignSelf: 'flex-end', position: 'absolute', height: '100%',justifyContent:"center",alingnItems:"center"}}
                            onPress={() => { this.scratchCardAPI() }}>
                            {this.state.isScratchCardApplied ?
                                <Text style={{ color: "blue", paddingEnd: 8}}></Text>
                                :
                                <Text style={{ color: "blue", paddingEnd: 8 }}> APPLY </Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.state.ispromocodeApplied ?
                            <Text style={{ backgroundColor: "lightgrey", textAlignVertical: 'center', height: 40, marginTop: 5, paddingStart: 10 }}>{this.state.promoCodeAppliedText}</Text>
                            :
                            <TextInput style={{ backgroundColor: "lightgrey", height: 40, marginTop: 5, paddingStart: 10 }} placeholder="Having promo code?"
                                placeholderTextColor={"darkgrey"}
                                onChangeText={
                                    promoCode => this.setState({ promoCode })
                                }>
                            </TextInput>
                        }
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', position: 'absolute', height: '100%' ,justifyContent:"center", alignItems:"center"}}
                            onPress={() => { this.promoCodeAPI() }}>
                            {this.state.ispromocodeApplied ?
                                <Text style={{ height: '100%', textAlignVertical: 'center', color: "blue", paddingEnd: 8 }}></Text>
                                :
                                <Text style={{ color: "blue", paddingEnd: 8}}> APPLY </Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {/* <TextInput style={{ backgroundColor: COLORS.grey_light, height: 40, marginTop: 5, paddingStart: 10 }} placeholder="Having referral code?"
                        placeholderTextColor={COLORS.darkGrey}
                        onChangeText={
                            referralCode => this.setState({ referralCode })
                        }>
                    </TextInput> */}
                    <Text style={{ alignSelf: 'center' }}>{this.state.gstText}</Text>
                    {this.state.isProcessing ?
                        <LinearGradient colors={["orange", "pink"]} style={{ height: 35, borderRadius: 5, margin: 4, justifyContent: 'center' }}>
                            <ActivityIndicator color={"white"} />
                        </LinearGradient>
                        :
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.orderIDAPI()}>
                            <LinearGradient colors={[colors.Themecolor, colors.Themecolor]} 
                            style={{ height: 35, borderRadius: 5,  }}>
                                <Text style={styles.submitButtonText}>{this.state.proceedText}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                </View>
            </View >
        )
    }
}

export default BuyPackages

const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 20,
        marginBottom: 100,
        alignSelf: "center",
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    input: {
        padding: 8,
        height: 45,
        marginTop: 30,
        borderWidth: 0.01,
        borderRadius: 4,
        elevation: 2
    },
    submitButtonText: {
        color: "white",
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center'
    }
})