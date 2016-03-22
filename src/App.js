"use strict";
import React from 'react-native';
import {Provider} from 'react-redux';

import Root from './components/Root';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
};


export default App;