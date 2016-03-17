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
    backgroundColor: '#FFF',
    justifyContent: 'center',
    height: 62,
    borderBottomWidth: 1
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    height: 52
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  }
});