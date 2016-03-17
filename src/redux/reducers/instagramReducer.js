'use strict';
import {
  SEARCH_USERS,
  SELECT_USER,
  FETCH_RECENT_USER_MEDIA,
  SELECT_MEDIA_ITEM,
  DESELECT_MEDIA_ITEM
} from '../actions/instagramActions';

export default (state = {
  matchedUsers: [],
  selectedUser: null,
  recentUserMedia: [],
  selectedMediaItems: []
}, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {...state, matchedUsers: action.payload};
    case SELECT_USER:
      return {...state, selectedUser: action.payload};
    case FETCH_RECENT_USER_MEDIA:
      return {...state, recentUserMedia: action.payload};
    case SELECT_MEDIA_ITEM:
      return {...state, selectedMediaItems: state.selectedMediaItems.concat(action.payload)};
    case DESELECT_MEDIA_ITEM:
    {
      //todo rename
      const newSelectedMediaItemsArr = state.selectedMediaItems.filter((item) => {
        return item.id != action.payload.id;
      });
      return {...state, selectedMediaItems: newSelectedMediaItemsArr};
    }
  }

  return state;
}

