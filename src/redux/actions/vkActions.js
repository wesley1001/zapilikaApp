'use strict';
import Store from 'react-native-store';
import {parseTokenUrl, ERRORS} from '../../api/vkApi';

export const ACTION_TYPES = {
  FETCH_VK_CREDENTIALS_ONLINE: 'FETCH_VK_CREDENTIALS_ONLINE',
  INIT_VK_CREDENTIALS_LOCAL: 'INIT_VK_CREDENTIALS_LOCAL',
  AUTHORIZATION_DENIED: 'AUTHORIZATION_DENIED',
  DELETE_VK_CREDENTIALS: 'DELETE_VK_CREDENTIALS'
};

const DB = {
  vk: Store.model('vk')
};

export const initVkCredentialsLocal = () => {
  //get vk credentials from local storage if its exists
  return function (dispatch) {
    DB.vk.findById(1).then((vkData) => {
      if (vkData) {

        var corruptedData= vkData.access_token = '1234';
        dispatch({
          type: ACTION_TYPES.INIT_VK_CREDENTIALS_LOCAL,
          credentials: corruptedData,
          authorized: true,
        });
      }
    });
  }
};

export const fetchVkCredentialsOnline = (url) => {
  //online authorization
  return (dispatch) => {
    var credentials = parseTokenUrl(url);

    //error handling
    if (!credentials.access_token || !credentials.user_id) {
      if (credentials.error && credentials.error === 'access_denied') {
        return Promise.reject(ERRORS.authDenied);
      } else {
        return Promise.reject('ошибка авторизации');
      }
    }

    //add credentials to local phone store
    DB.vk.findById(1).then((vkData) => {
      if (!vkData) {
        //handle first time adding data;
        DB.vk.add(credentials)
      }
      else {
        DB.vk.updateById(credentials, 1)
      }
    });

    return Promise.resolve(dispatch({
      type: ACTION_TYPES.FETCH_VK_CREDENTIALS_ONLINE,
      authorized: true,
      credentials: credentials
    }));
  }
};

export const deleteVkCredentials = () => {
  DB.vk.removeById(1);
  return {
    type: ACTION_TYPES.DELETE_VK_CREDENTIALS,
    authorized: false,
    credentials: null
  }
};