'use strict';
import React, {
  Component,
  TouchableOpacity,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native';

export default class FooterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false
    }
  }

  onPress() {
    //prevent multiple touches on navigation transitions
    if(this.state.isTouched) return;

    this.setState({isTouched: true});
    const TOUCH_DELAY = 400;
    this.props.onPress();
    setTimeout(() => this.setState({isTouched: false}), TOUCH_DELAY);

  }


  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => {this.onPress()}}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
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