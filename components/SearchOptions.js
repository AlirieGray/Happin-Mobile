import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextButton } from 'react-native-material-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as modalActions from '../actions/modal';
import * as filterActions from '../actions/filters';

class SearchOptions extends Component {
  render() {
    return(
      <Modal
        transparent={true}
        visible={this.props.modal.searchModal}
        onRequestClose={ () => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <View style={styles.closeButtonStyle}>
              <TouchableOpacity
              onPress={ () => {
                this.props.setSearchModal(false);
              }}>
                <Icon name='clear' size={30} />
              </TouchableOpacity>
            </View>
            <Text> Sort By: </Text>
            <View style={{display: 'flex', flexDirection: 'row', padding: 5}}>
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
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    paddingTop: 100,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  inner: {
    backgroundColor: '#FFF',
    borderRadius: 3
  },
  closeButtonStyle: {
    display: 'flex',
    width: 300,
    alignItems: 'flex-end',
    padding: 5
  },
});

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, modalActions, filterActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);
