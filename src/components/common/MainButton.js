'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

export default class MainButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: '#4caf50'
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  }
});