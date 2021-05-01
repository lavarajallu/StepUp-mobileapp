import axios, { AxiosInstance } from 'axios'
import { config } from './variables'
import { getLoggedInUser } from '../utils/helpers/authUtils'
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseAxios: AxiosInstance = axios.create({
  baseURL: `${config.baseUrl}`,
  timeout: 15000,
})

baseAxios.interceptors.request.use(
  async function (request) {
    const tokennew = await AsyncStorage.getItem('@access_token');
    console.log("hhhh",JSON.parse(tokennew))
    const token = JSON.parse(tokennew)
    if (token) {
      request.headers.token = `${token}`
    }
    return request
  },
  function (error) {
    console.log(error)
    throw error
  },
)

baseAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)
    throw error
  },
)

export { baseAxios }
