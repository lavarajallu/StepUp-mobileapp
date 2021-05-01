// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FORGET_PASSWORD,
} from './constants'

import {
  loginUserSuccess,
  loginUserFailed,
  registerUserSuccess,
  registerUserFailed,
  forgetPasswordSuccess,
  forgetPasswordFailed,
} from './actions'

import { baseAxios } from '../../api/axios'
import { apiEndPoints } from '../../api/variables'
const fetchJSON = (url, options = {}) => {
  // let api_url=`${apiEndPoint.baseUrl}${url}`
  // console.log(api_url);
  return fetch(url, options)
    .then(response => {
      if (!response.status === 200) {
        throw response.json()
      }
      return response.json()
    })
    .then(json => {
      return json
    })
    .catch(error => {
      throw error
    })
}
/**
 * Sets the session
 * @param {*} user
 */
const setSession = user => {
  console.log(user)
    
  if (user) AsyncStorage.setItem('@user', JSON.stringify(user))
  else AsyncStorage.removeItem('@user', JSON.stringify(user))
}
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {


  console.log("hiiiii")
  const options = {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.authEndPoints.login,
      { email: username, password },
    )
    if (response.data) {
      
      setSession(response.data.data)
      yield put(loginUserSuccess(response.data.data))
     // yield put(initMenu())
    }
  } catch (error) {
    console.log("error",error)

    yield put(loginUserFailed(error.response.data.message))
    setSession(null)
  }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
  try {
    setSession(null)
    yield call(() => {
      history.push('/account/login')
    })
  } catch (error) {}
}

/**
 * Register the user
 */
 function* register({ payload: data }) {

  const options = {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.authEndPoints.register,
      data,
    )
    if (response.data) {
      
      setSession(response.data.data)
      yield put(registerUserSuccess(response.data.data))
     // yield put(initMenu())
    }
  } catch (error) {
    console.log("error",error)

    yield put(registerUserFailed(error.response.data.message))
    setSession(null)
  }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
  const options = {
    body: JSON.stringify({ username }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const response = yield call(fetchJSON, '/users/password-reset', options)
    yield put(forgetPasswordSuccess(response.message))
  } catch (error) {
    let message
    switch (error.status) {
      case 500:
        message = 'Internal Server Error'
        break
      case 401:
        message = 'Invalid credentials'
        break
      default:
        message = error
    }
    yield put(forgetPasswordFailed(message))
  }
}

function* authSaga() {
  yield all([
    yield takeEvery(LOGIN_USER, login),
    yield takeEvery(LOGOUT_USER, logout),
    yield takeEvery(REGISTER_USER, register),
    yield takeEvery(FORGET_PASSWORD, forgetPassword),
  ])
}

export default authSaga
