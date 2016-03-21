"use strict";
import React, {
  Component,
  StyleSheet,
  PixelRatio,
  Navigator
} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

import SearchView from './SearchView';
import MediaListView from './MediaListView';
import CollageView from './CollageView';

import VkAuth from './VkAuth';
const scenes = Actions.create(
  <Scene title="hello"  key="root">
    <Scene key="search" component={SearchView}  title="Zapilika" initial={true}  />
    <Scene key="mediaList" component={MediaListView} title="Catalog"/>
    <Scene key="collage" component={CollageView} leftTitle="fasdfasfd" title="Collage"/>
    <Scene key="vkAuth" component={VkAuth} />
  </Scene >
);

export default class Main extends Component {
  render() {
    return <Router scenes={scenes}/>
  }
}