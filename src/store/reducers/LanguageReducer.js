import { Actions } from 'react-native-router-flux';
import { languages } from './../../constants/languages'
const INITIAL_STATE = languages.english;
export default (state = INITIAL_STATE, action) => {
// alert("fff"+JSON.stringify(action))
  switch(action.type) {
    
    case 'language_data':
      return action.payload;
    default: 
     return state;
  }
};