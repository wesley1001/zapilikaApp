'use strict';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);

export default store;