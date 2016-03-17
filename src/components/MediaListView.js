'use strict';
import React, {
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ListView,
  PixelRatio,
} from 'react-native';

import MediaItemThumbnail from './MediaItemThumbnail/MediaItemThumbnail';
import BackButton from './common/BackButton/BackButton';

import {connect} from 'react-redux';
import {fetchRecentUserMedia} from '../redux/actions/instagramActions';

class MediaListView extends Component {
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
    this.props.fetchRecentUserMedia(this.props.selectedUser.id)
      .then(() => {
        this.setState({
          listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.props.recentUserMedia),
          loaded: true
        });
      });
  }


  onMakeCollageButtonPress() {
    this.props.navigator.push({name: 'collageView'});
  }

  onBackButtonPress() {
    //todo deselect all items on back button
    this.props.navigator.pop();
  }

  render() {
    var List = this.state.loaded ?
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.state.listViewDataSource}
        renderRow={this.renderThumbnail.bind(this)}
      />
      :
      <Text> Loading</Text>;

    return (
      <View style={this.props.stylesLayout.container}>
        <View style={[this.props.stylesLayout.header, styles.header]}>
          <BackButton onPress={() => {this.onBackButtonPress()}}/>
          <Text>Каталог</Text>
          <Text>{this.props.selectedMediaItemsCount} фото</Text>
        </View>
        <View style={this.props.stylesLayout.main}>
          {List}
        </View >
        <View style={this.props.stylesLayout.footer}>
          <TouchableOpacity
            style={styles.makeCollageButton}
            activeOpacity={0.6}
            onPress={() => {this.onMakeCollageButtonPress()}}>
            <Text style={styles.makeCollageText}>
              Давай коллаж
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  listView: {
    alignItems: 'stretch',
    paddingVertical: 16 / PixelRatio.get()
  },
  listItem: {
    paddingHorizontal: 16 / PixelRatio.get(),
    marginBottom: 16 / PixelRatio.get()
  },
  makeCollageButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  makeCollageText: {
    fontSize: 16,
    color: '#fff'
  }
});

const mapStateToProps = (state) => {
  return {
    selectedUser: state.instagram.selectedUser,
    recentUserMedia: state.instagram.recentUserMedia,
    selectedMediaItemsCount: state.instagram.selectedMediaItems.length
  }
};

export default connect(mapStateToProps, {fetchRecentUserMedia})(MediaListView);