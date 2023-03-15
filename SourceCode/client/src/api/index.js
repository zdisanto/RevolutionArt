import axios from 'axios';

const buyerAPI = axios.create({ baseURL: 'http://localhost:5000' });

buyerAPI.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

const sellerAPI = axios.create({ baseURL: 'http://localhost:5000' });

sellerAPI.interceptors.request.use((req) => {
  if (localStorage.getItem('seller_profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('seller_profile')).token}`;
  }
  return req;
});

export const login = (formData) => buyerAPI.post('/user/login', formData);
export const register = (formData) => buyerAPI.post('/user/register', formData);
export const deleteUser = (id) => buyerAPI.delete(`/user/${id}`);
export const updateInfo = (id, updatedInfo) => buyerAPI.patch(`/user/${id}`, updatedInfo);
export const resetPwd = (formData) => buyerAPI.patch('/user/resetPwd', formData);

export const s_register = (formData) => sellerAPI.post('/seller/s_register', formData);
export const s_login = (formData) => sellerAPI.post('/seller/s_login', formData);
export const deleteSeller = (id) => sellerAPI.delete(`/seller/${id}`);