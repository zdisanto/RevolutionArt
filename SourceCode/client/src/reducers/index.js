import { combineReducers } from 'redux';

import auth from './auth';
import seller_auth from './seller_auth';

export const reducers = combineReducers({ auth, seller_auth });