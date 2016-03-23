'use strict';
import {NetInfo, Alert} from 'react-native';
import {ENDPOINTS as INST_ENDPOINTS} from '../../api/instagramApi';

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

    //select all users with given userName
    if (!NetInfo.isConnected) Alert.alert(':(', 'Кажется пропал интернет');
    return fetch(INST_ENDPOINTS.searchUsers(userNameLowCase))
      .then((resp) => resp.json())
      .then((respData) => respData.data)
      .then((matchedUsers) => {
        //search particular user
        const matchedUser = matchedUsers.find((u) => {
          return u.username === userNameLowCase;
        });
        
        if (!matchedUser) {
          return Promise.reject(dispatch({
            type: SELECT_USER,
            selectedUser: null
          }));
        } else {
          return Promise.resolve(dispatch({
            type: SELECT_USER,
            selectedUser: matchedUser
          }));
        }
      }).catch(() => {
        return Promise.reject('reject')
      });
  }
};

export const fetchRecentUserMedia = (userId) => {
  return dispatch => {
    return fetch(INST_ENDPOINTS.fetchRecentUserMedia(userId))
      .then((resp) => resp.json())
      .then((respData) => respData.data)
      .then((userMedia) => {
        //sortMediaData by likes property
        var sortedMedia = userMedia.sort(function (a, b) {
          return b.likes.count - a.likes.count;
        });

        return dispatch({
          type: FETCH_RECENT_USER_MEDIA,
          media: sortedMedia
        })
      })
      .catch(() => {});
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