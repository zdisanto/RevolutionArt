import { S_AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const s_register = (formData, router, ref) => async (dispatch) => {
    try {
      const { data } = await api.s_register(formData);
  
      dispatch({ type: S_AUTH, data });
  
      //once scuessful register, then go to login
      router('/sellercenter/login');
    } catch (error) {
      ref.current.innerHTML = error.response.data.message;
      ref.current.style.visibility="visible";
      console.log(error.response.data.message);
    } 
  };

  export const s_login = (formData, router, ref) => async (dispatch) => {
    try {
      const { data } = await api.s_login(formData);
      dispatch({ type: S_AUTH, data });//store information to local storage
  
      router('/');
    } catch (error) {
      ref.current.innerHTML = error.response.data.message;
      ref.current.style.visibility="visible";
      console.log(error);
    }
  };