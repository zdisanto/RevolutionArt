import { START_LOADING, CREATE, FETCH_ALL, END_LOADING, S_DELETE_ARTWORK, S_UPDATE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = (id) => async (dispatch) => {
  try {
    //dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(id);

    dispatch({ type: FETCH_ALL, payload: data });
    //dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    //dispatch({ type: START_LOADING });
    const { data } = await api.fetchAllPosts();

    console.log(data.length);

    dispatch({ type: FETCH_ALL, payload: data });
    //dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const addArtwork = (new_artwork, router) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.add_artwork(new_artwork);
  
      dispatch({ type: CREATE, payload: data });
  
      router("/sellerCenter/addartwork");
    } catch (error) {
      console.log(error);
    }
  };

  export const updateArtwork = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updateArtwork(id, post);
  
      dispatch({ type: S_UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const likePost = (id) => async (dispatch) => {//post_id
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.likePost(id, user?.token);
      console.log("有likes吗？"+data);
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deletePost = (id, router) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: S_DELETE_ARTWORK, payload: id });
      router('/sellerCenter/addartwork');
    } catch (error) {
      console.log(error);
    }
  };