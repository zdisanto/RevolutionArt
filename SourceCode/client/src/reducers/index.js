import { combineReducers } from 'redux';

import auth from './auth';
import seller_auth from './seller_auth';
import subscriptionReducer from './subscription';
import artworks from './artworks';

export const reducers = combineReducers({ auth, seller_auth, subscriptionReducer, artworks });