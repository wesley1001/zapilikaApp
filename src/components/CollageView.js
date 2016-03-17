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

  render() {
    return (
      <View style={this.props.stylesLayout.container}>
        <View style={[this.props.stylesLayout.header]}>
          <BackButton onPress={() => {this.onBackButtonPress()}}/>
        </View>
        <View style={this.props.stylesLayout.main}>
          <View ref="collage" style={styles.collage}>
            <View style={styles.leftCol}>
              <View style={styles.leftTopImg}>
              </View>
              <View style={styles.leftBotImg}>
              </View>

            </View>
            <View style={styles.rightCol}>

            </View>
          </View>
          <Image style={styles.image} source={{uri: this.state.collageUri}}/>
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

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: 'contain',
    backgroundColor: 'black',
    borderWidth: 1
  },
  collage: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10
  },
  leftCol: {
    flex: 1.5,
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
  rightCol: {
    flex: 2,
    alignItems: 'stretch',
    backgroundColor: 'red'
  },
  leftTopImg: {
    backgroundColor: 'gray',
    flex: 3,
    margin: 5
  },
  leftBotImg: {
    backgroundColor: 'gray',
    flex: 1,
    margin: 5,
    marginTop: 0
  }

});

const mapStateToProps = (state) => {
  return {
    selectedItems: state.instagram.selectedMediaItems
  }
};

export default connect(mapStateToProps)(CollageView);