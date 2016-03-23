'use strict';
import React, {
  Component,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default class FooterButton extends Component {
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
    const TOUCH_DELAY = 400;
    this.props.onPress();
    setTimeout(() => this.setState({isTouched: false}), TOUCH_DELAY);

  }

  render() {
    return (
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => {this.onPress()}}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

FooterButton.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func
};

FooterButton.defaultProps = {
  text: 'Footer Button',
  onPress: () => {
  }
};

const styles = StyleSheet.create({
  buttonBox: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 48,
    backgroundColor: '#fff'
  },
  button: {
    flex: 1,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 16,
    color: '#fff'
  }
});