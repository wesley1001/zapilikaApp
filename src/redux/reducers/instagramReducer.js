'use strict';
import {
  SELECT_USER,
  FETCH_RECENT_USER_MEDIA,
  SELECT_MEDIA_ITEM,
  DESELECT_MEDIA_ITEM,
  ERASE_SELECTED_MEDIA_ITEMS
} from '../actions/instagramActions';

export default (state = {
  selectedUser: null,
  recentUserMedia: [],
  selectedMediaItems: [],  
}, action) => {
  switch (action.type) {   
    case SELECT_USER:
      return {...state, selectedUser: action.selectedUser};
    case FETCH_RECENT_USER_MEDIA:
      return {...state, recentUserMedia: action.media};
    case SELECT_MEDIA_ITEM:
      return {...state, selectedMediaItems: state.selectedMediaItems.concat(action.selectedItem)};
    case DESELECT_MEDIA_ITEM:
    {
      const newSelectedMediaItemsArr = state.selectedMediaItems.filter((item) => {
        return item.id != action.deselectedItem.id;
      });
      return {...state, selectedMediaItems: newSelectedMediaItemsArr};
    }
    case ERASE_SELECTED_MEDIA_ITEMS:
    {
      return {...state, selectedMediaItems: action.payload}
    }
  }

  return state;
}

