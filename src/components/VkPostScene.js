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
      renderLoadingIndicatorOnly: true
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
        <WebView
          style={styles.web}
          source={{uri: this.props.postUrl}}
        />
      )
    }
  }
}

VkPostScene.PropTypes = {
  postUrl: React.PropTypes.string.isRequired
};

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