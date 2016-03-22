"use strict";
import React, {
  Component,
  StyleSheet,
  PixelRatio,
} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

import BackButton from './common/BackButton/BackButton';

import SearchView from './SearchView';
import MediaListView from './MediaListView';
import CollageView from './CollageView';

import VkAuth from './VkAuth';

function renderBackButton() {
  return <BackButton {...this.props}/>;
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#fff'
  }
});

const scenes = Actions.create(
  <Scene key="root"
         renderBackButton={renderBackButton}
         navigationBarStyle={styles.navBar}
  >
    <Scene key="search" component={SearchView} title="Запилика" initial={true}/>
    <Scene key="mediaList" component={MediaListView} title="Каталог"/>

    <Scene key="collage" component={CollageView} title="Коллаж"/>
    <Scene key="vkAuth" component={VkAuth}/>
  </Scene >
);

export default class Main extends Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

