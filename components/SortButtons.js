import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { TextButton } from 'react-native-material-buttons';
import { Button } from 'react-native-elements';

class SortButtons extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
          <Text> Sort By: </Text>
        </View>
        <TextButton title="Distance"
          onPress={() => console.log("Distance")}
          />
        <TextButton title="Date"
          onPress={() => console.log("Distance")}
          />
        <TextButton title="Name"
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
    backgroundColor: '#F44336',
  }
})

export default SortButtons;
