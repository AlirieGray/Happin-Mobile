import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Actions from '../actions/events';
import Map from './Map';
import { Button } from 'react-native-elements';

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.008;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;


class EventPage extends Component {
  constructor(props){
    super(props);

    this.state  = {
      markers: []
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{
      backgroundColor: '#F44336'
    },
    headerBackTitleStyle: {
      color: 'black'
    },
    headerTintColor: 'black'
  });

  componentWillMount() {
    this.props.getEventById(this.props.navigation.state.params.id);
  }

  /*
  <View style={styles.markersToolbar}>
    <Button onPress={() => {
      console.log('adding marker')
    }} />
    <Button onPress={() => {
      console.log('adding marker')
    }} />
    <Button onPress={() => {
      console.log('adding marker')
    }} />
    <Button onPress={() => {
      console.log('adding marker')
    }} />
  </View>

  */

  render() {
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.eventName}> {this.props.currentEvent.name} </Text>
          <View style={styles.details}>
            <Text> {this.props.currentEvent.date} </Text>
            <Text> {this.props.currentEvent.address} </Text>
          </View>
        </View>
        <Text style={{marginBottom:50}}> {this.props.currentEvent.description} </Text>

        <Map
          initialRegion={{
            latitude: this.props.navigation.state.params.lat,
            longitude: this.props.navigation.state.params.lng,
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
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#F5F5F5'
  },
  eventName: {
    fontSize: 25,
    marginTop: 7,
    marginBottom: 4
  },
  details: {
    display: 'flex',
    flexDirection: 'row'
  },
  markersToolbar: {
    display: 'flex',
    flexDirection: 'row'
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
