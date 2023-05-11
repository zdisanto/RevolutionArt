import { AUTH, DELETE, UPDATE, FETCH_USERINFO, ADD_SUBS_INFO } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const login = (formData, router, ref) => async (dispatch) => {
  try {
    let { data } = await api.login(formData);
    console.log(data,'data')

    console.log(data, 'datatata')
    if (
      data?.result?.subscriptionInfo &&
      Object.keys(data.result.subscriptionInfo).length
    ) {
      // add user subscriptionInfo in subscriptionInfo reducers  if user is subscribed
      data = { ...data, subscriptionInfo: data.result.subscriptionInfo };
      dispatch({ type: ADD_SUBS_INFO, payload: data.result.subscriptionInfo });
    } else {
      data = { ...data, subscriptionInfo: null };
    }

    dispatch({ type: AUTH, data }); //store information to local storage

    router("/");
  } catch (error) {
    console.log(error, 'errro')
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility = "visible";
    console.log(error);
  }
};

export const register = (formData, ref) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, data });
    ref.current.innerHTML = "You signed up scuessfully! Please sign in!";
    ref.current.style.visibility = "visible";
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility = "visible";
    console.log(error.response.data.message);
  }
};

export const deleteUser = (id, router, ref) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: DELETE, payload: id });
    console.log("user is deleted!");
    router("/");
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility = "visible";
    console.log(error.response.data.message);
  }
};

export const getInfo = (id, ref) => async (dispatch) => {
  try {
    const user = await api.getInfo(id);
    dispatch({ type: FETCH_USERINFO, user });
    return user.data;
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility = "visible";
    console.log(error.response.data.message);
  }
};

export const updateInfo = (id, updatedInfo, ref) => async (dispatch) => {
  try {
    const { data } = await api.updateInfo(id, updatedInfo);

    dispatch({ type: UPDATE, payload: data });

    ref.current.innerHTML = "Sucessfully updated!";
    ref.current.style.visibility = "visible";
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility = "visible";
    console.log(error.response.data.message);
  }
};

export const resetPwd = async (id, formData, ref) => {
  try {
    //await api.resetPwd(formData);
    await api.resetPwd(id, formData);
    ref.current.innerHTML = "Yes! Sucessfully Updated!";
    ref.current.style.visibility = "visible";
    // dispatch({ type: AUTH, data });
  } catch (error) {
    ref.current.innerHTML = error.response.data.message;
    ref.current.style.visibility = "visible";
    console.log(error.response.data.message);
  }
};
