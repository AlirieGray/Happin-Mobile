import React, { Component } from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.handleRef = this.handleRef.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
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

  getMarkers() {
    if (this.props.events) {
      return this.props.events.map((event) => {
        return <Marker key={event._id} coordinate={{latitude:event.lat, longitude:event.lng}} title={event.name}/>
      })
    }
  }

  render() {
    console.log("Rendering map")
    console.log(this.props.initialRegion)
    return (
      <MapView
        ref={this.handleRef}
        provider={ PROVIDER_GOOGLE }
        style={{height: this.props.mapHeight, width: '100%'}}
        initialRegion={this.props.initialRegion}>
        <Marker
          coordinate={{latitude: this.props.initialRegion.latitude, longitude: this.props.initialRegion.longitude}}
          title={this.props.pinName}
        />
        {this.getMarkers()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
  }
});
