import React, { Component } from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, Image, View } from 'react-native';

const silverMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

const RedFlag =(<Image source={require('../images/red_flag.png')} style={{height: 35, width: 35}}/>)
const GreenFlag =(<Image source={require('../images/green_flag.png')} style={{height: 35, width: 35}} />)
const BlueFlag = (<Image source={require('../images/blue_flag.png')} style={{height: 35, width: 35}} />)
const BlueBalloon = (<Image source={require('../images/balloon_blue.png')} style={{height: 35, width: 35}} />)
const GreenBalloon = (<Image source={require('../images/balloon_red.png')} style={{height: 35, width: 35}} />)
const RedBalloon = (<Image source={require('../images/balloon_green.png')} style={{height: 35, width: 35}} />)
var markerSymbols = {
  RedFlag, GreenFlag, BlueFlag, BlueBalloon, GreenBalloon, RedBalloon
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
          coordinate={{latitude: pin.lat, longitude: pin.lng}}
          draggable
          >
          {markerSymbols[pin.name]}
          </Marker>
      })
    }
  }

  render() {
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
        customMapStyle={silverMapStyle}
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
