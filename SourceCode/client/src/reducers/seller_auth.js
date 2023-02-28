import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.S_AUTH:
      localStorage.setItem('seller_profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.S_LOGOUT:
      localStorage.removeItem('seller_profile');
  
      return { ...state, authData: null, loading: false, errors: null };
      case actionType.S_DELETE:
        localStorage.removeItem('seller_profile');
    default:
      return state;
  }
};

export default authReducer;