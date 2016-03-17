'use strict';
import {ENDPOINTS as INST_ENDPOINTS} from '../../api/instagramApi';

export const SEARCH_USERS = 'SEARCH_USERS';
export const SELECT_USER = 'SELECT_USER';
export const FETCH_RECENT_USER_MEDIA = 'FETCH_RECENT_USER_MEDIA';
export const SELECT_MEDIA_ITEM = 'SELECT_MEDIA_ITEM';
export const DESELECT_MEDIA_ITEM = 'DESELECT_MEDIA_ITEM';

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

        //sortMediaData by likes property
        var sortedMedia = userMedia.sort(function (a, b) {
          return b.likes.count - a.likes.count;
        });

        console.log(sortedMedia);

        return dispatch({
          type: FETCH_RECENT_USER_MEDIA,
          payload: sortedMedia
        })
      });
  }
};


export const selectMediaItem = (mediaItem) => {
  return {
    type: SELECT_MEDIA_ITEM,
    payload: mediaItem
  }
};

export const deselectMediaItem = (mediaItem) => {
  return {
    type: DESELECT_MEDIA_ITEM,
    payload: mediaItem
  }
};