import React, { Component } from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, Image, View } from 'react-native';

const RedFlag =(<Image source={require('../images/red_flag.png')} style={{height: 35, width: 35}}/>)
const GreenFlag =(<Image source={require('../images/green_flag.png')} style={{height: 35, width: 35}} />)
const BlueFlag = (<Image source={require('../images/blue_flag.png')} style={{height: 35, width: 35}} />)
var markerSymbols = {
  RedFlag, GreenFlag, BlueFlag
}

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.handleRef = this.handleRef.bind(this);
    this.getEventMarkers = this.getEventMarkers.bind(this);
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

  getEventMarkers() {
    if (this.props.events) {
      return this.props.events.map((event) => {
        return <Marker
          key={event._id}
          coordinate={{latitude:event.lat, longitude:event.lng}}
          title={event.name} />
      })
    }
  }

  getMarkers() {
    if (this.props.droppedPins) {
      return this.props.droppedPins.map((pin, index) => {
        return <Marker
          key={`marker${index}`}
          coordinate={{latitude: pin.lat, longitude: pin.lng}}>
          {markerSymbols[pin.name]}
          </Marker>
      })
    }
  }

  render() {
    console.log("Rendering map")
    console.log(this.props.initialRegion)
    var eventMarker = null;
    if (!this.props.events) {
      eventMarker = (
        <Marker
          coordinate={{latitude: this.props.initialRegion.latitude, longitude: this.props.initialRegion.longitude}}
          title={"Event Location"}
        />
      )
    }
    return (
      <MapView
        ref={this.handleRef}
        provider={ PROVIDER_GOOGLE }
        style={{height: this.props.mapHeight, width: '100%'}}
        showsUserLocation={true}
	      followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={this.props.initialRegion}>
        {eventMarker}
        {this.getEventMarkers()}
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
