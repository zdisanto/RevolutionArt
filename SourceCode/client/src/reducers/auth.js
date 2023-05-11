import * as actionType from '../constants/actionTypes';


// Added loading and errors key in initial state with default value
const authReducer = (state = { authData: null, loading: true, errors: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.removeItem('profile');
  
      return { ...state, authData: null, loading: false, errors: null };
    case actionType.DELETE:
      localStorage.removeItem('profile');
  
      return { ...state, authData: null, loading: false, errors: null };
    case actionType.UPDATE:

      return { ...state, authData: action.payload, loading: false, errors: null};
    case actionType.FETCH_USERINFO:
      
      return { ...state, authData: {...state.authData, ...action.payload}, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;