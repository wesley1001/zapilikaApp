'use strict';
import {ACTION_TYPES} from '../actions/instagramActions';

export default (state = {
  selectedUser: null,
  recentUserMedia: [],
  selectedMediaItems: [],
}, action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_USER:
      return {...state, selectedUser: action.selectedUser};
    case ACTION_TYPES.FETCH_RECENT_USER_MEDIA:
      return {...state, recentUserMedia: action.media};
    case ACTION_TYPES.SELECT_MEDIA_ITEM:
      return {...state, selectedMediaItems: state.selectedMediaItems.concat(action.selectedItem)};
    case ACTION_TYPES.DESELECT_MEDIA_ITEM:
    {
      const newSelectedMediaItemsArr = state.selectedMediaItems.filter((item) => {
        return item.id != action.deselectedItem.id;
      });
      return {...state, selectedMediaItems: newSelectedMediaItemsArr};
    }
    case ACTION_TYPES.ERASE_SELECTED_MEDIA_ITEMS:
    {
      return {...state, selectedMediaItems: action.selectedMediaItems}
    }
  }

  return state;
}

