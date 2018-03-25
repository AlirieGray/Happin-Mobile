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
        <TextButton title="Distance"
          onPress={() => this.props.setSortBy("Distance")}
          />
        <TextButton title="Date"
          onPress={() => this.props.setSortBy("Date")}
          />
        <TextButton title="Name"
          onPress={() => this.props.setSortBy("Name")}
          />
        <TextButton title="Tags"
          onPress={() => console.log("Tags")}
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
