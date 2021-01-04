// export const _verifyOtp = (phoneNumber, otp, latitude, longitude) => async (dispatch, getState) => {
//     // const {
//     //   user: {longitude,latitude},
//     // } = getState().user;
//     try {
//         dispatch({ type: Types.AUTH_REQUEST });
//         const response = await Request({
//             path: API.verifyotp,
//             method: 'POST',
//             body: { phoneNumber, otp },
//         });
//         dispatch({ type: Types.AUTH_COMPLETE });
//         console.log('response response response ', response);
//         if (response.StatusCode == 200) {
//             dispatch(_getStores(phoneNumber, latitude, longitude, true));
//             // dispatch({type: Types.CHECKIN_SUCCESS, payload: response.ResponseData});
//             // setTimeout(() => {
//             //   goToStore();
//             // }, 1000);
//         } else {
//             Toast({ message: response.Message, type: 'error', delay: 4000 });
//         }
//     } catch (error) {
//         console.log('catch error ', error);
//         dispatch({ type: Types.CHECKIN_FAILED });
//         dispatch({ type: Types.AUTH_COMPLETE });
//         Toast({ message: error.message, type: 'error', delay: 4000 });
//     }
// };