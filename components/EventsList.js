import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';
import * as locationActions from '../actions/location';
import EventCard from './EventCard';
import Searchbar from './Searchbar';
import SearchOptions from './SearchOptions';
import CreateEventForm from './CreateEventForm';
import { NavigationActions } from 'react-navigation';
import selectEvents from '../selectors/events';
import Map from './Map';

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.008;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;

const mapStyle = {
    height: 400,
    width: '100%'
}

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: null,
        longitude: null
      },
      mapView: true,
      gotLocation: false
    }
    this.getDistanceToEvent = this.getDistanceToEvent.bind(this);
    this.deg2rad = this.deg2rad.bind(this);
    this.setView = this.setView.bind(this);
    this.TestGetToken = this.TestGetToken.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
    this.props.navigation.setParams({ setCreateEventModal: this.props.setCreateEventModal });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("USER POSITION", position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          gotLocation: true
        })
        this.props.setLocation(position.coords)
      },
      (error) => console.log( error.message ),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    //this.TestGetToken();
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
    title: "What's Happining",
    headerTitleStyle: {
      color: '#FFF',
      textAlign: 'center',
      width: '90%',
      fontSize: 20
    },
    headerStyle: {
      backgroundColor: '#4AB169',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 30,
      shadowOpacity: 0,
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOffset: {
        height: 0,
        width: 0
      }
    },
    headerLeft: (<TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={30} color={'#FFF'}/>
       </TouchableOpacity>),
    headerRight: <TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => {
        navigation.state.params.setCreateEventModal(true)
      }} >
      <Icon name='add' size={30} color={'#FFF'} />
    </TouchableOpacity>
  });

  getDistanceToEvent(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    d = d * 0.621371;
    return Math.round(d * 10) / 10;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  setView(viewType) {
    console.log("setting view")
    if (viewType === 'map') {
      this.setState({
        mapView: true
      })
    } else if (viewType === 'list') {
      this.setState({
        mapView: false
      })
    }

  }

  render() {
    const events = this.props.events;
    console.log("Location in events list: ", this.props.location)

    var eventsView = null;
    if (this.state.mapView && this.state.gotLocation) {
      eventsView = <Map
      events={this.props.events}
      mapHeight={'100%'}
      initialRegion={{
        ...this.props.location,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA }}/>
    } else if (!this.state.mapView) {
      eventsView = (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {events.map((event, index) => {
            // calculate distance from user's location
            var distance = this.getDistanceToEvent(event.lat, event.lng, this.state.latitude, this.state.longitude);
            return <EventCard key={event._id} {...event} distance={distance} latitude={this.state.latitude} longitude={this.state.longitude} {...this.props}  />
          })}
          <View style={styles.empty} />
        </ScrollView>
      )
    } else if (!this.state.gotLocation){
      eventsView = (<View style={styles.loading}><ActivityIndicator size="small" color="#0000ff"/></View>)
    }

    return (
      <View style={styles.container}>
        <CreateEventForm />
        <SearchOptions />
        <View style={styles.header}>
          <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4AB169'}}>
            <Searchbar />
          </View>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => {
                this.setView('map')
              }}>
              <Icon name={'language'} color={this.state.mapView ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.65)'} size={25}/>
            </TouchableOpacity>
            <View  style={styles.divider}/>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => {
                this.setView('list')
              }}>
              <Icon name={'format-list-bulleted'} color={!this.state.mapView ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.65)'} size={25}/>
            </TouchableOpacity>
          </View>
        </View>
        {eventsView}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
  header: {
    backgroundColor: "#4AB169",
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fafff9'
  },
  empty: {
    padding: 30
  },
  navHeaderButton: {
    padding: 20
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#fafff9'
  },
  tab: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: '#FFF'
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
