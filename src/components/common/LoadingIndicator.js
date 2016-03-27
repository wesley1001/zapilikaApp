'use strict';
import React, {
  View,
  ActivityIndicatorIOS,
  StyleSheet
} from 'react-native';

const LoadingIndicator = ({animating}) => {
  return (
    <View style={styles.indicatorBox}>
      <ActivityIndicatorIOS
        animating={animating}
        color="#4caf50"
        style={styles.indicator}
        size="large"/>
    </View>

  )
};

LoadingIndicator.PropTypes = {
  animating: React.PropTypes.bool
};

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

export default LoadingIndicator;