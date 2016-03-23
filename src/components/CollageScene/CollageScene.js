'use strict';
import React, {
  Component,
  Text,
  View,
  Image,
  StyleSheet,
  UIManager,
  Dimensions,
  Alert,
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event-ios';
import Animatable from 'react-native-animatable';

import FooterButton from './../common/FooterButton';
import Collage from './Collage';

import {sharePhoto} from '../../api/vkApi';
import Permutations from '../../helpers/permutations';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import _ from 'lodash';
import {vkEmitter, VK_EVENTS} from '../../api/vkApi';
import {ACCESS_DENIED} from '../../redux/actions/vkActions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CollageScene extends Component {
  constructor(props) {
    super(props);

    var imgOrdersArr = new Permutations(this.props.selectedMediaItems.length, 4).process();
    imgOrdersArr = _.shuffle(imgOrdersArr);

    this.state = {
      imgOrdersArr: imgOrdersArr,
      curImgOrder: 0,
      snapShotUri: null
    };
  }

  componentDidMount() {
    RNShakeEventIOS.addEventListener('shake', () => {
      this.nextImages();
    });

    vkEmitter.on(VK_EVENTS.AUTHORIZED_SUCCESS, () => {
      sharePhoto(this.state.imgUri, this.props.vk.credentials);
    });
    vkEmitter.on(VK_EVENTS.AUTHORIZED_FAILED, (err) => {
      if(err === ACCESS_DENIED) return;
      Alert.alert(':(',err);
    });
  }

  componentWillUnmount() {
    RNShakeEventIOS.removeEventListener('shake');
  }

  makeSnapShot() {
    return UIManager
      .takeSnapshot(this.refs.collage, {format: 'png'})
      .then((snapShotUri) => this.setState({snapShotUri: snapShotUri}))
      .catch((err) => alert(err));
  }

  onShareButtonPress() {
    this.makeSnapShot()
      .then(() => {
        if (this.props.vk.authorized) {
          sharePhoto(this.state.snapShotUri, this.props.vk.credentials);
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
      //on orders ended
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
          <Text style={styles.shakeInfoText}>потряси чтобы сменить</Text>
          <Image source={require('./img/shake.png')}
                 style={styles.shakeInfoImage}/>
        </View>
        <FooterButton
          text="Зашарить!"
          onPress={() => {this.onShareButtonPress()}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFF4'
  },
  animatedView: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  collageBox: {
    height: deviceWidth,
    paddingHorizontal: 20,
    paddingVertical: 40,
    // flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    selectedMediaItems: state.instagram.selectedMediaItems,
    vk: state.vk
  }
};

export default connect(mapStateToProps)(CollageScene);