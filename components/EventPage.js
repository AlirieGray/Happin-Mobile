import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import * as Actions from '../actions/events';
import Map from './Map';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.008;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;

const Left = ({ onPress }) => (
  <TouchableHighlight onPress={() => {
    onPress()
  }}>
    <Icon name="arrow-back" size={30} />
  </TouchableHighlight>
);


class EventPage extends Component {
  constructor(props){
    super(props);

    this.state  = {
      markers: []
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Event Page',
    headerStyle: {
      backgroundColor: '#F44336',
      paddingTop: 30,
      paddingBottom: 15,
      height: 80
    },
    headerLeft: <Left onPress={navigation.goBack} />
  });


  componentWillMount() {
    this.props.getEventById(this.props.navigation.state.params.id);
  }

  /*
  <View style={styles.markersToolbar}>
    <Button onPress={() => {
      console.log('adding marker')
    }} />
  </View>

  */

  render() {
    const { name, address, date, description, organizer } = this.props.currentEvent;
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eventName}> {name} </Text>
          <View style={styles.details}>
            <Text style={styles.address}> {address} </Text>
            <Text style={styles.date}> {date} </Text>
          </View>
          <Text style={styles.organizer}> Organizer: {organizer} </Text>
        </View>
        <Text style={{marginBottom:50, padding: 10}}> {description} </Text>

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
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 10
  },
  eventName: {
    fontSize: 25,
    marginTop: 7,
    marginBottom: 4,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10
  },
  markersToolbar: {
    display: 'flex',
    flexDirection: 'row'
  },
  date: {
    fontSize: 10
  },
  address: {
    fontSize: 10
  },
  organizer: {
    fontSize: 11,
    paddingLeft: 10
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
