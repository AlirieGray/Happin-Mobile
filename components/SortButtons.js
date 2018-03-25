import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { TextButton } from 'react-native-material-buttons';
import { Button } from 'react-native-elements';

class SortButtons extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TextButton title="Distance"
          onPress={() => console.log("Distance")}
          />
        <TextButton title="Date"
          onPress={() => console.log("Distance")}
          />
        <TextButton title="Name"
          onPress={() => console.log("Distance")}
          />
        <TextButton title="Tags"
          onPress={() => console.log("Distance")}
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

export default SortButtons;
