'use strict';
import React, {
  View,
  ActivityIndicatorIOS,
  StyleSheet
} from 'react-native';

export default ({animating}) => {
  return (
    <View style={styles.indicatorBox}>
      <ActivityIndicatorIOS
        animating={animating}
        style={styles.indicator}
        size="large"/>
    </View>

  )
}

const styles = StyleSheet.create({
  indicatorBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 80
  }

});