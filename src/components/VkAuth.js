'use strict';
import React,{
  Component,
  Text,
  View,
  StyleSheet,
  WebView,
} from 'react-native';

import SearchButton from './SearchButton';
import {
  ENDPOINTS as VK_ENDPOINTS,vkEmitter,
  VK_EVENTS,
  AUTHORIZATION_PROCESSED_URL
} from '../api/vkApi';
import {connect} from 'react-redux';
import {fetchVkCredentialsAuth} from '../redux/actions/vkActions';
import {Actions} from 'react-native-router-flux';





class VkAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: null
    }
  }

  onNavigationChange(nav) {
    //handle multiple events for same urls
    if (nav.url === this.state.currentUrl) return;

    if (~nav.url.search(AUTHORIZATION_PROCESSED_URL)) {
      this.props.fetchVkCredentialsAuth(nav.url)
        .then(() => {
            Actions.pop();
            vkEmitter.emit(VK_EVENTS.AUTHORIZED_SUCCESS, this.props.vk.credentials);
          }
        )
        .catch(() => {
            Actions.pop();
            vkEmitter.emit(VK_EVENTS.AUTHORIZED_FAILED);
          }
        );

      this.setState({currentUrl: nav.url});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.web}
          source={{uri: VK_ENDPOINTS.authorize()}}
          onNavigationStateChange={(nav) => {this.onNavigationChange(nav)}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  web: {
    height: 100,
  }
});

export const mapStateToProps = (state) => {
  return {
    vk: state.vk
  }
};

export default connect(mapStateToProps, {fetchVkCredentialsAuth})(VkAuth);