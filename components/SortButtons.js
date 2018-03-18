import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

class SortButtons extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button title="Distance"
          buttonStyle={{
            width: 90,
            height: 40
          }}
          />
        <Button title="Date"
          buttonStyle={{
            width: 90,
            height: 40
          }}
          />
        <Button title="Name"
          buttonStyle={{
            width: 90,
            height: 40
          }}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F44336'
  }
})

export default SortButtons;
