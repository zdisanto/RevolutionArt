import { AUTH, DELETE, UPDATE, FETCH_USERINFO } from '../constants/actionTypes';
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

export const register = (formData, ref) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, data });
    ref.current.innerHTML = "You signed up scuessfully! Please sign in!";
    ref.current.style.visibility="visible";
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error.response.data.message);
  } 
};

export const deleteUser = (id, router, ref) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: DELETE, payload: id});
    console.log("user is deleted!")
    router('/');
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error.response.data.message);
  }
}

export const getInfo = (id, ref) => async (dispatch) => {
  try {
    const user = await api.getInfo(id);
    dispatch({ type: FETCH_USERINFO, user });
    return user.data;
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error.response.data.message);
  }
}

export const updateInfo = (id, updatedInfo, ref) => async (dispatch) =>{
  try {
    const { data } = await api.updateInfo(id, updatedInfo);
    
    dispatch({ type: UPDATE, payload: data });

    ref.current.innerHTML = "Sucessfully updated!";
    ref.current.style.visibility="visible";
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error.response.data.message);
  }
}

export const resetPwd = async (formData, router, ref) => {
  try {
    //await api.resetPwd(formData);
    const { data } = await api.resetPwd(formData);

    // dispatch({ type: AUTH, data });

    router('/auth');
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility="visible";
    console.log(error.response.data.message);
  } 
};