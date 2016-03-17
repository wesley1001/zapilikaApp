"use strict";
import React from 'react-native';
import {Provider} from 'react-redux';

import Main from './components/Main';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
};


export default App;