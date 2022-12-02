import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, data });//store information to local storage

    router('/');
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    alert(error);
    console.log(error);
  }
};