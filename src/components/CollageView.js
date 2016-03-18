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
          console.log(collageUri);
          this.setState({collageUri})
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
      <View style={this.props.stylesLayout.container}>
        <View style={[this.props.stylesLayout.header]}>
          <BackButton onPress={() => {this.onBackButtonPress()}}/>
        </View>
        <View style={this.props.stylesLayout.main}>
          <Collage images={images}/>

        </View >
        <View style={this.props.stylesLayout.footer}>
          <FooterButton
            text="Зашарить!"
            onPress={() => {this.onShareButtonPress()}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    selectedMediaItems: state.instagram.selectedMediaItems
  }
};

export default connect(mapStateToProps)(CollageView);