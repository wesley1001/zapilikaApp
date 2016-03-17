'use strict';
import React, {
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';


import BackButton from './common/BackButton/BackButton';

export default class MediaListView extends Component {

  onBackButtonPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={this.props.stylesLayout.container}>
        <View style={[this.props.stylesLayout.header]}>
          <BackButton onPress={() => {this.onBackButtonPress()}}/>
          <Text>MediaList</Text>
        </View>
        <View style={this.props.stylesLayout.main}>

        </View >
        <View style={this.props.stylesLayout.footer}>
          <Text>
            Давай коллаж
          </Text>
        </View>
      </View>
    )
  }
}