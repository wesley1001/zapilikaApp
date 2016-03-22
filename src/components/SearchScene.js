'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio
} from 'react-native';

import Button from './common/MainButton';
const INST_USERNAME_MAX_LENGTH = 30;

import {Actions} from 'react-native-router-flux'

import {connect} from 'react-redux';
import {searchUsers, selectUser} from '../redux/actions/instagramActions';
import {initVkCredentialsOffline} from '../redux/actions/vkActions';

class SearchScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: ''
    };
  }

  componentDidMount() {
    this.props.initVkCredentialsOffline();
  }

  onSearchPress() {
    if (this.state.searchName.length === 0) return;

    this.props.searchUsers(this.state.searchName)
      .then(() => {
        this.props.selectUser(this.state.searchName)
          .then(() => {
            this.refs.textInput.blur();
            Actions.mediaList();
          })
      }); //todo handle errors
  }

  containerTouched() {
    this.refs.textInput.blur();
    return false;
  }

  render() {
    return (
      <View style={[this.props.layoutStyle, styles.container]} onStartShouldSetResponder={this.containerTouched.bind(this)}>
        <View style={styles.mainContent}>
          <TextInput
            ref="textInput"
            style={styles.searchInput}
            placeholder='Name'
            value={this.state.searchName}
            onChangeText={(text) => {this.setState({searchName: text})}}
            maxLength={INST_USERNAME_MAX_LENGTH}
            onSubmitEditing={() => {this.onSearchPress()}}
          />
          <Button text="поиск" onPress={() => {this.onSearchPress()}}/>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#EFEFF4'
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 52
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#4caf50',
    alignSelf: 'stretch',
    paddingHorizontal: 8,
  }
});

const mapStateToProps = (state) => {
  return {
    matchedUsers: state.instagram.matchedUsers,
    selectedUser: state.instagram.selectedUser
  }
};
export default connect(mapStateToProps, {initVkCredentialsOffline, searchUsers, selectUser})(SearchScene);