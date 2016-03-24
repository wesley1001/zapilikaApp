'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  Alert
} from 'react-native';

import {
  USERNAME_MAX_LENGTH as INST_USERNAME_MAX_LENGTH,
  ERROR_TYPES as INST_ERROR_TYPES
} from '../api/instagramApi';

import Button from './common/MainButton';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import {selectUser} from '../redux/actions/instagramActions';
import {initVkCredentialsLocal} from '../redux/actions/vkActions';

class SearchScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      wrongUserName: false,
      searchButtonDisabled: false
    };
  }

  componentDidMount() {
    this.props.initVkCredentialsLocal();
  }

  onSearchPress() {
    if (this.state.searchName.length === 0) return;

    this.setState({searchButtonDisabled: true});

    this.props.selectUser(this.state.searchName)
      .then(() => {
        this.refs.textInput.blur();
        Actions.mediaList();
        this.setState({searchButtonDisabled: false});
      })
      .catch((error) => {
        switch (error.type) {
          case INST_ERROR_TYPES.noInternet.type:
            Alert.alert(':(', INST_ERROR_TYPES.noInternet.message);
            break;
          case INST_ERROR_TYPES.userNotExist.type:
            this.setState({wrongUserName: true});
            break;
          default:
            Alert.alert(':(', INST_ERROR_TYPES.userSelectError.message)
        }
        this.setState({searchButtonDisabled: false});
      });
  }

  containerTouched() {
    this.refs.textInput.blur();
    return false;
  }

  onTextInputTextChange(text) {
    //outside of render function cause of #4845 issue
    this.setState({searchName: text, wrongUserName: false});
  }

  render() {
    return (
      <View ref="container" style={this.props.layoutStyle}
            onStartShouldSetResponder={() => {this.containerTouched()}}>
        <View style={styles.mainContent}>
          <TextInput
            ref="textInput"
            style={[styles.searchInput,
             this.state.wrongUserName ? styles.wrongUserNameSearchInput : null]}
            placeholder='Name'
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.searchName}
            onChangeText={(text) => {this.onTextInputTextChange(text)}}
            maxLength={INST_USERNAME_MAX_LENGTH}
            onSubmitEditing={() => {this.onSearchPress()}}
          />
          <View>
            <Text style={styles.validationText}>{this.state.wrongUserName ? 'аккаунт не найден' : ' '}</Text>
          </View>
          <Button
            disabled={this.state.searchButtonDisabled}
            text="поиск"
            onPress={() => {this.onSearchPress()}}/>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  },
  footer: {
    backgroundColor: '#4caf50',
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
  },
  wrongUserNameSearchInput: {
    borderColor: '#af4c76',
  },
  validationText: {
    color: '#af4c76',
    fontSize: 12
  }
});

const mapStateToProps = (state) => {
  return {
    selectedUser: state.instagram.selectedUser
  }
};
export default connect(mapStateToProps, {initVkCredentialsLocal, selectUser})(SearchScene);