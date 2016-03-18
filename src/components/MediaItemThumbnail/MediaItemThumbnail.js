import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  PixelRatio
} from 'react-native';

import moment from 'moment';

import {connect} from 'react-redux';
import {selectMediaItem, deselectMediaItem} from '../../redux/actions/instagramActions';

//
//<View style={styles.captionBox}>

//</View>
//<View style={styles.likesBox}>

//</View>

class MediaItemThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  onPressThumbnail() {
    this.setState({checked: !this.state.checked});
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.checked ?
      this.props.selectMediaItem(this.props.data) : this.props.deselectMediaItem(this.props.data);
  }

  render() {
    const data = this.props.data;
    const creationDate = moment.unix(data.created_time).format('DD MMM YYYY');
    const checkIcon = this.state.checked ?
      require('./img/select_1.png') : require('./img/select_0.png');

    return (
      <View style={styles.shadowBox1}>
        <View style={styles.shadowBox2}>
          <TouchableOpacity
            style={styles.thumbnail}
            onPress={() => {this.onPressThumbnail()}}>
            <Image
              style={styles.image}
              source={{uri: data.images.standard_resolution.url}}
            >
              <Image
                source={checkIcon}
              />
            </Image>
            <View style={styles.footerBox}>
              <View style={styles.captionBox}>
                <View style={styles.titleBox}>
                  <Text style={styles.titleText}>
                    {data.caption ? data.caption.text.slice(0, 8) : ''}
                  </Text>
                </View>
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>
                    {creationDate}
                  </Text>
                </View>
              </View>
              <View style={styles.likesBox}>
                <Image
                  style={styles.likesImage}
                  source={require('./img/heart_icon.png')}/>
                <Text style={styles.likesText}>
                  {data.likes.count}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>


    )
  }
}

//todo figure out padding, delete unnecessary boxes, image size!
const styles = StyleSheet.create({
  shadowBox1: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2 / PixelRatio.get()},
    shadowOpacity: 0.24,
    shadowRadius: 3 / PixelRatio.get()

  },
  shadowBox2: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4 / PixelRatio.get()},
    shadowOpacity: 0.12,
    shadowRadius: 3 / PixelRatio.get(),
  },
  thumbnail: {
    flex: 1,
    height: 384 / PixelRatio.get(),
    borderRadius: 4,
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  imageBox: {
  },
  image: {
    height: 240 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32 / PixelRatio.get(),
  },
  captionBox: {
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleText: {
    paddingTop: 16/ PixelRatio.get(),
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '300',
    fontSize: 20,

  },
  dateBox: {
  },
  dateText: {
    paddingTop: 16/ PixelRatio.get(),
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',

  },
  likesBox: {
    alignItems: 'center',
    paddingTop: 32/ PixelRatio.get(),
  },
  likesImage: {
    //width: 32/ PixelRatio.get(),
    //height: 32/ PixelRatio.get(),
  },
  likesText: {
    paddingTop: 16/ PixelRatio.get(),
    fontFamily: 'HelveticaNeue-Light',
    lineHeight: 32/ PixelRatio.get(),
    fontSize: 12
  }

});

export default connect(null, {selectMediaItem, deselectMediaItem})(MediaItemThumbnail);