import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    console.log("登录啦3")
    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    console.log("注册啦3"+data);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};