'use strict';
import React, {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const ShakeInfoBox = ({showImage}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>потряси чтобы сменить</Text>
      {showImage ? <Image source={require('./img/shake.png')}
             style={styles.image}/> : null}
    </View>
  )
};

ShakeInfoBox.PropTypes = {
  showImage: React.PropTypes.bool
};

ShakeInfoBox.defaultProps = {
  showImage: false
};


const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    opacity: 0.2
  }
});

export default ShakeInfoBox;