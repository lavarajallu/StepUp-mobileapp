const format = ['_REQUEST', '_COMPLETE'];
const types = [
    'DASHBOARD',
    'LOGIN',
    'REGISTER',
    'OTP',
    'AUTH'
];
export default {
    ...types
        .map(t => format.map(i => `${t}${i}`))
        .flat(1)
        .reduce((obj, v) => {
            obj[v] = v;
            return obj;
        }, {}),
    ...{
        RESET: 'RESET',
        CHECKIN_SUCCESS: 'CHECKIN_SUCCESS',
        CHECKIN_FAILED: 'CHECKIN_FAILED',
        CHECKIN_REQUEST: 'CHECKIN_REQUEST',
        CHECKIN_ADMIN_FAILED: 'CHECKIN_ADMIN_FAILED',
        CHECKIN_ADMIN_SUCCESS: 'CHECKIN_ADMIN_SUCCESS',
        LOGOUT: 'LOGOUT'

    },
};