'use strict';
import React, {
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ListView
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

  onBackButtonPress() {
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
        </View>
        <View style={this.props.stylesLayout.main}>
          {List}
        </View >
        <View style={this.props.stylesLayout.footer}>
          <Text>
            Давай коллаж
          </Text>
        </View>
      </View>
    )
  }

  renderThumbnail(mediaItemData) {
    return (
      <View style={styles.listItem}>
        <MediaItemThumbnail data={mediaItemData} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  listView: {
    alignItems: 'stretch',
    paddingVertical: 16
  },
  listItem: {
    paddingHorizontal: 16,
    marginBottom: 16,
  }
});



const mapStateToProps = (state) => {
  return {
    selectedUser: state.instagram.selectedUser,
    recentUserMedia: state.instagram.recentUserMedia
  }
};

export default connect(mapStateToProps, {fetchRecentUserMedia})(MediaListView);