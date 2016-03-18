"use strict";
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Navigator,
  PixelRatio

} from 'react-native';

import ROUTES from '../routes';

export default class Main extends Component {
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} stylesLayout={stylesLayout}/>
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'searchView'}}
          renderScene={this.renderScene}
          configureScene={() =>
         {return Navigator.SceneConfigs.FloatFromBottomAndroid;}}
        />
      </View>
    )
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
    alignItems: 'center',
    height: 112 / PixelRatio.get(),
    borderBottomWidth: 1,
    borderColor: '#b1b1b4'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    height: 96/ PixelRatio.get()
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFF4'
  }
});