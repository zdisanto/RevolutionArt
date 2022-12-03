import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router, ref) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, data });//store information to local storage

    router('/');
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error);
  }
};

export const register = (formData, router, ref) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error.response.data.message);
  } 
};