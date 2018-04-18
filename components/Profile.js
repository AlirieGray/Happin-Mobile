import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';
import EventCard from './EventCard';
import CreateEventForm from './CreateEventForm';
import moment from 'moment';
var now = moment().format();

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.008;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;

const mapStyle = {
    height: 400,
    width: '100%'
}


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showHosting: true
    }
    this.getDistanceToEvent = this.getDistanceToEvent.bind(this);
    this.deg2rad = this.deg2rad.bind(this);
    this.getTimeUntilEvent = this.getTimeUntilEvent.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    this.props.getUserEvents(this.props.auth.userId);
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
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'My Events',
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
        <Icon name='menu' size={32} color={'#FFF'}/>
       </TouchableOpacity>),
    headerRight: <TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => {
        navigation.state.params.setCreateEventModal(true)
        }} >
      <Icon name='add' size={32} color={'#FFF'} />
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

  getTimeUntilEvent(eventTime) {
    var fromNow = moment(eventTime).fromNow();
    return fromNow;
  }

  render() {
    const created = this.props.userEvents.created;
    const attending = this.props.userEvents.attending;
    var haps = null;
    if (this.state.showHosting) {
      {haps = created.map((event, index) => {
        var distance = this.getDistanceToEvent(event.lat, event.lng, this.state.latitude, this.state.longitude);
        var timeUntil = this.getTimeUntilEvent(event.date)
        return <EventCard key={event._id} {...event} distance={distance} timeUntil={timeUntil} {...this.props}  />
      })}
    } else {
      {haps = attending.map((event, index) => {
        var distance = this.getDistanceToEvent(event.lat, event.lng, this.state.latitude, this.state.longitude);
        var timeUntil = this.getTimeUntilEvent(event.date)
        return <EventCard key={event._id} {...event} distance={distance} timeUntil={timeUntil} {...this.props}  />
      })}
    }
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              this.setState({showHosting: true})
            }}>
            <Text style={{color:this.state.showHosting ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.65)'}}> Hosting </Text>
          </TouchableOpacity>
          <View  style={styles.divider}/>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              this.setState({showHosting: false})
            }}>
            <Text style={{color:!this.state.showHosting ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.65)'}}> Attending </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <CreateEventForm />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {haps}
            <View style={styles.empty} />
          </ScrollView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  header: {
    backgroundColor: "#4AB169",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
  empty: { // TODO: fix padding method to match EventsList
    padding: 30
  },
  addNewEventButton: {
    marginRight: 6
  },
  navHeaderButton: {
    padding: 22
  },
  tab: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: '#FFF'
  }
});

const mapStateToProps = (state) => {
  return {
    userEvents: state.userEvents,
    auth: state.auth,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, eventActions, modalActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
