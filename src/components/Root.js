"use strict";
import React, {
  Component,
  StyleSheet
} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

import BackButton from './common/BackButton/BackButton';

import SearchScene from './SearchScene';
import MediaListScene from './MediaListScene';
import CollageScene from './CollageScene';
import VkAuthScene from './VkAuthScene';

function renderBackButton() {
  return <BackButton {...this.props}/>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64
  },
  navBar: {
    backgroundColor: '#fff'
  }
});

const scenes = Actions.create(
  <Scene key="root"
         renderBackButton={renderBackButton}
         navigationBarStyle={styles.navBar}

  >
    <Scene key="search" component={SearchScene} title="Запилика" initial={true}/>
    <Scene key="mediaList" component={MediaListScene} title="Каталог"/>
    <Scene key="collage" component={CollageScene} title="Коллаж"/>
    <Scene key="vkAuth" component={VkAuthScene}/>
  </Scene >
);

export default class Root extends Component {
  render() {
    return <Router layoutStyle={styles.container} scenes={scenes}/>
  }
}

