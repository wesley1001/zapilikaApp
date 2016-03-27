'use strict';
import React, {
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  ListView,
  PixelRatio,
  InteractionManager
} from 'react-native';

import {ERRORS as INST_ERRORS} from '../api/instagramApi';

import MediaItemThumbnail from './MediaItemThumbnail/MediaItemThumbnail';
import FooterButton from './common/FooterButton';
import LoadingIndicator from './common/LoadingIndicator';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchRecentUserMedia, eraseSelectedMediaItems} from '../redux/actions/instagramActions';

class MediaListScene extends Component {
  constructor(props) {
    super(props);

    var listViewDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      listViewDataSource: listViewDataSource,
      errorMessage: '',
      showError: false,
      loaded: false
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  componentWillReceiveProps(nextProps) {
    //update navBar title on new thumbnail selected
    if (this.props.selectedMediaItemsCount !== nextProps.selectedMediaItemsCount) {
      Actions.refresh({title: `${nextProps.selectedMediaItemsCount} фото`})
    }
  }

  componentWillUnmount() {
    this.props.eraseSelectedMediaItems();
  }

  fetchData() {
    this.props.fetchRecentUserMedia(this.props.selectedUser.id)
      .then(() => {
        this.setState({
          listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.props.recentUserMedia),
          loaded: true
        });
      })
      .catch((error) => {
        switch (error.type) {
          case INST_ERRORS.userNotHaveMediaData.type:
          {
            this.setState({
              errorMessage: INST_ERRORS.userNotHaveMediaData.message,
              showError: true,
            });
            break;
          }
          case INST_ERRORS.userDataNowAllowed.type:
          {
            this.setState({
              errorMessage: INST_ERRORS.userDataNowAllowed.message,
              showError: true,
            });
            break;
          }
        }
      });
  }

  onMakeCollageButtonPress() {
    if (this.props.selectedMediaItemsCount < 4) {
      Alert.alert('', 'выбери больше 4ех фото!');
      return;
    }
    Actions.collage();
  }

  render() {
    return (
      <View style={[this.props.layoutStyle, styles.container]}>
        {this.renderListView()}
        <FooterButton
          text="Давай коллаж"
          onPress={() => {this.onMakeCollageButtonPress()}}/>
      </View>
    )
  }

  renderListView() {
    if (this.state.showError) {
      return (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        </View>
      );
    }

    if (!this.state.loaded) return <LoadingIndicator animating={!this.state.loaded}/>;

    return (
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.state.listViewDataSource}
        renderRow={this.renderThumbnail.bind(this)}
      />
    )
  }

  renderThumbnail(mediaItemData) {
    return (
      <View style={styles.listItem}>
        <MediaItemThumbnail data={mediaItemData}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48
  },
  errorBox: {
    flex: 1,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.4
  },
  listView: {
    padding: 8,
  },
  listItem: {
    marginBottom: 8,
  }
});

const mapStateToProps = (state) => {
  return {
    selectedUser: state.instagram.selectedUser,
    recentUserMedia: state.instagram.recentUserMedia,
    selectedMediaItemsCount: state.instagram.selectedMediaItems.length
  }
};

export default connect(mapStateToProps, {fetchRecentUserMedia, eraseSelectedMediaItems})(MediaListScene);