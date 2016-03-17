'use strict';
import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
    >
      <Image
        source={require('./img/back_icon.png')}
      />
    </TouchableOpacity>
  )
}