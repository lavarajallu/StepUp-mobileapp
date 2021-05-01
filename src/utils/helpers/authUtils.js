// @flow
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = async () => {
  const token = await getLoggedInUser()
   console.log("userrr",token)
  if (!token) {
    return false
  }
  const decoded = jwtDecode(user.access_token)
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
const getLoggedInUser = async () => {
  try {
    const token = await AsyncStorage.getItem('@access_token');
    console.log("tokentoken",typeof token)
    return token ? (typeof token === 'string' ? token : JSON.parse(token)) : null

  } catch (error) {
    console.log("jkljsdkls")
    console.log(error);
  }
 // const user = AsyncStorage.getItem('@user')
 
}

export { isUserAuthenticated, getLoggedInUser }
