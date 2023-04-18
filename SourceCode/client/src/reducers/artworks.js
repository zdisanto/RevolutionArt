import * as actionType from '../constants/actionTypes';

export default (posts= [], action) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return posts;
    case actionType.END_LOADING:
      return posts;
    case actionType.FETCH_ALL:
      return action.payload;
    case actionType.CREATE:
      return [...posts, action.payload];
    case actionType.S_UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case actionType.S_DELETE_ARTWORK:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};