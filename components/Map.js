import React, { Component } from 'react'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={styles.container}
        initialRegion={this.props.initialRegion}
      >
      </MapView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '60%',
    width: '100%',
  }
});
