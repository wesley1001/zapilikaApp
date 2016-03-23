'use strict';
import Store from 'react-native-store';
import {parseTokenUrl} from '../../api/vkApi';

export const FETCH_VK_CREDENTIALS_ONLINE = 'FETCH_VK_CREDENTIALS_ONLINE';
export const INIT_VK_CREDENTIALS_LOCAL = 'INIT_VK_CREDENTIALS_LOCAL';
export const ACCESS_DENIED = 'отмена авторизации';

const DB = {
  vk: Store.model('vk')
};

export const initVkCredentialsLocal = () => {
  //get vk credentials from phone local storage if them exists
  return function (dispatch) {
    DB.vk.findById(1).then((vkData) => {
      if(vkData) {
        dispatch({
          type:INIT_VK_CREDENTIALS_LOCAL,
          credentials: vkData,
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
      if(credentials.error && credentials.error  === 'access_denied') {
        return Promise.reject(ACCESS_DENIED);
      } else {
        return Promise.reject('ошибка авторизации');
      }
    }
    //add credentials to local phone store
    DB.vk.findById(1).then((vkData) => {
      if(!vkData) {
        //handle first time adding data;
        DB.vk.add(credentials) }
      else {
        DB.vk.updateById(credentials,1)
      }
    });

    return Promise.resolve(dispatch({
      type: FETCH_VK_CREDENTIALS_ONLINE,
      authorized: true,
      credentials: credentials
    }));
  }
};