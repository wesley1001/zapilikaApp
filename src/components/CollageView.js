'use strict';
import React, {
  Component,
  Text,
  View,
  Image,
  StyleSheet,
  UIManager
} from 'react-native';

import _ from 'lodash';

import BackButton from './common/BackButton/BackButton';
import FooterButton from './common/FooterButton';
import Collage from './Collage';
import SearchButton from '../components/SearchButton';

import {ENDPOINTS as VK_ENDPOINTS}  from '../api/vkApi';
import {sharePhoto} from '../api/vkApi';
import Permutations from '../helpers/permutations';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {vkEmitter, VK_EVENTS} from '../api/vkApi';

class CollageView extends Component {
  constructor(props) {
    super(props);

    var imgOrdersArr = new Permutations(this.props.selectedMediaItems.length, 4).process();
    imgOrdersArr = _.shuffle(imgOrdersArr);

    this.state = {
      imgOrdersArr: imgOrdersArr,
      curImgOrder: 0

    };
  }

  componentDidMount() {
    vkEmitter.on(VK_EVENTS.AUTHORIZED_SUCCESS, (credentials) => {
      console.log('emmited', credentials); //sharePhoto(imgUri, credentials)
    });
    vkEmitter.on(VK_EVENTS.AUTHORIZED_FAILED, () => {
      alert('ошибка авторизации')
    });
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

  onNextPress() {
    if (this.state.imgOrdersArr.length - 1 > this.state.imgOrdersArr) {
      this.setState({
        curImgOrder: ++this.state.curImgOrder
      });
    } else {
      this.setState({
        imgOrdersArr: _.shuffle(this.state.imgOrdersArr),
        curImgOrder: 0
      });
    }
  }

  getImagesUrls() {
    var items = [];
    var currentOrder = this.state.imgOrdersArr[this.state.curImgOrder];

    console.log(currentOrder);
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
      <View style={styles.container}>
        <View style={styles.collageBox}>
          <View style={styles.collageBox}>
            <Collage ref="collage" images={imagesUrls}/>
          </View>
          <View>
            <SearchButton onPress={() => {this.onNextPress()}} text="next"/>
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