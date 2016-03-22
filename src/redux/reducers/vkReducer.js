'use strict';

import {
  FETCH_VK_CREDENTIALS_AUTH,
  GET_OFFLINE_VK_CREDENTIALS} from '../actions/vkActions';

export default (state = {
  credentials: null,
  authorized: false
}, action) => {
  switch(action.type) {
    case FETCH_VK_CREDENTIALS_AUTH:
    case GET_OFFLINE_VK_CREDENTIALS:
      return {...state, credentials: action.credentials, authorized: action.authorized}
  }
  return state;
};