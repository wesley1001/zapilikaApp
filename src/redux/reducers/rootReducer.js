'use strict';

'use strict';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  base: (state = [],action) => {return state}
});

export default rootReducer;