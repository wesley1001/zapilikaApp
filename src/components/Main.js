"use strict";
import React, {
  Component,
  StyleSheet,
  PixelRatio,
  Navigator
} from 'react-native';

import {Actions, Scene, Router, Modal} from 'react-native-router-flux';

import SearchView from './SearchView';
import MediaListView from './MediaListView';
import CollageView from './CollageView';
import BackButton from './common/BackButton/BackButton';
//renderBackButton={(props) => {return <BackButton />}}
import VkAuth from './VkAuth';
const scenes = Actions.create(
  <Scene title="hello"  key="root">
    <Scene key="search" component={SearchView}  title="Zapilika" initial={true} />
    <Scene key="mediaList" component={MediaListView} title="Catalog"/>
    <Scene key="collage" component={CollageView} leftTitle="fasdfasfd" title="Collage"/>
    <Scene key="vkAuth" component={VkAuth}/>
  </Scene >
);

export default class Main extends Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

var stylesLayout = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20 / PixelRatio.get(),
    height: 112 / PixelRatio.get(),
    borderBottomWidth: 1,
    borderColor: '#b1b1b4'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    height: 96 / PixelRatio.get()
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFF4'
  }
});