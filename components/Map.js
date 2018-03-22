import React, { Component } from 'react'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(ref) {
    this.map = ref;
    if (!this.map) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.map) {
        return;
      }
      this.map.animateToRegion(
        this.props.initialRegion,
        1
      );
    })

  }

  render() {
    console.log("initial region")
    console.log(this.props.initialRegion)
    return (
        <MapView
          ref={this.handleRef}
          provider={ PROVIDER_GOOGLE }
          style={styles.container}
          initialRegion={this.props.initialRegion}>
        </MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%'
  },

});
