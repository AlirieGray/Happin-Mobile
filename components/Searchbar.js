import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/events';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

    this.Search = this.Search.bind(this);
  }

  Search() {
    console.log(this.state.query);
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.Search();
          }}
        >
          <Icon name="search" size={20} style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={(query) => this.setState({query})}
          value={this.state.query}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 4,
    marginTop: 8
  },
  searchIcon: {
    padding: 3,
    borderRadius: 4,
    marginLeft: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 5,
    margin: 6,
    backgroundColor: '#eee',
    color: '#424242',
    borderRadius: 4
  },
})

export default Searchbar;
