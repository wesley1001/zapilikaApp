'use strict';
import React,{
  Component,
  Text,
  View,
  StyleSheet,
  WebView,
} from 'react-native';

import {
  ENDPOINTS as VK_ENDPOINTS,vkEmitter,
  VK_EVENTS,
  AUTHORIZATION_PROCESSED_URL
} from '../api/vkApi';

import {connect} from 'react-redux';
import {fetchVkCredentialsOnline} from '../redux/actions/vkActions';
import {Actions} from 'react-native-router-flux';

class VkAuthScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: null
    }
  }
  
  onNavigationChange(nav) {
    //prevent multiple events for same urls
    if (nav.url === this.state.currentUrl) return;

    if (~nav.url.search(AUTHORIZATION_PROCESSED_URL)) {      
      this.props.fetchVkCredentialsOnline(nav.url)
        .then(() => {
            Actions.pop();
            vkEmitter.emit(VK_EVENTS.AUTHORIZED_SUCCESS);
          }
        )
        .catch((err) => {
          console.log('error');
            Actions.pop();
            vkEmitter.emit(VK_EVENTS.AUTHORIZED_FAILED, err);
          }
        );
      
      this.setState({currentUrl: nav.url});
    }
  }

  render() {
    return (
      <View style={[this.props.layoutStyle, styles.container]}>
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
    height: 100
  }
});

export default connect(null, {fetchVkCredentialsOnline})(VkAuthScene);