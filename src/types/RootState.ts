// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

//import { Subjects } from 'store/universal-library/types'

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
 // UniversalLibrary: Subjects
  Auth: any 
 Boards: any
  // universalTopics: any
  // universalActivities: any
  // weblink: any
  // Users: any
  // Schools: any
  // video : any,
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
