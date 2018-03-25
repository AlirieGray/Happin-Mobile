import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/filters';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

    this.Search = this.Search.bind(this);
  }

  Search() {
    console.log("Search query", this.state.query);
    console.log("props: ", this.props)

  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.Search();
          }}>
          <Icon name="search" size={20} style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={(query) => {
            this.setState({query});
            this.props.setTextFilter(query);
          }}
          value={this.state.query}
          underlineColorAndroid='rgba(0,0,0,0)'
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
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 10,
    width: '65%'
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
    backgroundColor: '#FFF',
    color: '#424242',
    borderRadius: 4
  },
})

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
