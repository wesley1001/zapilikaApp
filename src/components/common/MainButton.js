'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const TOUCH_DELAY = 400;

export default class MainButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false
    }
  }

  onPress() {
    //prevent multiple touches on navigation transitions
    if (this.state.isTouched) return;

    this.setState({isTouched: true});
    this.props.onPress();
    setTimeout(() => this.setState({isTouched: false}), TOUCH_DELAY);
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[styles.button, this.props.disabled ? styles.disabledButton : null]}
        activeOpacity={0.6}
        onPress={() => this.onPress()}>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

MainButton.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func
};

MainButton.defaultProps = {
  text: 'button',
  onPress: () => {
  }
};

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
  disabledButton: {
    backgroundColor: '#9bbaae'
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  }
});