'use strict';
import {ENDPOINTS as INST_ENDPOINTS} from '../../api/instagramApi';

export const SEARCH_USERS = 'SEARCH_USERS';
export const SELECT_USER = 'SELECT_USER';
export const FETCH_RECENT_USER_MEDIA = 'FETCH_RECENT_USER_MEDIA';

export const searchUsers = (userName) => {
  return function (dispatch, getState) {
    var userNameLowerCase = userName.toLowerCase(); //todo refactoring

    if (getState().instagram.selectedUser &&
      getState().instagram.selectedUser.username === userNameLowerCase) {
      return Promise.resolve();
    }

    return fetch(INST_ENDPOINTS.searchUsers(userNameLowerCase))
      .then((resp) => resp.json())
      .then((respData) => respData.data)
      .then((matchedUsers) => {
        return dispatch({
          type: SEARCH_USERS,
          payload: matchedUsers
        });
      });
  }
};

export const selectUser = (user) => {
  return function (dispatch, getState) {
    var userNameLowerCase = user.toLowerCase(); //todo refactoring
    const matchedUser = getState().instagram.matchedUsers.find((muser) => {
      return muser.username === userNameLowerCase;
    });

    if (!matchedUser) {
      return Promise.reject(dispatch({
        type: SELECT_USER,
        payload: null
      }));
    } else {
      return Promise.resolve(dispatch({
        type: SELECT_USER,
        payload: matchedUser
      }));
    }
  };
};

export const fetchRecentUserMedia = (userId) => {
  return function (dispatch, getState) {
    return fetch(INST_ENDPOINTS.fetchRecentUserMedia(userId))
      .then((resp) => resp.json())
      .then((respData) => respData.data)
      .then((userMedia) => {
        return dispatch({
          type: FETCH_RECENT_USER_MEDIA,
          payload: userMedia
        })
      });
  }
};
