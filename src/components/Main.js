"use strict";
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Navigator,

} from 'react-native';

import ROUTES from '../routes';

export default class Main extends Component {
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator}/>
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

