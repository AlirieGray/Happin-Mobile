import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Actions from '../actions/events';
import Map from './Map';

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.0922;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;

class EventPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getEventById(this.props.navigation.state.params.id);
  }

  render() {
    console.log("current event")
    console.log(this.props.currentEvent.lat)
    console.log(this.props.currentEvent.lng)
    console.log("lat lng??")
    return(
      <View style={styles.container}>
        <Text style={styles.eventName}> {this.props.currentEvent.name} </Text>
        <Text> {this.props.currentEvent.date} </Text>
        <Text> {this.props.currentEvent.address} </Text>
        <Text> {this.props.currentEvent.description} </Text>
        <Map
          initialRegion={{
            latitude: this.props.currentEvent.lat,
            longitude: this.props.currentEvent.lng,
            latitudeDelta: LAT_DELTA,
            longitudeDelta: LNG_DELTA
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  eventName: {
    fontSize: 20
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
