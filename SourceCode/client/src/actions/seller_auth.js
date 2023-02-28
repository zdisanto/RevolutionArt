import { S_AUTH, S_DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const s_register = (formData, router, ref) => async (dispatch) => {
    try {
      const { data } = await api.s_register(formData);
  
      dispatch({ type: S_AUTH, data });
  
      //once scuessful register, then go to login
      router('/sellerAuth/login');
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
  
      router('/sellerCenter');
    } catch (error) {
      ref.current.innerHTML = error.response.data.message;
      ref.current.style.visibility="visible";
      console.log(error);
    }
  };

  export const s_delete = (id, router, ref) => async (dispatch) => {
    try {
      await api.deleteSeller(id);
  
      dispatch({ type: S_DELETE, payload: id});
      console.log("seller is deleted!")
      router('/');
    } catch (error) {
      ref.current.innerHTML = error.response.data.message;
      ref.current.style.visibility="visible";
      console.log(error.response.data.message);
    }
  }