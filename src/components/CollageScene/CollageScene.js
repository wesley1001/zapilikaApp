'use strict';
import React, {
  Component,
  Text,
  View,
  Image,
  StyleSheet,
  UIManager,
  Dimensions,
  PixelRatio,
  Alert,
} from 'react-native';

import RNShakeEventIOS from 'react-native-shake-event-ios';
import Animatable from 'react-native-animatable';

import FooterButton from './../common/FooterButton';
import Collage from './Collage';
import ShakeInfoBox from './ShakeInfoBox/ShakeInfoBox';
import LoadingIndicator from '../common/LoadingIndicator';

import {sharePhoto, ERRORS as VK_ERRORS} from '../../api/vkApi';
import Permutations from '../../helpers/permutations';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import _ from 'lodash';
import {vkEmitter, VK_EVENTS} from '../../api/vkApi';
import {deleteVkCredentials, AUTHORIZATION_DENIED} from '../../redux/actions/vkActions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const deviceAspectRatio = deviceHeight / deviceWidth;
const SMALL_DEVICES_ASPECT_RATIO = 1.5;

class CollageScene extends Component {
  constructor(props) {
    super(props);
    var imgOrdersArr = new Permutations(this.props.selectedMediaItems.length, 4).process();
    imgOrdersArr = _.shuffle(imgOrdersArr);

    this.state = {
      imgOrdersArr: imgOrdersArr,
      curImgOrder: 0,
      snapShotUri: null,
      isSharing: false
    };
  }

  componentDidMount() {
    RNShakeEventIOS.addEventListener('shake', () => {
      this.nextImages();
    });

    vkEmitter.on(VK_EVENTS.AUTHORIZATION_SUCCESS, () => {
      this.share();
    });
    vkEmitter.on(VK_EVENTS.AUTHORIZATION_DENIED, () => {
      this.setState({isSharing: false});
    });
  }

  componentWillUnmount() {
    RNShakeEventIOS.removeEventListener('shake');
  }

  share() {
    sharePhoto(this.state.snapShotUri, this.props.vk.credentials)
      .then((postUrl) => {
        Actions.vkPost({postUrl});
        this.setState({isSharing: false});
      })
      .catch((error) => {
        switch (error.type) {
          case VK_ERRORS.authError.type:          
            this.props.deleteVkCredentials();
            Actions.vkAuth();
            break;          
          default:
            Alert.alert(':(', error.message);
            break;
        }
        this.setState({isSharing: false});
      });
  }

  makeSnapShot() {
    return UIManager
      .takeSnapshot(this.refs.collage, {format: 'png'})
      .then((snapShotUri) => this.setState({snapShotUri: snapShotUri}))
      .catch((err) => alert(err));
  }

  onShareButtonPress() {
    this.setState({isSharing: true});

    this.makeSnapShot()
      .then(() => {
        if (this.props.vk.authorized) {
          this.share();
        } else {
          Actions.vkAuth();
        }
      });
  }

  nextImages() {
    //animate collage
    this.refs.animatedView.tada(800);

    //change imagesOrder
    if (this.state.imgOrdersArr.length - 1 > this.state.imgOrdersArr) {
      this.setState({
        curImgOrder: ++this.state.curImgOrder
      });
    } else {
      //on ordersArray ended
      this.setState({
        imgOrdersArr: _.shuffle(this.state.imgOrdersArr),
        curImgOrder: 0
      });
    }
  }

  getImagesUrls() {
    var items = [];
    var currentOrder = this.state.imgOrdersArr[this.state.curImgOrder];

    for (var i = 0; i < currentOrder.length; i++) {
      items.push(this.props.selectedMediaItems[currentOrder[i]]);
    }

    return items.map((item) => {
      return item.images.standard_resolution.url;
    })
  }

  render() {
    var imagesUrls = this.getImagesUrls();
    return (
      <View style={[this.props.layoutStyle, styles.container]}>
        <View style={styles.collageBox}>
          <Animatable.View
            ref="animatedView"
            style={styles.animatedView}>
            <Collage ref="collage" images={imagesUrls}/>
          </Animatable.View>
        </View>
        <View style={styles.shakeInfoBox}>
          <ShakeInfoBox showImage={deviceAspectRatio > SMALL_DEVICES_ASPECT_RATIO}/>
        </View>
        <FooterButton
          text="Зашарить"
          disabled={this.state.isSharing}
          onPress={() => {this.onShareButtonPress()}}/>
        {this.renderSharingIndicator()}
      </View>
    )
  }

  renderSharingIndicator() {
    if (this.state.isSharing) {
      return (
        <View style={styles.sharingIndicator}>
          <LoadingIndicator />
        </View>
      )
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  collageBox: {
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shakeInfoBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

const mapStateToProps = (state) => {
  return {
    selectedMediaItems: state.instagram.selectedMediaItems,
    vk: state.vk
  }
};

export default connect(mapStateToProps, {deleteVkCredentials})(CollageScene);