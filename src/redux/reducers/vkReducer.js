'use strict';
import {
  FETCH_VK_CREDENTIALS_ONLINE,
  INIT_VK_CREDENTIALS_LOCAL
} from '../actions/vkActions';

export default (state = {
  credentials: null,
  authorized: false
}, action) => {
  switch(action.type) {
    case FETCH_VK_CREDENTIALS_ONLINE:
    case INIT_VK_CREDENTIALS_LOCAL:
      return {...state, credentials: action.credentials, authorized: action.authorized}
  }
  return state;
};