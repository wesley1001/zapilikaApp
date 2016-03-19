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
import {connect} from 'react-redux';

class CollageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collageUri: null
    }
  }

  onShareButtonPress() {
    UIManager
      .takeSnapshot(this.refs.collage, {format: 'png'})
      .then((collageUri) => {
          sharePhoto(collageUri);
        }
      )
      .catch((error) => alert(error));
  }

  onBackButtonPress() {
    this.props.navigator.pop();
  }

  getImages() {
    return this.props.selectedMediaItems.map((item) => {
      console.log(item);
      return item.images.standard_resolution.url;
    })
  }

  render() {
    var images = this.getImages();

    return (
      <View style={styles.container}>
        <View style={styles.collageBox}>
          <Collage refs="collage" images={images}/>
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
  collageBox: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    selectedMediaItems: state.instagram.selectedMediaItems
  }
};

export default connect(mapStateToProps)(CollageView);