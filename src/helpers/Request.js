import { url } from "../config/Connection";
import { storeObj } from "../store/setup"
// import NetInfo from "@react-native-community/netinfo";


// const connection = NetInfo.isConnected.fetch().then(connected => connected).catch(err => false);

export const Request = async ({ path, body = {}, method = "GET", header = {}, admin = false, formData = false }) => {
  try {
    console.log("body", body);
    const { getState } = storeObj.store;
    const { user = {}, adminUser = {} } = getState().user;
    const { Token = "" } = admin ? adminUser : user;
    //const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MDg0NjQyNTQ2IiwianRpIjoiY2ZjZWM0MmYtODQ4YS00Nzc0LWIwNDItMWE1MmI3ODZkYjY1IiwiZXhwIjoxNTg3NjI3ODk3LCJpc3MiOiJKYXp6UmV3YXJkc0FwcCIsImF1ZCI6Imh0dHBzOi8vbXNjb3JlLnN0YWdpbmdzZGVpLmNvbTo3MDEzIn0.iEcbOrg9DZX7y61IwbFJ5c-jja_-Q2Ps6IODWFTtXf0"
    let headers = { ...header, 'Authorization': `Bearer ${Token}` };
    if (!formData) {
      headers = { ...headers, "content-type": "application/json" }
    }
    console.log("headers", headers)
    const obj = formData ? { body } : method === "POST" ? { body: JSON.stringify(body) } : {};
    console.log("request ", `${url}${path}`, body, headers, obj)
    const response = await fetch(`${url}${path}`, { method, headers, ...obj });
    console.log("request response: ", response)
    return await response.json();
  } catch (error) {
    console.log(error, "error.....requested");
    return new Promise((res, rej) => {
      rej(error);
    });
  }
};
