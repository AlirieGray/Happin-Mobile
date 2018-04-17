import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filterActions from '../actions/filters';
import * as modalActions from '../actions/modal';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.setTextFilter(this.state.query);
          }}>
          <Icon name="search" size={20} style={styles.searchIcon} color={'#444'} />
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
        <TouchableOpacity
          style={{borderRadius: 4}}
          onPress={() => {
            this.props.setSearchModal(true)
          }}>
          <Icon name="filter-list" size={20} style={styles.filterIcon} color={'#444'}/>
        </TouchableOpacity>
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
    backgroundColor: '#FFF',
    color: '#424242',
    borderRadius: 4
  },
  filterIcon: {
    margin: 5,
    backgroundColor: '#eee',
    padding: 3,
    borderRadius: 4
  }
})

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, filterActions, modalActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
