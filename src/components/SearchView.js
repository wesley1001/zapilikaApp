'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import SearchButton from './SearchButton';

import {connect} from 'react-redux';
import {searchUsers, selectUser} from '../redux/actions/instagramActions';

class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchName: ''
    };
  }

  onSearchPress() {
    if (this.state.searchName.length === 0) return;
    console.log("component state::", this.state.searchName);

    this.props.searchUsers(this.state.searchName)
      .then(() => {
        this.props.selectUser(this.state.searchName)
          .then(() => {
            this.props.navigator.push({name: 'mediaListView'})
          })
      }); //todo handle errors
  }

  render() {
    return (
      <View style={this.props.stylesLayout.container}>
        <View style={[this.props.stylesLayout.header, styles.header]}>
          <Text style={styles.headerText}>Запилика!</Text>
        </View>
        <View style={this.props.stylesLayout.main}>
          <TextInput
            style={styles.searchInput}
            placeholder='Name'
            value={this.state.searchName}
            onChangeText={(text) => {this.setState({searchName: text})}}
          />
          <SearchButton text="поиск" onPress={() => {this.onSearchPress()}}/>
        </View>
        <View style={this.props.stylesLayout.footer}>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#000',
    fontSize: 17
  },
  searchInput: {
    backgroundColor: '#FFF',
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#4caf50',
    alignSelf: 'center',
    paddingHorizontal: 8,
  }
});

const mapStateToProps = (state) => {
  return {
    matchedUsers: state.instagram.matchedUsers,
    selectedUser: state.instagram.selectedUser
  }
};

export default connect(mapStateToProps, {searchUsers, selectUser})(SearchView);