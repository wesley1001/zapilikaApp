'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Actions, DefaultRenderer} from 'react-native-router-flux';

export default class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.backButton, this.props.navigationState.leftButtonStyle]} onPress={Actions.pop}>
        <Image source={require('./img/back_icon.png')}
               style={styles.backButtonImage}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  backButton: {
    width: 29,
    height: 37,
    position: 'absolute',
    bottom: 4,
    left: 2,
    padding: 8,
  },
  backButtonImage: {
    width: 13,
    height: 21,
  },
});