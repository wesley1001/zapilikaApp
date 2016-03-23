'use strict';
import React, {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const ShakeInfoBox = ({showImage}) => {
  return (
    <View style={styles.shakeInfoBox}>
      <Text style={styles.shakeInfoText}>потряси чтобы сменить</Text>
      {showImage ? <Image source={require('./img/shake.png')}
             style={styles.shakeInfoImage}/> : null}
    </View>
  )
};

ShakeInfoBox.PropTypes = {
  showImage: React.PropTypes.bool
};

ShakeInfoBox.defaultProps = {
  showImage: true
};




const styles = StyleSheet.create({
  shakeInfoBox: {
    paddingHorizontal: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shakeInfoText: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center'
  },
  shakeInfoImage: {
    width: 100,
    height: 100,
    opacity: 0.2
  }
});


export default ShakeInfoBox;