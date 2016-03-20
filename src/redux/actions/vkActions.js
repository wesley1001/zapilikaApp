'use strict';
export const FETCH_VK_CREDENTIALS_AUTH = 'FETCH_VK_CREDENTIALS_AUTH';
export const GET_OFFLINE_VK_CREDENTIALS = 'GET_OFFLINE_VK_CREDENTIALS';
import {parseTokenUrl} from '../../api/vkApi';

import Store from 'react-native-store';
const DB = {
  vk: Store.model('vk')
};

export const initVkCredentialsOffline = () => {
  return function (dispatch) {
    DB.vk.findById(1).then((vkData) => {
      if(vkData) {
        dispatch({
          type:GET_OFFLINE_VK_CREDENTIALS,
          credentials: vkData,
          authorized: true,
        });
      }
    });
  }
};


export const fetchVkCredentialsAuth = (url) => {
  return function (dispatch, getState) {

    //todo add user_denied
    var credentials = parseTokenUrl(url);

    if (!credentials.access_token || !credentials.user_id) {
      return Promise.Reject();
    }

    DB.vk.findById(1).then((vkData) => {
      if(!vkData) {
        //handle first time adding data to the application storage;
        DB.vk.add(credentials) }
      else {
        DB.vk.updateById(credentials,1)
      }
    });

    return Promise.resolve(dispatch({
      type: FETCH_VK_CREDENTIALS_AUTH,
      authorized: true,
      credentials: credentials
    }));
  }
};