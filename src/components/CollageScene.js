'use strict';
import React, {
  Component,
  Text,
  View,
  Image,
  StyleSheet,
  UIManager
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event-ios';
import Animatable from 'react-native-animatable';

import FooterButton from './common/FooterButton';
import Collage from './Collage';

import {sharePhoto} from '../api/vkApi';
import Permutations from '../helpers/permutations';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import _ from 'lodash';
import {vkEmitter, VK_EVENTS} from '../api/vkApi';

class CollageScene extends Component {
  constructor(props) {
    super(props);

    var imgOrdersArr = new Permutations(this.props.selectedMediaItems.length, 4).process();
    imgOrdersArr = _.shuffle(imgOrdersArr);

    this.state = {
      imgOrdersArr: imgOrdersArr,
      curImgOrder: 0,
      imgUri: null

    };
  }

  componentDidMount() {
    RNShakeEventIOS.addEventListener('shake', () => {
      this.onNextImages();
    });

    vkEmitter.on(VK_EVENTS.AUTHORIZED_SUCCESS, (credentials) => {
      sharePhoto(this.state.imgUri, credentials);
    });
    vkEmitter.on(VK_EVENTS.AUTHORIZED_FAILED, () => {
      alert('ошибка авторизации')
    });
  }

  componentWillUnmount() {
    RNShakeEventIOS.removeEventListener('shake');
  }

  onShareButtonPress() {
    UIManager
      .takeSnapshot(this.refs.collage, {format: 'png'})
      .then((imgUri) => {
          this.setState({imgUri: imgUri});

          if (this.props.vk.authorized) {
            sharePhoto(imgUri, this.props.vk.credentials);
          } else {
            Actions.vkAuth();
          }
        }
      )
      .catch((error) => alert(error));
  }

  onNextImages() {
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
          <View style={styles.collageBox}>
            <Animatable.View
              ref="animatedView"
              style={styles.animatedView}>
              <Collage ref="collage" images={imagesUrls}/>
            </Animatable.View>
          </View>
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
  collageBox: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    backgroundColor: 'gray'
  }
});

const mapStateToProps = (state) => {
  return {
    selectedMediaItems: state.instagram.selectedMediaItems,
    vk: state.vk
  }
};

export default connect(mapStateToProps)(CollageScene);