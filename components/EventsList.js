import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';
import * as locationActions from '../actions/location';
import EventCard from './EventCard';
import Searchbar from './Searchbar';
import CreateEventForm from './CreateEventForm';
import SortButtons from './SortButtons';
import { NavigationActions } from 'react-navigation';
import selectEvents from '../selectors/events';

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 0,
        longitude: 0
      }
    }
    this.getDistanceToEvent = this.getDistanceToEvent.bind(this);
    this.TestGetToken = this.TestGetToken.bind(this);
  }

  componentWillMount() {
    this.props.getEvents();
    this.props.navigation.setParams({ setCreateEventModal: this.props.setCreateEventModal });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        this.props.setLocation(position.coords)
      },
      (error) => console.log( error.message ),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.TestGetToken();
  }


  async TestGetToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null){
        // We have data!!
        console.log("TOKEN IN ASYNC STORAGE: ", value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Could not retrieve login token :( ")
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Find Events',
    headerStyle: {
      backgroundColor: '#F44336',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 40,
      paddingLeft: 15,
      paddingRight: 15,
      shadowOpacity: 0,
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOffset: {
        height: 0,
        width: 0
      },
    },
    headerLeft: (<TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={30} />
       </TouchableOpacity>),
    headerRight: <TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => {
        navigation.state.params.setCreateEventModal(true)
      }} >
      <Icon name='add' size={30} />
    </TouchableOpacity>
  });

  getDistanceToEvent(lat, lng) {
    var lat1 = Math.PI * lat / 180;
    var lng1 = Math.PI * lat / 180;
    var lat2 = Math.PI * this.state.latitude / 180;
    var lng2 = Math.PI * this.state.longitude / 180;

    var theta = Math.PI * (lng1 - lng2) / 180;
    var distance = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(theta)
    distance = Math.acos(distance);
    distance = distance * 180/Math.PI;
    distance = distance * 60 * 1.1515;
    return distance;
  }

  render() {
    const events = this.props.events;

    return (
      <View style={styles.container}>
        <CreateEventForm />
        <View style={styles.header}>
          <View style={{width:'100%', display: 'flex', alignItems: 'center', backgroundColor: '#F44336', elevation: 3}}>
            <Searchbar />
          </View>
          <SortButtons />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {events.map((event, index) => {
            // calculate distance from user's location
            var distance = this.getDistanceToEvent(event.lat, event.lng);
            return <EventCard key={event._id} {...event} distance={distance} {...this.props}  />
          })}
          <View style={styles.empty} />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
  header: {
    backgroundColor: "#F44336",
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F5F5F5'
  },
  empty: {
    padding: 30
  },
  navHeaderButton: {
    margin: 6
  }
});

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    events: selectEvents(state.events, state.filters, state.location),
    modal: state.modal,
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, eventActions, modalActions, locationActions);
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
