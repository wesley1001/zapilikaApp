'use strict';
import {NetInfo} from 'react-native';
import {ENDPOINTS, ERROR_TYPES} from '../../api/instagramApi';

export const SELECT_USER = 'SELECT_USER';
export const FETCH_RECENT_USER_MEDIA = 'FETCH_RECENT_USER_MEDIA';
export const SELECT_MEDIA_ITEM = 'SELECT_MEDIA_ITEM';
export const DESELECT_MEDIA_ITEM = 'DESELECT_MEDIA_ITEM';
export const ERASE_SELECTED_MEDIA_ITEMS = 'ERASE_SELECTED_MEDIA_ITEM';

export const selectUser = (userName) => {
  return (dispatch, getState) => {
    const userNameLowCase = userName.toLowerCase();

    // prevent from searching  already selected user
    if (getState().instagram.selectedUser &&
      getState().instagram.selectedUser.username === userNameLowCase) {
      return Promise.resolve();
    }

    //check internet Connection
    if (!NetInfo.isConnected) return Promise.reject(ERROR_TYPES.noInternet);
    //select all users with given userName
    return fetch(ENDPOINTS.searchUsers(userNameLowCase))
      .then((resp) => resp.json())
      .then((respData) => respData.data)
      .then((matchedUsers) => {
        //search particular user
        const matchedUser = matchedUsers.find((u) => {
          return u.username === userNameLowCase;
        });

        if (!matchedUser) {
          dispatch({
            type: SELECT_USER,
            selectedUser: null
          });
          return Promise.reject(ERROR_TYPES.userNotExist);
        } else {
          return Promise.resolve(dispatch({
            type: SELECT_USER,
            selectedUser: matchedUser
          }));
        }
      })
  }
};

export const fetchRecentUserMedia = (userId) => {
  return dispatch => {
    //check internet Connection
    if (!NetInfo.isConnected) return Promise.reject(ERROR_TYPES.noInternet);
    return fetch(ENDPOINTS.fetchRecentUserMedia(userId))
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.meta.code === 200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(ERROR_TYPES.userDataNowAllowed)
        }
      })
      .then((userMedia) => {
        if (userMedia.length === 0) {
          return Promise.reject(ERROR_TYPES.userNotHaveMediaData);
        }
        //sortMediaData by likes property
        var sortedMedia = userMedia.sort(function (a, b) {
          return b.likes.count - a.likes.count;
        });

        return Promise.resolve(dispatch({
          type: FETCH_RECENT_USER_MEDIA,
          media: sortedMedia
        }));
      })
  }
};

export const selectMediaItem = (mediaItem) => {
  return {
    type: SELECT_MEDIA_ITEM,
    selectedItem: mediaItem
  }
};

export const deselectMediaItem = (mediaItem) => {
  return {
    type: DESELECT_MEDIA_ITEM,
    deselectedItem: mediaItem
  }
};

export const eraseSelectedMediaItems = () => {
  return {
    type: ERASE_SELECTED_MEDIA_ITEMS,
    payload: []
  }
};