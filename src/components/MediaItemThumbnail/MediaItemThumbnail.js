import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import moment from 'moment';

export default class MediaItemThumbnail extends Component {

  onPressThumbnail() {

  }

  render() {
    const data = this.props.data;

    const creationDate = moment.unix(data.created_time).format('DD MMM YYYY');
    //console.log(data);

    return (
      <TouchableOpacity
        style={styles.thumbnail}
        onPress={() => {this.onPressThumbnail()}}>
        <Image
          style={styles.image}
          source={{uri: data.images.standard_resolution.url}}
        />
        <View style={styles.footerBox}>
          <View style={styles.captionBox}>
            <View style={styles.titleBox}>
            </View>
            <Text style={styles.titleText}>
              {data.caption ? data.caption.text.slice(0, 8) : ''}
            </Text>
            <View style={styles.creationDateBox}>
              <Text style={styles.creationDateText}>
                {creationDate}
              </Text>
            </View>
          </View>
          <View style={styles.likesBox}>
            <Image
              source={require('./img/heart_icon.png')}
            />
            <Text style={styles.likesText}>
              {data.likes.count}
            </Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  image: {
    width: 300,
    height: 100,
  },
  footerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 32
  },
  captionBox: {
    justifyContent: 'space-between',
  },
  titleBox: {},
  titleText: {
    //fontFamily: 'Helvetica Nue Light',
    fontSize: 20,
    //letterSpacing: 20
  },
  creationDateBox: {},
  creationDateText: {
    //fontFamily: 'Helvetica Nue  Light',
    fontSize: 12,
    //letterSpacing: 10
  },
  likesBox: {
    justifyContent: 'center'
  },
  likesText: {
    //fontFamily: 'Helvetica Nue  Light',
    fontSize: 12,
    letterSpacing: 10,
    textAlign: 'center'
  }
});