'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  PixelRatio
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default class Collage extends Component {
  render() {
    if (this.props.images.length < 4) return null;

    return (
      <View style={styles.collage}>
        <View style={styles.imagesBox}>
          <View style={styles.leftCol}>
            <Image
              source={{uri: this.props.images[0]}}
              style={styles.leftTopImg}
            />
            <Image
              source={{uri: this.props.images[1]}}
              style={styles.leftBotImg}
            />
          </View>
          <View style={styles.rightCol}>
            <Image
              source={{uri: this.props.images[2]}}
              style={styles.rightTopImg}
            />
            <Image
              source={{uri: this.props.images[3]}}
              style={styles.rightBotImg}
            />
          </View>
        </View>
      </View>
    )
  }
}

Collage.PropTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

const styles = StyleSheet.create({
  collage: {
    height: deviceWidth - PixelRatio.getPixelSizeForLayoutSize(20),
    width: deviceWidth - PixelRatio.getPixelSizeForLayoutSize(20),
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  imagesBox: {
    flex: 5,
    flexDirection: 'row'
  },
  captionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  leftCol: {
    flex: 1.5,
    alignItems: 'stretch',
  },
  rightCol: {
    flex: 2,
    alignItems: 'stretch',
  },
  leftTopImg: {
    backgroundColor: 'gray',
    flex: 2,
    margin: 1,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  leftBotImg: {
    backgroundColor: 'gray',
    flex: 1.1,
    margin: 1,
    borderRadius: 5,
    resizeMode: 'cover'

  },
  rightTopImg: {
    backgroundColor: 'gray',
    flex: 0.7,
    margin: 1,
    borderRadius: 5,
    resizeMode: 'cover'

  },
  rightBotImg: {
    backgroundColor: 'gray',
    flex: 1,
    margin: 1,
    borderRadius: 5,
    resizeMode: 'cover'
  }
});

