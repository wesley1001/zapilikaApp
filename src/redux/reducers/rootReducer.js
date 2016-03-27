'use strict';
import { combineReducers } from 'redux';

import instagramReducer from './instagramReducer';
import vkReducer from './vkReducer';

const rootReducer = combineReducers({
  instagram: instagramReducer,
  vk: vkReducer
});

export default rootReducer;