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
      renderLoadingIndicatorOnly: true
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
        <WebView
          style={styles.web}
          source={{uri: VK_ENDPOINTS.authorize()}}
          onNavigationStateChange={(nav) => {this.onNavigationChange(nav)}}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  web: {
    height: 100
  }
});

export default connect(null, {fetchVkCredentialsOnline})(VkAuthScene);