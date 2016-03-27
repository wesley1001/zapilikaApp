'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class BackButton extends Component {
  render() {
    if (this.props.navigationState.index === 0) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.container} onPress={Actions.pop}>
        <Image source={require('./img/back_icon.png')}
               style={styles.image}/>
        <Text style={styles.text}>
          {this.props.scenes[this.props.scenes.length - 2].navigationState.title || ''}
        </Text>
      </TouchableOpacity>
    )
  }
}

BackButton.PropTypes = {
  scenes: React.PropTypes.array.isRequired,
  navigationState: React.PropTypes.any.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 29,
    height: 37,
    position: 'absolute',
    bottom: 4,
    left: 2,
    padding: 8,
  },
  image: {
    width: 13,
    height: 21,
  },
  text: {
    fontSize: 17,
    color: '#4caf50',
    paddingLeft: 8
  }
});