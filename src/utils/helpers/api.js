// import * as apiEndPoint from '../constants/apiEndPoint';
/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
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

export { fetchJSON }
