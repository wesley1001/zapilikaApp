'use strict';

'use strict';
import { combineReducers } from 'redux';

import instagramReducer from './instagramReducer';

const rootReducer = combineReducers({
  instagram: instagramReducer
});

export default rootReducer;