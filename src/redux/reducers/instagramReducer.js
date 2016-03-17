'use strict';
import {
  SEARCH_USERS,
  SELECT_USER,
  FETCH_RECENT_USER_MEDIA,
} from '../actions/instagramActions';


export default (state = {
  matchedUsers: [],
  selectedUser: null,
  recentUserMedia: []
}, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {...state, matchedUsers: action.payload};
    case SELECT_USER:
      return {...state, selectedUser: action.payload};
    case FETCH_RECENT_USER_MEDIA:
      return {...state, recentUserMedia: action.payload};
  }
  return state;
}

