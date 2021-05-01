// @flow
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
  const token = getLoggedInUser()

  if (!token) {
    return false
  }
  const decoded = jwtDecode(token)
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    console.warn('access token expired')
    return false
  } else {
    return true
  }
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  const token = await AsyncStorage.getItem('@access-token')
  const user =  await AsyncStorage.getItem('@user')

  return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
}

export { isUserAuthenticated, getLoggedInUser }
