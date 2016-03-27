'use strict';
import React, {
  Component,
  View,
  WebView,
  StyleSheet,
  InteractionManager
} from 'react-native';

import LoadingIndicator from './common/LoadingIndicator';

export default class VkPostScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderLoadingIndicatorOnly: true, //for better nav transitions
      isContentLoading: true //for better user experience
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderLoadingIndicatorOnly: false})
    });
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
            source={{uri: this.props.postUrl}}
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

VkPostScene.PropTypes = {
  postUrl: React.PropTypes.string.isRequired
};

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