'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

export default class Collage extends Component {
  render() {
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
        <View style={styles.captionBox}>
          <Text style={styles.captionText}>#Zapilika</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  collage: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#4F4FFF',
    borderRadius: 10,
    padding: 10
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
    flex: 2.2,
    margin: 2,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  leftBotImg: {
    backgroundColor: 'gray',
    flex: 1,
    margin: 2,
    borderRadius: 5,
    resizeMode: 'cover'

  },
  rightTopImg: {
    backgroundColor: 'gray',
    flex: 1,
    margin: 2,
    borderRadius: 5,
    resizeMode: 'cover'

  },
  rightBotImg: {
    backgroundColor: 'gray',
    flex: 1,
    margin: 2,
    borderRadius: 5,
    resizeMode: 'cover'
  },

});

