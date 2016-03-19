'use strict';
import React, {
  Component,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import {vaToPx} from '../../helpers/helpers';

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
    height: 52
  },
  text: {
    letterSpacing: vaToPx(16,20), //todo is it right?
    fontSize: 16,
    color: '#fff'
  }
});