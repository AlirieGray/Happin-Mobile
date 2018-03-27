import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextButton } from 'react-native-material-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as modalActions from '../actions/modal';

class SearchOptions extends Component {
  render() {
    return(
      <Modal
        transparent={false}
        visible={this.props.modal.searchModal}
        onRequestClose={ () => {
          console.log('Modal has been closed.');
        }}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.closeButtonStyle}>
          <TouchableOpacity
          onPress={ () => {
            this.props.setSearchModal(false);
          }}>
            <Icon name='clear' size={30} />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 60
  },
  closeButtonStyle: {
    display: 'flex',
    width: 300,
    alignItems: 'flex-end'
  },
});

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(modalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);
