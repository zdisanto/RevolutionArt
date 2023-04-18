import { combineReducers } from 'redux';

import auth from './auth';
import seller_auth from './seller_auth';
import artworks from './artworks';

export const reducers = combineReducers({ auth, seller_auth, artworks});