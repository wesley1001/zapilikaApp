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
        </View>
      </View>


    )
  }
}

//todo figure out styling (shadows , fonts, etc)
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
    borderWidth: 1,
    borderColor: 'orange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    height: 384 / PixelRatio.get(),
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  image: {
    height: 240 / PixelRatio.get(),
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerBox: {
    alignSelf: 'stretch',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  captionBox: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'blue',
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
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'green',
  },
  likesText: {
    //fontFamily: 'Helvetica Nue  Light',
    fontSize: 12,
    textAlign: 'center'
  }
});

export default connect(null, {selectMediaItem, deselectMediaItem})(MediaItemThumbnail);