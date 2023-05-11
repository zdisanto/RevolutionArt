import { ADD_SUBS_INFO, UPDATE_SUBS_INFO } from "../constants/actionTypes";

export const subscriptionInitialState = {
  subscriptionId: "",
  customer: "",
  subscriptionStart: null,
  subscriptionEnd: null,
  subsCancleAtPeriodEnd: null,
  subscriptionCancel: true,
  subscriptionCancelTime: null,
  currency: "",
  status: "",
  planId: "",
  planAmout: null,
  product: null,
  nickname: null,
};

const subscriptionReducer = (state = subscriptionInitialState, action) => {
  switch (action.type) {
    case ADD_SUBS_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_SUBS_INFO:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default subscriptionReducer;
