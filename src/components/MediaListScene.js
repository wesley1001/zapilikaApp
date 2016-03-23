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

import MediaItemThumbnail from './MediaItemThumbnail/MediaItemThumbnail';
import BackButton from './common/BackButton/BackButton';
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
      loaded: false
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchRecentUserMedia(this.props.selectedUser.id)
        .then(() => {
          this.setState({
            listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.props.recentUserMedia),
            loaded: true
          });
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedMediaItemsCount !== nextProps.selectedMediaItemsCount) {
      Actions.refresh({title: `${nextProps.selectedMediaItemsCount} фото`})
    }
  }

  componentWillUnmount() {
    this.props.eraseSelectedMediaItems();
  }

  onMakeCollageButtonPress() {
    if (this.props.selectedMediaItemsCount < 4) {
      Alert.alert('','выберите больше 4 фото!');
      return;
    }
    Actions.collage();
  }

  render() {
    return (
      <View style={[this.props.layoutStyle, styles.container]}>
        {this.renderListView()}
        <FooterButton
          text="Давай коллаж!"
          onPress={() => {this.onMakeCollageButtonPress()}}/>
      </View>
    )
  }

  renderListView() {
    if (!this.state.loaded) return <LoadingIndicator animating={!this.state.loaded}/>;
    if (this.props.recentUserMedia.length === 0) {
      return (
        <View style={styles.noUserMediaBox}>
          <Text style={styles.noUserMediaText}>у пользователя нет фотографий</Text>
        </View>
      );
    }

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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#EFEFF4'
  },
  noUserMediaBox: {
    flex: 1,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noUserMediaText: {
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