'use strict';
import React, {
  Component,
  Text,
  View,
  StyleSheet
} from 'react-native';

import BackButton from './common/BackButton/BackButton';
import {connect} from 'react-redux';

class CollageView extends Component {
  onBackButtonPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={this.props.stylesLayout.container}>
        <View style={[this.props.stylesLayout.header]}>
          <BackButton onPress={() => {this.onBackButtonPress()}}/>
        </View>
        <View style={this.props.stylesLayout.main}>
          <View style={styles.collage}>

          </View>

        </View >
        <View style={this.props.stylesLayout.footer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  collage: {
    width: 300,
    height: 400,
    backgroundColor: 'gray'
  }
});

const mapStateToProps = (state) => {
  return {
    selectedItems: state.instagram.selectedMediaItems
  }
};

export default connect(mapStateToProps)(CollageView);