'use strict';
import React, {
  Component,
  TouchableOpacity,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native';

export default (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.6}
      onPress={() => {props.onPress()}}>
      <Text style={styles.text}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: PixelRatio.getPixelSizeForLayoutSize(24),
  },
  text: {  
    fontSize: 16,
    color: '#fff'
  }
});