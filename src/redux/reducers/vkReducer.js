'use strict';
import {ACTION_TYPES} from '../actions/vkActions';

export default (state = {
  credentials: null,
  authorized: false
}, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_VK_CREDENTIALS_ONLINE:
    case ACTION_TYPES.INIT_VK_CREDENTIALS_LOCAL:
    case ACTION_TYPES.DELETE_VK_CREDENTIALS:
      return {...state, credentials: action.credentials, authorized: action.authorized};  
  }
  return state;
};