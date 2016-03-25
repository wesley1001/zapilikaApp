'use strict';
import React, {
  Component,
  Text,
  View,
  StyleSheet,
  WebView,
  InteractionManager
} from 'react-native';

import {
  ENDPOINTS as VK_ENDPOINTS, vkEmitter,
  VK_EVENTS,
  AUTHORIZATION_PROCESSED_URL
} from '../api/vkApi';

import LoadingIndicator from './common/LoadingIndicator';
import {connect} from 'react-redux';
import {fetchVkCredentialsOnline} from '../redux/actions/vkActions';
import {Actions} from 'react-native-router-flux';

class VkAuthScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: null,
      renderLoadingIndicatorOnly: true, //this for better nav transitions
      isContentLoading: true //this for better user experience
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderLoadingIndicatorOnly: false})
    });
  }

  componentWillUnmount() {
    if (!this.props.vk || (this.props.vk && this.props.vk.authorized)) {
      vkEmitter.emit(VK_EVENTS.AUTHORIZATION_DENIED);
    }
  }

  onNavigationChange(nav) {
    //prevent multiple events for same urls
    if (nav.url === this.state.currentUrl) return;

    if (~nav.url.search(AUTHORIZATION_PROCESSED_URL)) {
      this.props.fetchVkCredentialsOnline(nav.url)
        .then(() => {
            Actions.pop();
            vkEmitter.emit(VK_EVENTS.AUTHORIZATION_SUCCESS);
          }
        )
        .catch(() => {
            Actions.pop();
          }
        );

      this.setState({currentUrl: nav.url});
    }
  }

  render() {
    return (
      <View style={[this.props.layoutStyle, styles.container]}>
        {this.renderWebView()}
      </View>
    )
  }

  renderWebView() {
    if (this.state.renderLoadingIndicatorOnly) {
      return <LoadingIndicator />
    } else {
      return (
        <View style={[this.props.layoutStyle, styles.container]}>
          <WebView
            source={{uri: VK_ENDPOINTS.authorize()}}
            onNavigationStateChange={(nav) => {this.onNavigationChange(nav)}}
            onLoad={() => {this.setState({isContentLoading: false})}}
          />
          {this.renderContentLoadingIndicator()}
        </View>
      )
    }
  }

  renderContentLoadingIndicator() {
    if (this.state.isContentLoading) {
      return (
        <View style={styles.contentLoadingIndicator}>
          <LoadingIndicator />
        </View>
      )
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  contentLoadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

export default connect(null, {fetchVkCredentialsOnline})(VkAuthScene);