'use strict';
import React, {
  Component,
  Text,
  View,
  Image,
  StyleSheet,
  UIManager
} from 'react-native';

import BackButton from './common/BackButton/BackButton';
import FooterButton from './common/FooterButton';
import Collage from './Collage';

import {ENDPOINTS as VK_ENDPOINTS}  from '../api/vkApi';
import {sharePhoto} from '../api/vkApi';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {vkEmitter, VK_EVENTS} from '../api/vkApi';

class CollageView extends Component {

  componentDidMount() {
    vkEmitter.on(VK_EVENTS.AUTHORIZED_SUCCESS, (credentials) => {
      console.log('emmited', credentials); //sharePhoto(imgUri, credentials)
    });
    vkEmitter.on(VK_EVENTS.AUTHORIZED_FAILED, () => {alert('ошибка авторизации')});
  }

  onShareButtonPress() {
    UIManager
      .takeSnapshot(this.refs.collage, {format: 'png'})
      .then((imgUri) => {
          if (this.props.vk.authorized) {
            console.log(this.props.vk);
          } else {
            Actions.vkAuth();
          }
        }
      )
      .catch((error) => alert(error));
  }

  getImages() {
    return this.props.selectedMediaItems.map((item) => {
      return item.images.standard_resolution.url;
    })
  }

  render() {
    var images = this.getImages();

    return (
      <View style={styles.container}>
        <View style={styles.collageBox}>
          <View style={styles.collageBox}>
            <Collage ref="collage" images={images}/>
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
    paddingTop: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFF4'
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

export default connect(mapStateToProps)(CollageView);