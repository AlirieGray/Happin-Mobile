import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { TextButton } from 'react-native-material-buttons';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/filters';

class SortButtons extends Component {


  render() {
    return (
      <View style={styles.container}>
        <TextButton title="Date"
          color={this.props.filters.sortBy == 'date' ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
          onPress={() => this.props.setSortBy("date")}
          />
        <TextButton title="Distance"
          color={this.props.filters.sortBy == 'distance' ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
          onPress={() => this.props.setSortBy("distance")}
          />
        <TextButton title="Name"
          color={this.props.filters.sortBy == 'name' ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
          onPress={() => this.props.setSortBy("name")}
          />
        <TextButton title="Tags"
          onPress={() => console.log("tags")}
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
    backgroundColor: '#FFF',
    width: '100%',
    borderStyle: 'solid',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  }
})

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SortButtons);
