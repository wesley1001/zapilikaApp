import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  PixelRatio,
  ActivityIndicatorIOS
} from 'react-native';

import moment from 'moment';
import {truncateStr} from '../../helpers/helpers';
import {connect} from 'react-redux';
import {selectMediaItem, deselectMediaItem} from '../../redux/actions/instagramActions';

class MediaItemThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isImgLoading: true
    }
  }

  onPressThumbnail() {
    if (this.state.isImgLoading) return;
    this.setState({checked: !this.state.checked});
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.checked ?
      this.props.selectMediaItem(this.props.data) : this.props.deselectMediaItem(this.props.data);
  }

  render() {
    const data = this.props.data;

    return (
      <View style={styles.shadowBox1}>
        <View style={styles.shadowBox2}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.thumbnail}
            onPress={() => {this.onPressThumbnail()}}>
            <Image
              style={styles.image}
              source={{uri: data.images.standard_resolution.url}}
              onLoad={() => {this.setState({isImgLoading: false})}}
            >
              {this.renderCheckIcon()}
            </Image>
            {this.renderFooter(data)}
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderCheckIcon() {
    const checkIconSource = this.state.checked ?
      require('./img/select_1.png') : require('./img/select_0.png');

    return this.state.isImgLoading ?
      <ActivityIndicatorIOS color="#4caf50" size="small"/> :
      <Image style={styles.checkImage} source={checkIconSource}/>
  }

  renderFooter(data) {
    return (
      <View style={styles.footerBox}>
        {this.renderCaptionBox(data)}
        {this.renderLikesBox(data)}
      </View>
    )
  }

  renderCaptionBox(data) {
    const creationDate = moment.unix(data.created_time).format('DD MMM YYYY');

    return (
      <View>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>
            {truncateStr(data.caption ? data.caption.text : ' ', 22)}
          </Text>
        </View>
        <View>
          <Text style={styles.dateText}>
            {creationDate}
          </Text>
        </View>
      </View>
    )
  }

  renderLikesBox(data) {
    return (
      <View style={styles.likesBox}>
        <Image
          style={styles.likesImage}
          source={require('./img/heart_icon.png')}/>
        <Text style={styles.likesText}>
          {data.likes.count}
        </Text>
      </View>
    )
  }
}

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
    justifyContent: 'flex-end',
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(8),
    borderRadius: 4,
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  image: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkImage: {
    //width: PixelRatio.getPixelSizeForLayoutSize(20),
    //height: PixelRatio.getPixelSizeForLayoutSize(20)
  },
  footerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(8),
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(4),
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '300',
    fontSize: 20,
  },
  dateText: {
    paddingTop: 8,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',

  },
  likesBox: {
    alignItems: 'center',
  },
  likesImage: {
    //width: PixelRatio.getPixelSizeForLayoutSize(8),
    //height: PixelRatio.getPixelSizeForLayoutSize(8),
  },
  likesText: {
    paddingTop: 12,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 12
  }
});

MediaItemThumbnail.PropTypes = {
  data: React.PropTypes.any.isRequired
};

export default connect(null, {selectMediaItem, deselectMediaItem})(MediaItemThumbnail);